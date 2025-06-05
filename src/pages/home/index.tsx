'use client';

import { Suspense, lazy } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Head from 'next/head';

// 懒加载非首屏组件
const WhyChooseChina = lazy(() => import('./components/WhyChooseChina'));
const WhyChooseZimo = lazy(() => import('./components/WhyChooseZimo'));
const StarReviews = lazy(() => import('./components/StarReviews'));
const OutstandingPrograms = lazy(() => import('./components/OutstandingPrograms'));
const ApplicationProcess = lazy(() => import('./components/ApplicationProcess'));
const AboutUs = lazy(() => import('./components/AboutUs'));
const Footer = lazy(() => import('./components/Footer'));

// 加载占位组件
const LoadingComponent = ({ height = "200px" }: { height?: string }) => (
  <div className="flex items-center justify-center" style={{ height }}>
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
  </div>
);

export default function Home() {
  return (
    <>
      <Head>
        <title>ZIMO - 您的中国留学伙伴</title>
        <meta name="description" content="ZIMO帮助国际学生找到完美的中国大学，并提供全方位的支持服务。" />
        <meta name="keywords" content="中国留学, 中国大学, 国际教育, ZIMO, 海外留学" />
      </Head>
      <main className="min-h-screen">
        {/* 首屏关键组件 */}
        <Header />
        <Hero />
        
        {/* 懒加载的非首屏组件 */}
        <Suspense fallback={<LoadingComponent height="300px" />}>
          <WhyChooseChina />
        </Suspense>
        
        <Suspense fallback={<LoadingComponent height="400px" />}>
          <WhyChooseZimo />
        </Suspense>
        
        <Suspense fallback={<LoadingComponent height="350px" />}>
          <StarReviews />
        </Suspense>
        
        <Suspense fallback={<LoadingComponent height="500px" />}>
          <OutstandingPrograms />
        </Suspense>
        
        <Suspense fallback={<LoadingComponent height="300px" />}>
          <ApplicationProcess />
        </Suspense>
        
        <Suspense fallback={<LoadingComponent height="400px" />}>
          <AboutUs />
        </Suspense>
        
        <Suspense fallback={<LoadingComponent />}>
          <Footer />
        </Suspense>
      </main>
    </>
  );
}
