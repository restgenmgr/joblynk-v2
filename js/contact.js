const contactForm = document.getElementById("contactForm");

const contactStatus = document.getElementById("contactStatus");

if (contactForm) {

    contactForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        contactStatus.textContent =
            "Sending your message...";

        const fullName =
            document.getElementById("fullName").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const phone =
            document.getElementById("phone").value.trim();

        const subject =
            document.getElementById("subject").value.trim();

        const message =
            document.getElementById("message").value.trim();

        const { data, error } =
            await window.supabaseClient
                .from("contact_messages")
                .insert([
                    {
                        full_name: fullName,
                        email: email,
                        phone: phone,
                        subject: subject,
                        message: message
                    }
                ]);

        if (error) {

            console.error("SUPABASE ERROR:", error);

            contactStatus.textContent =
                "Message failed: " + error.message;

            return;
        }

        contactForm.reset();

        contactStatus.textContent =
            "Thank you. Your message has been received.";

    });

}
