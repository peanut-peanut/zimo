// OSS配置文件示例
// 复制此文件为 oss-config.js 并填入你的真实配置

export default {
  // 阿里云OSS区域，如: oss-cn-hangzhou, oss-cn-shanghai, oss-cn-beijing等
  region: 'oss-cn-hongkong',
  
  // 阿里云Access Key ID
  // 建议使用RAM子账户的AccessKey，并只授予OSS相关权限
  accessKeyId: '',
  
  // 阿里云Access Key Secret
  accessKeySecret: '',
  
  // OSS Bucket名称
  bucket: 'zimo-club-test',
  
  // 可选：上传到bucket的子目录前缀
  // 例如: 'website/' 会将文件上传到 website/ 目录下
  prefix: '',
  
  // 可选：自定义域名
  // 如果你为bucket绑定了自定义域名，可以在这里配置
  customDomain: '',
  
  // 可选：是否开启HTTPS（默认true）
  secure: true,
  
  // 可选：请求超时时间（毫秒，默认60000）
  timeout: 60000,
}

/*
配置说明：

1. 获取AccessKey：
   - 登录阿里云控制台
   - 访问 https://usercenter.console.aliyun.com/#/manage/ak
   - 创建AccessKey（建议使用RAM子账户）

2. 创建OSS Bucket：
   - 登录OSS控制台
   - 创建Bucket，选择合适的区域
   - 设置读写权限为"公共读"（如果是静态网站）

3. 配置静态网站托管：
   - 在Bucket设置中开启"静态网站托管"
   - 设置默认首页为 index.html
   - 设置404页面（可选）

4. 自定义域名（可选）：
   - 在Bucket设置中绑定自定义域名
   - 配置CNAME解析
   - 申请SSL证书（推荐）

5. 安全建议：
   - 使用RAM子账户，只授予必要的OSS权限
   - 定期轮换AccessKey
   - 不要将AccessKey提交到代码仓库
*/ 