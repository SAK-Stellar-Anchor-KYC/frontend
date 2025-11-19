'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Layout } from '@/components/Layout';
import { KycFormSepa } from '@/components/KycFormSepa';
import { useWallet } from '@/hooks/useWallet';
import { useKyc } from '@/hooks/useKyc';

export const dynamic = 'force-dynamic';

export default function KycSepaPage() {
  const router = useRouter();
  const { isConnected } = useWallet();
  const { getKycByType } = useKyc();

  useEffect(() => {
    if (!isConnected) {
      router.push('/connect-wallet');
    }
  }, [isConnected, router]);

  if (!isConnected) return null;

  const existingKyc = getKycByType('sepa');

  return (
    <Layout>
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-dark-text mb-2">SEPA KYC</h1>
          <p className="text-dark-textMuted">Enhanced verification for SEPA region</p>
        </div>

        {existingKyc?.status === 'validated' ? (
          <div className="max-w-2xl mx-auto bg-dark-card border border-crypto-success rounded-lg p-8 text-center">
            <div className="w-16 h-16 bg-crypto-success rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-dark-text mb-2">KYC Validated</h2>
            <p className="text-dark-textMuted mb-6">
              Your SEPA KYC has been successfully validated
            </p>
            <button
              onClick={() => router.push('/dashboard')}
              className="px-6 py-3 bg-gradient-crypto text-white rounded-lg hover:opacity-90 transition-opacity"
            >
              Back to Dashboard
            </button>
          </div>
        ) : (
          <KycFormSepa />
        )}
      </div>
    </Layout>
  );
}
