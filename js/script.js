const newsletterForm = document.getElementById("newsletterForm");

if (newsletterForm) {
    newsletterForm.addEventListener("submit", async function (e) {

        e.preventDefault();

        const emailInput = document.getElementById("newsletterEmail");
        const message = document.getElementById("newsletterMessage");

        const email = emailInput.value.trim();

        console.log("Submitting email:", email);
        console.log("Supabase client:", window.supabaseClient);

        const { data, error } = await window.supabaseClient
            .from("newsletter_subscribers")
            .insert([
                {
                    email: email
                }
            ]);

        console.log("DATA:", data);
        console.log("ERROR:", error);

        if (error) {
            console.error("SUPABASE ERROR:", error);

            if (error.code === "23505") {
                message.textContent = "This email is already subscribed.";
            } else {
                message.textContent =
                    "Subscription failed: " + error.message;
            }

            return;
        }

        newsletterForm.reset();

        message.textContent =
            "Subscription successful! Thank you for joining JobLynk.";

    });
}
