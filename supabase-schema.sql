-- Create terms_acceptances table
CREATE TABLE IF NOT EXISTS public.terms_acceptances (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    mobile TEXT NOT NULL,
    accepted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create admin_users table (for future use)
CREATE TABLE IF NOT EXISTS public.admin_users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_terms_acceptances_email ON public.terms_acceptances(email);
CREATE INDEX IF NOT EXISTS idx_terms_acceptances_created_at ON public.terms_acceptances(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_terms_acceptances_name ON public.terms_acceptances(name);
CREATE INDEX IF NOT EXISTS idx_terms_acceptances_mobile ON public.terms_acceptances(mobile);

-- Enable Row Level Security (RLS)
ALTER TABLE public.terms_acceptances ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Create policies for terms_acceptances
-- Allow anyone to insert (for the public form)
CREATE POLICY "Allow public insert" ON public.terms_acceptances
    FOR INSERT WITH CHECK (true);

-- Allow anyone to read (for admin dashboard - you might want to restrict this)
CREATE POLICY "Allow public read" ON public.terms_acceptances
    FOR SELECT USING (true);

-- Create policies for admin_users (restrict access)
CREATE POLICY "Admin users read own" ON public.admin_users
    FOR SELECT USING (auth.uid() = id);

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers to automatically update the updated_at column
CREATE TRIGGER handle_updated_at_terms_acceptances
    BEFORE UPDATE ON public.terms_acceptances
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_updated_at_admin_users
    BEFORE UPDATE ON public.admin_users
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Insert a sample admin user (password: admin123)
-- Note: In production, use proper password hashing
INSERT INTO public.admin_users (username, password_hash) 
VALUES ('admin', 'admin123') 
ON CONFLICT (username) DO NOTHING;