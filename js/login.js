document.getElementById("loginForm").addEventListener("submit", async (e) => {

    e.preventDefault();

    const email = document.getElementById("email").value;

    const password = document.getElementById("password").value;

    const { data, error } =
    await window.supabaseClient.auth.signInWithPassword({

        email,
        password

    });

    if (error) {

        alert(error.message);
        return;

    }

    alert("Login Successful!");

    console.log(data);

    window.location.href = "dashboard.html";

});
