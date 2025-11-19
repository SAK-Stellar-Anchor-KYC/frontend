'use client';

import React from 'react';
import Link from 'next/link';
import { useWallet } from '@/hooks/useWallet';
import { shortenPublicKey } from '@/lib/stellar';

export const Navbar: React.FC = () => {
  const { isConnected, publicKey, disconnect } = useWallet();

  return (
    <nav className="bg-dark-card border-b border-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-crypto rounded-lg"></div>
            <span className="text-xl font-bold text-dark-text">
              SAK
            </span>
          </Link>

          {/* Navigation Links */}
          {isConnected && (
            <div className="hidden md:flex space-x-6">
              <Link 
                href="/dashboard" 
                className="text-dark-textMuted hover:text-dark-text transition-colors"
              >
                Dashboard
              </Link>
              <Link 
                href="/kyc" 
                className="text-dark-textMuted hover:text-dark-text transition-colors"
              >
                KYC
              </Link>
            </div>
          )}

          {/* Wallet Info */}
          <div className="flex items-center space-x-4">
            {isConnected && publicKey ? (
              <>
                <div className="hidden sm:block px-4 py-2 bg-dark-bg rounded-lg border border-dark-border">
                  <span className="text-sm text-dark-textMuted font-mono">
                    {shortenPublicKey(publicKey, 6)}
                  </span>
                </div>
                <button
                  onClick={disconnect}
                  className="px-4 py-2 bg-crypto-error hover:bg-red-600 text-white rounded-lg transition-colors"
                >
                  Disconnect
                </button>
              </>
            ) : (
              <Link
                href="/connect-wallet"
                className="px-4 py-2 bg-gradient-crypto text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                Connect Wallet
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
