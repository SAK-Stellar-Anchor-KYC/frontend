# Supabase Setup Instructions

## 1. Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in
3. Create a new project
4. Note down your project URL and anon key

## 2. Run Database Migrations

1. Open your Supabase project dashboard
2. Go to SQL Editor
3. Copy and paste the contents of `001_initial_schema.sql`
4. Click "Run" to execute the migration

## 3. Create Storage Bucket

1. Go to Storage in your Supabase dashboard
2. Click "Create bucket"
3. Name: `kyc-files`
4. Set as Public bucket (for prototype)
5. Click "Create"

## 4. Configure Storage Policies

For development/prototype, set permissive policies:

1. Go to Storage → kyc-files → Policies
2. Create new policy:
   - Name: "Public upload"
   - Policy: INSERT
   - Target roles: public
   - Check expression: `true`
3. Create another policy:
   - Name: "Public read"
   - Policy: SELECT
   - Target roles: public
   - Check expression: `true`

**WARNING**: These policies are insecure and only for development. In production:
- Implement authentication backend
- Restrict access based on authenticated user
- Add file size and type validation
- Enable virus scanning

## 5. Update Environment Variables

Copy your Supabase credentials to `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_SUPABASE_BUCKET=kyc-files
```

## 6. Production Considerations

Before deploying to production:

1. **Backend Implementation**: Move to server-side KYC processing
2. **Authentication**: Implement proper auth (JWT, session management)
3. **RLS Policies**: Update Row Level Security policies to restrict by user
4. **Encryption**: Encrypt PII data before storage
5. **File Validation**: Server-side file validation and virus scanning
6. **Rate Limiting**: Prevent abuse
7. **Audit Logging**: Track all KYC operations
8. **Compliance**: Ensure GDPR/CCPA compliance
9. **Backup**: Configure automated backups
10. **Monitoring**: Set up alerting for errors and suspicious activity
