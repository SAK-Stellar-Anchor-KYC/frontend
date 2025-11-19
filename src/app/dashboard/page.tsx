'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Layout } from '@/components/Layout';
import { KycStatusCard } from '@/components/KycStatusCard';
import { useWallet } from '@/hooks/useWallet';
import { useKyc } from '@/hooks/useKyc';
import { shortenPublicKey } from '@/lib/stellar';

export const dynamic = 'force-dynamic';

export default function DashboardPage() {
  const router = useRouter();
  const { isConnected, publicKey } = useWallet();
  const { kycRecords, loading, getKycByType } = useKyc();

  useEffect(() => {
    if (!isConnected) {
      router.push('/connect-wallet');
    }
  }, [isConnected, router]);

  if (!isConnected) return null;

  const baseKyc = getKycByType('base');
  const sepaKyc = getKycByType('sepa');
  const aaaKyc = getKycByType('aaa');

  const getCompletionPercentage = () => {
    let completed = 0;
    if (baseKyc?.status === 'validated') completed++;
    if (sepaKyc?.status === 'validated') completed++;
    if (aaaKyc?.status === 'validated') completed++;
    return (completed / 3) * 100;
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="bg-gradient-crypto rounded-lg p-8 text-white">
          <h1 className="text-3xl font-bold mb-2">KYC Dashboard</h1>
          <p className="text-white text-opacity-90">
            Wallet: {publicKey && shortenPublicKey(publicKey, 8)}
          </p>
        </div>

        {/* Progress */}
        <div className="bg-dark-card border border-dark-border rounded-lg p-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold text-dark-text">Verification Progress</h2>
            <span className="text-sm text-dark-textMuted">{getCompletionPercentage().toFixed(0)}%</span>
          </div>
          <div className="w-full bg-dark-bg rounded-full h-3">
            <div 
              className="bg-gradient-crypto h-3 rounded-full transition-all duration-500"
              style={{ width: `${getCompletionPercentage()}%` }}
            ></div>
          </div>
        </div>

        {/* KYC Levels */}
        {loading ? (
          <div className="text-center py-12">
            <div className="w-12 h-12 border-4 border-crypto-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-dark-textMuted mt-4">Loading KYC records...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <KycStatusCard
              kycType="base"
              status={baseKyc?.status}
              validatedAt={baseKyc?.validated_at}
              onStart={() => router.push('/kyc/base')}
            />
            <KycStatusCard
              kycType="sepa"
              status={sepaKyc?.status}
              validatedAt={sepaKyc?.validated_at}
              onStart={() => router.push('/kyc/sepa')}
            />
            <KycStatusCard
              kycType="aaa"
              status={aaaKyc?.status}
              validatedAt={aaaKyc?.validated_at}
              onStart={() => router.push('/kyc/aaa')}
            />
          </div>
        )}

        {/* Info */}
        <div className="bg-dark-card border border-dark-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-dark-text mb-3">About KYC Levels</h3>
          <div className="space-y-3 text-sm text-dark-textMuted">
            <p>
              <strong className="text-dark-text">Base KYC:</strong> Basic identity verification with personal information.
            </p>
            <p>
              <strong className="text-dark-text">SEPA KYC:</strong> Enhanced verification for SEPA region with address proof.
            </p>
            <p>
              <strong className="text-dark-text">AAA KYC:</strong> Highest level with passport, video, and wallet signature.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
