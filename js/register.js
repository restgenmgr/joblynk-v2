document.getElementById("registerForm").addEventListener("submit", async (e) => {

    e.preventDefault();

    const form = e.target;

    const fullName = document.getElementById("fullname").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    console.log("Registering:", email);

    const { data, error } =
        await window.supabaseClient.auth.signUp({

            email: email,
            password: password,

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

    // Clear form after successful registration
    form.reset();

    if (data.user && !data.session) {
        alert("Registration successful. Please check your email to confirm your account.");
    } else {
        alert("Registration successful. You are now logged in.");
    }

    console.log(data);

});
