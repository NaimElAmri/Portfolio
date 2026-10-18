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
    thumb.addEventListener("error", () => thumb.remove());
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
