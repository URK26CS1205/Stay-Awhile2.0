
// =====================================
// GLOBAL LIGHT / DARK MODE
// =====================================

(function () {

    const savedTheme = localStorage.getItem("stayTheme") || "light";

    document.documentElement.setAttribute("data-theme", savedTheme);

    function updateButtons() {

        const currentTheme =
            document.documentElement.getAttribute("data-theme");

        document.querySelectorAll(".theme-toggle").forEach(function (button) {
            button.textContent = currentTheme === "dark" ? "☀" : "☾";
            button.setAttribute(
                "aria-label",
                currentTheme === "dark" ? "Switch to light mode" : "Switch to dark mode"
            );
        });
    }

    function setupTheme() {

        updateButtons();

        document.querySelectorAll(".theme-toggle").forEach(function (button) {

            button.addEventListener("click", function () {

                const currentTheme =
                    document.documentElement.getAttribute("data-theme");

                const newTheme =
                    currentTheme === "dark" ? "light" : "dark";

                document.documentElement.setAttribute("data-theme", newTheme);

                localStorage.setItem("stayTheme", newTheme);

                updateButtons();

            });

        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", setupTheme);
    } else {
        setupTheme();
    }

})();
