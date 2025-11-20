'use client';

import React, { useState, useEffect, createContext, useContext } from 'react';
import { WalletState } from '@/types';
import {
  connectWallet,
  getSelectedWalletId,
  shouldUseMockWallet,
  mockWallet,
  isValidPublicKey,
} from '@/lib/stellar';

interface WalletContextType extends WalletState {
  connect: (walletId?: string) => Promise<void>;
  disconnect: () => void;
  selectedWalletId: string | null;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider = ({ children }: { children: any }) => {
  const [walletState, setWalletState] = useState<WalletState>({
    publicKey: null,
    isConnected: false,
    isConnecting: false,
    error: null,
  });
  const [selectedWalletId, setSelectedWalletId] = useState<string | null>(null);

  // Check for existing connection on mount
  useEffect(() => {
    const checkConnection = async () => {
      const storedPublicKey = localStorage.getItem('stellar_public_key');
      const storedWalletId = localStorage.getItem('stellar_wallet_id');
      
      if (storedPublicKey && isValidPublicKey(storedPublicKey)) {
        setWalletState({
          publicKey: storedPublicKey,
          isConnected: true,
          isConnecting: false,
          error: null,
        });
        setSelectedWalletId(storedWalletId);
      }
    };

    checkConnection();
  }, []);

  const connect = async (walletId?: string) => {
    setWalletState(prev => ({ ...prev, isConnecting: true, error: null }));

    try {
      let publicKey: string;

      if (shouldUseMockWallet()) {
        // Use mock wallet for development
        publicKey = await mockWallet.connect();
      } else {
        // Connect using Stellar Wallets Kit
        publicKey = await connectWallet(walletId);
        
        // Get the selected wallet ID after connection
        const connectedWalletId = getSelectedWalletId();
        setSelectedWalletId(connectedWalletId);
        
        // Store wallet ID
        if (connectedWalletId) {
          localStorage.setItem('stellar_wallet_id', connectedWalletId);
        }
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
    localStorage.removeItem('stellar_wallet_id');
    setSelectedWalletId(null);
    setWalletState({
      publicKey: null,
      isConnected: false,
      isConnecting: false,
      error: null,
    });
  };

  return (
    <WalletContext.Provider value={{ ...walletState, connect, disconnect, selectedWalletId }}>
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
