# 🚀 Quick Start Guide

Get the SAK application running in under 10 minutes!

## Prerequisites Checklist

- [ ] Node.js 18+ installed
- [ ] npm installed
- [ ] Supabase account (free tier)
- [ ] Freighter wallet extension (or use mock wallet)

## Step 1: Install Dependencies

```powershell
cd c:\dev_4x\kyc
npm install
```

## Step 2: Setup Supabase

### 2.1 Create Project
1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Fill in project details
4. Wait for database to initialize (~2 minutes)

### 2.2 Run Database Migration
1. Open your Supabase dashboard
2. Navigate to **SQL Editor**
3. Click "New Query"
4. Copy/paste contents from `supabase/migrations/001_initial_schema.sql`
5. Click "Run"
6. Verify tables created: `users`, `kyc_records`, `files`

### 2.3 Create Storage Bucket
1. Navigate to **Storage** in Supabase dashboard
2. Click "Create a new bucket"
3. Name: `kyc-files`
4. Make it **Public** (for prototype)
5. Click "Create bucket"

### 2.4 Setup Storage Policies
1. Go to Storage → `kyc-files` → Policies
2. Click "New Policy"
3. Create two policies:

**Policy 1: Upload**
- Name: "Public uploads"
- Allowed operation: INSERT
- Target roles: public
- Policy definition: `true`

**Policy 2: Read**
- Name: "Public reads"
- Allowed operation: SELECT
- Target roles: public
- Policy definition: `true`

### 2.5 Get Credentials
1. Go to **Settings** → **API**
2. Copy **Project URL**
3. Copy **anon public** key

## Step 3: Configure Environment

Create `.env.local`:

```powershell
cp .env.example .env.local
```

Edit `.env.local` with your credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
NEXT_PUBLIC_SUPABASE_BUCKET=kyc-files
NEXT_PUBLIC_APP_NAME=SAK
NEXT_PUBLIC_USE_MOCK_WALLET=false
```

## Step 4: Run Development Server

```powershell
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Step 5: Test the Application

### Option A: With Freighter Wallet

1. Install [Freighter Extension](https://www.freighter.app/)
2. Create/import a wallet
3. In the app, click "Connect Wallet"
4. Approve connection in Freighter
5. Navigate to Dashboard
6. Start a KYC verification

### Option B: With Mock Wallet (Development)

1. Edit `.env.local`:
   ```env
   NEXT_PUBLIC_USE_MOCK_WALLET=true
   ```
2. Restart dev server: `npm run dev`
3. Click "Connect Wallet" (will use mock)
4. Navigate to Dashboard
5. Start a KYC verification

## Testing KYC Flows

### Test NIVEL 1 - BASE
1. Go to Dashboard → KYC Básico (Nivel 1)
2. Fill in:
   - Nombre Completo: Juan Pérez García
   - Fecha de Nacimiento: 1990-01-01
   - País: Spain
   - Email: juan@example.com
3. Upload Documento ID (imagen o PDF)
4. Click "Enviar KYC Básico"
5. Ver alerta: "KYC Básico completado"
6. Check Dashboard for status

### Test NIVEL 2 - SEPA (Intermedio)
1. Go to Dashboard → KYC Intermedio (Nivel 2)
2. Fill in campos del Nivel 1:
   - Nombre Completo: María López
   - Fecha de Nacimiento: 1992-05-15
   - País: Germany
   - Email: maria@example.com
3. Upload Documento ID
4. Fill in campos adicionales SEPA:
   - Upload Selfie
   - Upload Prueba de Domicilio
   - IBAN: DE89 3704 0044 0532 0130 00
5. Click "Enviar KYC Intermedio"
6. Ver alerta: "KYC Intermedio completado"

### Test NIVEL 3 - AAA (Avanzado)
1. Go to Dashboard → KYC Avanzado (Nivel 3)
2. Fill in todos los campos del Nivel 1 y 2
3. Fill in campos adicionales AAA:
   - Upload Validación Documental Adicional
   - Upload Prueba de Ingresos/Fondos
4. Click "Iniciar Screening AML"
5. Wait 2 seconds for simulation
6. Ver alerta: "Screening AML completado: Resultado OK"
7. Click "Enviar KYC Avanzado"
8. Ver alerta: "KYC Avanzado completado"

## Verify Data in Supabase

1. Go to Supabase Dashboard
2. Navigate to **Table Editor**
3. View `users` table - should see your wallet address
4. View `kyc_records` table - should see your submissions
5. Navigate to **Storage** → `kyc-files` - should see uploaded files

## Common Issues & Solutions

### Issue: "Freighter wallet not detected"
**Solution**: 
- Install Freighter extension
- Refresh the page
- Or enable mock wallet in `.env.local`

### Issue: "Missing Supabase environment variables"
**Solution**:
- Check `.env.local` exists
- Verify NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set
- Restart dev server after changes

### Issue: "File upload fails"
**Solution**:
- Verify storage bucket `kyc-files` exists
- Check bucket is set to Public
- Verify storage policies are configured
- Check file size (default limit: 10MB)

### Issue: "Cannot connect to database"
**Solution**:
- Check Supabase project is active
- Verify credentials are correct
- Check RLS policies are permissive (for development)

### Issue: Build fails
**Solution**:
- Run `npm install` again
- Delete `.next` folder and rebuild
- Check Node.js version (need 18+)

## Next Steps

### For Development
- [ ] Test all three KYC levels
- [ ] Test file uploads
- [ ] Test wallet signature
- [ ] Review data in Supabase

### For Production (DO NOT DEPLOY AS-IS)
- [ ] Implement backend API
- [ ] Add server-side validation
- [ ] Enable proper RLS policies
- [ ] Add file virus scanning
- [ ] Implement encryption
- [ ] Add rate limiting
- [ ] Security audit
- [ ] Compliance review

## Development Tips

### Mock Data
For quick testing, the app includes mock wallet functionality. Enable it to bypass Freighter installation during development.

### Database Reset
To clear all data:
```sql
DELETE FROM files;
DELETE FROM kyc_records;
DELETE FROM users;
```

### View Logs
Check browser console (F12) for detailed error messages and network requests.

### Hot Reload
The Next.js dev server supports hot reload. Changes to most files will reflect immediately without restart.

## Support & Resources

- **README.md** - Full documentation
- **supabase/README.md** - Supabase setup details
- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Stellar Docs](https://developers.stellar.org/)
- [Freighter Docs](https://docs.freighter.app/)

## Security Warning

⚠️ **This is a PROTOTYPE** ⚠️

Do NOT use in production without:
- Backend implementation
- Proper authentication
- Data encryption
- Security audit
- Compliance review

See README.md "Production Recommendations" section for details.

---

**Questions?** Check the main README.md for detailed architecture documentation and troubleshooting.
