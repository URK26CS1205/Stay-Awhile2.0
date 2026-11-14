// =====================================
// STAY AWHILE - MAIN APPLICATION
// =====================================

document.addEventListener("DOMContentLoaded", function () {

    // CREATE STAY CARDS
    function createStayCard(stay) {
        const card = document.createElement("article");
        card.className = "stay-card";

        const imageWrap = document.createElement("div");
        imageWrap.className = "stay-image-wrap";

        const image = document.createElement("img");
        image.src = stay.image;
        image.alt = stay.name;
        image.loading = "lazy";

        const tag = document.createElement("span");
        tag.className = "stay-tag";
        tag.textContent =
            stay.mood === "beach" ? "BEACH ESCAPE" :
            stay.mood === "mountains" ? "MOUNTAIN ESCAPE" :
            "NATURE ESCAPE";

        imageWrap.append(image, tag);

        const info = document.createElement("div");
        info.className = "stay-info";

        const location = document.createElement("span");
        location.className = "stay-location";
        location.textContent = stay.location;

        const title = document.createElement("h3");
        title.textContent = stay.name;

        const description = document.createElement("p");
        description.textContent = stay.description;

        const meta = document.createElement("div");
        meta.className = "stay-meta";

        const price = document.createElement("div");
        price.className = "stay-price";
        price.innerHTML =
            `<strong>${stay.price}</strong><small> / night</small>`;

        const actions = document.createElement("div");
        actions.className = "stay-actions";

        const book = document.createElement("a");
        book.className = "stay-book";
        book.href = "register.html";
        book.textContent = "Book this stay ↗";

        const skip = document.createElement("button");
        skip.className = "stay-skip";
        skip.type = "button";
        skip.textContent = "Skip";

        skip.addEventListener("click", function () {
            card.classList.add("stay-skipping");

            setTimeout(function () {
                card.remove();
            }, 250);
        });

        actions.append(book, skip);
        meta.append(price, actions);
        info.append(location, title, description, meta);
        card.append(imageWrap, info);

        return card;
    }


    // DISPLAY STAYS
    function renderStays(containerId, stays) {
        const container = document.getElementById(containerId);

        if (!container || !Array.isArray(stays)) return;

        container.replaceChildren();

        if (stays.length === 0) {
            container.textContent = "No stays found for this mood.";
            return;
        }

        stays.forEach(function (stay) {
            container.appendChild(createStayCard(stay));
        });
    }

    renderStays("stayGrid", window.stays || []);
    renderStays("dashboardStayGrid", window.stays || []);


    // MOOD FILTERING
    document.querySelectorAll(".mood-card").forEach(function (card) {
        card.addEventListener("click", function () {
            const mood = card.dataset.mood;

            const filteredStays = (window.stays || []).filter(
                function (stay) {
                    return stay.mood === mood;
                }
            );

            renderStays("stayGrid", filteredStays);
        });
    });


    // AUTOMATIC IMAGE SLIDESHOW
    function setupSlideshow(selector, nextId, previousId, interval) {
        const slideshow = document.querySelector(selector);

        if (!slideshow) return;

        const slides = slideshow.querySelectorAll(".slide-image");

        if (slides.length === 0) return;

        let currentSlide = 0;
        let timer;

        function showSlide(index) {
            slides[currentSlide].classList.remove("active");

            currentSlide = (index + slides.length) % slides.length;

            slides[currentSlide].classList.add("active");

            const number = document.getElementById("slideNumber");
            const location = document.getElementById("slideLocation");

            if (number && selector === ".hero-slideshow") {
                number.textContent =
                    String(currentSlide + 1).padStart(2, "0") +
                    " / " + String(slides.length).padStart(2, "0");
            }

            if (location && selector === ".hero-slideshow") {
                const labels = [
                    "THE SLOW LIFE",
                    "TROPICAL ESCAPE",
                    "MOUNTAIN RETREAT",
                    "FOREST HIDEAWAY"
                ];

                location.textContent = labels[currentSlide] || "YOUR NEXT ESCAPE";
            }
        }

        function startTimer() {
            clearInterval(timer);
            timer = setInterval(function () {
                showSlide(currentSlide + 1);
            }, interval);
        }

        const next = document.getElementById(nextId);
        const previous = document.getElementById(previousId);

        if (next) {
            next.addEventListener("click", function () {
                showSlide(currentSlide + 1);
                startTimer();
            });
        }

        if (previous) {
            previous.addEventListener("click", function () {
                showSlide(currentSlide - 1);
                startTimer();
            });
        }

        startTimer();
    }

    setupSlideshow(
        ".hero-slideshow",
        "nextSlide",
        "previousSlide",
        4500
    );

    setupSlideshow(
        ".dashboard-slideshow",
        "dashboardNext",
        "dashboardPrevious",
        4500
    );


    // MOBILE NAVIGATION
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", function () {
            navLinks.classList.toggle("open");
        });

        navLinks.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                navLinks.classList.remove("open");
            });
        });
    }

});