# Supabase Integration Setup

## Database Setup

1. **Go to your Supabase project dashboard**
   - Navigate to https://supabase.com/dashboard
   - Select your project: `czhbxbzjvdrqrtgwqbih`

2. **Run the SQL Schema**
   - Go to the SQL Editor in your Supabase dashboard
   - Copy and paste the contents of `supabase-schema.sql`
   - Click "Run" to execute the schema

3. **Verify Tables Created**
   - Go to the Table Editor
   - You should see two new tables:
     - `terms_acceptances` - stores user form submissions
     - `admin_users` - stores admin credentials (for future use)

## Environment Variables

Your `.env.local` file is already configured with:
```
VITE_SUPABASE_URL=https://czhbxbzjvdrqrtgwqbih.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Features Now Available

### Terms Acceptance Form
- ✅ Real-time data submission to Supabase
- ✅ Form validation and error handling
- ✅ Success notifications

### Admin Dashboard
- ✅ Live data loading from database
- ✅ Real-time search functionality
- ✅ User statistics display
- ✅ Responsive data table

### Admin Authentication
- ✅ Secure login system (demo: admin/admin123)
- ✅ Session management

## Database Schema

### terms_acceptances table
- `id` (UUID, Primary Key)
- `name` (Text, Required)
- `email` (Text, Required)
- `mobile` (Text, Required)
- `accepted_at` (Timestamp)
- `created_at` (Timestamp)
- `updated_at` (Timestamp)

### Security Features
- Row Level Security (RLS) enabled
- Public insert policy for form submissions
- Public read policy for admin dashboard
- Automatic timestamp updates

## Testing the Integration

1. **Test Form Submission**
   - Fill out the terms acceptance form
   - Check Supabase dashboard to see the new record

2. **Test Admin Dashboard**
   - Login with admin/admin123
   - View submitted records
   - Test search functionality

3. **Verify Real-time Updates**
   - Submit a form in one browser tab
   - Refresh admin dashboard in another tab
   - New record should appear immediately

## Production Considerations

For production deployment, consider:

1. **Enhanced Security**
   - Implement proper password hashing for admin users
   - Add JWT-based authentication
   - Restrict RLS policies based on user roles

2. **Data Validation**
   - Add database constraints
   - Implement server-side validation
   - Add email format validation

3. **Performance**
   - Add pagination for large datasets
   - Implement caching strategies
   - Optimize database queries

4. **Monitoring**
   - Set up error tracking
   - Add logging for admin actions
   - Monitor database performance