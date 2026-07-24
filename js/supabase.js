document.getElementById("registerForm").addEventListener("submit", async (e) => {

    e.preventDefault();

    const fullName = document.getElementById("fullname").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const { data, error } = await window.supabaseClient.auth.signUp({
        email,
        password,
        options: {
            data: {
                full_name: fullName
            }
        }
    });

    if (error) {
        alert(error.message);
        return;
    }

    console.log(data);

    if (data.user && data.session) {
        alert("Registration successful. You are now logged in.");
    } else if (data.user) {
        alert("Registration successful.");
    } else {
        alert("Unknown response from Supabase.");
    }

});
