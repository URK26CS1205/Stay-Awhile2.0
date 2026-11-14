
// =====================================
// STAY AWHILE - CHATBOT
// =====================================

document.addEventListener("DOMContentLoaded", function () {

    // Create floating button
    const fab = document.createElement("button");
    fab.className = "chatbot-fab";
    fab.textContent = "✦";
    fab.setAttribute("aria-label", "Open Stay Awhile assistant");

    // Create chat panel
    const panel = document.createElement("section");
    panel.className = "chatbot-panel";

    const header = document.createElement("div");
    header.className = "chatbot-header";

    const heading = document.createElement("strong");
    heading.textContent = "Stay Awhile Assistant";

    const close = document.createElement("button");
    close.textContent = "×";
    close.setAttribute("aria-label", "Close chat");

    header.append(heading, close);

    const log = document.createElement("div");
    log.className = "chat-log";

    const inputArea = document.createElement("form");
    inputArea.className = "chat-input-area";

    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Ask me something...";
    input.setAttribute("aria-label", "Chat message");

    const send = document.createElement("button");
    send.type = "submit";
    send.textContent = "Send";

    inputArea.append(input, send);
    panel.append(header, log, inputArea);

    document.body.append(fab, panel);

    function addMessage(text, className) {

        const message = document.createElement("div");
        message.className = className;
        message.textContent = text;

        log.appendChild(message);

        // Automatically scroll to latest message
        log.scrollTop = log.scrollHeight;
    }

    addMessage(
        "Hello! Welcome to Stay Awhile. I can help you discover stays, destinations and more. 🌿",
        "bot-msg"
    );

    // Keyword matching reply engine
    function getReply(message) {

        const text = message.toLowerCase();

        if (text.includes("hello") || text.includes("hi") || text.includes("hey")) {
            return "Hey there! Welcome to Stay Awhile. Where would you like to escape to?";
        }

        if (text.includes("coorg")) {
            return "Coorg is perfect for peaceful coffee plantations, greenery and misty mornings!";
        }

        if (text.includes("goa") || text.includes("beach")) {
            return "Looking for sunshine? Goa and Gokarna are lovely choices for a beach escape.";
        }

        if (text.includes("mountain") || text.includes("hill")) {
            return "For mountain views and cool weather, try Himachal Pradesh or Ooty.";
        }

        if (text.includes("price") || text.includes("cost")) {
            return "Our demo stays start from around ₹3,500 per night. Actual prices would need to be confirmed.";
        }

        if (text.includes("register") || text.includes("account")) {
            return "You can create your profile using our Register page. Just click Join Us!";
        }

        if (text.includes("login") || text.includes("sign in")) {
            return "You can sign in using your registered email and password.";
        }

        if (text.includes("thank")) {
            return "You're very welcome! Hope you find your perfect somewhere. 🌿";
        }

        if (text.includes("help")) {
            return "I can help with destinations, stays, prices, registration and login. What would you like to know?";
        }

        return "That's interesting! Tell me whether you're looking for mountains, beaches or a peaceful nature retreat.";
    }

    fab.addEventListener("click", function () {
        panel.classList.toggle("open");
        input.focus();
    });

    close.addEventListener("click", function () {
        panel.classList.remove("open");
    });

    inputArea.addEventListener("submit", function (event) {

        event.preventDefault();

        const message = input.value.trim();

        if (!message) return;

        addMessage(message, "user-msg");

        input.value = "";

        const reply = getReply(message);

        setTimeout(function () {
            addMessage(reply, "bot-msg");
        }, 350);

    });

});
