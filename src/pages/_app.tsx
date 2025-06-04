import '@/styles/globals.css';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // 页面切换时的滚动处理
  useEffect(() => {
    const handleRouteChange = () => {
      // 页面切换时滚动到顶部
      window.scrollTo(0, 0);
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="keywords" content="中国留学, 中国大学, 国际教育, ZIMO, 海外留学" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  );
} 