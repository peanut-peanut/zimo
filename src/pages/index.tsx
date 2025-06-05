import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    router.push('/home');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse text-center">
        <Image src="/assets/image/Logo.png" alt="Zimo Logo" width={100} height={100} />
        <p className="text-gray-600">正在加载，请稍候...</p>
      </div>
    </div>
  );
} 