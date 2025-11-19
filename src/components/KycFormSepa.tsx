'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FileUploader } from './FileUploader';
import { useKyc } from '@/hooks/useKyc';
import { validateKycSepa } from '@/utils/validators';
import { ALL_COUNTRIES } from '@/utils/countryFields';
import { KycSepaData } from '@/types';

export const KycFormSepa: React.FC = () => {
  const router = useRouter();
  const { createKycRecord } = useKyc();
  
  const [formData, setFormData] = useState<Partial<KycSepaData>>({
    fullName: '',
    dateOfBirth: '',
    country: '',
    email: '',
    documentIdUrl: '',
    selfieUrl: '',
    proofOfAddressUrl: '',
    iban: '',
  });

  const [errors, setErrors] = useState<any>({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev: any) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validateKycSepa(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);
    try {
      const record = await createKycRecord('sepa', formData as KycSepaData);
      if (record) {
        alert('Intermediate KYC completed successfully');
        router.push('/dashboard');
      }
    } catch (error) {
      alert('Failed to submit KYC');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
      <div className="bg-dark-card p-4 rounded-lg border border-dark-border mb-6">
        <h3 className="text-lg font-semibold text-dark-text mb-2">LEVEL 2 — SEPA (Intermediate/Banking)</h3>
        <p className="text-sm text-dark-muted">Includes basic verification + selfie + address proof + bank account</p>
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

      {/* Additional Level 2 Fields */}
      <div className="border-t border-dark-border pt-6 mt-6">
        <h4 className="text-md font-semibold text-dark-text mb-4">Additional SEPA Fields</h4>
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

      <button
        type="submit"
        disabled={submitting}
        className="w-full px-6 py-4 bg-gradient-crypto text-white rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {submitting ? 'Submitting...' : 'Submit Intermediate KYC'}
      </button>
    </form>
  );
};
