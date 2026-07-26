console.log("register.js loaded");

document.getElementById("registerForm").addEventListener("submit", async (e) => {

    e.preventDefault();

    const fullName = document.getElementById("fullname").value.trim();
    const email = document.getElementById("email").value.trim();
    const confirmEmail = document.getElementById("confirmEmail").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const password = document.getElementById("password").value;
    const optIn = document.getElementById("optIn").checked;

    if (email.toLowerCase() !== confirmEmail.toLowerCase()) {
        alert("Email addresses do not match. Please check and try again.");
        return;
    }

    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasDigit = /[0-9]/.test(password);

    if (password.length < 8 || !hasLower || !hasUpper || !hasDigit) {
        alert("Password must be at least 8 characters and include a lowercase letter, an uppercase letter, and a number.");
        return;
    }

    console.log("Attempting registration...");

    const { data, error } = await window.supabaseClient.auth.signUp({
        email: email,
        password: password,
        options: {
            emailRedirectTo: "https://joblynk.live/dashboard.html",
            data: {
                full_name: fullName,
                phone: phone,
                opt_in: optIn
            }
        }
    });

    console.log("DATA:", data);
    console.log("ERROR:", error);

    if (error) {
        alert(error.message);
        return;
    }

    // Supabase returns a "fake success" with an empty identities array
    // when the email is already registered, to prevent account enumeration.
    if (data && data.user && Array.isArray(data.user.identities) && data.user.identities.length === 0) {
        alert("This email is already registered. Try logging in instead, or use 'Forgot password' on the login page.");
        return;
    }

    alert("Account created! Please check your email (including spam/junk folder) to confirm your registration.");

    console.log("Redirecting to login...");

    document.getElementById("registerForm").reset();
    window.location.href = "login.html";

});
