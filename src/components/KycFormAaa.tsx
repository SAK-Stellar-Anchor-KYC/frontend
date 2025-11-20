'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FileUploader } from './FileUploader';
import { useKyc } from '@/hooks/useKyc';
import { useWallet } from '@/hooks/useWallet';
import { validateKycAaa } from '@/utils/validators';
import { ALL_COUNTRIES } from '@/utils/countryFields';
import { KycAaaData } from '@/types';

export const KycFormAaa: React.FC = () => {
  const router = useRouter();
  const { publicKey } = useWallet();
  const { createKycRecord } = useKyc();
  
  const [formData, setFormData] = useState<Partial<KycAaaData>>({
    fullName: '',
    dateOfBirth: '',
    country: '',
    email: '',
    documentIdUrl: '',
    selfieUrl: '',
    proofOfAddressUrl: '',
    iban: '',
    additionalDocumentUrl: '',
    proofOfFundsUrl: '',
    amlScreeningResult: undefined,
    amlScreeningDate: '',
  });

  const [errors, setErrors] = useState<any>({});
  const [submitting, setSubmitting] = useState(false);
  const [amlScreening, setAmlScreening] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev: any) => ({ ...prev, [name]: '' }));
  };

  const handleAmlScreening = async () => {
    setAmlScreening(true);
    try {
      // Simulación de screening AML
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setFormData(prev => ({
        ...prev,
        amlScreeningResult: 'OK',
        amlScreeningDate: new Date().toISOString(),
      }));
    } catch (error: any) {
      setErrors((prev: any) => ({ ...prev, amlScreening: error.message || 'Failed to complete AML screening' }));
    } finally {
      setAmlScreening(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validateKycAaa(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);
    try {
      const record = await createKycRecord('aaa', formData as KycAaaData);
      if (record) {
        router.push('/kyc/success?type=aaa');
      }
    } catch (error) {
      setErrors({ submit: 'Failed to submit KYC. Please try again.' });
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
      <div className="bg-dark-card p-4 rounded-lg border border-dark-border mb-6">
        <h3 className="text-lg font-semibold text-dark-text mb-2">LEVEL 3 — FULL / ENHANCED (AAA)</h3>
        <p className="text-sm text-dark-muted">Complete verification: basic data + banking + additional documentation + AML screening</p>
      </div>

      {/* Level 1 Fields */}
      <div>
        <label className="block text-sm font-medium text-dark-text mb-2">
          Full Name <span className="text-crypto-error">*</span>
        </label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="First and last name"
          className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg text-dark-text focus:border-crypto-primary focus:outline-none"
        />
        {errors.fullName && <p className="text-sm text-crypto-error mt-1">{errors.fullName}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-dark-text mb-2">
          Date of Birth <span className="text-crypto-error">*</span>
        </label>
        <input
          type="date"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg text-dark-text focus:border-crypto-primary focus:outline-none"
        />
        {errors.dateOfBirth && <p className="text-sm text-crypto-error mt-1">{errors.dateOfBirth}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-dark-text mb-2">
          Country <span className="text-crypto-error">*</span>
        </label>
        <select
          name="country"
          value={formData.country}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg text-dark-text focus:border-crypto-primary focus:outline-none"
        >
          <option value="">Select Country</option>
          {ALL_COUNTRIES.map(c => (
            <option key={c.code} value={c.code}>{c.name}</option>
          ))}
        </select>
        {errors.country && <p className="text-sm text-crypto-error mt-1">{errors.country}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-dark-text mb-2">
          Email <span className="text-crypto-error">*</span>
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="your@email.com"
          className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg text-dark-text focus:border-crypto-primary focus:outline-none"
        />
        {errors.email && <p className="text-sm text-crypto-error mt-1">{errors.email}</p>}
      </div>

      <FileUploader
        label="Identity Document (ID) *"
        accept="image/*,application/pdf"
        fileType="image"
        onUpload={(file) => setFormData(prev => ({ ...prev, documentIdUrl: file.url }))}
        required
        currentFile={formData.documentIdUrl}
      />
      {errors.documentIdUrl && <p className="text-sm text-crypto-error mt-1">{errors.documentIdUrl}</p>}

      {/* Level 2 Fields */}
      <div className="border-t border-dark-border pt-6 mt-6">
        <h4 className="text-md font-semibold text-dark-text mb-4">SEPA Fields (Level 2)</h4>
      </div>

      <FileUploader
        label="Selfie *"
        accept="image/*"
        fileType="image"
        onUpload={(file) => setFormData(prev => ({ ...prev, selfieUrl: file.url }))}
        required
        currentFile={formData.selfieUrl}
      />
      {errors.selfieUrl && <p className="text-sm text-crypto-error mt-1">{errors.selfieUrl}</p>}

      <FileUploader
        label="Proof of Address *"
        accept="image/*,application/pdf"
        fileType="image"
        onUpload={(file) => setFormData(prev => ({ ...prev, proofOfAddressUrl: file.url }))}
        required
        currentFile={formData.proofOfAddressUrl}
      />
      {errors.proofOfAddressUrl && <p className="text-sm text-crypto-error mt-1">{errors.proofOfAddressUrl}</p>}

      <div>
        <label className="block text-sm font-medium text-dark-text mb-2">
          IBAN or Bank Account Number <span className="text-crypto-error">*</span>
        </label>
        <input
          type="text"
          name="iban"
          value={formData.iban}
          onChange={handleChange}
          placeholder="ES91 2100 0418 4502 0005 1332"
          className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg text-dark-text focus:border-crypto-primary focus:outline-none"
        />
        {errors.iban && <p className="text-sm text-crypto-error mt-1">{errors.iban}</p>}
      </div>

      {/* Additional Level 3 Fields */}
      <div className="border-t border-dark-border pt-6 mt-6">
        <h4 className="text-md font-semibold text-dark-text mb-4">Additional AAA Fields (Level 3)</h4>
      </div>

      <FileUploader
        label="Additional Document Validation *"
        accept="image/*,application/pdf"
        fileType="image"
        onUpload={(file) => setFormData(prev => ({ ...prev, additionalDocumentUrl: file.url }))}
        required
        currentFile={formData.additionalDocumentUrl}
      />
      {errors.additionalDocumentUrl && <p className="text-sm text-crypto-error mt-1">{errors.additionalDocumentUrl}</p>}

      <FileUploader
        label="Proof of Income / Funds *"
        accept="image/*,application/pdf"
        fileType="image"
        onUpload={(file) => setFormData(prev => ({ ...prev, proofOfFundsUrl: file.url }))}
        required
        currentFile={formData.proofOfFundsUrl}
      />
      {errors.proofOfFundsUrl && <p className="text-sm text-crypto-error mt-1">{errors.proofOfFundsUrl}</p>}

      <div>
        <label className="block text-sm font-medium text-dark-text mb-2">
          AML Screening <span className="text-crypto-error">*</span>
        </label>
        {formData.amlScreeningResult === 'OK' ? (
          <div className="p-4 bg-crypto-success bg-opacity-10 border border-crypto-success rounded-lg">
            <p className="text-sm text-crypto-success">✓ AML Screening completed: Result OK</p>
            <p className="text-xs text-dark-muted mt-1">
              {formData.amlScreeningDate && new Date(formData.amlScreeningDate).toLocaleString()}
            </p>
          </div>
        ) : (
          <button
            type="button"
            onClick={handleAmlScreening}
            disabled={amlScreening}
            className="w-full px-4 py-3 bg-dark-card border border-dark-border text-dark-text rounded-lg hover:bg-dark-cardHover transition-colors disabled:opacity-50"
          >
            {amlScreening ? 'Processing screening...' : 'Start AML Screening'}
          </button>
        )}
        {errors.amlScreeningResult && <p className="text-sm text-crypto-error mt-1">{errors.amlScreeningResult}</p>}
      </div>

      {errors.submit && (
        <div className="px-4 py-3 bg-crypto-error bg-opacity-10 border border-crypto-error rounded-lg">
          <p className="text-sm text-crypto-error">{errors.submit}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full px-6 py-4 bg-gradient-crypto text-white rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {submitting ? 'Submitting...' : 'Submit Advanced KYC'}
      </button>
    </form>
  );
};
