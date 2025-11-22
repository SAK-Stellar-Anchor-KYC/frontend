'use client';

import { useEffect, useState } from 'react';

export default function AnchorAnclapPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [kycLoading, setKycLoading] = useState(true);
  const [currentAmount, setCurrentAmount] = useState(0);
  const [selectedDestination, setSelectedDestination] = useState<'standard' | 'europe' | 'aaa'>('standard');
  const [arsBalance, setArsBalance] = useState(95400.00);
  const [kycLevels, setKycLevels] = useState({
    base: true,
    sepa: false,
    aaa: false
  });
  const [uploadedFiles, setUploadedFiles] = useState({
    selfie: null as File | null,
    video: null as File | null,
    sepaSelfie: null as File | null,
    aaaDocument: null as File | null,
    aaaIncome: null as File | null,
    aaaAML: null as File | null
  });
  const [formData, setFormData] = useState({
    ibanInline: '',
    iban: '',
    bankName: '',
    accountHolder: '',
    address: ''
  });
  const [verificationStates, setVerificationStates] = useState({
    sepaVerifying: false,
    aaaVerifying: false,
    sepaInlineVerifying: false,
    aaaInlineVerifying: false
  });
  const [transactionId, setTransactionId] = useState('');
  const [kycValidationMessage, setKycValidationMessage] = useState('Connecting to SAK...');

  const EXCHANGE_RATE = 1440.00;
  const COMMISSION_RATE = 0.005;

  useEffect(() => {
    // Simulate KYC validation process with progressive messages
    const messages = [
      { text: 'Connecting to SAK...', delay: 0 },
      { text: 'Establishing secure connection...', delay: 1500 },
      { text: 'Checking user registration...', delay: 3000 },
      { text: 'Retrieving KYC data from blockchain...', delay: 4500 },
      { text: 'Validating identity with Zero-Knowledge Proofs...', delay: 6000 },
      { text: 'Running compliance checks...', delay: 7500 },
      { text: 'Verifying on Stellar Blockchain...', delay: 9000 },
      { text: 'Finalizing validation...', delay: 10500 }
    ];

    messages.forEach(({ text, delay }) => {
      setTimeout(() => {
        setKycValidationMessage(text);
      }, delay);
    });

    // Complete validation after 12 seconds
    setTimeout(() => {
      setKycLoading(false);
      console.log('✅ User verified in SAK registry');
      console.log('📝 KYC BASE level confirmed on Stellar Blockchain');
      console.log('🔒 All security checks passed');
    }, 12000);
  }, []);

  const formatNumber = (num: number, decimals: number = 2) => {
    const parts = num.toFixed(decimals).split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join('.');
  };

  const calculateSummary = (amount: number) => {
    const commission = amount * COMMISSION_RATE;
    const amountAfterCommission = amount - commission;
    const usdcAmount = amountAfterCommission / EXCHANGE_RATE;
    return { commission, amountAfterCommission, usdcAmount };
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const amount = parseFloat(e.target.value) || 0;
    setCurrentAmount(amount);
  };

  const handleDestinationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDestination(e.target.value as 'standard' | 'europe' | 'aaa');
  };

  const handleFileUpload = (type: keyof typeof uploadedFiles, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFiles(prev => ({
        ...prev,
        [type]: e.target.files![0]
      }));
    }
  };

  const verifySepaKYCInline = () => {
    const { ibanInline } = formData;
    const selfieFile = uploadedFiles.sepaSelfie;
    
    if (!ibanInline || !selfieFile) return;

    setVerificationStates(prev => ({ ...prev, sepaInlineVerifying: true }));
    
    console.log('📤 Sending SEPA KYC data to SAK API:', {
      kyc_level: 'SEPA',
      iban: ibanInline,
      selfie: selfieFile.name,
      selfie_size: `${(selfieFile.size / 1024).toFixed(2)} KB`,
      user_wallet: 'GDXXX...XXXX',
      timestamp: new Date().toISOString()
    });
    
    console.log('🔐 SAK is validating SEPA KYC using Zero-Knowledge Proofs...');
    console.log('📸 Verifying selfie with ID document...');
    
    setTimeout(() => {
      setKycLevels(prev => ({ ...prev, sepa: true }));
      setVerificationStates(prev => ({ ...prev, sepaInlineVerifying: false }));
      
      console.log('✅ SAK API Response: SEPA KYC Verified successfully');
      console.log('📝 Verification stored on Stellar Blockchain');
    }, 4000);
  };

  const verifyAAAKYCInline = () => {
    const { aaaDocument, aaaIncome, aaaAML } = uploadedFiles;
    
    if (!aaaDocument || !aaaIncome || !aaaAML) return;

    setVerificationStates(prev => ({ ...prev, aaaInlineVerifying: true }));
    
    console.log('📤 Sending AAA KYC data to SAK API:', {
      kyc_level: 'AAA',
      additional_document: aaaDocument.name,
      additional_document_size: `${(aaaDocument.size / 1024).toFixed(2)} KB`,
      proof_of_income: aaaIncome.name,
      proof_of_income_size: `${(aaaIncome.size / 1024).toFixed(2)} KB`,
      aml_screening: aaaAML.name,
      aml_screening_size: `${(aaaAML.size / 1024).toFixed(2)} KB`,
      user_wallet: 'GDXXX...XXXX',
      timestamp: new Date().toISOString()
    });
    
    console.log('🔐 SAK is validating AAA KYC using Zero-Knowledge Proofs...');
    console.log('📄 Validating additional documents...');
    console.log('💰 Verifying proof of income/funds...');
    console.log('🔍 Running AML screening checks...');
    
    setTimeout(() => {
      setKycLevels(prev => ({ ...prev, aaa: true }));
      setVerificationStates(prev => ({ ...prev, aaaInlineVerifying: false }));
      
      console.log('✅ SAK API Response: AAA KYC Verified successfully');
      console.log('📝 Verification stored on Stellar Blockchain');
    }, 4000);
  };

  const submitEuropeKYC = () => {
    const { iban, bankName, accountHolder } = formData;
    
    if (!iban || !bankName || !accountHolder) return;

    setVerificationStates(prev => ({ ...prev, sepaVerifying: true }));

    console.log('📤 Sending SEPA KYC data to SAK API:', {
      kyc_level: 'SEPA',
      iban,
      bank_name: bankName,
      account_holder: accountHolder,
      user_wallet: 'GDXXX...XXXX',
      timestamp: new Date().toISOString()
    });

    setTimeout(() => {
      console.log('🔐 SAK is validating SEPA KYC using Zero-Knowledge Proofs...');
      
      setTimeout(() => {
        setKycLevels(prev => ({ ...prev, sepa: true }));
        setVerificationStates(prev => ({ ...prev, sepaVerifying: false }));
        
        console.log('✅ SAK API Response: SEPA KYC Verified successfully');
        console.log('📝 Verification stored on Stellar Blockchain');
        
        setTimeout(() => {
          setCurrentStep(3);
        }, 1500);
      }, 1500);
    }, 2000);
  };

  const submitAAAKYC = () => {
    const { address } = formData;
    const { selfie, video } = uploadedFiles;
    
    if (!address || !selfie || !video) return;

    setVerificationStates(prev => ({ ...prev, aaaVerifying: true }));

    console.log('📤 Sending AAA KYC data to SAK API:', {
      kyc_level: 'AAA',
      selfie: selfie.name,
      video: video.name,
      address,
      user_wallet: 'GDXXX...XXXX',
      timestamp: new Date().toISOString()
    });

    setTimeout(() => {
      console.log('🔐 SAK is validating AAA KYC using Zero-Knowledge Proofs...');
      
      setTimeout(() => {
        setKycLevels(prev => ({ ...prev, aaa: true }));
        setVerificationStates(prev => ({ ...prev, aaaVerifying: false }));
        
        console.log('✅ SAK API Response: AAA KYC Verified successfully');
        console.log('📝 Verification stored on Stellar Blockchain');
        
        setTimeout(() => {
          setCurrentStep(3);
        }, 1500);
      }, 1500);
    }, 2000);
  };

  const validateDestinationKYC = () => {
    if (selectedDestination === 'europe' && !kycLevels.sepa) {
      alert('Please verify your SEPA KYC level first by providing your IBAN.');
      return;
    } else if (selectedDestination === 'aaa' && !kycLevels.aaa) {
      alert('Please verify your AAA KYC level first by providing the required information.');
      return;
    } else {
      setCurrentStep(3);
    }
  };

  const confirmTransaction = () => {
    const txId = '0x' + Array.from({length: 64}, () => 
      Math.floor(Math.random() * 16).toString(16)
    ).join('');
    
    // Decrement balance based on amount + commission
    const totalArsSpent = currentAmount + commission;
    setArsBalance(prevBalance => prevBalance - totalArsSpent);
    
    setTransactionId(txId);
    setCurrentStep(4);
  };

  const newTransaction = () => {
    setCurrentAmount(0);
    setSelectedDestination('standard');
    setFormData({
      ibanInline: '',
      iban: '',
      bankName: '',
      accountHolder: '',
      address: ''
    });
    setUploadedFiles({
      selfie: null,
      video: null,
      sepaSelfie: null,
      aaaDocument: null,
      aaaIncome: null,
      aaaAML: null
    });
    setCurrentStep(1);
    setKycLoading(true);
    setTimeout(() => setKycLoading(false), 2000);
  };

  const { commission, usdcAmount } = calculateSummary(currentAmount);
  const destinationLabels = {
    'standard': 'Standard Transfer',
    'europe': 'Send to Europe (SEPA)',
    'aaa': 'Send to AAA (High Value Transfer)'
  };

  const canProceedToStep2 = currentAmount > 0;
  const canVerifySepaInline = formData.ibanInline && uploadedFiles.sepaSelfie;
  const canVerifyAAAInline = uploadedFiles.aaaDocument && uploadedFiles.aaaIncome && uploadedFiles.aaaAML;
  const canVerifyEurope = formData.iban && formData.bankName && formData.accountHolder;
  const canVerifyAAA = formData.address && uploadedFiles.selfie && uploadedFiles.video;

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
          background-color: #ffffff;
          color: #333333;
        }

        .header {
          background-color: #3452ff;
          padding: 15px 30px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid #2a42cc;
        }

        .logo {
          display: flex;
          align-items: center;
        }

        .logo img {
          height: 40px;
          width: auto;
        }

        .user-info {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .user-balance {
          background-color: rgba(255, 255, 255, 0.2);
          padding: 8px 16px;
          border-radius: 4px;
          font-size: 14px;
          color: #ffffff;
        }

        .user-avatar {
          width: 40px;
          height: 40px;
          background-color: #ffffff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          color: #3452ff;
        }

        .container {
          max-width: 600px;
          margin: 40px auto;
          padding: 0 20px;
        }

        .wizard-container {
          background-color: #f8f9fa;
          border-radius: 8px;
          padding: 30px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .wizard-header {
          text-align: center;
          margin-bottom: 30px;
        }

        .wizard-title {
          font-size: 24px;
          margin-bottom: 10px;
          color: #333333;
        }

        .wizard-steps {
          display: flex;
          justify-content: space-between;
          margin-bottom: 40px;
          position: relative;
        }

        .wizard-steps::before {
          content: '';
          position: absolute;
          top: 20px;
          left: 0;
          right: 0;
          height: 2px;
          background-color: #e0e0e0;
          z-index: 0;
        }

        .step {
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          z-index: 1;
          flex: 1;
        }

        .step-number {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: #e0e0e0;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 8px;
          font-weight: bold;
          color: #999999;
        }

        .step.active .step-number {
          background-color: #3452ff;
          color: #ffffff;
        }

        .step.completed .step-number {
          background-color: #0ecb81;
          color: #fff;
        }

        .step-label {
          font-size: 12px;
          color: #666666;
          text-align: center;
        }

        .step.active .step-label {
          color: #3452ff;
          font-weight: 500;
        }

        .form-group {
          margin-bottom: 25px;
        }

        .form-label {
          display: block;
          margin-bottom: 8px;
          font-size: 14px;
          color: #666666;
        }

        .form-input, .form-select {
          width: 100%;
          padding: 12px 16px;
          background-color: #ffffff;
          border: 1px solid #ddd;
          border-radius: 4px;
          color: #333333;
          font-size: 16px;
          transition: border-color 0.3s;
        }

        .form-input:focus, .form-select:focus {
          outline: none;
          border-color: #3452ff;
        }

        .input-wrapper {
          position: relative;
        }

        .input-wrapper input[type="number"] {
          padding-right: 40px;
        }

        .currency-label {
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          color: #666666;
          font-size: 14px;
          font-weight: 500;
          pointer-events: none;
        }

        .summary-box {
          background-color: #ffffff;
          border: 1px solid #e0e0e0;
          border-radius: 6px;
          padding: 20px;
          margin-bottom: 25px;
        }

        .summary-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 12px;
          font-size: 14px;
        }

        .summary-row:last-child {
          margin-bottom: 0;
          padding-top: 12px;
          border-top: 1px solid #e0e0e0;
          font-size: 16px;
          font-weight: bold;
        }

        .summary-label {
          color: #666666;
        }

        .summary-value {
          color: #333333;
        }

        .summary-value.highlight {
          color: #0ecb81;
        }

        .btn {
          width: 100%;
          padding: 14px;
          border: none;
          border-radius: 4px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: opacity 0.3s;
        }

        .btn:hover:not(:disabled) {
          opacity: 0.9;
        }

        .btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .btn-primary {
          background-color: #3452ff;
          color: #ffffff;
        }

        .btn-secondary {
          background-color: #e0e0e0;
          color: #333333;
          margin-top: 10px;
        }

        .btn-success {
          background-color: #0ecb81;
          color: #ffffff;
        }

        .kyc-status {
          text-align: center;
          padding: 40px 20px;
        }

        .kyc-icon {
          font-size: 64px;
          margin-bottom: 20px;
        }

        .kyc-message {
          font-size: 18px;
          margin-bottom: 15px;
          color: #333333;
          min-height: 28px;
          font-weight: 500;
        }

        .kyc-powered {
          font-size: 14px;
          color: #666666;
          margin-bottom: 30px;
          line-height: 1.6;
        }

        .kyc-powered strong {
          color: #3452ff;
        }

        .spinner {
          border: 4px solid #e0e0e0;
          border-top: 4px solid #3452ff;
          border-radius: 50%;
          width: 50px;
          height: 50px;
          animation: spin 1s linear infinite;
          margin: 0 auto 20px;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .validation-progress {
          width: 100%;
          max-width: 300px;
          height: 4px;
          background-color: #e0e0e0;
          border-radius: 2px;
          margin: 20px auto;
          overflow: hidden;
        }

        .validation-progress-bar {
          height: 100%;
          background: linear-gradient(90deg, #3452ff, #5b7aff);
          animation: progressLoad 12s ease-out forwards;
          border-radius: 2px;
        }

        @keyframes progressLoad {
          0% { width: 0%; }
          12.5% { width: 12.5%; }
          25% { width: 25%; }
          37.5% { width: 37.5%; }
          50% { width: 50%; }
          62.5% { width: 62.5%; }
          75% { width: 75%; }
          87.5% { width: 87.5%; }
          100% { width: 100%; }
        }

        .success-icon {
          color: #0ecb81;
        }

        .inline-kyc-box {
          background-color: #e8f4fd;
          border: 2px solid #3452ff;
          border-radius: 6px;
          padding: 20px;
          margin-top: 20px;
        }

        .inline-kyc-title {
          font-size: 16px;
          font-weight: 600;
          color: #3452ff;
          margin-bottom: 15px;
        }

        .file-upload-btn {
          background-color: #3452ff;
          color: #ffffff;
          padding: 10px 20px;
          border-radius: 4px;
          cursor: pointer;
          display: inline-block;
          font-size: 14px;
          margin-bottom: 10px;
        }

        .file-upload-btn:hover {
          opacity: 0.9;
        }

        .file-name {
          display: none;
          font-size: 12px;
          color: #0ecb81;
          margin-top: 5px;
        }

        .kyc-status-badge {
          display: inline-block;
          padding: 8px 16px;
          border-radius: 4px;
          font-size: 14px;
          font-weight: 500;
          margin-bottom: 15px;
        }

        .exchange-rate {
          text-align: center;
          font-size: 14px;
          color: #666666;
          margin-bottom: 20px;
        }

        .alert {
          background-color: #e8f4fd;
          border-left: 4px solid #3452ff;
          padding: 15px;
          border-radius: 4px;
          margin-bottom: 20px;
          color: #333333;
        }

        .success-container {
          text-align: center;
          padding: 20px 10px;
        }

        .success-checkmark {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background-color: #0ecb81;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 25px;
          animation: scaleIn 0.5s ease-out;
        }

        .success-checkmark::before {
          content: '✓';
          font-size: 48px;
          color: #fff;
          font-weight: bold;
        }

        @keyframes scaleIn {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        .success-title {
          font-size: 24px;
          color: #0ecb81;
          margin-bottom: 15px;
          font-weight: 600;
        }

        .success-message {
          font-size: 16px;
          color: #666666;
          margin-bottom: 30px;
          line-height: 1.5;
        }

        .transaction-details {
          background-color: #ffffff;
          border: 1px solid #e0e0e0;
          border-radius: 6px;
          padding: 20px;
          margin-bottom: 30px;
          text-align: left;
        }

        .detail-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 12px;
          font-size: 14px;
        }

        .detail-row:last-child {
          margin-bottom: 0;
        }

        .detail-label {
          color: #666666;
        }

        .detail-value {
          color: #333333;
          font-weight: 500;
        }

        .transaction-hash {
          max-width: 200px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .footer-note {
          text-align: center;
          font-size: 12px;
          color: #666666;
          margin-top: 30px;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        .pending-verification {
          animation: pulse 1.5s ease-in-out infinite;
        }
      `}} />

      <div className="header">
        <div className="logo">
          <img src="/logo-anclap.png" alt="Anclap" />
        </div>
        <div className="user-info">
          <div className="user-balance">
            Balance: <strong>${formatNumber(arsBalance)} ARS</strong>
          </div>
          <div className="user-avatar">JD</div>
        </div>
      </div>

      <div className="container">
        <div className="wizard-container">
          <div className="wizard-header">
            <h1 className="wizard-title">Convert ARS to USDC</h1>
          </div>

          <div className="wizard-steps">
            <div className={`step ${currentStep === 1 ? 'active' : ''} ${currentStep > 1 ? 'completed' : ''}`}>
              <div className="step-number">1</div>
              <div className="step-label">KYC Verification</div>
            </div>
            <div className={`step ${currentStep === 2 ? 'active' : ''} ${currentStep > 2 ? 'completed' : ''}`}>
              <div className="step-number">2</div>
              <div className="step-label">Amount</div>
            </div>
            <div className={`step ${currentStep === 3 ? 'active' : ''} ${currentStep > 3 ? 'completed' : ''}`}>
              <div className="step-number">3</div>
              <div className="step-label">Confirmation</div>
            </div>
          </div>

          {/* Step 1: KYC Verification */}
          {currentStep === 1 && (
            <div>
              {kycLoading ? (
                <div className="kyc-status">
                  <div className="spinner"></div>
                  <div className="kyc-message">{kycValidationMessage}</div>
                  <div className="validation-progress">
                    <div className="validation-progress-bar"></div>
                  </div>
                  <div className="kyc-powered">
                    Validating your registration with <strong>SAK</strong><br />
                    Using <strong>Zero-Knowledge Proofs</strong> on <strong>Stellar Blockchain</strong>
                  </div>
                </div>
              ) : (
                <div className="kyc-status">
                  <div className="kyc-icon success-icon">✓</div>
                  <div className="kyc-message">KYC Verified!</div>
                  <div className="kyc-powered">
                    ✨ KYC validated by <strong>SAK</strong> using Zero-Knowledge Proofs<br />
                    Secured by <strong>Stellar Blockchain</strong>
                  </div>
                  <button className="btn btn-primary" onClick={() => setCurrentStep(2)}>
                    Continue to Amount
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Amount & Destination */}
          {currentStep === 2 && (
            <div>
              <div className="exchange-rate">
                💱 Exchange Rate: 1 USDC = ${formatNumber(EXCHANGE_RATE)} ARS
              </div>

              <div className="form-group">
                <label className="form-label">Amount (ARS)</label>
                <div className="input-wrapper">
                  <input
                    type="number"
                    className="form-input"
                    placeholder="Enter amount"
                    value={currentAmount || ''}
                    onChange={handleAmountChange}
                  />
                  <span className="currency-label">ARS</span>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Select Destination</label>
                <select 
                  className="form-select"
                  value={selectedDestination}
                  onChange={handleDestinationChange}
                >
                  <option value="standard">Standard Transfer</option>
                  <option value="europe">Send to Europe (SEPA) 🇪🇺</option>
                  <option value="aaa">Send to AAA (High Value Transfer) 💎</option>
                </select>
              </div>

              {/* SEPA Inline KYC */}
              {selectedDestination === 'europe' && !kycLevels.sepa && (
                <div className="inline-kyc-box">
                  <div className="inline-kyc-title">🔐 SEPA KYC Verification Required</div>
                  <div className="kyc-status-badge" style={{ 
                    backgroundColor: verificationStates.sepaInlineVerifying ? '#f0b90b' : '#f6465d',
                    color: '#fff'
                  }}>
                    {verificationStates.sepaInlineVerifying ? '⏳ SEPA Level - Verifying...' : '❌ SEPA Level - Not Verified'}
                  </div>
                  <div className="form-group">
                    <label className="form-label">IBAN</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Enter your IBAN"
                      value={formData.ibanInline}
                      onChange={(e) => setFormData(prev => ({ ...prev, ibanInline: e.target.value }))}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Selfie with ID</label>
                    <label className="file-upload-btn">
                      <input
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={(e) => handleFileUpload('sepaSelfie', e)}
                      />
                      Choose File
                    </label>
                    {uploadedFiles.sepaSelfie && (
                      <div className="file-name" style={{ display: 'block' }}>
                        ✓ {uploadedFiles.sepaSelfie.name}
                      </div>
                    )}
                  </div>
                  <button
                    className="btn btn-primary"
                    onClick={verifySepaKYCInline}
                    disabled={!canVerifySepaInline || verificationStates.sepaInlineVerifying}
                  >
                    {verificationStates.sepaInlineVerifying ? 'Verifying...' : 'Verify SEPA KYC'}
                  </button>
                </div>
              )}

              {/* AAA Inline KYC */}
              {selectedDestination === 'aaa' && !kycLevels.aaa && (
                <div className="inline-kyc-box">
                  <div className="inline-kyc-title">🔐 AAA KYC Verification Required</div>
                  <div className="kyc-status-badge" style={{ 
                    backgroundColor: verificationStates.aaaInlineVerifying ? '#f0b90b' : '#f6465d',
                    color: '#fff'
                  }}>
                    {verificationStates.aaaInlineVerifying ? '⏳ AAA Level - Verifying...' : '❌ AAA Level - Not Verified'}
                  </div>
                  <div className="form-group">
                    <label className="form-label">Additional Document</label>
                    <label className="file-upload-btn">
                      <input
                        type="file"
                        accept="image/*,application/pdf"
                        style={{ display: 'none' }}
                        onChange={(e) => handleFileUpload('aaaDocument', e)}
                      />
                      Choose File
                    </label>
                    {uploadedFiles.aaaDocument && (
                      <div className="file-name" style={{ display: 'block' }}>
                        ✓ {uploadedFiles.aaaDocument.name}
                      </div>
                    )}
                  </div>
                  <div className="form-group">
                    <label className="form-label">Proof of Income</label>
                    <label className="file-upload-btn">
                      <input
                        type="file"
                        accept="image/*,application/pdf"
                        style={{ display: 'none' }}
                        onChange={(e) => handleFileUpload('aaaIncome', e)}
                      />
                      Choose File
                    </label>
                    {uploadedFiles.aaaIncome && (
                      <div className="file-name" style={{ display: 'block' }}>
                        ✓ {uploadedFiles.aaaIncome.name}
                      </div>
                    )}
                  </div>
                  <div className="form-group">
                    <label className="form-label">AML Screening Document</label>
                    <label className="file-upload-btn">
                      <input
                        type="file"
                        accept="image/*,application/pdf"
                        style={{ display: 'none' }}
                        onChange={(e) => handleFileUpload('aaaAML', e)}
                      />
                      Choose File
                    </label>
                    {uploadedFiles.aaaAML && (
                      <div className="file-name" style={{ display: 'block' }}>
                        ✓ {uploadedFiles.aaaAML.name}
                      </div>
                    )}
                  </div>
                  <button
                    className="btn btn-primary"
                    onClick={verifyAAAKYCInline}
                    disabled={!canVerifyAAAInline || verificationStates.aaaInlineVerifying}
                  >
                    {verificationStates.aaaInlineVerifying ? 'Verifying...' : 'Verify AAA KYC'}
                  </button>
                </div>
              )}

              {/* Status badges for verified levels */}
              {selectedDestination === 'europe' && kycLevels.sepa && (
                <div className="kyc-status-badge" style={{ backgroundColor: '#0ecb81', color: '#fff' }}>
                  ✓ SEPA Level - Verified
                </div>
              )}
              {selectedDestination === 'aaa' && kycLevels.aaa && (
                <div className="kyc-status-badge" style={{ backgroundColor: '#0ecb81', color: '#fff' }}>
                  ✓ AAA Level - Verified
                </div>
              )}

              {currentAmount > 0 && (
                <div className="summary-box">
                  <div className="summary-row">
                    <span className="summary-label">Amount:</span>
                    <span className="summary-value">${formatNumber(currentAmount)} ARS</span>
                  </div>
                  <div className="summary-row">
                    <span className="summary-label">Commission (0.5%):</span>
                    <span className="summary-value">${formatNumber(commission)} ARS</span>
                  </div>
                  <div className="summary-row">
                    <span className="summary-label">You will receive:</span>
                    <span className="summary-value highlight">{formatNumber(usdcAmount, 4)} USDC</span>
                  </div>
                </div>
              )}

              <button
                className="btn btn-primary"
                onClick={validateDestinationKYC}
                disabled={!canProceedToStep2}
              >
                Continue to Confirmation
              </button>
              <button className="btn btn-secondary" onClick={() => setCurrentStep(1)}>
                Back
              </button>
            </div>
          )}

          {/* Step 3: Confirmation */}
          {currentStep === 3 && (
            <div>
              <div className="alert">
                <strong>Review Your Transaction</strong><br />
                Please verify all details before confirming.
              </div>

              <div className="summary-box">
                <div className="summary-row">
                  <span className="summary-label">Destination:</span>
                  <span className="summary-value">{destinationLabels[selectedDestination]}</span>
                </div>
                <div className="summary-row">
                  <span className="summary-label">Amount:</span>
                  <span className="summary-value">${formatNumber(currentAmount)} ARS</span>
                </div>
                <div className="summary-row">
                  <span className="summary-label">Commission (0.5%):</span>
                  <span className="summary-value">${formatNumber(commission)} ARS</span>
                </div>
                <div className="summary-row">
                  <span className="summary-label">You will receive:</span>
                  <span className="summary-value highlight">{formatNumber(usdcAmount, 4)} USDC</span>
                </div>
              </div>

              <div className="kyc-powered" style={{ textAlign: 'center', marginBottom: '20px' }}>
                ✓ KYC validated by <strong>SAK</strong> on <strong>Stellar Blockchain</strong>
              </div>

              <button className="btn btn-primary" onClick={confirmTransaction}>
                Confirm Transaction
              </button>
              <button className="btn btn-secondary" onClick={() => setCurrentStep(2)}>
                Back
              </button>
            </div>
          )}

          {/* Step 4: Success */}
          {currentStep === 4 && (
            <div className="success-container">
              <div className="success-checkmark"></div>
              <h2 className="success-title">Transaction Successful!</h2>
              <p className="success-message">
                Your transaction has been processed successfully.<br />
                The USDC will be sent to your wallet shortly.
              </p>

              <div className="transaction-details">
                <div className="detail-row">
                  <span className="detail-label">Amount Sent:</span>
                  <span className="detail-value">${formatNumber(currentAmount)} ARS</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Commission:</span>
                  <span className="detail-value">${formatNumber(commission)} ARS</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">USDC Received:</span>
                  <span className="detail-value">{formatNumber(usdcAmount, 4)} USDC</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Transaction ID:</span>
                  <span className="detail-value transaction-hash" title={transactionId}>
                    {transactionId}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Status:</span>
                  <span className="detail-value" style={{ color: '#0ecb81' }}>✓ Completed</span>
                </div>
              </div>

              <button className="btn btn-success" onClick={newTransaction}>
                New Transaction
              </button>
            </div>
          )}

          <div className="footer-note">
            This transaction is protected by blockchain technology
          </div>
        </div>
      </div>
    </>
  );
}
