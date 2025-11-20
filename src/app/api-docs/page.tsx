'use client';

import React from 'react';
import { ApiEndpoint } from '@/components/ApiEndpoint';
import { Layout } from '@/components/Layout';

export default function ApiDocsPage() {
  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-dark-text mb-4">
          KYC API Documentation
        </h1>
        <p className="text-dark-textMuted text-lg">
          Technical documentation for anchors to integrate with the SAK KYC system.
          All endpoints require authentication unless specified otherwise.
        </p>
      </div>

      {/* Base URL */}
      <div className="bg-dark-surface border border-dark-border rounded-lg p-4 mb-8">
        <h3 className="text-sm font-semibold text-dark-textMuted mb-2">
          BASE URL
        </h3>
        <code className="text-crypto-primary font-mono text-lg">
          https://api.sak.stellar.com/api/v1
        </code>
      </div>

      {/* KYC Tiers Overview */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-dark-text mb-4">
          KYC Verification Tiers
        </h2>
        <p className="text-dark-textMuted mb-6">
          SAK implements a three-tier KYC system, each with increasing levels of verification and compliance requirements.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Base Tier */}
          <div className="bg-dark-surface border border-dark-border rounded-lg p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold mr-3">
                1
              </div>
              <h3 className="text-xl font-bold text-dark-text">Base Tier</h3>
            </div>
            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-semibold text-crypto-primary mb-2">
                  Required Information
                </h4>
                <ul className="text-sm text-dark-textMuted space-y-1">
                  <li>• Full Name</li>
                  <li>• Date of Birth</li>
                  <li>• Country of Residence</li>
                  <li>• Government-issued ID (Passport, National ID, Driver&apos;s License)</li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-crypto-primary mb-2">
                  Verification Process
                </h4>
                <p className="text-sm text-dark-textMuted">
                  Manual review of submitted documents. Typical approval time: 24-48 hours.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-crypto-primary mb-2">
                  Use Cases
                </h4>
                <p className="text-sm text-dark-textMuted">
                  Basic identity verification for standard Stellar transactions and low-value transfers.
                </p>
              </div>
              <div className="pt-3 border-t border-dark-border">
                <p className="text-xs text-dark-textMuted">
                  <span className="font-semibold">Transaction Limit:</span> Up to $1,000 per transaction
                </p>
              </div>
            </div>
          </div>

          {/* SEPA Tier */}
          <div className="bg-dark-surface border border-crypto-primary rounded-lg p-6 relative">
            <div className="absolute -top-3 right-4 bg-crypto-primary text-white text-xs font-bold px-3 py-1 rounded-full">
              EU Compliant
            </div>
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-crypto-primary rounded-lg flex items-center justify-center text-white font-bold mr-3">
                2
              </div>
              <h3 className="text-xl font-bold text-dark-text">SEPA Tier</h3>
            </div>
            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-semibold text-crypto-primary mb-2">
                  Required Information
                </h4>
                <ul className="text-sm text-dark-textMuted space-y-1">
                  <li>• All Base Tier requirements</li>
                  <li>• Proof of Address (Utility bill, Bank statement)</li>
                  <li>• Tax Identification Number (TIN)</li>
                  <li>• Source of Funds Declaration</li>
                  <li>• Bank Account Verification (IBAN)</li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-crypto-primary mb-2">
                  Verification Process
                </h4>
                <p className="text-sm text-dark-textMuted">
                  Enhanced due diligence with document verification and address validation. Approval time: 3-5 business days.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-crypto-primary mb-2">
                  Use Cases
                </h4>
                <p className="text-sm text-dark-textMuted">
                  SEPA transfers, EUR on/off-ramp, regulated EU financial services compliance.
                </p>
              </div>
              <div className="pt-3 border-t border-dark-border">
                <p className="text-xs text-dark-textMuted">
                  <span className="font-semibold">Transaction Limit:</span> Up to €50,000 per transaction
                </p>
              </div>
            </div>
          </div>

          {/* AAA Tier */}
          <div className="bg-dark-surface border border-dark-border rounded-lg p-6 relative">
            <div className="absolute -top-3 right-4 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full">
              Zero-Knowledge
            </div>
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center text-white font-bold mr-3">
                3
              </div>
              <h3 className="text-xl font-bold text-dark-text">AAA Tier</h3>
            </div>
            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-semibold text-crypto-primary mb-2">
                  Required Information
                </h4>
                <ul className="text-sm text-dark-textMuted space-y-1">
                  <li>• All SEPA Tier requirements</li>
                  <li>• Enhanced Identity Verification</li>
                  <li>• Biometric Data (Optional)</li>
                  <li>• Professional Background Check</li>
                  <li>• Asset Declaration</li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-crypto-primary mb-2">
                  Verification Process
                </h4>
                <p className="text-sm text-dark-textMuted">
                  Zero-Knowledge Proof verification. Privacy-preserving validation without exposing sensitive data. Approval time: 5-7 business days.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-crypto-primary mb-2">
                  Use Cases
                </h4>
                <p className="text-sm text-dark-textMuted">
                  High-value transactions, institutional banking, maximum privacy with full compliance.
                </p>
              </div>
              <div className="pt-3 border-t border-dark-border">
                <p className="text-xs text-dark-textMuted">
                  <span className="font-semibold">Transaction Limit:</span> Unlimited
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Status Values */}
        <div className="mt-8 bg-dark-surface border border-dark-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-dark-text mb-4">
            KYC Status Values
          </h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
              <div>
                <p className="text-sm font-semibold text-dark-text">not_submitted</p>
                <p className="text-xs text-dark-textMuted">No KYC data provided</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
              <div>
                <p className="text-sm font-semibold text-dark-text">pending</p>
                <p className="text-xs text-dark-textMuted">Under review</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <div>
                <p className="text-sm font-semibold text-dark-text">validated</p>
                <p className="text-xs text-dark-textMuted">Approved and active</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div>
                <p className="text-sm font-semibold text-dark-text">rejected</p>
                <p className="text-xs text-dark-textMuted">Declined with reason</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Authentication Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-dark-text mb-4 flex items-center">
          <span className="w-8 h-8 bg-crypto-primary text-white rounded-full flex items-center justify-center text-sm mr-3">
            1
          </span>
          Authentication
        </h2>
        <p className="text-dark-textMuted mb-6">
          Anchors must authenticate to query KYC status. Supports API keys, JWT,
          or anchor wallet signature (SEP-10 extended).
        </p>

        <ApiEndpoint
          method="POST"
          path="/auth/login"
          description="Authenticate anchor using API key or admin wallet signature. Returns an authentication token valid for 24 hours."
          requestBody={`{
  "apiKey": "your-api-key",
  // OR
  "walletAddress": "GANCHOR...",
  "signature": "signed-challenge"
}`}
          response={`{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresAt": "2025-11-21T15:33:21Z",
  "anchor": {
    "id": "anchor-123",
    "name": "Example Anchor"
  }
}`}
          notes="Include the token in all subsequent requests using the Authorization header: Bearer {token}"
        />
      </section>

      {/* KYC Status Endpoints */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-dark-text mb-4 flex items-center">
          <span className="w-8 h-8 bg-crypto-primary text-white rounded-full flex items-center justify-center text-sm mr-3">
            2
          </span>
          KYC Status Endpoints
        </h2>
        <p className="text-dark-textMuted mb-6">
          Query KYC verification status for specific wallets and tiers.
        </p>

        <ApiEndpoint
          method="GET"
          path="/kyc/{walletAddress}"
          description="Get all KYC statuses for a specific wallet address. Returns the status of all three KYC tiers (base, sepa, aaa)."
          response={`{
  "wallet": "GABC123...",
  "kyc": {
    "base": "validated",
    "sepa": "pending",
    "aaa": "not_submitted"
  },
  "lastUpdated": "2025-11-20T15:33:21Z"
}`}
          notes="Status values: not_submitted, pending, validated, rejected"
        />

        <ApiEndpoint
          method="GET"
          path="/kyc/{walletAddress}/{tier}"
          description="Get the status of a specific KYC tier for a wallet. Valid tiers: base, sepa, aaa."
          response={`{
  "tier": "sepa",
  "status": "validated",
  "updatedAt": "2025-11-20T15:33:21Z",
  "validatedBy": "admin-user-id"
}`}
          notes="Replace {tier} with: base | sepa | aaa"
        />
      </section>

      {/* Verification Endpoints */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-dark-text mb-4 flex items-center">
          <span className="w-8 h-8 bg-crypto-primary text-white rounded-full flex items-center justify-center text-sm mr-3">
            3
          </span>
          Verification Endpoints
        </h2>
        <p className="text-dark-textMuted mb-6">
          Allow anchors to verify or reject KYC submissions. Useful for anchors
          that want to perform their own verification process or report inconsistencies.
        </p>

        <ApiEndpoint
          method="POST"
          path="/kyc/{walletAddress}/{tier}/verify"
          description="Mark a KYC tier as verified by the anchor. This endpoint confirms that the anchor has validated the user's documents and information."
          requestBody={`{
  "verifiedBy": "anchor-admin-id",
  "notes": "All documents verified successfully"
}`}
          response={`{
  "success": true,
  "wallet": "GABC123...",
  "tier": "sepa",
  "status": "validated",
  "verifiedAt": "2025-11-20T15:33:21Z"
}`}
        />

        <ApiEndpoint
          method="POST"
          path="/kyc/{walletAddress}/{tier}/reject"
          description="Mark a KYC tier as rejected with a specific reason. The user will be notified and can resubmit with corrected information."
          requestBody={`{
  "reason": "Document is expired",
  "rejectedBy": "anchor-admin-id",
  "details": "Passport expired on 2024-05-15"
}`}
          response={`{
  "success": true,
  "wallet": "GABC123...",
  "tier": "base",
  "status": "rejected",
  "reason": "Document is expired",
  "rejectedAt": "2025-11-20T15:33:21Z"
}`}
        />
      </section>

      {/* Zero-Knowledge Proof Verification */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-dark-text mb-4 flex items-center">
          <span className="w-8 h-8 bg-crypto-primary text-white rounded-full flex items-center justify-center text-sm mr-3">
            4
          </span>
          Zero-Knowledge Proof Verification
        </h2>
        <p className="text-dark-textMuted mb-6">
          Advanced verification using zero-knowledge proofs. Allows anchors to
          verify KYC status without accessing sensitive personal information.
        </p>

        <ApiEndpoint
          method="POST"
          path="/zkp/verify"
          description="Verify a zero-knowledge proof for AAA tier KYC. The anchor can confirm verification status without seeing actual user data."
          requestBody={`{
  "wallet": "GABC123...",
  "tier": "aaa",
  "proof": "<zkp-proof-data>",
  "challenge": "<optional-challenge>"
}`}
          response={`{
  "valid": true,
  "wallet": "GABC123...",
  "tier": "aaa",
  "verifiedAt": "2025-11-20T15:33:21Z",
  "proofHash": "0x123abc..."
}`}
          notes="ZK proofs are currently only supported for AAA tier verification"
        />
      </section>

      {/* Webhooks */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-dark-text mb-4 flex items-center">
          <span className="w-8 h-8 bg-crypto-primary text-white rounded-full flex items-center justify-center text-sm mr-3">
            5
          </span>
          Webhooks
        </h2>
        <p className="text-dark-textMuted mb-6">
          Register webhook URLs to receive real-time notifications when KYC
          statuses change. Highly recommended for production integrations.
        </p>

        <ApiEndpoint
          method="POST"
          path="/anchors/webhooks"
          description="Register an anchor webhook URL to receive notifications about KYC status changes."
          requestBody={`{
  "url": "https://anchor.example.com/webhooks/kyc",
  "events": ["kyc.validated", "kyc.rejected", "kyc.updated"],
  "secret": "webhook-signing-secret"
}`}
          response={`{
  "success": true,
  "webhookId": "webhook-123",
  "url": "https://anchor.example.com/webhooks/kyc",
  "createdAt": "2025-11-20T15:33:21Z"
}`}
          notes="Your webhook endpoint will receive POST requests with KYC updates"
        />

        <div className="mt-6 bg-dark-surface border border-dark-border rounded-lg p-4">
          <h3 className="text-lg font-semibold text-dark-text mb-3">
            Webhook Payload Example
          </h3>
          <p className="text-dark-textMuted mb-3 text-sm">
            When a KYC status changes, we&apos;ll POST to your registered webhook URL:
          </p>
          <pre className="bg-dark-bg p-3 rounded overflow-x-auto text-sm">
            <code className="text-crypto-secondary">{`POST {anchorWebhookUrl}

{
  "event": "kyc.validated",
  "wallet": "GABC123...",
  "tier": "base",
  "newStatus": "validated",
  "previousStatus": "pending",
  "timestamp": "2025-11-20T15:33:21Z",
  "signature": "hmac-sha256-signature"
}`}</code>
          </pre>
        </div>
      </section>

      {/* Metadata */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-dark-text mb-4 flex items-center">
          <span className="w-8 h-8 bg-crypto-primary text-white rounded-full flex items-center justify-center text-sm mr-3">
            6
          </span>
          Metadata Endpoints
        </h2>
        <p className="text-dark-textMuted mb-6">
          Access non-sensitive metadata about KYC submissions. Useful for anchors
          that need additional context without accessing personal information.
        </p>

        <ApiEndpoint
          method="GET"
          path="/kyc/{walletAddress}/metadata"
          description="Get non-sensitive metadata about a user's KYC submission. Returns information like document type, issuance country, and expiry dates without any personal identifiers."
          response={`{
  "wallet": "GABC123...",
  "metadata": {
    "base": {
      "documentType": "national_id",
      "issuanceCountry": "US",
      "expiryDate": "2030-12-31",
      "submittedAt": "2025-11-15T10:20:30Z"
    },
    "sepa": {
      "documentType": "bank_statement",
      "issuanceCountry": "DE",
      "verificationMethod": "manual",
      "submittedAt": "2025-11-18T14:45:12Z"
    },
    "aaa": {
      "verificationMethod": "zk_proof",
      "submittedAt": "2025-11-20T09:12:45Z"
    }
  }
}`}
          notes="No personal information (name, address, SSN, etc.) is included in metadata responses"
        />
      </section>

      {/* Authentication Info */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-dark-text mb-4">
          Authentication & Security
        </h2>
        <div className="space-y-4">
          <div className="bg-dark-surface border border-dark-border rounded-lg p-4">
            <h3 className="text-lg font-semibold text-dark-text mb-2">
              Authorization Header
            </h3>
            <p className="text-dark-textMuted mb-3 text-sm">
              Include your authentication token in all API requests:
            </p>
            <pre className="bg-dark-bg p-3 rounded overflow-x-auto text-sm">
              <code className="text-crypto-secondary">
                Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
              </code>
            </pre>
          </div>

          <div className="bg-dark-surface border border-dark-border rounded-lg p-4">
            <h3 className="text-lg font-semibold text-dark-text mb-2">
              Rate Limits
            </h3>
            <ul className="text-dark-textMuted space-y-2 text-sm">
              <li>• Standard tier: 100 requests per minute</li>
              <li>• Premium tier: 1000 requests per minute</li>
              <li>• Rate limit headers included in all responses</li>
            </ul>
          </div>

          <div className="bg-dark-surface border border-dark-border rounded-lg p-4">
            <h3 className="text-lg font-semibold text-dark-text mb-2">
              Error Responses
            </h3>
            <p className="text-dark-textMuted mb-3 text-sm">
              All errors follow this format:
            </p>
            <pre className="bg-dark-bg p-3 rounded overflow-x-auto text-sm">
              <code className="text-crypto-secondary">{`{
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Invalid or expired token",
    "details": "Token expired at 2025-11-20T14:00:00Z"
  }
}`}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* Status Codes */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-dark-text mb-4">
          HTTP Status Codes
        </h2>
        <div className="bg-dark-surface border border-dark-border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-dark-bg">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-dark-text">
                  Code
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-dark-text">
                  Description
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-border">
              <tr>
                <td className="px-4 py-3 text-sm font-mono text-green-500">200</td>
                <td className="px-4 py-3 text-sm text-dark-textMuted">
                  Successful request
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-mono text-green-500">201</td>
                <td className="px-4 py-3 text-sm text-dark-textMuted">
                  Resource created successfully
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-mono text-yellow-500">400</td>
                <td className="px-4 py-3 text-sm text-dark-textMuted">
                  Bad request - Invalid parameters
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-mono text-yellow-500">401</td>
                <td className="px-4 py-3 text-sm text-dark-textMuted">
                  Unauthorized - Invalid or missing token
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-mono text-yellow-500">403</td>
                <td className="px-4 py-3 text-sm text-dark-textMuted">
                  Forbidden - Insufficient permissions
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-mono text-yellow-500">404</td>
                <td className="px-4 py-3 text-sm text-dark-textMuted">
                  Not found - Resource doesn&apos;t exist
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-mono text-yellow-500">429</td>
                <td className="px-4 py-3 text-sm text-dark-textMuted">
                  Too many requests - Rate limit exceeded
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-mono text-red-500">500</td>
                <td className="px-4 py-3 text-sm text-dark-textMuted">
                  Internal server error
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Support */}
      <section className="bg-gradient-crypto p-6 rounded-lg text-white">
        <h2 className="text-2xl font-bold mb-3">Need Help?</h2>
        <p className="mb-4">
          For integration support, API key requests, or technical questions:
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="mailto:api@sak.stellar.com"
            className="px-6 py-3 bg-white text-crypto-primary rounded-lg font-semibold hover:bg-opacity-90 transition-all text-center"
          >
            Contact API Support
          </a>
          <a
            href="https://github.com/SAK-Stellar-Anchor-KYC/backend"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-white bg-opacity-20 rounded-lg font-semibold hover:bg-opacity-30 transition-all text-center"
          >
            View on GitHub
          </a>
        </div>
      </section>
      </div>
    </Layout>
  );
}
