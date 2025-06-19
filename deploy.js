#!/usr/bin/env node

import OSS from 'ali-oss';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 导入OSS配置
let ossConfig;
try {
  const configModule = await import('./oss-config.js');
  ossConfig = configModule.default;
} catch (error) {
  console.error('❌ 无法加载OSS配置文件 oss-config.js');
  console.error('请确保已经复制 oss-config.example.js 为 oss-config.js 并填入正确的配置信息');
  process.exit(1);
}

// 创建OSS客户端
const client = new OSS({
  region: ossConfig.region,
  accessKeyId: ossConfig.accessKeyId,
  accessKeySecret: ossConfig.accessKeySecret,
  bucket: ossConfig.bucket,
  secure: ossConfig.secure || true,
  timeout: ossConfig.timeout || 60000
});

// 获取所有文件的递归函数
function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach(file => {
    const filePath = path.join(dirPath, file);
    if (fs.statSync(filePath).isDirectory()) {
      arrayOfFiles = getAllFiles(filePath, arrayOfFiles);
    } else {
      arrayOfFiles.push(filePath);
    }
  });

  return arrayOfFiles;
}

// 获取文件的MIME类型
function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf',
    '.otf': 'font/otf',
    '.eot': 'application/vnd.ms-fontobject',
    '.gz': 'application/gzip',
    '.br': 'application/x-brotli',
    '.webp': 'image/webp'
  };
  return mimeTypes[ext] || 'application/octet-stream';
}

// 设置缓存策略
function getCacheControl(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const fileName = path.basename(filePath);
  
  // HTML文件不缓存
  if (ext === '.html' || fileName === 'index.html') {
    return 'no-cache';
  }
  
  // 静态资源缓存1年
  if (['.css', '.js', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico', '.woff', '.woff2', '.ttf', '.eot'].includes(ext)) {
    return 'max-age=31536000'; // 1年
  }
  
  // 其他文件缓存1小时
  return 'max-age=3600';
}

// 上传单个文件
async function uploadFile(localPath, remotePath) {
  try {
    const ext = path.extname(localPath).toLowerCase();
    const headers = {
      'Content-Type': getMimeType(localPath),
      'Cache-Control': getCacheControl(localPath)
    };

    // 设置压缩文件的编码
    if (ext === '.gz') {
      headers['Content-Encoding'] = 'gzip';
      // 去掉.gz后缀，设置原文件的Content-Type
      const originalPath = localPath.replace(/\.gz$/, '');
      headers['Content-Type'] = getMimeType(originalPath);
    } else if (ext === '.br') {
      headers['Content-Encoding'] = 'br';
      // 去掉.br后缀，设置原文件的Content-Type
      const originalPath = localPath.replace(/\.br$/, '');
      headers['Content-Type'] = getMimeType(originalPath);
    }

    const options = { headers };
    await client.put(remotePath, localPath, options);
    console.log(`✅ 上传成功: ${remotePath}`);
  } catch (error) {
    console.error(`❌ 上传失败: ${remotePath}`, error.message);
    throw error;
  }
}

// 上传整个目录
async function uploadDirectory(localDir, remotePrefix = '') {
  console.log(`📁 开始上传目录: ${localDir}`);
  
  if (!fs.existsSync(localDir)) {
    throw new Error(`目录不存在: ${localDir}`);
  }

  const files = getAllFiles(localDir);
  console.log(`📝 发现 ${files.length} 个文件需要上传`);

  let successCount = 0;
  let failCount = 0;

  for (const file of files) {
    try {
      const relativePath = path.relative(localDir, file);
      const remotePath = remotePrefix ? `${remotePrefix}/${relativePath}` : relativePath;
      // 将Windows路径分隔符转换为Unix风格
      const normalizedRemotePath = remotePath.replace(/\\/g, '/');
      
      await uploadFile(file, normalizedRemotePath);
      successCount++;
    } catch (error) {
      failCount++;
      console.error(`上传文件失败: ${file}`);
    }
  }

  console.log(`\n📊 上传统计:`);
  console.log(`✅ 成功: ${successCount} 个文件`);
  console.log(`❌ 失败: ${failCount} 个文件`);
  
  return { successCount, failCount };
}

// 构建项目
async function buildProject() {
  console.log('🔨 开始构建项目...');
  try {
    const { stdout, stderr } = await execAsync('npm run build');
    console.log('📦 构建完成');
    if (stdout) console.log(stdout);
    if (stderr) console.log(stderr);
  } catch (error) {
    console.error('❌ 构建失败:', error.message);
    throw error;
  }
}

// 配置OSS静态网站托管
async function configureBucketWebsite() {
  try {
    console.log('⚙️  配置OSS静态网站托管...');
    
    // 设置静态网站配置
    await client.putBucketWebsite(ossConfig.bucket, {
      index: 'index.html',
      error: 'index.html' // 关键：将404错误页面设置为index.html
    });
    
    console.log('✅ OSS静态网站配置完成');
  } catch (error) {
    console.error('❌ OSS静态网站配置失败:', error.message);
    // 不抛出错误，因为这不是致命错误
  }
}

// 主函数
async function deploy() {
  try {
    console.log('🚀 开始部署流程...\n');
    
    // 第一步：构建项目
    await buildProject();
    
    // 第二步：配置OSS静态网站托管
    await configureBucketWebsite();
    
    // 第三步：上传到OSS
    const distPath = path.join(__dirname, 'dist');
    const result = await uploadDirectory(distPath, ossConfig.prefix);
    
    if (result.failCount === 0) {
      console.log('\n🎉 部署成功！');
      
      // 生成访问URL
      const baseUrl = ossConfig.customDomain || 
        `https://${ossConfig.bucket}.${ossConfig.region}.aliyuncs.com`;
      const siteUrl = ossConfig.prefix ? `${baseUrl}/${ossConfig.prefix}` : baseUrl;
      
      console.log(`🌐 阿里云OSS地址: ${siteUrl}`);
      console.log(`🌐 网站地址: https://www.zimo.club`);
    } else {
      console.log('\n⚠️  部署完成，但有部分文件上传失败');
      process.exit(1);
    }
    
  } catch (error) {
    console.error('\n❌ 部署失败:', error.message);
    process.exit(1);
  }
}

// 仅上传（不构建）
async function uploadOnly() {
  try {
    console.log('📤 开始上传到OSS...\n');
    
    // 配置OSS静态网站托管
    await configureBucketWebsite();
    
    const distPath = path.join(__dirname, 'dist');
    const result = await uploadDirectory(distPath, ossConfig.prefix);
    
    if (result.failCount === 0) {
      console.log('\n🎉 上传成功！');
    } else {
      console.log('\n⚠️  上传完成，但有部分文件上传失败');
      process.exit(1);
    }
    
  } catch (error) {
    console.error('\n❌ 上传失败:', error.message);
    process.exit(1);
  }
}

// 根据命令行参数决定执行什么操作
const command = process.argv[2];

if (command === 'upload') {
  uploadOnly();
} else {
  deploy();
} 