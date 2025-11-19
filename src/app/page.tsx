'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('/landing');
  }, [router]);

  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-crypto-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-dark-textMuted mt-4">Loading...</p>
      </div>
    </div>
  );
}
