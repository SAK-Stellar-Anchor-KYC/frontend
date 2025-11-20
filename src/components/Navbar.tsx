'use client';

import React from 'react';
import Link from 'next/link';
import { useWallet } from '@/hooks/useWallet';
import { shortenPublicKey } from '@/lib/stellar';

export const Navbar: React.FC = () => {
  const { isConnected, publicKey, disconnect, connect, isConnecting } = useWallet();

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
              <button
                onClick={() => connect()}
                disabled={isConnecting}
                className="px-4 py-2 bg-gradient-crypto text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {isConnecting ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Connecting...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span>Connect Wallet</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
