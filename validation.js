
// =====================================
// REGISTRATION FORM VALIDATION
// =====================================

document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("registrationForm");

    if (!form) return;

    const fields = {
        fullName: document.getElementById("fullName"),
        empId: document.getElementById("empId"),
        email: document.getElementById("email"),
        mobile: document.getElementById("mobile"),
        dept: document.getElementById("dept"),
        password: document.getElementById("password"),
        confirmPassword: document.getElementById("confirmPassword")
    };

    const errors = {
        fullName: document.getElementById("fullNameError"),
        empId: document.getElementById("empIdError"),
        email: document.getElementById("emailError"),
        mobile: document.getElementById("mobileError"),
        dept: document.getElementById("deptError"),
        password: document.getElementById("passwordError"),
        confirmPassword: document.getElementById("confirmPasswordError")
    };

    const registerBtn = document.getElementById("registerBtn");

    const patterns = {
        fullName: /^[a-zA-Z\s]{2,50}$/,
        empId: /^[A-Z0-9]{6,12}$/i,
        email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        mobile: /^[6-9]\d{9}$/,
        password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/
    };

    function validateField(name) {

        const field = fields[name];
        const value = field.value.trim();
        let valid = false;
        let message = "";

        switch (name) {

            case "fullName":
                valid = patterns.fullName.test(value);
                message = "Enter 2–50 alphabetic characters only.";
                break;

            case "empId":
                valid = patterns.empId.test(value);
                message = "ID must contain 6–12 letters or numbers.";
                break;

            case "email":
                valid = patterns.email.test(value);
                message = "Enter a valid email address.";
                break;

            case "mobile":
                valid = patterns.mobile.test(value);
                message = "Enter a valid 10-digit mobile number.";
                break;

            case "dept":
                valid = value !== "";
                message = "Please select your division.";
                break;

            case "password":
                valid = patterns.password.test(value);
                message = "Use 8+ characters with uppercase, lowercase, number and symbol.";
                break;

            case "confirmPassword":
                valid = value !== "" && value === fields.password.value;
                message = "Passwords do not match.";
                break;
        }

        field.classList.toggle("valid", valid);
        field.classList.toggle("invalid", !valid);

        errors[name].textContent = valid ? "" : message;

        field.dataset.valid = String(valid);

        return valid;
    }

    function validateAll() {
        return Object.keys(fields).every(validateField);
    }

    function updateButton() {
        const valid = validateAll();
        registerBtn.disabled = !valid;
    }

    Object.keys(fields).forEach(function (name) {

        const field = fields[name];

        field.addEventListener("blur", function () {
            validateField(name);
            updateButton();
        });

        field.addEventListener("input", function () {
            validateField(name);

            if (name === "password") {
                validateField("confirmPassword");
            }

            updateButton();
        });

        field.addEventListener("change", function () {
            validateField(name);
            updateButton();
        });

    });

    form.addEventListener("submit", function (event) {

        event.preventDefault();

        if (!validateAll()) {
            form.reportValidity();
            return;
        }

        const registrationData = {
            name: fields.fullName.value.trim(),
            empId: fields.empId.value.trim(),
            email: fields.email.value.trim(),
            mobile: fields.mobile.value.trim(),
            dept: fields.dept.value,
            password: fields.password.value
        };

        // Demo storage only. Do not use localStorage
        // for real passwords or production authentication.
        const users = JSON.parse(localStorage.getItem("stayUsers") || "[]");

        const exists = users.some(function (user) {
            return user.email.toLowerCase() === registrationData.email.toLowerCase()
                || user.empId.toLowerCase() === registrationData.empId.toLowerCase();
        });

        if (exists) {
            alert("An account with this email or ID already exists.");
            return;
        }

        users.push(registrationData);
        localStorage.setItem("stayUsers", JSON.stringify(users));

        alert("Registration successful! Please sign in.");

        window.location.href = "signin.html";
    });

    registerBtn.disabled = true;

});
