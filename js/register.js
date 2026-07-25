document.getElementById("registerForm").addEventListener("submit", async (e) => {

    e.preventDefault();

    const fullName = document.getElementById("fullname").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    console.clear();
    console.log("Starting signup...");

    try {

        const response = await window.supabaseClient.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    full_name: fullName
                }
            }
        });

        console.log("FULL RESPONSE:");
        console.log(response);

        if (response.error) {
            alert(response.error.message);
            return;
        }

        alert("Signup request completed.");

    } catch (err) {

        console.error("EXCEPTION:");
        console.error(err);
        alert(err.message);

    }

});
