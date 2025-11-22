'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export const Header: React.FC = () => {
  const [language, setLanguage] = useState<'en' | 'es'>('en');

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'es' : 'en');
  };

  return (
    <header className="bg-dark-card border-b border-dark-border">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/anchor-icon.png"
              alt="SAK Anchor"
              width={32}
              height={32}
              className="object-contain"
              priority
            />
            <span className="text-xl font-bold text-dark-text">SAK</span>
          </Link>

          {/* Language Selector */}
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleLanguage}
              className="px-4 py-2 bg-dark-bg border border-dark-border rounded-lg text-dark-text hover:border-crypto-primary transition-colors text-sm font-medium"
            >
              <span className={language === 'en' ? 'text-crypto-primary' : 'text-dark-muted'}>English</span>
              <span className="mx-2 text-dark-muted">/</span>
              <span className={language === 'es' ? 'text-crypto-primary' : 'text-dark-muted'}>Español</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

