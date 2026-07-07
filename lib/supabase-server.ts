import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const getSupabaseUrl = () =>
  process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || "";

const getSupabaseServiceRoleKey = () => process.env.SUPABASE_SERVICE_ROLE_KEY || "";

export function createSupabaseServerClient(): SupabaseClient | null {
  const url = getSupabaseUrl();
  const key = getSupabaseServiceRoleKey();

  if (!url || !key) {
    return null;
  }

  return createClient(url, key);
}

export const supabaseServer = createSupabaseServerClient();