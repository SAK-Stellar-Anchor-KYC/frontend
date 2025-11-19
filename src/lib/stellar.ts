import { isConnected, getPublicKey, signTransaction } from '@stellar/freighter-api';

/**
 * Check if Freighter wallet is installed
 */
export const isFreighterInstalled = async (): Promise<boolean> => {
  try {
    return await isConnected();
  } catch (error) {
    return false;
  }
};

/**
 * Request connection to Freighter wallet
 */
export const connectFreighter = async (): Promise<string> => {
  try {
    const publicKey = await getPublicKey();
    
    if (!publicKey) {
      throw new Error('Failed to get public key from Freighter');
    }
    
    return publicKey;
  } catch (error: any) {
    if (error.message?.includes('User declined')) {
      throw new Error('Connection request declined by user');
    }
    throw new Error('Failed to connect to Freighter wallet');
  }
};

/**
 * Sign a message with Freighter wallet
 * Used for AAA KYC verification
 */
export const signMessage = async (message: string): Promise<string> => {
  try {
    // Create a simple transaction to sign
    // In production, implement proper message signing
    const result = await signTransaction(message, { network: 'TESTNET' });
    return result;
  } catch (error: any) {
    if (error.message?.includes('User declined')) {
      throw new Error('Signature request declined by user');
    }
    throw new Error('Failed to sign message');
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
