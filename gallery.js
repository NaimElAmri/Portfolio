// Fotos für die Galerie.
// Neues Bild: Datei in img/fotografie/ ablegen und hier einen Eintrag ergänzen.
// width/height = Pixelmasse der Datei (damit nichts springt beim Laden).
const PHOTOS = [
  // {
  //   src: "img/fotografie/beispiel.jpg",
  //   width: 1600,
  //   height: 2400,
  //   alt: "Kurze Bildbeschreibung",
  //   caption: "Ort, Jahr",
  // },
];

const gallery = document.getElementById("gallery");
const lightbox = document.getElementById("lightbox");

function renderPlaceholders() {
  const ratios = ["4 / 5", "3 / 2", "2 / 3", "1 / 1", "3 / 2", "4 / 5", "2 / 3", "3 / 2", "4 / 5"];
  ratios.forEach((ratio) => {
    const item = document.createElement("figure");
    item.className = "gallery-item placeholder";
    const ph = document.createElement("div");
    ph.className = "ph";
    ph.style.aspectRatio = ratio;
    ph.textContent = "Foto folgt";
    item.append(ph);
    gallery.append(item);
  });
}

function renderPhotos() {
  PHOTOS.forEach((photo, index) => {
    const item = document.createElement("figure");
    item.className = "gallery-item";
    const button = document.createElement("button");
    button.type = "button";
    button.setAttribute("aria-label", `Bild vergrössern: ${photo.alt}`);
    const img = document.createElement("img");
    img.src = photo.src;
    img.alt = photo.alt;
    img.width = photo.width;
    img.height = photo.height;
    img.loading = index < 6 ? "eager" : "lazy";
    img.decoding = "async";
    button.append(img);
    button.addEventListener("click", () => openLightbox(index));
    item.append(button);
    if (photo.caption) {
      const caption = document.createElement("figcaption");
      caption.textContent = photo.caption;
      item.append(caption);
    }
    gallery.append(item);
  });
}

// Lightbox
let current = 0;
let lastFocus = null;
const lbImg = lightbox.querySelector("img");
const lbCaption = lightbox.querySelector("figcaption");

function showPhoto(index) {
  current = (index + PHOTOS.length) % PHOTOS.length;
  const photo = PHOTOS[current];
  lbImg.src = photo.src;
  lbImg.alt = photo.alt;
  lbCaption.textContent = photo.caption || "";
}

function openLightbox(index) {
  lastFocus = document.activeElement;
  showPhoto(index);
  lightbox.hidden = false;
  document.body.style.overflow = "hidden";
  lightbox.querySelector(".lb-close").focus();
}

function closeLightbox() {
  lightbox.hidden = true;
  document.body.style.overflow = "";
  if (lastFocus) lastFocus.focus();
}

lightbox.querySelector(".lb-close").addEventListener("click", closeLightbox);
lightbox.querySelector(".lb-prev").addEventListener("click", () => showPhoto(current - 1));
lightbox.querySelector(".lb-next").addEventListener("click", () => showPhoto(current + 1));
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox || e.target.tagName === "FIGURE") closeLightbox();
});
document.addEventListener("keydown", (e) => {
  if (lightbox.hidden) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowLeft") showPhoto(current - 1);
  if (e.key === "ArrowRight") showPhoto(current + 1);
});

// Wischen auf dem Handy
let touchX = null;
lightbox.addEventListener("touchstart", (e) => (touchX = e.touches[0].clientX), { passive: true });
lightbox.addEventListener("touchend", (e) => {
  if (touchX === null) return;
  const dx = e.changedTouches[0].clientX - touchX;
  if (Math.abs(dx) > 50) showPhoto(current + (dx < 0 ? 1 : -1));
  touchX = null;
});

if (PHOTOS.length) {
  renderPhotos();
} else {
  renderPlaceholders();
}
