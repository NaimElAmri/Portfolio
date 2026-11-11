// Navigation (mobil)
const navToggle = document.querySelector(".nav-toggle");
const mainNav = document.querySelector(".main-nav");

if (navToggle && mainNav) {
  const setOpen = (open) => {
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute(
      "aria-label",
      open ? "Menü schliessen" : "Menü öffnen"
    );
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
  const onScroll = () =>
    header.classList.toggle("is-scrolled", window.scrollY > 8);
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
    if (
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 2
    ) {
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
    iframe.title = button
      .getAttribute("aria-label")
      .replace("Video abspielen: ", "");
    iframe.allow =
      "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen";
    iframe.allowFullscreen = true;
    button.replaceWith(iframe);
  });
});

// Maus-Parallax: Ebenen folgen der Maus sanft, je nach Tiefe unterschiedlich weit.
// Nur mit Maus und ohne Wunsch nach reduzierter Bewegung.
const canHover = window.matchMedia(
  "(hover: hover) and (pointer: fine)"
).matches;
const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;
if (canHover && !reduceMotion) {
  document.querySelectorAll("[data-parallax]").forEach((stack) => {
    const area = stack.closest("section") || stack;
    const layers = [...stack.querySelectorAll("[data-depth]")];
    let targetX = 0,
      targetY = 0,
      x = 0,
      y = 0,
      running = false;
    const loop = () => {
      x += (targetX - x) * 0.08;
      y += (targetY - y) * 0.08;
      layers.forEach((el) => {
        const depth = parseFloat(el.dataset.depth);
        el.style.transform = `translate3d(${(x * depth).toFixed(2)}px, ${(
          y * depth
        ).toFixed(2)}px, 0)`;
      });
      running = Math.abs(targetX - x) > 0.001 || Math.abs(targetY - y) > 0.001;
      if (running) requestAnimationFrame(loop);
    };
    const start = () => {
      if (!running) {
        running = true;
        requestAnimationFrame(loop);
      }
    };
    area.addEventListener("pointermove", (e) => {
      const r = area.getBoundingClientRect();
      targetX = ((e.clientX - r.left) / r.width - 0.5) * 2;
      targetY = ((e.clientY - r.top) / r.height - 0.5) * 2;
      start();
    });
    area.addEventListener("pointerleave", () => {
      targetX = 0;
      targetY = 0;
      start();
    });
  });
}

// Kapitelmarken: Punkt wandert mit, während die Marke durchs Bild scrollt
const chapters = document.querySelectorAll(".chapter");
if (chapters.length && !reduceMotion) {
  const moveDots = () => {
    chapters.forEach((chapter) => {
      const top = chapter.getBoundingClientRect().top;
      const progress = Math.min(1, Math.max(0, 1 - top / window.innerHeight));
      chapter.style.setProperty("--progress", progress.toFixed(3));
    });
  };
  moveDots();
  window.addEventListener("scroll", moveDots, { passive: true });
  window.addEventListener("resize", moveDots);
}

// Mail-Adresse erst im Browser zusammensetzen, damit einfache Spam-Bots sie
// nicht im Quelltext finden. Ohne JavaScript führt der Button zu LinkedIn.
document.querySelectorAll(".mail-link").forEach((link) => {
  const address = `${link.dataset.user}@${link.dataset.domain}`;
  link.href = `mailto:${address}`;
  link.removeAttribute("target");
  link.removeAttribute("rel");
});

// Kleine Scroll-Details: Lesefortschritt unter dem Header, Porträt mit
// leichter Tiefe und Index für das gestaffelte Einblenden von Tags und Einträgen.
if (header) {
  const bar = document.createElement("span");
  bar.className = "scroll-progress";
  bar.setAttribute("aria-hidden", "true");
  header.append(bar);
}

document.querySelectorAll(".tools, .cv-list").forEach((list) => {
  [...list.children].forEach((item, i) => item.style.setProperty("--i", i));
});

const aboutImg = document.querySelector(".about-photo img");
let ticking = false;
const onScroll = () => {
  ticking = false;
  if (header) {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const progress = max > 0 ? Math.min(1, window.scrollY / max) : 0;
    header.style.setProperty("--page-progress", progress.toFixed(4));
  }
  if (aboutImg && !reduceMotion) {
    const r = aboutImg.parentElement.getBoundingClientRect();
    if (r.bottom > 0 && r.top < window.innerHeight) {
      // +0.5 wenn das Bild unten reinkommt, -0.5 wenn es oben rausgeht
      const center = (r.top + r.height / 2) / window.innerHeight - 0.5;
      const t = Math.max(-0.5, Math.min(0.5, center));
      aboutImg.style.setProperty("--photo-shift", `${(t * 40).toFixed(1)}px`);
    }
  }
};
const requestScroll = () => {
  if (!ticking) {
    ticking = true;
    requestAnimationFrame(onScroll);
  }
};
onScroll();
window.addEventListener("scroll", requestScroll, { passive: true });
window.addEventListener("resize", requestScroll);
if ("ResizeObserver" in window)
  new ResizeObserver(requestScroll).observe(document.body);

// Hero: bei jedem Laden ein anderes Bilder-Set. Das Porträt bleibt immer in
// der Mitte, nur die Abzüge rundherum wechseln. Ohne JavaScript bleibt Set 1.
const heroSets = [
  {
    a: "img/fotografie/kuppel-klein.webp",
    c: ["img/hero/aare.webp", "Aare, kurz vor sechs"],
    d: "img/fotografie/torii-rot-klein.webp",
  },
  {
    a: "img/fotografie/reiher-klein.webp",
    c: ["img/fotografie/altstadt-wolken-klein.webp", "Münster im Wolkenmeer"],
    d: "img/fotografie/torii-baum-klein.webp",
  },
  {
    a: "img/fotografie/bruecke-mond-klein.webp",
    c: ["img/fotografie/spaziergang-klein.webp", "Gemütlicher Spaziergang"],
    d: "img/fotografie/koi-klein.webp",
  },
];
const stack = document.querySelector(".photo-stack");
if (stack) {
  let last = -1;
  try {
    last = Number(localStorage.getItem("heroSet") ?? -1);
  } catch (e) {}
  const options = heroSets.map((_, i) => i).filter((i) => i !== last);
  const pick = options[Math.floor(Math.random() * options.length)];
  try {
    localStorage.setItem("heroSet", String(pick));
  } catch (e) {}
  const set = heroSets[pick];
  const imgA = stack.querySelector(".print-a img");
  const imgC = stack.querySelector(".print-c img");
  const capC = stack.querySelector(".print-c figcaption");
  const imgD = stack.querySelector(".print-d img");
  if (imgA) imgA.src = set.a;
  if (imgC) imgC.src = set.c[0];
  if (capC) capC.textContent = set.c[1];
  if (imgD) imgD.src = set.d;
}
