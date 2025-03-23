document.addEventListener("DOMContentLoaded", () => {
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
    { threshold: 0.3 } // Adjusts when a section is considered "in view"
  );

  sections.forEach((section) => observer.observe(section));
});
