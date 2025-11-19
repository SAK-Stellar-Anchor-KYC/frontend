'use client';

import React from 'react';
import { useWallet } from '@/hooks/useWallet';

export const WalletConnect: React.FC = () => {
  const { connect, isConnecting, error } = useWallet();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
      <div className="w-24 h-24 bg-gradient-crypto rounded-full flex items-center justify-center">
        <svg 
          className="w-12 h-12 text-white" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" 
          />
        </svg>
      </div>

      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-dark-text">Connect Your Wallet</h1>
        <p className="text-dark-textMuted max-w-md">
          Connect your Stellar wallet to access KYC services and manage your verification levels.
        </p>
      </div>

      {error && (
        <div className="px-4 py-3 bg-crypto-error bg-opacity-10 border border-crypto-error rounded-lg max-w-md">
          <p className="text-sm text-crypto-error">{error}</p>
        </div>
      )}

      <button
        onClick={connect}
        disabled={isConnecting}
        className="px-8 py-4 bg-gradient-crypto text-white rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
      >
        {isConnecting ? (
          <>
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Connecting...</span>
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span>Connect Freighter</span>
          </>
        )}
      </button>

      <div className="text-center space-y-2 max-w-md">
        <p className="text-sm text-dark-textMuted">
          Don&apos;t have Freighter installed?{' '}
          <a 
            href="https://www.freighter.app/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-crypto-primary hover:text-crypto-primaryHover transition-colors"
          >
            Download it here
          </a>
        </p>
      </div>
    </div>
  );
};
