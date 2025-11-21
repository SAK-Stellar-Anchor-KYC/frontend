'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export const Footer: React.FC = () => {
  return (
    <footer className="py-12 bg-dark-card border-t border-dark-border mt-auto">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Image
                  src="/anchor-icon.png"
                  alt="SAK Anchor"
                  width={32}
                  height={32}
                  className="object-contain"
                />
                <span className="text-xl font-bold text-dark-text">SAK</span>
              </div>
              <p className="text-sm text-dark-muted">
              “Security You Can Anchor To.”
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-crypto-primary mb-3">Product</h4>
              <ul className="space-y-2 text-sm text-dark-muted">
                <li><Link href="/connect-wallet" className="hover:text-crypto-primary transition-colors">Get Started</Link></li>
                <li><Link href="/dashboard" className="hover:text-crypto-primary transition-colors">Dashboard</Link></li>
                <li><a href="#features" className="hover:text-crypto-primary transition-colors">Features</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-crypto-primary mb-3">KYC Levels</h4>
              <ul className="space-y-2 text-sm text-dark-muted">
                <li><Link href="/kyc/base" className="hover:text-crypto-primary transition-colors">Base KYC</Link></li>
                <li><Link href="/kyc/sepa" className="hover:text-crypto-primary transition-colors">Intermediate KYC</Link></li>
                <li><Link href="/kyc/aaa" className="hover:text-crypto-primary transition-colors">Advanced KYC</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-crypto-primary mb-3">Resources</h4>
              <ul className="space-y-2 text-sm text-dark-muted">
                <li>
                  <Link href="/api-docs" className="hover:text-crypto-primary transition-colors">
                    API Docs
                  </Link>
                </li>
                <li>
                  <a 
                    href="https://github.com/SAK-Stellar-Anchor-KYC" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-crypto-primary transition-colors"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a 
                    href="https://x.com/Sak_infra" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-crypto-primary transition-colors"
                  >
                    Twitter / X
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-dark-border pt-8 text-center text-sm text-dark-muted">
            <p>&copy; 2025 SAK Platform. All rights reserved. Powered by Stellar blockchain.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

