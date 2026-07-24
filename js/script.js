const newsletterForm = document.getElementById("newsletterForm");

if (newsletterForm) {
    newsletterForm.addEventListener("submit", async function (e) {

        e.preventDefault();

        const emailInput = document.getElementById("newsletterEmail");
        const message = document.getElementById("newsletterMessage");

        const email = emailInput.value.trim();

        const { error } = await window.supabaseClient
            .from("newsletter_subscribers")
            .insert([
                {
                    email: email
                }
            ]);

        if (error) {
            console.error(error);

            if (error.code === "23505") {
                message.textContent = "This email is already subscribed.";
            } else {
                message.textContent = "Subscription failed. Please try again.";
            }

            return;
        }

        // Clear the form only after successful submission
        newsletterForm.reset();

        message.textContent =
            "Subscription successful! Thank you for joining JobLynk.";

    });
}
