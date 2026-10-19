// Seules les variables EXPO_PUBLIC_* sont embarquées dans l'app (voir .env.example).
export const env = {
  supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL ?? "",
  supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? "",
  maptilerKey: process.env.EXPO_PUBLIC_MAPTILER_KEY ?? "",
};
