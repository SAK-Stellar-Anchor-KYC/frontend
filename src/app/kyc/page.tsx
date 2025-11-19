'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Layout } from '@/components/Layout';
import { useWallet } from '@/hooks/useWallet';
import Link from 'next/link';

export default function KycPage() {
  const router = useRouter();
  const { isConnected } = useWallet();

  useEffect(() => {
    if (!isConnected) {
      router.push('/connect-wallet');
    }
  }, [isConnected, router]);

  if (!isConnected) return null;

  const kycLevels = [
    {
      type: 'base',
      title: 'Base KYC',
      description: 'Basic identity verification',
      features: ['Personal information', 'Document number', 'Date of birth', 'Optional selfie'],
      href: '/kyc/base',
    },
    {
      type: 'sepa',
      title: 'SEPA KYC',
      description: 'Enhanced verification for SEPA region',
      features: ['Residential address', 'Government ID', 'Proof of address', 'SEPA country requirement'],
      href: '/kyc/sepa',
    },
    {
      type: 'aaa',
      title: 'AAA KYC',
      description: 'Highest level verification',
      features: ['Passport verification', 'Selfie', 'Video verification', 'Wallet signature'],
      href: '/kyc/aaa',
    },
  ];

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-dark-text mb-2">Select KYC Level</h1>
          <p className="text-dark-textMuted">
            Choose the verification level you want to complete
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {kycLevels.map((level) => (
            <Link
              key={level.type}
              href={level.href}
              className="bg-dark-card border border-dark-border rounded-lg p-6 hover:bg-dark-cardHover hover:border-crypto-primary transition-all group"
            >
              <h3 className="text-xl font-semibold text-dark-text mb-2 group-hover:text-crypto-primary transition-colors">
                {level.title}
              </h3>
              <p className="text-sm text-dark-textMuted mb-4">{level.description}</p>
              <ul className="space-y-2">
                {level.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start space-x-2 text-sm text-dark-textMuted">
                    <svg className="w-5 h-5 text-crypto-success flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}
