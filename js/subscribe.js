const subscribeForm = document.getElementById("subscribeForm");
const subscribeStatus = document.getElementById("subscribeStatus");

if (subscribeForm) {

    subscribeForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        subscribeStatus.textContent = "Subscribing...";

        const email =
            document.getElementById("subscribeEmail").value.trim();

        const { error } =
            await window.supabaseClient
                .from("subscribers")
                .insert([
                    {
                        email: email
                    }
                ]);

        if (error) {

            console.error("SUPABASE ERROR:", error);

            if (error.code === "23505") {
                subscribeStatus.textContent =
                    "You're already subscribed. Thank you!";
            } else {
                subscribeStatus.textContent =
                    "Subscription failed: " + error.message;
            }

            return;
        }

        subscribeForm.reset();

        subscribeStatus.textContent =
            "Thanks for subscribing! You're on the list.";

    });

}