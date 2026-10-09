/* =================================
   1. Light and dark mode
================================= */

const themeToggle = document.getElementById("theme-toggle");
const root = document.documentElement;

function applyTheme(theme) {
    root.setAttribute("data-theme", theme);

    if (themeToggle) {
        const isDark = theme === "dark";

        themeToggle.textContent = isDark
            ? "☀️ Light mode"
            : "🌙 Dark mode";

        themeToggle.setAttribute(
            "aria-label",
            isDark ? "Switch to light mode" : "Switch to dark mode"
        );

        themeToggle.setAttribute("aria-pressed", String(!isDark));
    }
}

/* Load the saved theme preference */
let savedTheme = "dark";

try {
    const storedTheme = localStorage.getItem("portfolio-theme");

    if (storedTheme === "light" || storedTheme === "dark") {
        savedTheme = storedTheme;
    }
} catch (error) {
    /* The website still works if storage is unavailable. */
}

applyTheme(savedTheme);

/* Toggle between light and dark modes */
if (themeToggle) {
    themeToggle.addEventListener("click", function () {
        const currentTheme = root.getAttribute("data-theme");
        const newTheme = currentTheme === "dark" ? "light" : "dark";

        applyTheme(newTheme);

        try {
            localStorage.setItem("portfolio-theme", newTheme);
        } catch (error) {
            /* Theme switching still works for this page. */
        }
    });
}

/* =================================
   2. Contact form
================================= */

const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

/*
   Replace this address with your own email address
   before using the contact form.
*/
const portfolioEmail = "your-email@example.com";

if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const subject = document.getElementById("subject").value.trim();
        const message = document.getElementById("message").value.trim();

        if (!name || !email || !subject || !message) {
            formStatus.textContent = "Please complete all the fields.";
            return;
        }

        if (portfolioEmail === "your-email@example.com") {
            formStatus.textContent =
                "The form is working, but replace the example email " +
                "address in script.js before using it.";
            return;
        }

        const emailSubject = encodeURIComponent(subject);

        const emailBody = encodeURIComponent(
            "Name: " + name +
            "\nEmail: " + email +
            "\n\nMessage:\n" + message
        );

        const mailtoLink =
            "mailto:" + portfolioEmail +
            "?subject=" + emailSubject +
            "&body=" + emailBody;

        formStatus.textContent =
            "Opening your email application. Please review and send the message there.";

        window.location.href = mailtoLink;
    });
}
