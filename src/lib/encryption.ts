/**
 * Client-side encryption utility using Web Crypto API
 * This provides an additional layer of security for PII data before storing in Supabase
 * 
 * WARNING: This is a prototype implementation. For production:
 * - Move encryption to backend
 * - Use proper key management service (AWS KMS, Azure Key Vault, etc.)
 * - Never store encryption keys in client code
 */

const ALGORITHM = 'AES-GCM';
const KEY_LENGTH = 256;

/**
 * Generate a random encryption key
 * In production, this should be managed server-side
 */
export const generateKey = async (): Promise<CryptoKey> => {
  return await crypto.subtle.generateKey(
    {
      name: ALGORITHM,
      length: KEY_LENGTH,
    },
    true,
    ['encrypt', 'decrypt']
  );
};

/**
 * Export key to base64 string for storage
 * SECURITY WARNING: Do not store this in localStorage in production
 */
export const exportKey = async (key: CryptoKey): Promise<string> => {
  const exported = await crypto.subtle.exportKey('raw', key);
  return btoa(String.fromCharCode(...new Uint8Array(exported)));
};

/**
 * Import key from base64 string
 */
export const importKey = async (keyString: string): Promise<CryptoKey> => {
  const keyData = Uint8Array.from(atob(keyString), c => c.charCodeAt(0));
  return await crypto.subtle.importKey(
    'raw',
    keyData,
    {
      name: ALGORITHM,
      length: KEY_LENGTH,
    },
    true,
    ['encrypt', 'decrypt']
  );
};

/**
 * Encrypt data using AES-GCM
 * Returns base64 encoded encrypted data with IV prepended
 */
export const encryptData = async (
  data: any,
  key: CryptoKey
): Promise<string> => {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encodedData = new TextEncoder().encode(JSON.stringify(data));

  // Create a new ArrayBuffer with only the necessary bytes
  const dataBuffer = new Uint8Array(encodedData).buffer;

  const encryptedData = await crypto.subtle.encrypt(
    {
      name: ALGORITHM,
      iv: iv,
    },
    key,
    dataBuffer as ArrayBuffer
  );

  // Prepend IV to encrypted data
  const combined = new Uint8Array(iv.length + encryptedData.byteLength);
  combined.set(iv, 0);
  combined.set(new Uint8Array(encryptedData), iv.length);

  return btoa(String.fromCharCode(...combined));
};

/**
 * Decrypt data using AES-GCM
 * Expects base64 encoded data with IV prepended
 */
export const decryptData = async (
  encryptedString: string,
  key: CryptoKey
): Promise<any> => {
  const combined = Uint8Array.from(atob(encryptedString), c => c.charCodeAt(0));
  
  // Extract IV and encrypted data
  const iv = combined.slice(0, 12);
  const encryptedData = combined.slice(12);

  const decryptedData = await crypto.subtle.decrypt(
    {
      name: ALGORITHM,
      iv: iv,
    },
    key,
    encryptedData
  );

  const decodedData = new TextDecoder().decode(decryptedData);
  return JSON.parse(decodedData);
};

/**
 * Hash data using SHA-256
 * Useful for creating checksums or identifiers
 */
export const hashData = async (data: string): Promise<string> => {
  const encodedData = new TextEncoder().encode(data);
  const dataBuffer = new Uint8Array(encodedData).buffer;
  const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer as ArrayBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

/**
 * Example usage for KYC data encryption
 */
export const encryptKycData = async (kycData: any): Promise<{
  encryptedData: string;
  encryptionKey: string;
}> => {
  const key = await generateKey();
  const encryptedData = await encryptData(kycData, key);
  const encryptionKey = await exportKey(key);
  
  return {
    encryptedData,
    encryptionKey,
  };
};

/**
 * Decrypt KYC data
 */
export const decryptKycData = async (
  encryptedData: string,
  encryptionKey: string
): Promise<any> => {
  const key = await importKey(encryptionKey);
  return await decryptData(encryptedData, key);
};

// Note: For production implementation, consider:
// 1. Move all encryption to backend
// 2. Use envelope encryption (data key + master key)
// 3. Implement key rotation
// 4. Use HSM or KMS for key storage
// 5. Add audit logging for all encryption/decryption operations
// 6. Implement proper access controls
