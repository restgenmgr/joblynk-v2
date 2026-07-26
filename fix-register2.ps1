$htmlContent = @'
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Candidate Registration | JobLynk.live</title>
<link rel="stylesheet" href="css/style.css">
</head>
<body>
<div class="container">
<h1>Candidate Registration</h1>
<form id="registerForm">
<p>
<input type="text" id="fullname" placeholder="Full Name" required>
</p>
<p>
<input type="email" id="email" placeholder="Email Address" required>
</p>
<p>
<input type="email" id="confirmEmail" placeholder="Confirm Email Address" required>
</p>
<p>
<input type="tel" id="phone" placeholder="Phone Number" required>
</p>
<p>
<input type="password" id="password" placeholder="Password (min 8 chars, upper, lower, number)" required>
</p>
<p>
<label style="display:flex;align-items:center;gap:8px;color:#555;font-size:0.95rem;">
<input type="checkbox" id="optIn" style="width:auto;">
I'd like to receive job alerts and updates from JobLynk.live
</label>
</p>
<p>
<button type="submit">Create Account</button>
</p>
</form>
<div id="message"></div>
</div>
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script src="js/supabase.js"></script>
<script src="js/register.js"></script>
</body>
</html>
'@

$jsContent = @'
console.log("register.js loaded");

document.getElementById("registerForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const fullName = document.getElementById("fullname").value.trim();
    const email = document.getElementById("email").value.trim();
    const confirmEmail = document.getElementById("confirmEmail").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const password = document.getElementById("password").value;
    const optIn = document.getElementById("optIn").checked;

    if (email.toLowerCase() !== confirmEmail.toLowerCase()) {
        alert("Email addresses do not match. Please check and try again.");
        return;
    }

    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasDigit = /[0-9]/.test(password);

    if (password.length < 8 || !hasLower || !hasUpper || !hasDigit) {
        alert("Password must be at least 8 characters and include a lowercase letter, an uppercase letter, and a number.");
        return;
    }

    console.log("Attempting registration...");

    const { data, error } = await window.supabaseClient.auth.signUp({
        email: email,
        password: password,
        options: {
            emailRedirectTo: "https://joblynk.live/dashboard.html",
            data: {
                full_name: fullName,
                phone: phone,
                opt_in: optIn
            }
        }
    });

    console.log("DATA:", data);
    console.log("ERROR:", error);

    if (error) {
        alert(error.message);
        return;
    }

    if (data && data.user && Array.isArray(data.user.identities) && data.user.identities.length === 0) {
        alert("This email is already registered. Try logging in instead, or use 'Forgot password' on the login page.");
        return;
    }

    alert("Account created! Please check your email (including spam/junk folder) to confirm your registration.");

    console.log("Redirecting to login...");

    document.getElementById("registerForm").reset();
    window.location.href = "login.html";
});
'@

$root = "C:\Users\admin\Desktop\joblynk-v2"
$utf8NoBom = New-Object System.Text.UTF8Encoding $false
[System.IO.File]::WriteAllText("$root\register.html", $htmlContent, $utf8NoBom)
[System.IO.File]::WriteAllText("$root\js\register.js", $jsContent, $utf8NoBom)

Write-Host "Done. New file sizes:"
Get-Item "$root\register.html" | Format-List FullName, Length
Get-Item "$root\js\register.js" | Format-List FullName, Length
