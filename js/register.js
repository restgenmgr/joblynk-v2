document.getElementById("registerForm").addEventListener("submit", async (e) => {

    e.preventDefault();

    const fullName = document.getElementById("fullname").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const { data, error } = await window.supabaseClient.auth.signUp({

        email: email,
        password: password,

        options: {

            data: {
                full_name: fullName
            }

        }

    });

    if (error) {

        alert(error.message);

    } else {

        alert("Registration Successful! Please check your email to verify your account.");

    }

});