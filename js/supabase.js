const SUPABASE_URL = "https://qhonipunkibmcifuzjcf.supabase.co";

const SUPABASE_ANON_KEY = "sb_publishable_LasHnUnDsJLQdMocHw0-OQ_lT3G6mnm";

window.supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);

console.log("Connected to:", SUPABASE_URL);
