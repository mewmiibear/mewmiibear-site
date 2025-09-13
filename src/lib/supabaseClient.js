import { createClient } from '@supabase/supabase-js';

// TODO: Replace with your actual Supabase project URL and anon key
const supabaseUrl = 'https://gubpkjwviqwzoihplwpp.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd1YnBrand2aXF3em9paHBsd3BwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc3MzkxMzUsImV4cCI6MjA3MzMxNTEzNX0.nsBKTMHiwa6MDZQc-UC1p6weMNmpdTlVKJuXgPjBkTc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
