'use client';

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Layout } from '@/components/Layout';
import Link from 'next/link';

function KycSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const kycType = searchParams.get('type') || 'base';

  const getKycTypeName = () => {
    switch (kycType) {
      case 'base':
        return 'Base KYC';
      case 'sepa':
        return 'Intermediate KYC (SEPA)';
      case 'aaa':
        return 'Advanced KYC (AAA)';
      default:
        return 'KYC';
    }
  };

  // Auto-redirect to dashboard after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/dashboard');
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8">
        {/* Success Icon */}
        <div className="relative">
          <div className="w-32 h-32 bg-gradient-crypto rounded-full flex items-center justify-center animate-pulse">
            <svg 
              className="w-20 h-20 text-white" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              strokeWidth={3}
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M5 13l4 4L19 7" 
              />
            </svg>
          </div>
          {/* Animated ring */}
          <div className="absolute inset-0 w-32 h-32 border-4 border-crypto-primary border-t-transparent rounded-full animate-spin opacity-20"></div>
        </div>

        {/* Success Message */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-dark-text">
            ¡Realizado Exitosamente!
          </h1>
          <p className="text-xl text-dark-textMuted max-w-md">
            Tu {getKycTypeName()} ha sido enviado correctamente.
          </p>
          <p className="text-sm text-dark-textMuted">
            Serás redirigido al dashboard en unos segundos...
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/dashboard"
            className="px-8 py-4 bg-gradient-crypto text-white rounded-lg font-semibold hover:opacity-90 transition-opacity text-center"
          >
            Ir al Dashboard
          </Link>
          <Link
            href="/kyc"
            className="px-8 py-4 bg-dark-card border border-dark-border text-dark-text rounded-lg font-semibold hover:bg-dark-cardHover transition-colors text-center"
          >
            Ver Otros Niveles
          </Link>
        </div>

        {/* Progress Bar */}
        <div className="w-full max-w-md">
          <div className="h-2 bg-dark-bg rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-crypto rounded-full transition-all duration-5000"
              style={{ width: '100%' }}
            ></div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default function KycSuccessPage() {
  return (
    <Suspense fallback={
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="w-16 h-16 border-4 border-crypto-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      </Layout>
    }>
      <KycSuccessContent />
    </Suspense>
  );
}

