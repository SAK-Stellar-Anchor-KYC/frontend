'use client';

import { useState } from 'react';

export default function AnchorRipioPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showKycForm, setShowKycForm] = useState(true);
  const [kycLoading, setKycLoading] = useState(false);
  const [kycVerified, setKycVerified] = useState(false);
  const [currentAmount, setCurrentAmount] = useState(0);
  const [selectedDestination, setSelectedDestination] = useState<'standard' | 'europe' | 'aaa'>('standard');
  const [kycLevels, setKycLevels] = useState({
    base: false,
    sepa: false,
    aaa: false
  });
  const [uploadedFiles, setUploadedFiles] = useState({
    sepaSelfie: null as File | null,
    aaaDocument: null as File | null,
    aaaIncome: null as File | null,
    aaaAML: null as File | null,
    kycIdDocument: null as File | null
  });
  const [kycFormData, setKycFormData] = useState({
    fullname: '',
    email: '',
    dob: '',
    country: '',
    idNumber: ''
  });
  const [formData, setFormData] = useState({
    ibanInline: ''
  });
  const [verificationStates, setVerificationStates] = useState({
    sepaInlineVerifying: false,
    aaaInlineVerifying: false
  });
  const [transactionId, setTransactionId] = useState('');

  const EXCHANGE_RATE = 1440.00;
  const COMMISSION_RATE = 0.005;

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

  const submitBaseKYC = () => {
    setShowKycForm(false);
    setKycLoading(true);

    console.log('📤 Sending BASE KYC data to SAK API:', {
      kyc_level: 'BASE',
      full_name: kycFormData.fullname,
      email: kycFormData.email,
      date_of_birth: kycFormData.dob,
      country: kycFormData.country,
      id_number: kycFormData.idNumber,
      id_document: uploadedFiles.kycIdDocument?.name,
      user_wallet: 'GDXXX...XXXX',
      timestamp: new Date().toISOString()
    });

    setTimeout(() => {
      setKycLevels(prev => ({ ...prev, base: true }));
      setKycLoading(false);
      setKycVerified(true);
      console.log('✅ SAK API Response: BASE KYC Verified successfully');
    }, 4000);
  };

  const verifySepaKYCInline = () => {
    if (!formData.ibanInline || !uploadedFiles.sepaSelfie) return;
    setVerificationStates(prev => ({ ...prev, sepaInlineVerifying: true }));
    
    console.log('📤 Sending SEPA KYC data to SAK API');
    
    setTimeout(() => {
      setKycLevels(prev => ({ ...prev, sepa: true }));
      setVerificationStates(prev => ({ ...prev, sepaInlineVerifying: false }));
      console.log('✅ SEPA KYC Verified');
    }, 4000);
  };

  const verifyAAAKYCInline = () => {
    const { aaaDocument, aaaIncome, aaaAML } = uploadedFiles;
    if (!aaaDocument || !aaaIncome || !aaaAML) return;

    setVerificationStates(prev => ({ ...prev, aaaInlineVerifying: true }));
    console.log('📤 Sending AAA KYC data to SAK API');
    
    setTimeout(() => {
      setKycLevels(prev => ({ ...prev, aaa: true }));
      setVerificationStates(prev => ({ ...prev, aaaInlineVerifying: false }));
      console.log('✅ AAA KYC Verified');
    }, 4000);
  };

  const validateDestinationKYC = () => {
    if (selectedDestination === 'europe' && !kycLevels.sepa) {
      alert('Please verify your SEPA KYC level first.');
      return;
    } else if (selectedDestination === 'aaa' && !kycLevels.aaa) {
      alert('Please verify your AAA KYC level first.');
      return;
    }
    setCurrentStep(3);
  };

  const confirmTransaction = () => {
    const txId = '0x' + Array.from({length: 64}, () => 
      Math.floor(Math.random() * 16).toString(16)
    ).join('');
    setTransactionId(txId);
    setCurrentStep(4);
  };

  const newTransaction = () => {
    setCurrentAmount(0);
    setSelectedDestination('standard');
    setCurrentStep(1);
    if (kycLevels.base) {
      setShowKycForm(false);
      setKycVerified(true);
    } else {
      setShowKycForm(true);
      setKycVerified(false);
    }
  };

  const { commission, usdcAmount } = calculateSummary(currentAmount);
  const destinationLabels = {
    'standard': 'Standard Transfer',
    'europe': 'Send to Europe (SEPA)',
    'aaa': 'High Value Transfer - AAA'
  };

  const canSubmitKyc = kycFormData.fullname && kycFormData.email && kycFormData.dob && 
                       kycFormData.country && kycFormData.idNumber && uploadedFiles.kycIdDocument;
  const canVerifySepa = formData.ibanInline && uploadedFiles.sepaSelfie;
  const canVerifyAAA = uploadedFiles.aaaDocument && uploadedFiles.aaaIncome && uploadedFiles.aaaAML;

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { overflow-x: hidden; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #000; color: #fff; overflow-x: hidden; }
        .header { background-color: #6433ac; padding: 15px 30px; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #5229a3; }
        .logo img { height: 40px; }
        .user-info { display: flex; align-items: center; gap: 15px; }
        .user-balance { background-color: rgba(255,255,255,0.2); padding: 8px 16px; border-radius: 4px; font-size: 14px; }
        .user-avatar { width: 40px; height: 40px; background-color: #fff; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; color: #6433ac; }
        .container { max-width: 600px; margin: 40px auto; padding: 0 20px; }
        .wizard-container { background-color: #1a1a1a; border-radius: 8px; padding: 30px; box-shadow: 0 4px 6px rgba(0,0,0,0.5); }
        .wizard-title { font-size: 24px; text-align: center; margin-bottom: 30px; }
        .wizard-steps { display: flex; justify-content: space-between; margin-bottom: 40px; position: relative; }
        .wizard-steps::before { content: ''; position: absolute; top: 20px; left: 0; right: 0; height: 2px; background-color: #333; z-index: 0; }
        .step { display: flex; flex-direction: column; align-items: center; position: relative; z-index: 1; flex: 1; }
        .step-number { width: 40px; height: 40px; border-radius: 50%; background-color: #333; display: flex; align-items: center; justify-content: center; margin-bottom: 8px; font-weight: bold; color: #999; }
        .step.active .step-number { background-color: #6433ac; color: #fff; }
        .step.completed .step-number { background-color: #0ecb81; color: #fff; }
        .step-label { font-size: 12px; color: #999; }
        .step.active .step-label { color: #6433ac; font-weight: 500; }
        .form-group { margin-bottom: 25px; }
        .form-label { display: block; margin-bottom: 8px; font-size: 14px; color: #ccc; }
        .form-input, .form-select { width: 100%; padding: 12px 16px; background-color: #2a2a2a; border: 1px solid #333; border-radius: 4px; color: #fff; font-size: 16px; }
        .form-input:focus, .form-select:focus { outline: none; border-color: #6433ac; }
        .input-wrapper { position: relative; }
        .currency-label { position: absolute; right: 16px; top: 50%; transform: translateY(-50%); color: #848e9c; }
        .summary-box { background-color: #2a2a2a; border: 1px solid #333; border-radius: 6px; padding: 20px; margin-bottom: 25px; }
        .summary-row { display: flex; justify-content: space-between; margin-bottom: 12px; font-size: 14px; }
        .summary-row:last-child { margin-bottom: 0; padding-top: 12px; border-top: 1px solid #444; font-size: 16px; font-weight: bold; }
        .summary-label { color: #ccc; }
        .summary-value { color: #fff; }
        .summary-value.highlight { color: #0ecb81; }
        .btn { width: 100%; padding: 14px; border: none; border-radius: 4px; font-size: 16px; font-weight: 600; cursor: pointer; transition: opacity 0.3s; }
        .btn:hover:not(:disabled) { opacity: 0.9; }
        .btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .btn-primary { background-color: #6433ac; color: #fff; }
        .btn-secondary { background-color: #333; color: #fff; margin-top: 10px; }
        .kyc-status { text-align: center; padding: 40px 20px; }
        .kyc-icon { font-size: 64px; margin-bottom: 20px; }
        .kyc-message { font-size: 18px; margin-bottom: 15px; }
        .kyc-powered { font-size: 14px; color: #ccc; margin-bottom: 30px; }
        .kyc-powered strong { color: #6433ac; }
        .spinner { border: 4px solid #333; border-top: 4px solid #6433ac; border-radius: 50%; width: 50px; height: 50px; animation: spin 1s linear infinite; margin: 0 auto 20px; }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        .success-icon { color: #0ecb81; }
        .alert { background-color: #2a2a2a; border-left: 4px solid #6433ac; padding: 15px; border-radius: 4px; margin-bottom: 20px; }
        .file-upload-box { background-color: #2a2a2a; border: 2px dashed #444; border-radius: 6px; padding: 30px; text-align: center; cursor: pointer; display: block; }
        .file-upload-box:hover { border-color: #6433ac; }
        .file-name { color: #0ecb81; margin-top: 10px; }
        .inline-kyc-box { background-color: #2a2a2a; border: 2px solid #6433ac; border-radius: 6px; padding: 20px; margin-top: 20px; }
        .exchange-rate { text-align: center; font-size: 14px; color: #ccc; margin-bottom: 20px; }
        .success-container { text-align: center; padding: 40px 20px; }
        .success-checkmark { width: 80px; height: 80px; border-radius: 50%; background-color: #0ecb81; display: flex; align-items: center; justify-content: center; margin: 0 auto 25px; animation: scaleIn 0.5s ease-out; }
        .success-checkmark::before { content: '✓'; font-size: 48px; color: #fff; font-weight: bold; }
        @keyframes scaleIn { 0% { transform: scale(0); opacity: 0; } 50% { transform: scale(1.1); } 100% { transform: scale(1); opacity: 1; } }
        .success-title { font-size: 24px; color: #0ecb81; margin-bottom: 15px; font-weight: 600; }
        .success-message { font-size: 16px; color: #ccc; margin-bottom: 30px; line-height: 1.5; }
        .transaction-details { background-color: #2a2a2a; border: 1px solid #333; border-radius: 6px; padding: 20px; margin-bottom: 30px; text-align: left; }
        .detail-row { display: flex; justify-content: space-between; margin-bottom: 12px; font-size: 14px; }
        .detail-label { color: #ccc; }
        .detail-value { color: #fff; font-weight: 500; }
        .transaction-hash { max-width: 200px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-family: monospace; font-size: 12px; }
        .footer-note { text-align: center; font-size: 12px; color: #ccc; margin-top: 30px; }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
        .pending-verification { animation: pulse 1.5s ease-in-out infinite; }
      `}} />

      <div className="header">
        <div className="logo">
          <img src="/68223e2a6a651095b0183f04_Logo Nav.svg" alt="Ripio" />
        </div>
        <div className="user-info">
          <div className="user-balance">Balance: <strong>$125,430.50 ARS</strong></div>
          <div className="user-avatar">JD</div>
        </div>
      </div>

      <div className="container">
        <div className="wizard-container">
          <h1 className="wizard-title">Convert ARS to USDC</h1>

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

          {/* Step 1: KYC */}
          {currentStep === 1 && (
            <div>
              {showKycForm && (
                <div>
                  <div className="alert">
                    <p><strong>⚠ KYC Verification Required</strong></p>
                    <p style={{ marginTop: '8px', fontSize: '13px' }}>Complete BASE KYC to continue.</p>
                  </div>
                  <div className="kyc-powered" style={{ textAlign: 'center', marginBottom: '25px' }}>
                    🔒 Secured by <strong>SAK</strong> on <strong>Stellar Blockchain</strong>
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <input className="form-input" placeholder="Enter your full name" value={kycFormData.fullname} onChange={(e) => setKycFormData(prev => ({ ...prev, fullname: e.target.value }))} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <input type="email" className="form-input" placeholder="your.email@example.com" value={kycFormData.email} onChange={(e) => setKycFormData(prev => ({ ...prev, email: e.target.value }))} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Date of Birth</label>
                    <input type="date" className="form-input" value={kycFormData.dob} onChange={(e) => setKycFormData(prev => ({ ...prev, dob: e.target.value }))} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Country of Residence</label>
                    <select className="form-select" value={kycFormData.country} onChange={(e) => setKycFormData(prev => ({ ...prev, country: e.target.value }))}>
                      <option value="">Select your country</option>
                      <option value="AR">Argentina</option>
                      <option value="BR">Brazil</option>
                      <option value="CL">Chile</option>
                      <option value="CO">Colombia</option>
                      <option value="MX">Mexico</option>
                      <option value="UY">Uruguay</option>
                      <option value="PE">Peru</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">ID Document Number</label>
                    <input className="form-input" placeholder="Enter ID/Passport number" value={kycFormData.idNumber} onChange={(e) => setKycFormData(prev => ({ ...prev, idNumber: e.target.value }))} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Upload ID Document</label>
                    <label className="file-upload-box">
                      <div style={{ fontSize: '48px', marginBottom: '10px' }}>📄</div>
                      <div style={{ color: '#ccc', fontSize: '14px' }}>Click to upload ID document</div>
                      <div style={{ color: '#999', fontSize: '12px', marginTop: '5px' }}>Passport, License, or National ID</div>
                      <input type="file" accept="image/*,.pdf" style={{ display: 'none' }} onChange={(e) => e.target.files && setUploadedFiles(prev => ({ ...prev, kycIdDocument: e.target.files![0] }))} />
                      {uploadedFiles.kycIdDocument && <div className="file-name">✓ {uploadedFiles.kycIdDocument.name}</div>}
                    </label>
                  </div>
                  <button className="btn btn-primary" onClick={submitBaseKYC} disabled={!canSubmitKyc}>Submit KYC for Verification</button>
                </div>
              )}

              {kycLoading && (
                <div className="kyc-status">
                  <div className="spinner"></div>
                  <div className="kyc-message">Verifying your identity...</div>
                  <div className="kyc-powered">Powered by <strong>SAK</strong></div>
                </div>
              )}

              {kycVerified && (
                <div className="kyc-status">
                  <div className="kyc-icon success-icon">✓</div>
                  <div className="kyc-message">KYC Verified!</div>
                  <div className="kyc-powered">✨ Validated by <strong>SAK</strong></div>
                  <button className="btn btn-primary" onClick={() => setCurrentStep(2)}>Continue to Amount</button>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Amount */}
          {currentStep === 2 && (
            <div>
              <div className="alert" style={{ borderLeftColor: '#0ecb81' }}>
                <p><strong>KYC Status:</strong></p>
                <p style={{ marginTop: '8px', fontSize: '13px' }}>
                  ✓ BASE - Verified<br />
                  <span style={{ color: kycLevels.sepa ? '#0ecb81' : '#848e9c' }}>{kycLevels.sepa ? '✓' : '⚠'} SEPA - {kycLevels.sepa ? 'Verified' : 'Not Verified'}</span><br />
                  <span style={{ color: kycLevels.aaa ? '#0ecb81' : '#848e9c' }}>{kycLevels.aaa ? '✓' : '⚠'} AAA - {kycLevels.aaa ? 'Verified' : 'Not Verified'}</span>
                </p>
              </div>

              <div className="form-group">
                <label className="form-label">Destination</label>
                <select className="form-select" value={selectedDestination} onChange={(e) => setSelectedDestination(e.target.value as 'standard' | 'europe' | 'aaa')}>
                  <option value="standard">Standard Transfer</option>
                  <option value="europe">Send to Europe - SEPA</option>
                  <option value="aaa">High Value Transfer - AAA</option>
                </select>
              </div>

              {selectedDestination === 'europe' && !kycLevels.sepa && (
                <div className="inline-kyc-box">
                  <div className="alert" style={{ marginBottom: '15px' }}>
                    <p style={{ fontSize: '13px' }}><strong>⚠ SEPA KYC Required</strong></p>
                  </div>
                  <div className="form-group">
                    <label className="form-label">IBAN</label>
                    <input className="form-input" placeholder="ES91 2100 0418..." value={formData.ibanInline} onChange={(e) => setFormData(prev => ({ ...prev, ibanInline: e.target.value }))} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Selfie with ID</label>
                    <label className="file-upload-box" style={{ padding: '25px' }}>
                      <div style={{ fontSize: '36px', marginBottom: '8px' }}>📷</div>
                      <div style={{ color: '#848e9c', fontSize: '13px' }}>Click to upload</div>
                      <input type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => e.target.files && setUploadedFiles(prev => ({ ...prev, sepaSelfie: e.target.files![0] }))} />
                      {uploadedFiles.sepaSelfie && <div className="file-name">✓ {uploadedFiles.sepaSelfie.name}</div>}
                    </label>
                  </div>
                  <button className="btn btn-primary" onClick={verifySepaKYCInline} disabled={!canVerifySepa || verificationStates.sepaInlineVerifying}>{verificationStates.sepaInlineVerifying ? 'Verifying...' : 'Verify KYC'}</button>
                </div>
              )}

              {selectedDestination === 'aaa' && !kycLevels.aaa && (
                <div className="inline-kyc-box">
                  <div className="alert" style={{ marginBottom: '15px' }}>
                    <p style={{ fontSize: '13px' }}><strong>⚠ AAA KYC Required</strong></p>
                  </div>
                  {['aaaDocument', 'aaaIncome', 'aaaAML'].map((field, idx) => (
                    <div className="form-group" key={field}>
                      <label className="form-label">{['Document', 'Proof of Income', 'AML'][idx]}</label>
                      <label className="file-upload-box" style={{ padding: '25px' }}>
                        <div style={{ fontSize: '36px' }}>{['📄', '💰', '🔍'][idx]}</div>
                        <input type="file" accept="image/*,.pdf" style={{ display: 'none' }} onChange={(e) => e.target.files && setUploadedFiles(prev => ({ ...prev, [field]: e.target.files![0] }))} />
                        {uploadedFiles[field as keyof typeof uploadedFiles] && <div className="file-name">✓ {(uploadedFiles[field as keyof typeof uploadedFiles] as File).name}</div>}
                      </label>
                    </div>
                  ))}
                  <button className="btn btn-primary" onClick={verifyAAAKYCInline} disabled={!canVerifyAAA || verificationStates.aaaInlineVerifying}>{verificationStates.aaaInlineVerifying ? 'Verifying...' : 'Verify KYC'}</button>
                </div>
              )}

              <div className="exchange-rate">Exchange rate: 1 USDC = 1,440.00 ARS</div>
              <div className="form-group">
                <label className="form-label">Enter amount in ARS</label>
                <div className="input-wrapper">
                  <input type="number" className="form-input" placeholder="0.00" value={currentAmount || ''} onChange={(e) => setCurrentAmount(parseFloat(e.target.value) || 0)} />
                  <span className="currency-label">ARS</span>
                </div>
              </div>

              {currentAmount > 0 && (
                <div className="summary-box">
                  <div className="summary-row"><span className="summary-label">Amount:</span><span className="summary-value">${formatNumber(currentAmount)} ARS</span></div>
                  <div className="summary-row"><span className="summary-label">Fee (0.5%):</span><span className="summary-value">${formatNumber(commission)} ARS</span></div>
                  <div className="summary-row"><span className="summary-label">You receive:</span><span className="summary-value highlight">{formatNumber(usdcAmount, 4)} USDC</span></div>
                </div>
              )}
              <button className="btn btn-primary" onClick={validateDestinationKYC} disabled={currentAmount === 0}>Continue</button>
            </div>
          )}

          {/* Step 3: Confirmation */}
          {currentStep === 3 && (
            <div>
              <div className="alert">
                <p><strong>Review transaction details</strong></p>
              </div>
              <div className="summary-box">
                <div className="summary-row"><span className="summary-label">Destination:</span><span className="summary-value">{destinationLabels[selectedDestination]}</span></div>
                <div className="summary-row"><span className="summary-label">Amount:</span><span className="summary-value">${formatNumber(currentAmount)} ARS</span></div>
                <div className="summary-row"><span className="summary-label">Fee:</span><span className="summary-value">${formatNumber(commission)} ARS</span></div>
                <div className="summary-row"><span className="summary-label">You receive:</span><span className="summary-value highlight">{formatNumber(usdcAmount, 4)} USDC</span></div>
              </div>
              <button className="btn btn-primary" onClick={confirmTransaction}>Confirm Transaction</button>
              <button className="btn btn-secondary" onClick={() => setCurrentStep(1)}>Cancel</button>
            </div>
          )}

          {/* Step 4: Success */}
          {currentStep === 4 && (
            <div className="success-container">
              <div className="success-checkmark"></div>
              <h2 className="success-title">Transaction Successful!</h2>
              <p className="success-message">Your conversion has been processed.</p>
              <div className="transaction-details">
                <div className="detail-row"><span className="detail-label">Amount:</span><span className="detail-value">${formatNumber(currentAmount)} ARS</span></div>
                <div className="detail-row"><span className="detail-label">Fee:</span><span className="detail-value">${formatNumber(commission)} ARS</span></div>
                <div className="detail-row"><span className="detail-label">USDC:</span><span className="detail-value" style={{ color: '#0ecb81' }}>{formatNumber(usdcAmount, 4)} USDC</span></div>
                <div className="detail-row"><span className="detail-label">TX ID:</span><span className="detail-value transaction-hash" title={transactionId}>{transactionId}</span></div>
              </div>
              <button className="btn btn-primary" onClick={newTransaction}>New Transaction</button>
            </div>
          )}

          <div className="footer-note">Protected by blockchain technology</div>
        </div>
      </div>
    </>
  );
}
