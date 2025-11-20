'use client';

import React from 'react';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-bg via-dark-card to-dark-bg">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-crypto opacity-10"></div>
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              SAK Platform
            </h1>
            <p className="text-2xl md:text-3xl text-dark-text mb-4 font-semibold">
              Stellar Authentication & KYC
            </p>
            <p className="text-xl text-dark-muted mb-8 max-w-2xl mx-auto">
              The next generation of decentralized identity verification built on the Stellar blockchain
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/connect-wallet"
                className="px-8 py-4 bg-gradient-crypto text-white rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity"
              >
                Get Started
              </Link>
              <a
                href="#features"
                className="px-8 py-4 bg-dark-card border border-dark-border text-dark-text rounded-lg font-semibold text-lg hover:bg-dark-cardHover transition-colors"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-dark-card">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4 text-dark-text">
              Why Choose SAK?
            </h2>
            <p className="text-center text-dark-muted mb-12 max-w-2xl mx-auto">
              Experience the future of identity verification with blockchain technology, 
              enhanced security, and complete privacy control.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-dark-bg border border-dark-border rounded-lg p-6 hover:border-crypto-primary transition-colors">
                <div className="w-12 h-12 bg-gradient-crypto rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-dark-text mb-3">Blockchain Security</h3>
                <p className="text-dark-muted">
                  Your identity is secured by the Stellar blockchain, providing immutable records 
                  and cryptographic verification that can&apos;t be tampered with.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-dark-bg border border-dark-border rounded-lg p-6 hover:border-crypto-primary transition-colors">
                <div className="w-12 h-12 bg-gradient-crypto rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-dark-text mb-3">Privacy First</h3>
                <p className="text-dark-muted">
                  You control your data. Choose what to share and with whom. 
                  Your personal information is encrypted and stored securely off-chain.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-dark-bg border border-dark-border rounded-lg p-6 hover:border-crypto-primary transition-colors">
                <div className="w-12 h-12 bg-gradient-crypto rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-dark-text mb-3">Lightning Fast</h3>
                <p className="text-dark-muted">
                  Instant wallet authentication with Freighter. No passwords, no email verification. 
                  Connect and start your KYC process in seconds.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* KYC Levels Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4 text-dark-text">
              Three Verification Levels
            </h2>
            <p className="text-center text-dark-muted mb-12 max-w-2xl mx-auto">
              Choose the verification level that suits your needs. Each level builds upon 
              the previous, offering increasing trust and access to services.
            </p>

            <div className="space-y-6">
              {/* Level 1 */}
              <div className="bg-dark-card border border-dark-border rounded-lg p-8 hover:border-crypto-primary transition-colors">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-crypto-primary to-crypto-secondary rounded-lg flex items-center justify-center">
                      <span className="text-2xl font-bold text-white">1</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold text-dark-text mb-2">Base KYC</h3>
                    <p className="text-dark-muted mb-4">
                      Basic identity verification for quick access to essential services.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-dark-bg border border-dark-border rounded-full text-sm text-dark-text">
                        Full Name
                      </span>
                      <span className="px-3 py-1 bg-dark-bg border border-dark-border rounded-full text-sm text-dark-text">
                        Date of Birth
                      </span>
                      <span className="px-3 py-1 bg-dark-bg border border-dark-border rounded-full text-sm text-dark-text">
                        Country
                      </span>
                      <span className="px-3 py-1 bg-dark-bg border border-dark-border rounded-full text-sm text-dark-text">
                        Email
                      </span>
                      <span className="px-3 py-1 bg-dark-bg border border-dark-border rounded-full text-sm text-dark-text">
                        ID Document
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Level 2 */}
              <div className="bg-dark-card border border-dark-border rounded-lg p-8 hover:border-crypto-primary transition-colors">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-crypto-primary to-crypto-secondary rounded-lg flex items-center justify-center">
                      <span className="text-2xl font-bold text-white">2</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold text-dark-text mb-2">Intermediate KYC (SEPA)</h3>
                    <p className="text-dark-muted mb-4">
                      Enhanced verification for banking and financial services integration.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-crypto-primary bg-opacity-20 border border-crypto-primary rounded-full text-sm text-crypto-primary">
                        All Level 1 Fields
                      </span>
                      <span className="px-3 py-1 bg-dark-bg border border-dark-border rounded-full text-sm text-dark-text">
                        Selfie
                      </span>
                      <span className="px-3 py-1 bg-dark-bg border border-dark-border rounded-full text-sm text-dark-text">
                        Proof of Address
                      </span>
                      <span className="px-3 py-1 bg-dark-bg border border-dark-border rounded-full text-sm text-dark-text">
                        IBAN / Bank Account
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Level 3 */}
              <div className="bg-dark-card border border-dark-border rounded-lg p-8 hover:border-crypto-primary transition-colors">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-crypto-primary to-crypto-secondary rounded-lg flex items-center justify-center">
                      <span className="text-2xl font-bold text-white">3</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold text-dark-text mb-2">Advanced KYC (AAA)</h3>
                    <p className="text-dark-muted mb-4">
                      Maximum trust level for institutional access and high-value transactions.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-crypto-primary bg-opacity-20 border border-crypto-primary rounded-full text-sm text-crypto-primary">
                        All Level 2 Fields
                      </span>
                      <span className="px-3 py-1 bg-dark-bg border border-dark-border rounded-full text-sm text-dark-text">
                        Additional Documents
                      </span>
                      <span className="px-3 py-1 bg-dark-bg border border-dark-border rounded-full text-sm text-dark-text">
                        Proof of Income
                      </span>
                      <span className="px-3 py-1 bg-dark-bg border border-dark-border rounded-full text-sm text-dark-text">
                        AML Screening
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-dark-card">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4 text-dark-text">
              How It Works
            </h2>
            <p className="text-center text-dark-muted mb-12 max-w-2xl mx-auto">
              Get verified in four simple steps and unlock access to trusted blockchain services.
            </p>

            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-crypto rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <h3 className="text-lg font-semibold text-dark-text mb-2">Connect Wallet</h3>
                <p className="text-sm text-dark-muted">
                  Use your Freighter wallet to authenticate securely on the Stellar network.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-crypto rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <h3 className="text-lg font-semibold text-dark-text mb-2">Choose Level</h3>
                <p className="text-sm text-dark-muted">
                  Select the KYC level that matches your verification needs.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-crypto rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <h3 className="text-lg font-semibold text-dark-text mb-2">Submit Documents</h3>
                <p className="text-sm text-dark-muted">
                  Upload your documents securely. All data is encrypted and stored safely.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-crypto rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">4</span>
                </div>
                <h3 className="text-lg font-semibold text-dark-text mb-2">Get Verified</h3>
                <p className="text-sm text-dark-muted mb-3">
                  Receive your verification status and access blockchain services instantly.
                </p>
                <a
                  href="https://anchors.stellar.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm text-crypto-primary hover:text-crypto-primaryHover transition-colors"
                >
                  View Stellar Anchors
                  <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Security Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6 text-dark-text">
              Built on Trust & Security
            </h2>
            <p className="text-lg text-dark-muted mb-8">
              SAK leverages the power of the Stellar blockchain to provide a transparent, 
              secure, and decentralized identity verification system. Your data remains yours, 
              protected by military-grade encryption and blockchain immutability.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="text-center">
                <div className="text-4xl font-bold text-crypto-primary mb-2">256-bit</div>
                <p className="text-dark-muted">Encryption Standard</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-crypto-primary mb-2">100%</div>
                <p className="text-dark-muted">Data Ownership</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-crypto-primary mb-2">24/7</div>
                <p className="text-dark-muted">Blockchain Security</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-crypto">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6 text-white">
              Ready to Get Verified?
            </h2>
            <p className="text-xl text-white text-opacity-90 mb-8">
              Join thousands of users who trust SAK for their identity verification needs. 
              Start your verification journey today.
            </p>
            <Link
              href="/connect-wallet"
              className="inline-block px-10 py-4 bg-white text-crypto-primary rounded-lg font-semibold text-lg hover:bg-opacity-90 transition-opacity"
            >
              Connect Your Wallet
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-dark-card border-t border-dark-border">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div>
                <h3 className="text-lg font-semibold text-dark-text mb-4">SAK Platform</h3>
                <p className="text-sm text-dark-muted">
                  Decentralized identity verification powered by Stellar blockchain.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-dark-text mb-3">Product</h4>
                <ul className="space-y-2 text-sm text-dark-muted">
                  <li><Link href="/connect-wallet" className="hover:text-crypto-primary transition-colors">Get Started</Link></li>
                  <li><Link href="/dashboard" className="hover:text-crypto-primary transition-colors">Dashboard</Link></li>
                  <li><a href="#features" className="hover:text-crypto-primary transition-colors">Features</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-dark-text mb-3">KYC Levels</h4>
                <ul className="space-y-2 text-sm text-dark-muted">
                  <li><Link href="/kyc/base" className="hover:text-crypto-primary transition-colors">Base KYC</Link></li>
                  <li><Link href="/kyc/sepa" className="hover:text-crypto-primary transition-colors">Intermediate KYC</Link></li>
                  <li><Link href="/kyc/aaa" className="hover:text-crypto-primary transition-colors">Advanced KYC</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-dark-text mb-3">Technology</h4>
                <ul className="space-y-2 text-sm text-dark-muted">
                  <li><a href="https://stellar.org" target="_blank" rel="noopener noreferrer" className="hover:text-crypto-primary transition-colors">Stellar Network</a></li>
                  <li><a href="https://www.freighter.app/" target="_blank" rel="noopener noreferrer" className="hover:text-crypto-primary transition-colors">Freighter Wallet</a></li>
                  <li><a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="hover:text-crypto-primary transition-colors">Supabase</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-dark-border pt-8 text-center text-sm text-dark-muted">
              <p>&copy; 2025 SAK Platform. All rights reserved. Powered by Stellar blockchain.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
