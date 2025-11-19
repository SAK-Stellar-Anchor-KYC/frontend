# 🚀 SAK – Stellar Automated KYC Vault  
*A unified, secure and permission-based KYC system for Stellar Anchors.*

---

## 📑 Table of Contents
- [1. Problem Statement](#1-problem-statement)
- [2. Target Users & Needs](#2-target-users--needs)
- [3. Solution Overview](#3-solution-overview)
- [4. Core Features](#4-core-features)
- [5. MVP Architecture](#5-mvp-architecture)
- [6. Success Criteria](#6-success-criteria)
- [7. Team](#7-team)

---

## 1️⃣ **1. Problem Statement**

### ❗ What real-world problem are you solving?
Stellar Anchors currently run manual, isolated and repetitive KYC/AML processes.  
Each performs verification **from scratch**, even if the user was already verified elsewhere.  
This leads to:

- Long onboarding times  
- High operational cost  
- Duplicate document uploads  
- Increased security risk  
- Poor scalability across the network  

---

### 👥 Who is affected?
- Regulated Anchors  
- Users interacting with multiple anchors  
- On/off-ramp companies  
- Platforms with compliance requirements  

---

### 🔥 Why is this urgent now?
The Stellar ecosystem is growing, and recent security incidents such as the **July 2024 Fractal ID breach** (full access to KYC documents and personal data) revealed a critical vulnerability:  
**multiple companies store full KYC copies**, multiplying the attack surface.

Because Stellar users interact with **several anchors**, this risk becomes even larger.

➡️ A unified, secure, encrypted, permission-controlled vault is needed **now**.

---

## 2️⃣ **2. Target Users & Needs**

### 🎯 Primary User
**Stellar network anchors**

### 💡 Core Need
- Reduce compliance workload  
- Remove duplicated KYC processes  
- Lower operational cost  
- Improve onboarding speed  
- Maintain full regulatory compliance  

### 🛠 Current Workaround
Each anchor runs its own isolated KYC:

- Custom forms  
- Manual verification  
- Re-uploaded documents  
- Non-reusable flows  

---

## 3️⃣ **3. Solution Overview**

### 🧠 3.1 Main Idea
**SAK** is a unified and automated KYC system with an encrypted Vault compatible with **SEP-12**.  
Users complete KYC **once**, and anchors request access via permissions.

This eliminates:
- Repeated document uploads  
- Repeated selfies  
- Manual re-verification  
- Duplicate databases that increase risk  

---

### 🧭 User Journey
1. User completes KYC once with **SAK**  
2. SAK validates documents, country and KYC level (**BASE / SEPA / AAA**)  
3. Anchor requests access  
4. User approves  
5. Anchor enables deposits, withdrawals or RWA activity  

---

### ⭐ 3.2 Why Stellar?
SAK aligns perfectly with Stellar’s anchor model:

- Uses **SEP-12**  
- Reduces compliance workload  
- Standardizes KYC flows across anchors  
- Enhances remittances, payments & RWA processes  
- Soroban smart contracts enable on-chain auditing and permission logic  

---

## 4️⃣ **4. Core Features (Hackathon Scope)**

### 🔐 Feature 1: Unified KYC Vault (SEP-12 Compatible)
KYC **once**, reuse everywhere.  
✔ Working if: an anchor receives verification without repeated documents.

### 🏷 Feature 2: Automatic KYC Levels  
Assigns **BASE / SEPA / AAA** based on region & risk.  
✔ Working if: the level is computed and delivered correctly.

### 🛂 Feature 3: Consent-Based Access  
User decides what each anchor can access.  
✔ Working if: the anchor receives only what the user allowed.

### 🚀 Stretch Goal  
Soroban contract for on-chain permissions and audit logs.

---

## 5️⃣ **5. MVP Architecture**

### 🧱 Stack
- **Frontend:** Next.js - Tailwind.js   
- **Backend:** Node.js
- **Smart Contracts** Soroban contracts

---

## 6️⃣ **6. Success Criteria (Hackathon)**

- ✔ User completes KYC once via SAK  
- ✔ Anchor reads KYC without duplicate documents  
- ✔ Automatic level assignment (BASE / SEPA / AAA)  
- ✔ User can grant/revoke access to anchors  
- ✔ Onboarding to a second anchor takes ~0 minutes  

---

## 7️⃣ **7. Team**

### 🏷 Team Name
**SAK Stellar Anchor KYC**

### 👤 Members

- **Leandro Masotti** – Backend  
- **Manuel Jimenez Garro** – Front-end - Product  
- **Gonzalo Chacón** – Product  
- **Augusto Fabian Rios Choque** – Smart Contracts  
- **Diego Raúl Barrionuevo** – Smart Contracts  


### 🔗 Links
- GitHub: https://github.com/SAK-Stellar-Anchor-KYC

---
