import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL =  process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

if (!SUPABASE_URL) {
  throw new Error("Supabase URL is required. Set SUPABASE_URL or NEXT_PUBLIC_SUPABASE_URL in your environment.");
}

if (!SUPABASE_ANON_KEY) {
  throw new Error("Supabase anon key is required. Set NEXT_PUBLIC_SUPABASE_ANON_KEY in your environment.");
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);