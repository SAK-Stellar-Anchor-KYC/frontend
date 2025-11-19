import { FormErrors, KycBaseData, KycSepaData, KycAaaData } from '@/types';
import { isSEPACountry } from './countryFields';

// Email validation
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Date validation (must be 18+ years old)
export const isValidAge = (dateOfBirth: string): boolean => {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  const age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    return age - 1 >= 18;
  }
  
  return age >= 18;
};

// IBAN validation (basic)
export const isValidIBAN = (iban: string): boolean => {
  // Remove spaces and convert to uppercase
  const cleanIban = iban.replace(/\s/g, '').toUpperCase();
  // Basic IBAN format: 2 letters + 2 digits + up to 30 alphanumeric
  const ibanRegex = /^[A-Z]{2}[0-9]{2}[A-Z0-9]{1,30}$/;
  return ibanRegex.test(cleanIban) && cleanIban.length >= 15 && cleanIban.length <= 34;
};

// Full name validation
export const isValidFullName = (name: string): boolean => {
  return name.trim().length >= 3 && name.includes(' ');
};

// Stellar public key validation
export const isValidStellarPublicKey = (publicKey: string): boolean => {
  return publicKey.startsWith('G') && publicKey.length === 56;
};

// KYC Base validation - NIVEL 1
export const validateKycBase = (data: Partial<KycBaseData>): FormErrors => {
  const errors: FormErrors = {};

  if (!data.fullName?.trim()) {
    errors.fullName = 'Full name is required';
  } else if (!isValidFullName(data.fullName)) {
    errors.fullName = 'Please enter your full name (first and last name)';
  }

  if (!data.dateOfBirth) {
    errors.dateOfBirth = 'Date of birth is required';
  } else if (!isValidAge(data.dateOfBirth)) {
    errors.dateOfBirth = 'You must be at least 18 years old';
  }

  if (!data.country) {
    errors.country = 'Country is required';
  }

  if (!data.email?.trim()) {
    errors.email = 'Email is required';
  } else if (!isValidEmail(data.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!data.documentIdUrl) {
    errors.documentIdUrl = 'Document ID upload is required';
  }

  return errors;
};

// KYC SEPA validation - NIVEL 2 (Intermedio)
export const validateKycSepa = (data: Partial<KycSepaData>): FormErrors => {
  const errors: FormErrors = {};

  // Validate base fields first
  const baseErrors = validateKycBase(data);
  Object.assign(errors, baseErrors);

  if (!data.selfieUrl) {
    errors.selfieUrl = 'Selfie is required';
  }

  if (!data.proofOfAddressUrl) {
    errors.proofOfAddressUrl = 'Proof of address is required';
  }

  if (!data.iban?.trim()) {
    errors.iban = 'IBAN or bank account number is required';
  } else if (!isValidIBAN(data.iban)) {
    errors.iban = 'Please enter a valid IBAN format';
  }

  return errors;
};

// KYC AAA validation - NIVEL 3 (Full/Enhanced)
export const validateKycAaa = (data: Partial<KycAaaData>): FormErrors => {
  const errors: FormErrors = {};

  // Validate SEPA fields first (which includes base fields)
  const sepaErrors = validateKycSepa(data);
  Object.assign(errors, sepaErrors);

  if (!data.additionalDocumentUrl) {
    errors.additionalDocumentUrl = 'Additional document validation is required';
  }

  if (!data.proofOfFundsUrl) {
    errors.proofOfFundsUrl = 'Proof of income/funds is required';
  }

  if (!data.amlScreeningResult) {
    errors.amlScreeningResult = 'AML screening must be completed';
  }

  return errors;
};

// File validation
export const validateFile = (
  file: File,
  allowedTypes: string[],
  maxSizeMB: number = 10
): string | null => {
  if (!file) {
    return 'No file selected';
  }

  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  if (file.size > maxSizeBytes) {
    return `File size must be less than ${maxSizeMB}MB`;
  }

  const fileExtension = file.name.split('.').pop()?.toLowerCase();
  if (!fileExtension || !allowedTypes.includes(fileExtension)) {
    return `File type must be one of: ${allowedTypes.join(', ')}`;
  }

  return null;
};
