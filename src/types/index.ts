// User Types
export interface User {
  id: string;
  stellar_public_key: string;
  created_at: string;
}

// KYC Types
export type KycType = 'base' | 'sepa' | 'aaa';
export type KycStatus = 'pending' | 'validated' | 'rejected';

export interface KycRecord {
  id: string;
  user_id: string;
  kyc_type: KycType;
  status: KycStatus;
  data: KycData;
  validated_at?: string;
  created_at: string;
}

// KYC Data Structures
// NIVEL 1 - BASE: Nombre completo, fecha nacimiento, país, email, documento ID
export interface KycBaseData {
  fullName: string;
  dateOfBirth: string;
  country: string;
  email: string;
  documentIdUrl: string; // Upload del documento ID
}

// NIVEL 2 - SEPA (Intermedio/Bancario): Todo lo anterior + selfie + prueba domicilio + IBAN
export interface KycSepaData extends KycBaseData {
  selfieUrl: string;
  proofOfAddressUrl: string;
  iban: string; // IBAN o número de cuenta bancaria
}

// NIVEL 3 - FULL/ENHANCED (AAA): Todo lo anterior + validación adicional + prueba ingresos + AML screening
export interface KycAaaData extends KycSepaData {
  additionalDocumentUrl: string; // Validación documental adicional
  proofOfFundsUrl: string; // Prueba de ingresos/fondos
  amlScreeningResult: 'OK' | 'PENDING' | 'FAILED'; // Screening AML simulado
  amlScreeningDate?: string;
}

export type KycData = KycBaseData | KycSepaData | KycAaaData;

// File Upload Types
export interface FileRecord {
  id: string;
  kyc_record_id: string;
  filename: string;
  storage_path: string;
  file_type: 'image' | 'pdf' | 'video';
  uploaded_at: string;
}

export interface FileUploadResult {
  path: string;
  url: string;
}

// Wallet Types
export interface WalletState {
  publicKey: string | null;
  isConnected: boolean;
  isConnecting: boolean;
  error: string | null;
}

// Form Validation
export interface ValidationError {
  field: string;
  message: string;
}

export interface FormErrors {
  [key: string]: string;
}

// Country Data
export interface Country {
  code: string;
  name: string;
  isSEPA: boolean;
}

// Component Props
export interface KycStatusCardProps {
  kycType: KycType;
  status?: KycStatus;
  validatedAt?: string;
  onStart: () => void;
}

export interface FileUploaderProps {
  label: string;
  accept: string;
  fileType: 'image' | 'pdf' | 'video';
  onUpload: (result: FileUploadResult) => void;
  maxSizeMB?: number;
  required?: boolean;
  currentFile?: string;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: any;
}
