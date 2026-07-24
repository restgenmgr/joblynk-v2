document.getElementById("registerForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const fullName = document.getElementById("fullname").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    console.log("Registering:", email);

    const { data, error } = await window.supabaseClient.auth.signUp({
        email,
        password,
        options: {
            data: {
                full_name: fullName
            }
        }
    });

    console.log("DATA:", data);
    console.log("ERROR:", error);

    if (error) {
        alert("ERROR: " + error.message);
        return;
    }

    alert(JSON.stringify(data, null, 2));
});
