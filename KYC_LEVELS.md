# Niveles KYC - Definiciones

## NIVEL 1 — BASE

**Propósito:** Verificación básica de identidad

**Campos requeridos:**
- `fullName` (string): Nombre completo del usuario
- `dateOfBirth` (string): Fecha de nacimiento (formato ISO 8601, validación 18+)
- `country` (string): País de residencia (código de país)
- `email` (string): Dirección de correo electrónico (validación de formato)
- `documentIdUrl` (string): URL del documento de identidad subido (imagen o PDF)

**Validaciones:**
- Nombre completo debe tener al menos 3 caracteres e incluir espacio (nombre y apellido)
- Usuario debe ser mayor de 18 años
- Email debe tener formato válido
- Documento ID es obligatorio

**Resultado al completar:** 
```
"KYC Básico completado"
```

---

## NIVEL 2 — SEPA (Intermedio/Bancario)

**Propósito:** Verificación bancaria e intermedia

**Campos requeridos:**
- **Todos los campos del Nivel 1** +
- `selfieUrl` (string): URL de la selfie del usuario (imagen)
- `proofOfAddressUrl` (string): URL de la prueba de domicilio (imagen o PDF)
- `iban` (string): IBAN o número de cuenta bancaria

**Validaciones:**
- Todas las validaciones del Nivel 1
- Selfie es obligatoria
- Prueba de domicilio es obligatoria
- IBAN debe tener formato válido (2 letras + 2 dígitos + alfanumérico, 15-34 caracteres)

**Estructura TypeScript:**
```typescript
interface KycSepaData extends KycBaseData {
  selfieUrl: string;
  proofOfAddressUrl: string;
  iban: string;
}
```

**Resultado al completar:**
```
"KYC Intermedio completado"
```

---

## NIVEL 3 — FULL / ENHANCED (AAA)

**Propósito:** Verificación completa y avanzada con screening AML

**Campos requeridos:**
- **Todos los campos del Nivel 2** +
- `additionalDocumentUrl` (string): URL de validación documental adicional (imagen o PDF)
- `proofOfFundsUrl` (string): URL de prueba de ingresos/fondos (imagen o PDF)
- `amlScreeningResult` ('OK' | 'PENDING' | 'FAILED'): Resultado del screening AML
- `amlScreeningDate` (string, opcional): Fecha/hora del screening (ISO 8601)

**Validaciones:**
- Todas las validaciones del Nivel 2
- Documento adicional es obligatorio
- Prueba de ingresos/fondos es obligatoria
- AML screening debe estar completado con resultado

**Estructura TypeScript:**
```typescript
interface KycAaaData extends KycSepaData {
  additionalDocumentUrl: string;
  proofOfFundsUrl: string;
  amlScreeningResult: 'OK' | 'PENDING' | 'FAILED';
  amlScreeningDate?: string;
}
```

**Proceso de Screening AML:**
1. Usuario hace clic en "Iniciar Screening AML"
2. Simulación de 2 segundos de procesamiento
3. Resultado automático: `amlScreeningResult = 'OK'`
4. Se guarda `amlScreeningDate` con timestamp actual
5. Se muestra mensaje: "Screening AML completado: Resultado OK"

**Resultado al completar:**
```
"KYC Avanzado completado"
```

---

## Jerarquía de Niveles

```
NIVEL 1 (BASE)
├── fullName
├── dateOfBirth
├── country
├── email
└── documentIdUrl

NIVEL 2 (SEPA) = NIVEL 1 +
├── selfieUrl
├── proofOfAddressUrl
└── iban

NIVEL 3 (AAA) = NIVEL 2 +
├── additionalDocumentUrl
├── proofOfFundsUrl
├── amlScreeningResult
└── amlScreeningDate
```

## Almacenamiento

Todos los datos se guardan en Supabase:

**Tabla `kyc_records`:**
- `kyc_type`: 'base' | 'sepa' | 'aaa'
- `status`: 'pending' | 'validated' | 'rejected'
- `data`: JSONB con todos los campos del nivel correspondiente

**Tabla `files`:**
- Referencia al `kyc_record_id`
- `storage_path`: Ruta en Supabase Storage bucket 'kyc-files'

## Flujo de Usuario

1. Usuario conecta wallet Stellar (Freighter)
2. Usuario selecciona nivel KYC desde dashboard
3. Formulario muestra campos según nivel (herencia)
4. Usuario completa y sube documentos
5. En Nivel 3: Usuario ejecuta screening AML simulado
6. Usuario envía formulario
7. Sistema muestra mensaje de completado correspondiente
8. Dashboard actualiza estado del nivel

## Notas Técnicas

- Los niveles son **aditivos**: Nivel 2 incluye Nivel 1, Nivel 3 incluye Nivel 2
- TypeScript usa `extends` para heredar campos entre niveles
- Validadores llaman validadores de niveles previos
- Formularios muestran secciones colapsables para cada nivel
- Cada nivel es independiente en la base de datos (usuario puede completar cualquiera)
