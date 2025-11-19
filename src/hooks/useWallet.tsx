'use client';

import React, { useState, useEffect, createContext, useContext } from 'react';
import { WalletState } from '@/types';
import {
  connectFreighter,
  isFreighterInstalled,
  shouldUseMockWallet,
  mockWallet,
  isValidPublicKey,
} from '@/lib/stellar';

interface WalletContextType extends WalletState {
  connect: () => Promise<void>;
  disconnect: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider = ({ children }: { children: any }) => {
  const [walletState, setWalletState] = useState<WalletState>({
    publicKey: null,
    isConnected: false,
    isConnecting: false,
    error: null,
  });

  // Check for existing connection on mount
  useEffect(() => {
    const checkConnection = async () => {
      const storedPublicKey = localStorage.getItem('stellar_public_key');
      
      if (storedPublicKey && isValidPublicKey(storedPublicKey)) {
        setWalletState({
          publicKey: storedPublicKey,
          isConnected: true,
          isConnecting: false,
          error: null,
        });
      }
    };

    checkConnection();
  }, []);

  const connect = async () => {
    setWalletState(prev => ({ ...prev, isConnecting: true, error: null }));

    try {
      let publicKey: string;

      if (shouldUseMockWallet()) {
        // Use mock wallet for development
        publicKey = await mockWallet.connect();
      } else {
        // Check if Freighter is installed
        const installed = await isFreighterInstalled();
        
        if (!installed) {
          throw new Error(
            'Freighter wallet is not installed. Please install it from freighter.app'
          );
        }

        // Connect to Freighter
        publicKey = await connectFreighter();
      }

      // Store public key
      localStorage.setItem('stellar_public_key', publicKey);

      setWalletState({
        publicKey,
        isConnected: true,
        isConnecting: false,
        error: null,
      });
    } catch (error: any) {
      setWalletState({
        publicKey: null,
        isConnected: false,
        isConnecting: false,
        error: error.message || 'Failed to connect wallet',
      });
    }
  };

  const disconnect = () => {
    localStorage.removeItem('stellar_public_key');
    setWalletState({
      publicKey: null,
      isConnected: false,
      isConnecting: false,
      error: null,
    });
  };

  return (
    <WalletContext.Provider value={{ ...walletState, connect, disconnect }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  
  return context;
};
