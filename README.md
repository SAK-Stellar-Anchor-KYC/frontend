

<h2 align="center">Security You Can Anchor To.</h2>



---

## Table of Contents
- [1. Problem Statement](#problem-statement)
- [2. Target Users & Needs](#target-users--needs)
- [3. Solution Overview](#solution-overview)
- [4. Core Features](#core-features)
- [5. MVP Architecture](#mvp-architecture)
- [6. Success Criteria](#success-criteria)
- [7. Team](#team)

---

<a id="problem-statement"></a>
## 1. Problem Statement

### What real-world problem are you solving?
Stellar Anchors currently run manual, isolated and repetitive KYC/AML processes.  
Each performs verification **from scratch**, even if the user was already verified elsewhere.  
This creates:

- Long onboarding times  
- High operational cost  
- Duplicate document uploads  
- Increased security risk  
- Poor scalability across the network

### Who is affected?
- Regulated Anchors  
- Users interacting with multiple anchors  
- On/off-ramp companies  
- Platforms requiring compliance

### Why is this urgent now?
The Stellar ecosystem is growing, and recent security incidents such as the July 2024 Fractal ID breach exposed a major vulnerability: multiple companies store full KYC copies, multiplying the attack surface.  
Stellar users typically interact with several anchors, making the risk worse.  
A unified, encrypted, permission-controlled vault is needed now.

---

<a id="target-users--needs"></a>
## 2. Target Users & Needs

### Primary User
**Stellar network anchors**

### Core Need
- Reduce compliance workload  
- Remove duplicated KYC  
- Lower operational cost  
- Improve onboarding speed  
- Maintain regulatory compliance

### Current Workaround
Each anchor runs a separate KYC process:
- Custom forms  
- Manual verification  
- Re-uploading documents  
- Non-reusable processes

---

<a id="solution-overview"></a>
## 3. Solution Overview

### Main Idea
**SAK** provides a unified and automated KYC system with an encrypted Vault using SEP-12.  
A user completes KYC **once**, and anchors can request access through permissions.

This eliminates:
- Repeated uploads  
- Repeated identity capture  
- Manual re-verification  
- Duplicate sensitive databases

### User Journey
1. User completes KYC once via SAK  
2. SAK validates documents, region and KYC tier (BASE / SEPA / AAA)  
3. Anchor requests access  
4. User approves  
5. Anchor enables deposits, withdrawals or RWA operations

### Why Stellar?
- Built around SEP-12  
- Reduces compliance workload  
- Standardizes KYC flows  
- Supports remittances, payments & RWA  
- Soroban enables permission control & auditing

---

<a id="core-features"></a>
## 4. Core Features

### Feature 1: One-Time KYC Submission
User completes KYC only once through SAK.  
**Working if:** The system stores and retrieves the KYC record.

### Feature 2: Anchor KYC Lookup
Anchors request KYC data and receive status + verification tier.  
**Working if:** Anchor sees verified user information.

### Feature 3: Automatic Tier Assignment
Document type + region → automatic assignment of **BASE / SEPA / AAA**.  
**Working if:** User receives correct tier.

### Stretch Goal
- Consent-based access panel  
- Soroban permissions smart contract  
- Full encrypted vault

---

<a id="mvp-architecture"></a>
## 5. MVP Architecture

### Stack
- **Frontend:** Next.js + Tailwind CSS  
- **Backend:** Node.js  
- **Smart Contracts:** Soroban (permissions + audit)  
- **Database:** PostgreSQL  
- **ZK:** Noir - Aztec  
- **Storage:** Encrypted off-chain Vault (or simulated for demo)

### Flow
User → Frontend → API → Vault/DB → Anchor (mock SEP-12 request) → Stellar

---

<a id="success-criteria"></a>
## 6. Success Criteria

- A user can complete KYC once via SAK  
- An anchor can read KYC data without duplication **
- Automatic KYC tier assignment works  
- User can grant/revoke anchor and users (bad actors) access * (to be checked with mentors) 
- Onboarding to a second anchor is immediate
- Onboarding users under a quick time of response. 

---

<a id="team"></a>
## 7. Team

**Team Name:** SAK – Stellar Anchor KYC

**Members**
- Leandro Masotti – Backend  
- Manuel Jimenez Garro – Frontend & Product  
- Gonzalo Chacón – Product  
- Augusto Fabian Rios Choque – Smart Contracts  
- Diego Raúl Barrionuevo – Smart Contracts

**Links**
- GitHub: https://github.com/SAK-Stellar-Anchor-KYC
