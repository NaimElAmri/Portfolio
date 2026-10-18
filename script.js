// Navigation (mobil)
const navToggle = document.querySelector(".nav-toggle");
const mainNav = document.querySelector(".main-nav");

if (navToggle && mainNav) {
  const setOpen = (open) => {
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Menü schliessen" : "Menü öffnen");
    mainNav.classList.toggle("is-open", open);
  };
  navToggle.addEventListener("click", () => {
    setOpen(navToggle.getAttribute("aria-expanded") !== "true");
  });
  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setOpen(false));
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setOpen(false);
  });
}

// Linie unter dem Header, sobald gescrollt wird
const header = document.querySelector(".site-header");
if (header) {
  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

// Aktuellen Abschnitt in der Navigation markieren
const navLinks = [...document.querySelectorAll('.main-nav a[href^="#"]')];
const navSections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);
if (navSections.length) {
  const markCurrent = () => {
    const line = window.innerHeight * 0.35;
    let current = null;
    navSections.forEach((section) => {
      if (section.getBoundingClientRect().top <= line) current = section;
    });
    // Ganz unten zählt der letzte Abschnitt, auch wenn er kurz ist
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
      current = navSections[navSections.length - 1];
    }
    navLinks.forEach((link) => {
      const active = current && link.getAttribute("href") === `#${current.id}`;
      if (active) link.setAttribute("aria-current", "true");
      else link.removeAttribute("aria-current");
    });
  };
  markCurrent();
  window.addEventListener("scroll", markCurrent, { passive: true });
  window.addEventListener("resize", markCurrent);
}

// Dezente Einblend-Animation beim Scrollen
const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.1 }
  );
  revealItems.forEach((el) => observer.observe(el));
} else {
  revealItems.forEach((el) => el.classList.add("is-visible"));
}

// YouTube erst beim Klick laden (schneller und datenschutzfreundlicher)
document.querySelectorAll(".video[data-youtube]").forEach((video) => {
  const button = video.querySelector(".video-play");
  const thumb = button && button.querySelector("img");
  if (thumb) {
    // Nicht jedes Video hat ein Vorschaubild in voller Auflösung:
    // dann auf die kleinere Version wechseln, sonst bleibt der Farbverlauf.
    const fallback = `https://i.ytimg.com/vi/${video.dataset.youtube}/hqdefault.jpg`;
    const useFallback = () => {
      if (thumb.src !== fallback) thumb.src = fallback;
      else thumb.remove();
    };
    thumb.addEventListener("error", useFallback);
    thumb.addEventListener("load", () => {
      if (thumb.naturalWidth <= 120) useFallback();
    });
  }
  if (!button) return;
  button.addEventListener("click", () => {
    const id = video.dataset.youtube;
    const list = video.dataset.list;
    const params = new URLSearchParams({ autoplay: "1", rel: "0" });
    if (list) params.set("list", list);
    const iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube-nocookie.com/embed/${id}?${params}`;
    iframe.title = button.getAttribute("aria-label").replace("Video abspielen: ", "");
    iframe.allow = "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen";
    iframe.allowFullscreen = true;
    button.replaceWith(iframe);
  });
});
