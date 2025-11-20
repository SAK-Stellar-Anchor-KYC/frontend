# Guía de Integración para Anchors - SAK API

## 🏗️ Arquitectura Técnica

### Opción Recomendada: **API REST** (No SDK inicialmente)

**¿Por qué API REST?**
- ✅ Más simple de implementar
- ✅ Compatible con cualquier lenguaje (Node.js, Python, Go, etc.)
- ✅ Fácil de testear y debuggear
- ✅ Estándar de la industria
- ✅ SDK se puede agregar después si hay demanda

**SDK solo si:**
- Tenés muchos anchors pidiendo SDK
- Querés simplificar aún más la integración
- Tenés recursos para mantener múltiples SDKs (JS, Python, etc.)

---

## 📡 Qué Necesita el Anchor de Vos

### 1. **API Key / Token de Autenticación**

El anchor necesita:
- **API Key**: Para autenticarse en tus endpoints
- **Stellar Public Key del Anchor**: Para verificar permisos en blockchain

**Ejemplo de registro:**
```json
POST /api/v1/anchors/register
{
  "name": "Mi Exchange",
  "stellar_public_key": "GABC...XYZ",
  "contact_email": "contact@exchange.com"
}

Response:
{
  "api_key": "sak_live_abc123...",
  "anchor_id": "anchor_123"
}
```

### 2. **Endpoints de la API**

#### Endpoint 1: Verificar Estado KYC de Usuario

```http
GET /api/v1/kyc/status?stellar_public_key=GABC...XYZ
Headers:
  Authorization: Bearer sak_live_abc123...
```

**Response:**
```json
{
  "user_found": true,
  "kyc_status": {
    "base": {
      "status": "validated",
      "validated_at": "2024-01-15T10:30:00Z"
    },
    "sepa": {
      "status": "validated",
      "validated_at": "2024-01-20T14:20:00Z"
    },
    "aaa": {
      "status": "pending"
    }
  },
  "has_permission": true,
  "highest_level": "sepa"
}
```

**Si no tiene permiso:**
```json
{
  "user_found": true,
  "kyc_status": {
    "base": { "status": "validated" }
  },
  "has_permission": false,
  "message": "User has not granted access to this anchor"
}
```

#### Endpoint 2: Solicitar Acceso a Datos KYC

```http
POST /api/v1/kyc/request-access
Headers:
  Authorization: Bearer sak_live_abc123...
Body:
{
  "user_stellar_public_key": "GABC...XYZ",
  "kyc_level_required": "base" | "sepa" | "aaa"
}
```

**Response:**
```json
{
  "request_sent": true,
  "user_notified": true,
  "message": "User will be notified to grant access"
}
```

#### Endpoint 3: Obtener Datos KYC (solo si tiene permiso)

```http
GET /api/v1/kyc/data?stellar_public_key=GABC...XYZ&level=base
Headers:
  Authorization: Bearer sak_live_abc123...
```

**Response (si tiene permiso):**
```json
{
  "has_permission": true,
  "kyc_data": {
    "level": "base",
    "status": "validated",
    "data": {
      "fullName": "Juan Pérez",
      "dateOfBirth": "1990-05-15",
      "country": "AR",
      "email": "juan@example.com"
      // NO incluir documentIdUrl por seguridad
    },
    "validated_at": "2024-01-15T10:30:00Z"
  }
}
```

**Response (si NO tiene permiso):**
```json
{
  "has_permission": false,
  "error": "User has not granted access to this anchor"
}
```

#### Endpoint 4: Webhook para Notificaciones (Opcional)

El anchor puede registrarse para recibir webhooks cuando:
- Un usuario les otorga permiso
- Un usuario completa KYC que ya había solicitado

```http
POST /api/v1/anchors/webhooks
Headers:
  Authorization: Bearer sak_live_abc123...
Body:
{
  "webhook_url": "https://exchange.com/webhooks/sak",
  "events": ["permission_granted", "kyc_completed"]
}
```

---

## 🔗 Integración con Stellar Blockchain

### Qué Necesitás Implementar

#### 1. **Smart Contract de Permisos (Soroban)**

**Funcionalidad:**
- Verificar si un usuario otorgó permiso a un anchor
- Registrar cuando se otorga/revoca permiso
- Almacenar nivel de KYC mínimo requerido

**Estructura en Blockchain:**
```
Map: (user_public_key, anchor_public_key) -> Permission
{
  granted: bool,
  kyc_level: "base" | "sepa" | "aaa",
  granted_at: timestamp
}
```

**Tu Backend debe:**
1. Cuando usuario otorga permiso → llamar smart contract
2. Cuando anchor consulta → verificar en smart contract primero
3. Si tiene permiso → devolver datos de Supabase

#### 2. **Stellar Public Key como Identificador**

**Por qué:**
- Cada usuario se identifica por su `stellar_public_key`
- Cada anchor se identifica por su `stellar_public_key`
- Permisos se verifican en blockchain usando estas keys

**Flujo:**
```
Usuario: GUSER123...
Anchor: GANCHOR456...

1. Usuario completa KYC → se guarda con GUSER123
2. Anchor consulta: "¿GUSER123 tiene KYC?"
3. Backend verifica en blockchain: "¿GANCHOR456 tiene permiso de GUSER123?"
4. Si sí → devuelve datos
5. Si no → devuelve "no permission"
```

---

## 🔐 Seguridad y Autenticación

### 1. **API Key Authentication**

```javascript
// Ejemplo en Node.js (lo que el anchor implementaría)
const axios = require('axios');

const sakApi = axios.create({
  baseURL: 'https://api.sak-platform.com/v1',
  headers: {
    'Authorization': `Bearer ${process.env.SAK_API_KEY}`,
    'Content-Type': 'application/json'
  }
});

// Consultar estado KYC
async function checkKycStatus(userStellarKey) {
  const response = await sakApi.get('/kyc/status', {
    params: { stellar_public_key: userStellarKey }
  });
  return response.data;
}
```

### 2. **Rate Limiting**

- **Free tier**: 100 requests/día
- **Paid tier**: 10,000 requests/día
- **Enterprise**: Sin límite

### 3. **Webhook Security**

Los webhooks deben incluir:
- **Signature**: HMAC-SHA256 del payload
- **Timestamp**: Para prevenir replay attacks

---

## 📋 Qué Necesita el Anchor para Integrar

### Información Mínima Requerida:

1. **Stellar Public Key del Anchor**
   - Para verificar permisos en blockchain
   - Se registra una vez al crear cuenta

2. **API Key**
   - Se obtiene al registrarse
   - Se usa en cada request

3. **Endpoint de tu API**
   - `https://api.sak-platform.com/v1`

### Código de Integración (Ejemplo para Anchor)

```javascript
// sak-integration.js
class SakClient {
  constructor(apiKey, anchorStellarKey) {
    this.apiKey = apiKey;
    this.anchorStellarKey = anchorStellarKey;
    this.baseURL = 'https://api.sak-platform.com/v1';
  }

  async checkKycStatus(userStellarKey) {
    const response = await fetch(
      `${this.baseURL}/kyc/status?stellar_public_key=${userStellarKey}`,
      {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );
    return await response.json();
  }

  async requestAccess(userStellarKey, kycLevel = 'base') {
    const response = await fetch(`${this.baseURL}/kyc/request-access`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_stellar_public_key: userStellarKey,
        kyc_level_required: kycLevel
      })
    });
    return await response.json();
  }

  async getKycData(userStellarKey, level = 'base') {
    const response = await fetch(
      `${this.baseURL}/kyc/data?stellar_public_key=${userStellarKey}&level=${level}`,
      {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );
    return await response.json();
  }
}

// Uso en el anchor
const sak = new SakClient(
  process.env.SAK_API_KEY,
  process.env.ANCHOR_STELLAR_KEY
);

// Cuando un usuario se registra
async function handleUserRegistration(userStellarKey) {
  // 1. Verificar si ya tiene KYC
  const status = await sak.checkKycStatus(userStellarKey);
  
  if (status.user_found && status.has_permission) {
    // 2. Si tiene permiso, obtener datos
    const kycData = await sak.getKycData(userStellarKey, 'base');
    
    if (kycData.has_permission) {
      // 3. Usar datos para onboarding automático
      console.log('User already verified:', kycData.kyc_data);
      return { verified: true, data: kycData.kyc_data };
    }
  }
  
  // 4. Si no tiene permiso, solicitar acceso
  if (status.user_found && !status.has_permission) {
    await sak.requestAccess(userStellarKey, 'base');
    return { verified: false, access_requested: true };
  }
  
  // 5. Si no existe, redirigir a SAK para completar KYC
  return { verified: false, redirect_to_sak: true };
}
```

---

## 🏛️ Arquitectura del Backend que Necesitás Construir

### Stack Recomendado:

```
Backend API (Node.js/Express o Python/FastAPI)
├── Autenticación (API Keys)
├── Endpoints REST
├── Integración con Soroban (verificar permisos)
├── Integración con Supabase (obtener datos KYC)
└── Webhooks (opcional)
```

### Estructura de Carpetas:

```
backend/
├── src/
│   ├── routes/
│   │   ├── kyc.routes.js      # Endpoints de KYC
│   │   ├── anchors.routes.js  # Registro de anchors
│   │   └── webhooks.routes.js # Webhooks
│   ├── services/
│   │   ├── soroban.service.js # Interacción con smart contracts
│   │   ├── supabase.service.js # Consultas a Supabase
│   │   └── auth.service.js    # Autenticación API keys
│   ├── middleware/
│   │   ├── auth.middleware.js # Verificar API key
│   │   └── rateLimit.middleware.js
│   └── utils/
│       └── stellar.utils.js   # Utilidades Stellar
└── package.json
```

---

## 🔄 Flujo Completo de Integración

### Escenario 1: Usuario Nuevo en Anchor

```
1. Usuario se registra en Anchor con Stellar Key: GUSER123
2. Anchor llama: GET /kyc/status?stellar_public_key=GUSER123
3. Response: { user_found: false }
4. Anchor redirige usuario a SAK para completar KYC
5. Usuario completa KYC en SAK
6. Usuario otorga permiso al Anchor desde SAK dashboard
7. Smart contract registra permiso
8. Anchor recibe webhook (opcional): "User granted access"
9. Anchor llama: GET /kyc/data?stellar_public_key=GUSER123
10. Response: { has_permission: true, kyc_data: {...} }
11. Anchor completa onboarding automáticamente
```

### Escenario 2: Usuario Ya Verificado

```
1. Usuario se registra en Anchor con Stellar Key: GUSER123
2. Anchor llama: GET /kyc/status?stellar_public_key=GUSER123
3. Response: { 
     user_found: true, 
     has_permission: true,
     highest_level: "sepa"
   }
4. Anchor llama: GET /kyc/data?stellar_public_key=GUSER123&level=sepa
5. Response: { has_permission: true, kyc_data: {...} }
6. Anchor completa onboarding instantáneamente (sin KYC)
```

### Escenario 3: Usuario Verificado pero Sin Permiso

```
1. Usuario se registra en Anchor con Stellar Key: GUSER123
2. Anchor llama: GET /kyc/status?stellar_public_key=GUSER123
3. Response: { 
     user_found: true, 
     has_permission: false
   }
4. Anchor llama: POST /kyc/request-access
5. Usuario recibe notificación en SAK
6. Usuario otorga permiso desde SAK
7. Anchor recibe webhook: "User granted access"
8. Anchor llama: GET /kyc/data
9. Response: { has_permission: true, kyc_data: {...} }
```

---

## 📊 Información de Stellar que Necesitás

### 1. **Stellar Public Keys**
- Identificador único de usuarios y anchors
- Formato: `G` seguido de 56 caracteres
- Ejemplo: `GABC123...XYZ789`

### 2. **Smart Contracts en Soroban**
- Contrato de permisos (grant/revoke)
- Contrato de auditoría (log de accesos)
- Contrato de estado KYC (opcional, para consultas rápidas)

### 3. **Stellar Network**
- **Testnet**: Para desarrollo y pruebas
- **Mainnet**: Para producción

### Librerías Necesarias:

```javascript
// Para interactuar con Soroban
npm install @stellar/stellar-sdk
npm install @stellar/soroban-client

// Para Stellar básico
npm install stellar-sdk
```

---

## 🎯 Resumen: Qué Necesita el Anchor

### Mínimo Requerido:
1. ✅ **API Key** (se obtiene al registrarse)
2. ✅ **Stellar Public Key del Anchor** (se registra una vez)
3. ✅ **Endpoint de tu API** (`https://api.sak-platform.com/v1`)
4. ✅ **3 llamadas HTTP simples** (check status, request access, get data)

### No Necesita:
- ❌ SDK (pueden usar HTTP directamente)
- ❌ Instalar nada especial
- ❌ Conocer detalles de Soroban (vos manejás eso)
- ❌ Acceso a Supabase (vos manejás eso)

### Lo que Vos Necesitás Construir:

1. **Backend API REST** (Node.js/Python)
2. **Smart Contracts Soroban** (permisos)
3. **Integración Stellar SDK** (verificar permisos)
4. **Documentación API** (Swagger/OpenAPI)
5. **Dashboard para anchors** (opcional, para ver estadísticas)

---

## 📝 Próximos Pasos

1. **Construir Backend API** con los endpoints mencionados
2. **Implementar Smart Contracts** en Soroban
3. **Crear documentación API** (Swagger)
4. **Hacer prueba de concepto** con un anchor pequeño
5. **Iterar** basado en feedback

¿Querés que te ayude a construir el backend API o los smart contracts?

