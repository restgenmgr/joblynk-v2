const SUPABASE_URL = "https://mjpxtkqvdalpmcudfagn.supabase.co";

const SUPABASE_ANON_KEY = "sb_publishable_mnulkfbifdqxyQ5WT-9Tig_uPqTEdNB";

window.supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);

console.log("Supabase Connected");
console.log(window.supabaseClient);