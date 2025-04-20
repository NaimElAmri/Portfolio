document.addEventListener("DOMContentLoaded", () => {
  // === SECTION HIGHLIGHTING LOGIC ===
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("nav a");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;

          navLinks.forEach((link) => {
            link.classList.toggle(
              "active",
              link.getAttribute("data-section") === sectionId
            );
          });
        }
      });
    },
    { threshold: 0.3 }
  );

  sections.forEach((section) => observer.observe(section));

  // === LANGUAGE SWITCHER LOGIC ===
  const langButtons = document.querySelectorAll(".language-switcher button");

  langButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedLang = button.getAttribute("data-lang");
      localStorage.setItem("preferredLang", selectedLang);
      switchLanguage(selectedLang);
    });
  });

  const savedLang = localStorage.getItem("preferredLang") || "de";
  switchLanguage(savedLang);
});

// === LANGUAGE SWITCH FUNCTION ===
function switchLanguage(lang) {
  const translations = {
    de: {
      home: "Home",
      about: "Über mich",
      skills: "Fähigkeiten",
      experience: "Erfahrung",
      hero_title: "Willkommen auf meinem Portfolio",
      about_title: "Über mich",
      about_greeting: "Hallo, ich bin Naim! 🌵",
      about_description:
        "Ich bin ein leidenschaftlicher Softwareentwickler mit einem Fokus auf Frontend-Entwicklung. Ich liebe es, kreative Lösungen zu finden und innovative Benutzeroberflächen zu gestalten.",
    },
    en: {
      home: "Home",
      about: "About",
      skills: "Skills",
      experience: "Experience",
      hero_title: "Welcome to my Portfolio",
      about_title: "About Me",
      about_greeting: "Hello, I'm Naim! 🌵",
      about_description:
        "I'm a passionate software developer with a focus on frontend development. I love finding creative solutions and designing innovative user interfaces.",
    },
  };

  // update nav links
  document.querySelectorAll("nav a").forEach((link) => {
    const section = link.getAttribute("data-section");
    if (translations[lang][section]) {
      link.textContent = translations[lang][section];
    }
  });

  // update i18n-tagged content
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });

  // set active button
  document.querySelectorAll(".language-switcher button").forEach((btn) => {
    btn.classList.toggle("active", btn.getAttribute("data-lang") === lang);
  });
}
