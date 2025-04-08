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
    },
    en: {
      home: "Home",
      about: "About",
      skills: "Skills",
      experience: "Experience",
    },
  };

  document.querySelectorAll("nav a").forEach((link) => {
    const section = link.getAttribute("data-section");
    if (translations[lang][section]) {
      link.textContent = translations[lang][section];
    }
  });

  document.querySelectorAll(".language-switcher button").forEach((btn) => {
    btn.classList.toggle("active", btn.getAttribute("data-lang") === lang);
  });
}
