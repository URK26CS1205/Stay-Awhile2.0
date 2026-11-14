
// =====================================
// SIGNUP AND SIGNIN FUNCTIONALITY
// =====================================

document.addEventListener("DOMContentLoaded", function () {

    function getUsers() {
        return JSON.parse(localStorage.getItem("stayUsers") || "[]");
    }

    // =================================
    // SIGNUP
    // =================================

    const signupForm = document.getElementById("signupForm");

    if (signupForm) {

        signupForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const email = document.getElementById("signupEmail").value.trim();
            const password = document.getElementById("signupPassword").value;
            const terms = document.getElementById("terms").checked;

            const emailError = document.getElementById("signupEmailError");
            const passwordError = document.getElementById("signupPasswordError");
            const termsError = document.getElementById("termsError");
            const message = document.getElementById("signupMessage");

            emailError.textContent = "";
            passwordError.textContent = "";
            termsError.textContent = "";
            message.classList.remove("show");

            const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

            let valid = true;

            if (!emailPattern.test(email)) {
                emailError.textContent = "Please enter a valid email.";
                valid = false;
            }

            if (!passwordPattern.test(password)) {
                passwordError.textContent =
                    "Use 8+ characters with uppercase, lowercase, number and symbol.";
                valid = false;
            }

            if (!terms) {
                termsError.textContent = "Please accept the Terms of Service.";
                valid = false;
            }

            if (!valid) return;

            const users = getUsers();

            const exists = users.some(function (user) {
                return user.email.toLowerCase() === email.toLowerCase();
            });

            if (exists) {
                message.textContent = "An account with this email already exists.";
                message.classList.add("show");
                return;
            }

            users.push({
                name: email.split("@")[0],
                email: email,
                password: password
            });

            localStorage.setItem("stayUsers", JSON.stringify(users));

            alert("Account created successfully! Please sign in.");

            window.location.href = "signin.html";
        });
    }

    // =================================
    // SIGNIN - PASSWORD SHOW/HIDE
    // =================================

    const passwordInput = document.getElementById("signinPassword");
    const togglePassword = document.getElementById("togglePassword");

    if (passwordInput && togglePassword) {

        togglePassword.addEventListener("click", function () {

            if (passwordInput.type === "password") {
                passwordInput.type = "text";
                togglePassword.textContent = "◎";
                togglePassword.setAttribute("aria-label", "Hide password");
            } else {
                passwordInput.type = "password";
                togglePassword.textContent = "◉";
                togglePassword.setAttribute("aria-label", "Show password");
            }

        });
    }

    // =================================
    // SIGNIN - CREDENTIAL VALIDATION
    // =================================

    const signinForm = document.getElementById("signinForm");

    if (signinForm) {

        signinForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const email = document.getElementById("signinEmail").value.trim();
            const password = document.getElementById("signinPassword").value;
            const message = document.getElementById("signinMessage");

            message.textContent = "";
            message.classList.remove("show");

            const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

            if (!emailPattern.test(email) || password.length === 0) {
                message.textContent = "Please enter a valid email and password.";
                message.classList.add("show");
                return;
            }

            const users = getUsers();

            const user = users.find(function (item) {
                return item.email.toLowerCase() === email.toLowerCase()
                    && item.password === password;
            });

            if (!user) {
                message.textContent =
                    "Incorrect email or password. Please try again.";
                message.classList.add("show");
                return;
            }

            localStorage.setItem("stayCurrentUser", JSON.stringify({
                name: user.name || email.split("@")[0],
                email: user.email
            }));

            window.location.href = "home.html";
        });
    }

    // =================================
    // DASHBOARD WELCOME AND LOGOUT
    // =================================

    const welcomeName = document.getElementById("welcomeName");

    if (welcomeName) {
        const currentUser = JSON.parse(
            localStorage.getItem("stayCurrentUser") || "null"
        );

        if (currentUser) {
            welcomeName.textContent = currentUser.name;
        }
    }

    function logout() {
        localStorage.removeItem("stayCurrentUser");
        window.location.href = "signin.html";
    }

    const logoutBtn = document.getElementById("logoutBtn");
    const sidebarLogout = document.getElementById("sidebarLogout");

    if (logoutBtn) {
        logoutBtn.addEventListener("click", logout);
    }

    if (sidebarLogout) {
        sidebarLogout.addEventListener("click", function (event) {
            event.preventDefault();
            logout();
        });
    }

});
