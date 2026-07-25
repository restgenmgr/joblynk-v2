const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const form = e.target;
        const message = document.getElementById("message");

        const fullName = document
            .getElementById("fullname")
            .value
            .trim();

        const email = document
            .getElementById("email")
            .value
            .trim();

        const password = document
            .getElementById("password")
            .value;

        console.log("Registering:", email);
        console.log("Supabase client:", window.supabaseClient);

        /*
        ==========================================
        CHECK SUPABASE CONNECTION
        ==========================================
        */

        if (!window.supabaseClient) {

            message.textContent =
                "Registration system is not connected.";

            console.error(
                "ERROR: window.supabaseClient is undefined."
            );

            return;
        }

        /*
        ==========================================
        REGISTER USER
        ==========================================
        */

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

        /*
        ==========================================
        HANDLE ERROR
        ==========================================
        */

        if (error) {

            console.error(
                "REGISTRATION ERROR:",
                error
            );

            message.textContent =
                "Registration failed: " + error.message;

            return;
        }

        /*
        ==========================================
        SUCCESS
        ==========================================
        */

        form.reset();

        if (data.user && !data.session) {

            message.textContent =
                "Registration successful. Please check your email to confirm your account.";

        } else {

            message.textContent =
                "Registration successful. You are now logged in.";

        }

        console.log(
            "Registration complete:",
            data
        );

    });

}
