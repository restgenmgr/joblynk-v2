console.log("login.js loaded");

document.getElementById("loginForm").addEventListener("submit", async (e) => {
 
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    console.log("Attempting login...");

    const { data, error } =
        await window.supabaseClient.auth.signInWithPassword({
            email,
            password
        });

    console.log("DATA:", data);
    console.log("ERROR:", error);

    if (error) {
        alert(error.message);
        return;
    }

    alert("Login Successful!");

    console.log("Redirecting to dashboard...");

    window.location.href = "dashboard.html";

});
