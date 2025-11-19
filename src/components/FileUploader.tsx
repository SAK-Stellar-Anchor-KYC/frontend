'use client';

import React, { useState, useRef } from 'react';
import { FileUploaderProps } from '@/types';
import { validateFile } from '@/utils/validators';

export const FileUploader: React.FC<FileUploaderProps> = ({
  label,
  accept,
  fileType,
  onUpload,
  maxSizeMB = 10,
  required = false,
  currentFile,
}) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(currentFile || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getAllowedExtensions = () => {
    switch (fileType) {
      case 'image':
        return ['jpg', 'jpeg', 'png', 'gif'];
      case 'pdf':
        return ['pdf'];
      case 'video':
        return ['mp4', 'webm', 'mov'];
      default:
        return [];
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);

    // Validate file
    const allowedExtensions = getAllowedExtensions();
    const validationError = validateFile(file, allowedExtensions, maxSizeMB);
    
    if (validationError) {
      setError(validationError);
      return;
    }

    setUploading(true);

    try {
      // Create preview for images
      if (fileType === 'image') {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      }

      // For now, we'll pass the file directly to the parent
      // In a real app, this would upload to Supabase Storage
      // The parent component (form) will handle the actual upload
      
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Call parent's onUpload with a temporary result
      // The actual upload will happen when the form is submitted
      onUpload({
        path: file.name,
        url: URL.createObjectURL(file),
      });

    } catch (err: any) {
      setError(err.message || 'Failed to process file');
    } finally {
      setUploading(false);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-dark-text">
        {label}
        {required && <span className="text-crypto-error ml-1">*</span>}
      </label>

      <div
        onClick={handleClick}
        className="relative border-2 border-dashed border-dark-border rounded-lg p-6 hover:border-crypto-primary transition-colors cursor-pointer bg-dark-bg"
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileSelect}
          className="hidden"
        />

        {preview && fileType === 'image' ? (
          <div className="space-y-2">
            <img
              src={preview}
              alt="Preview"
              className="max-h-48 mx-auto rounded"
            />
            <p className="text-xs text-center text-dark-textMuted">
              Click to change
            </p>
          </div>
        ) : currentFile ? (
          <div className="text-center space-y-2">
            <svg className="w-12 h-12 mx-auto text-crypto-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm text-dark-text">File uploaded</p>
            <p className="text-xs text-dark-textMuted">Click to change</p>
          </div>
        ) : (
          <div className="text-center space-y-2">
            {uploading ? (
              <>
                <svg className="animate-spin h-8 w-8 mx-auto text-crypto-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="text-sm text-dark-textMuted">Uploading...</p>
              </>
            ) : (
              <>
                <svg className="w-12 h-12 mx-auto text-dark-textMuted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <div>
                  <p className="text-sm text-dark-text">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-dark-textMuted mt-1">
                    {getAllowedExtensions().map(ext => ext.toUpperCase()).join(', ')} (Max {maxSizeMB}MB)
                  </p>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {error && (
        <p className="text-sm text-crypto-error">{error}</p>
      )}
    </div>
  );
};
