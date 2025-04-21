document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("nav a");
  const langButtons = document.querySelectorAll(".language-switcher button");

  let allTranslations = {}; // Variable to store loaded translations

  // === FUNCTION TO FETCH TRANSLATIONS ===
  async function fetchTranslations() {
    try {
      const response = await fetch("translations.json"); // Make sure path is correct
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      allTranslations = await response.json();
      console.log("Translations loaded successfully.");
      // Apply initial language after translations are loaded
      const savedLang = localStorage.getItem("preferredLang") || "de"; // Default to 'de'
      switchLanguage(savedLang);
    } catch (error) {
      console.error("Could not load translations:", error);
      // Optionally handle the error, e.g., display a message to the user
    }
  }

  // === FUNCTION TO APPLY TRANSLATIONS ===
  function applyTranslations(lang) {
    if (!allTranslations[lang]) {
      console.error(`Translations for language '${lang}' not found.`);
      return; // Exit if the language data isn't loaded
    }

    const translations = allTranslations[lang];

    // Update elements with data-i18n attribute
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (translations[key]) {
        // Use innerHTML if your translations might contain HTML entities like &copy;
        el.innerHTML = translations[key];
      } else {
        console.warn(
          `Translation key "${key}" not found for language "${lang}".`
        );
      }
    });

    // Update nav links based on their data-section attribute
    document.querySelectorAll("nav a[data-section]").forEach((link) => {
      const section = link.getAttribute("data-section");
      if (translations[section]) {
        link.textContent = translations[section];
      } else {
        console.warn(
          `Nav translation key "${section}" not found for language "${lang}".`
        );
      }
    });

    // Update footer nav links based on their data-i18n attribute (if specific keys are used)
    // Example - adjust if you use href or other method:
    document.querySelectorAll("footer a[data-i18n]").forEach((link) => {
      const key = link.getAttribute("data-i18n");
      if (translations[key]) {
        link.textContent = translations[key];
      } else {
        console.warn(
          `Footer nav translation key "${key}" not found for language "${lang}".`
        );
      }
    });

    // Update page title (if you added data-i18n to it)
    const pageTitle = document.querySelector("title[data-i18n]");
    if (pageTitle) {
      const key = pageTitle.getAttribute("data-i18n");
      if (translations[key]) {
        document.title = translations[key];
      }
    }

    // Set active button
    langButtons.forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-lang") === lang);
    });

    // Update the lang attribute of the <html> element
    document.documentElement.lang = lang;
  }

  // === LANGUAGE SWITCH FUNCTION ===
  function switchLanguage(lang) {
    localStorage.setItem("preferredLang", lang); // Save preference
    applyTranslations(lang);
  }

  // === SECTION HIGHLIGHTING LOGIC ===
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          navLinks.forEach((link) => {
            // Remove active class from all links first
            link.classList.remove("active");
            // Add active class if data-section matches the intersecting section's id
            if (link.getAttribute("data-section") === sectionId) {
              link.classList.add("active");
            }
          });
        }
      });
    },
    { threshold: 0.3 } // Adjust threshold as needed
  );

  sections.forEach((section) => observer.observe(section));

  // === LANGUAGE SWITCHER EVENT LISTENERS ===
  langButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedLang = button.getAttribute("data-lang");
      switchLanguage(selectedLang);
    });
  });

  // === INITIALIZATION ===
  fetchTranslations(); // Load translations and apply initial language
});
