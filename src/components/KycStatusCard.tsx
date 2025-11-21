'use client';

import React from 'react';
import { KycStatusCardProps } from '@/types';

const getStatusColor = (status?: string) => {
  switch (status) {
    case 'validated':
      return 'text-crypto-success border-crypto-success';
    case 'pending':
      return 'text-crypto-warning border-crypto-warning';
    case 'rejected':
      return 'text-crypto-error border-crypto-error';
    default:
      return 'text-dark-textMuted border-dark-border';
  }
};

const getStatusBgColor = (status?: string) => {
  switch (status) {
    case 'validated':
      return 'bg-crypto-success bg-opacity-10';
    case 'pending':
      return 'bg-crypto-warning bg-opacity-10';
    case 'rejected':
      return 'bg-crypto-error bg-opacity-10';
    default:
      return 'bg-dark-bg';
  }
};

const getKycTitle = (kycType: string) => {
  switch (kycType) {
    case 'base':
      return 'Base KYC';
    case 'sepa':
      return 'SEPA KYC';
    case 'aaa':
      return 'AAA KYC';
    default:
      return 'KYC';
  }
};

const getKycDescription = (kycType: string) => {
  switch (kycType) {
    case 'base':
      return 'Basic verification: full name, date of birth, country, email and ID document.';
    case 'sepa':
      return 'Intermediate/banking verification: includes all of the above + selfie, proof of address and IBAN.';
    case 'aaa':
      return 'Complete/advanced verification: includes all of the above + additional documentation, proof of income and AML screening.';
    default:
      return '';
  }
};

export const KycStatusCard: React.FC<KycStatusCardProps> = ({
  kycType,
  status,
  validatedAt,
  onStart,
}) => {
  const isValidated = status === 'validated';
  const isPending = status === 'pending';

  return (
    <div className={`bg-dark-card border ${getStatusColor(status)} rounded-lg p-6 hover:bg-dark-cardHover transition-colors`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-dark-text">
          {getKycTitle(kycType)}
        </h3>
        {status && (
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBgColor(status)} ${getStatusColor(status)}`}>
            {status.toUpperCase()}
          </span>
        )}
      </div>

      {/* Description */}
      <p className="text-sm text-dark-textMuted mb-4">
        {getKycDescription(kycType)}
      </p>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-medium text-dark-textMuted">Progress</span>
          <span className="text-xs text-dark-textMuted">
            {status === 'validated' ? '100%' : status === 'pending' ? '50%' : '0%'}
          </span>
        </div>
        <div className="w-full bg-dark-bg rounded-full h-2">
          <div 
            className="bg-gradient-crypto h-2 rounded-full transition-all duration-500"
            style={{ 
              width: status === 'validated' ? '100%' : status === 'pending' ? '50%' : '0%' 
            }}
          ></div>
        </div>
      </div>

      {/* Status Info */}
      {isValidated && validatedAt && (
        <div className="mb-4 p-3 bg-crypto-success bg-opacity-10 rounded border border-crypto-success">
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5 text-crypto-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm text-crypto-success">
              Validated on {new Date(validatedAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      )}

      {isPending && (
        <div className="mb-4 p-3 bg-crypto-warning bg-opacity-10 rounded border border-crypto-warning">
          <div className="flex items-center space-x-2">
            <svg className="animate-spin h-5 w-5 text-crypto-warning" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="text-sm text-crypto-warning">
              Verification pending
            </span>
          </div>
        </div>
      )}

      {/* Action Button */}
      {!isValidated && (
        <button
          onClick={onStart}
          className="w-full px-4 py-3 bg-gradient-crypto text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
        >
          {isPending ? 'View Submission' : 'Start Verification'}
        </button>
      )}

      {isValidated && (
        <button
          onClick={onStart}
          className="w-full px-4 py-3 bg-dark-bg text-dark-text border border-dark-border rounded-lg font-semibold hover:bg-dark-cardHover transition-colors"
        >
          View Details
        </button>
      )}
    </div>
  );
};
