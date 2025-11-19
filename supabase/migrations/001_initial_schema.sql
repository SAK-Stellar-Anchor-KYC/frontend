-- SAK Database Schema
-- Run this in your Supabase SQL Editor

-- KYC Level Definitions:
-- NIVEL 1 - BASE: fullName, dateOfBirth, country, email, documentIdUrl
-- NIVEL 2 - SEPA: Todos los campos del Nivel 1 + selfieUrl, proofOfAddressUrl, iban
-- NIVEL 3 - AAA: Todos los campos del Nivel 2 + additionalDocumentUrl, proofOfFundsUrl, amlScreeningResult, amlScreeningDate

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  stellar_public_key text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create index on stellar_public_key for faster lookups
CREATE INDEX IF NOT EXISTS idx_users_stellar_public_key ON users(stellar_public_key);

-- Create kyc_records table
CREATE TABLE IF NOT EXISTS kyc_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  kyc_type text NOT NULL CHECK (kyc_type IN ('base', 'sepa', 'aaa')),
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'validated', 'rejected')),
  data jsonb,
  validated_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes for kyc_records
CREATE INDEX IF NOT EXISTS idx_kyc_records_user_id ON kyc_records(user_id);
CREATE INDEX IF NOT EXISTS idx_kyc_records_kyc_type ON kyc_records(kyc_type);
CREATE INDEX IF NOT EXISTS idx_kyc_records_status ON kyc_records(status);
CREATE UNIQUE INDEX IF NOT EXISTS idx_kyc_records_user_type ON kyc_records(user_id, kyc_type);

-- Create files table
CREATE TABLE IF NOT EXISTS files (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  kyc_record_id uuid REFERENCES kyc_records(id) ON DELETE CASCADE,
  filename text NOT NULL,
  storage_path text NOT NULL,
  file_type text NOT NULL CHECK (file_type IN ('image', 'pdf', 'video')),
  uploaded_at timestamptz DEFAULT now()
);

-- Create index on kyc_record_id
CREATE INDEX IF NOT EXISTS idx_files_kyc_record_id ON files(kyc_record_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for kyc_records
DROP TRIGGER IF EXISTS update_kyc_records_updated_at ON kyc_records;
CREATE TRIGGER update_kyc_records_updated_at
  BEFORE UPDATE ON kyc_records
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
-- Note: For client-side prototype, RLS is simplified
-- In production with backend, implement proper RLS policies

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE kyc_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE files ENABLE ROW LEVEL SECURITY;

-- Create permissive policies for prototype (INSECURE - for development only)
-- In production, replace with proper policies based on authenticated user

CREATE POLICY "Enable read access for all users" ON users
  FOR SELECT USING (true);

CREATE POLICY "Enable insert access for all users" ON users
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable read access for all kyc_records" ON kyc_records
  FOR SELECT USING (true);

CREATE POLICY "Enable insert access for all kyc_records" ON kyc_records
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update access for all kyc_records" ON kyc_records
  FOR UPDATE USING (true);

CREATE POLICY "Enable read access for all files" ON files
  FOR SELECT USING (true);

CREATE POLICY "Enable insert access for all files" ON files
  FOR INSERT WITH CHECK (true);

-- Create storage bucket for files
-- Run this in Supabase Storage section or via SQL:
-- INSERT INTO storage.buckets (id, name, public) VALUES ('kyc-files', 'kyc-files', true);

-- Storage policies (for kyc-files bucket)
-- You'll need to set these in the Supabase Storage Policies UI:
-- 1. Allow public uploads to kyc-files bucket
-- 2. Allow public reads from kyc-files bucket
-- For production: Restrict based on authenticated user

-- Helpful queries for development/testing:

-- View all KYC records with user info
-- SELECT 
--   u.stellar_public_key,
--   k.kyc_type,
--   k.status,
--   k.validated_at,
--   k.created_at
-- FROM kyc_records k
-- JOIN users u ON k.user_id = u.id
-- ORDER BY k.created_at DESC;

-- Count KYCs by type and status
-- SELECT 
--   kyc_type,
--   status,
--   COUNT(*) as count
-- FROM kyc_records
-- GROUP BY kyc_type, status;
