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

    alert("Account created! Please check your email to confirm your registration.");
    console.log("Redirecting to login...");
    window.location.href = "login.html";
});