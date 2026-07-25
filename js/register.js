const response = await window.supabaseClient.auth.signUp({
    email: email,
    password: password,
    options: {
        emailRedirectTo: "https://joblynk.live/dashboard.html",
        data: {
            full_name: fullName
        }
    }
});
