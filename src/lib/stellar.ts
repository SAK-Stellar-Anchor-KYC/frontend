import { 
  StellarWalletsKit, 
  WalletNetwork, 
  allowAllModules,
  FREIGHTER_ID,
  XBULL_ID,
  ALBEDO_ID
} from '@creit.tech/stellar-wallets-kit';

// Create a singleton instance of Stellar Wallets Kit
let walletKit: StellarWalletsKit | null = null;
let currentPublicKey: string | null = null;
let currentWalletId: string | null = null;

/**
 * Get or create the Stellar Wallets Kit instance
 */
export const getStellarWalletsKit = (): StellarWalletsKit => {
  if (!walletKit) {
    walletKit = new StellarWalletsKit({
      network: WalletNetwork.TESTNET,
      selectedWalletId: FREIGHTER_ID, // Default to Freighter
      modules: allowAllModules(), // Support all available wallets
    });
  }
  return walletKit;
};

/**
 * Connect to a Stellar wallet
 * @param walletId - Optional wallet ID (FREIGHTER_ID, XBULL_ID, ALBEDO_ID, etc.)
 */
export const connectWallet = async (walletId?: string): Promise<string> => {
  try {
    const kit = getStellarWalletsKit();
    
    if (walletId) {
      kit.setWallet(walletId);
      currentWalletId = walletId;
    }
    
    // Open modal for wallet selection
    await kit.openModal({
      onWalletSelected: async (option) => {
        kit.setWallet(option.id);
        currentWalletId = option.id;
      }
    });
    
    // Get the public key from the selected wallet
    const { address } = await kit.getAddress();
    
    if (!address) {
      throw new Error('Failed to get public key from wallet');
    }
    
    currentPublicKey = address;
    return address;
  } catch (error: any) {
    if (error.message?.includes('User declined') || error.message?.includes('rejected')) {
      throw new Error('Connection request declined by user');
    }
    throw new Error('Failed to connect to wallet');
  }
};

/**
 * Get the currently selected wallet ID
 */
export const getSelectedWalletId = (): string | null => {
  return currentWalletId;
};

/**
 * Sign a transaction with the connected wallet
 * Used for AAA KYC verification
 */
export const signTransaction = async (xdr: string): Promise<string> => {
  try {
    const kit = getStellarWalletsKit();
    const { signedTxXdr } = await kit.signTransaction(xdr);
    return signedTxXdr;
  } catch (error: any) {
    if (error.message?.includes('User declined') || error.message?.includes('rejected')) {
      throw new Error('Signature request declined by user');
    }
    throw new Error('Failed to sign transaction');
  }
};

/**
 * Validate Stellar public key format
 */
export const isValidPublicKey = (publicKey: string): boolean => {
  return publicKey.startsWith('G') && publicKey.length === 56;
};

/**
 * Shorten public key for display
 * Example: GABC...XYZ
 */
export const shortenPublicKey = (publicKey: string, chars: number = 4): string => {
  if (!publicKey || publicKey.length < chars * 2) {
    return publicKey;
  }
  return `${publicKey.slice(0, chars)}...${publicKey.slice(-chars)}`;
};

/**
 * Generate verification message for AAA KYC
 */
export const generateVerificationMessage = (publicKey: string): string => {
  const timestamp = new Date().toISOString();
  return `SAK Verification\nPublic Key: ${publicKey}\nTimestamp: ${timestamp}`;
};

/**
 * Mock wallet for development (when Freighter is not available)
 */
export const mockWallet = {
  publicKey: 'GABC123MOCKPUBLICKEY456789MOCKPUBLICKEY123456789',
  
  connect: async (): Promise<string> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockWallet.publicKey;
  },
  
  sign: async (message: string): Promise<string> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return `MOCK_SIGNATURE_${Date.now()}`;
  },
  
  isConnected: (): boolean => {
    return true;
  }
};

/**
 * Check if we should use mock wallet (for development)
 */
export const shouldUseMockWallet = (): boolean => {
  return process.env.NEXT_PUBLIC_USE_MOCK_WALLET === 'true';
};
