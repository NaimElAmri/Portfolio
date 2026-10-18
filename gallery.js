// Fotos für die Galerie, in dieser Reihenfolge angezeigt.
// Neues Bild: grosse Version (lange Seite 2000 px) und kleine Version (900 px)
// als WebP in img/fotografie/ ablegen und hier einen Eintrag ergänzen.
// width/height = Pixelmasse der grossen Datei (damit nichts springt beim Laden).
// Optional: caption: "Ort, Jahr" zeigt eine Bildunterschrift.
const PHOTOS = [
  {
    src: "img/fotografie/altstadt-abendlicht.webp",
    thumb: "img/fotografie/altstadt-abendlicht-klein.webp",
    width: 2000,
    height: 1334,
    alt: "Blick über eine Altstadt mit Münsterturm im warmen Abendlicht",
  },
  {
    src: "img/fotografie/reiher.webp",
    thumb: "img/fotografie/reiher-klein.webp",
    width: 2000,
    height: 1334,
    alt: "Graureiher auf einem moosbewachsenen Felsen, gerahmt von unscharfem Grün",
  },
  {
    src: "img/fotografie/torii-rot.webp",
    thumb: "img/fotografie/torii-rot-klein.webp",
    width: 1334,
    height: 2000,
    alt: "Kleine rote Torii-Tore vor einem Gedenkstein im dunklen Wald",
  },
  {
    src: "img/fotografie/bruecke-mond.webp",
    thumb: "img/fotografie/bruecke-mond-klein.webp",
    width: 2000,
    height: 1334,
    alt: "Rote Tram auf einer Stahlbrücke unter blauem Himmel mit Mond",
  },
  {
    src: "img/fotografie/dj.webp",
    thumb: "img/fotografie/dj-klein.webp",
    width: 2000,
    height: 1334,
    alt: "DJ mit pinker Sonnenbrille am Mischpult vor einem grossen Gemälde",
  },
  {
    src: "img/fotografie/glockenturm-nacht.webp",
    thumb: "img/fotografie/glockenturm-nacht-klein.webp",
    width: 2000,
    height: 1334,
    alt: "Beleuchteter chinesischer Glockenturm in der Abenddämmerung",
  },
  {
    src: "img/fotografie/schrein-teich.webp",
    thumb: "img/fotografie/schrein-teich-klein.webp",
    width: 2000,
    height: 1334,
    alt: "Schrein mit rotem Geländer an einem dunklen Teich im Wald",
  },
  {
    src: "img/fotografie/spaziergang.webp",
    thumb: "img/fotografie/spaziergang-klein.webp",
    width: 1334,
    height: 2000,
    alt: "Person auf einem Fussweg unter einer Stahlbrücke im Gegenlicht",
  },
  {
    src: "img/fotografie/leuchtreklamen.webp",
    thumb: "img/fotografie/leuchtreklamen-klein.webp",
    width: 2000,
    height: 1334,
    alt: "Bunte Leuchtreklamen an Hausfassaden entlang eines Kanals",
  },
  {
    src: "img/fotografie/koi.webp",
    thumb: "img/fotografie/koi-klein.webp",
    width: 2000,
    height: 1334,
    alt: "Rote Koi-Karpfen im dunklen Wasser",
  },
  {
    src: "img/fotografie/spiegelung.webp",
    thumb: "img/fotografie/spiegelung-klein.webp",
    width: 1334,
    height: 2000,
    alt: "Doppelte Spiegelung eines Mannes mit Sonnenbrille in einer Fensterscheibe",
  },
  {
    src: "img/fotografie/strand-boot.webp",
    thumb: "img/fotografie/strand-boot-klein.webp",
    width: 1334,
    height: 2000,
    alt: "Umgedrehtes weisses Boot am Sandstrand vor türkisem Meer",
  },
  {
    src: "img/fotografie/burg.webp",
    thumb: "img/fotografie/burg-klein.webp",
    width: 2000,
    height: 1334,
    alt: "Japanische Burg mit mehreren Dächern unter blauem Himmel",
  },
  {
    src: "img/fotografie/schwan.webp",
    thumb: "img/fotografie/schwan-klein.webp",
    width: 2000,
    height: 1334,
    alt: "Schwan im dunklen Wasser, durch Äste fotografiert",
  },
  {
    src: "img/fotografie/steinfiguren.webp",
    thumb: "img/fotografie/steinfiguren-klein.webp",
    width: 2000,
    height: 1334,
    alt: "Zwei Steinfiguren mit roten Lätzchen und Daruma-Puppen im Grünen",
  },
  {
    src: "img/fotografie/torii-baum.webp",
    thumb: "img/fotografie/torii-baum-klein.webp",
    width: 2000,
    height: 1334,
    alt: "Hölzernes Torii-Tor unter einem grossen Baum",
  },
  {
    src: "img/fotografie/kraehen.webp",
    thumb: "img/fotografie/kraehen-klein.webp",
    width: 2000,
    height: 1334,
    alt: "Krähenschwarm am grauen Himmel über Baumkronen",
  },
  {
    src: "img/fotografie/terrakotta.webp",
    thumb: "img/fotografie/terrakotta-klein.webp",
    width: 2000,
    height: 1334,
    alt: "Reihen von Terrakotta-Kriegern",
  },
  {
    src: "img/fotografie/gasse.webp",
    thumb: "img/fotografie/gasse-klein.webp",
    width: 1334,
    height: 2000,
    alt: "Schmale Gasse mit Strommasten und alten Holzhäusern",
  },
  {
    src: "img/fotografie/hafen.webp",
    thumb: "img/fotografie/hafen-klein.webp",
    width: 2000,
    height: 1334,
    alt: "Hafen mit vielen Booten am Mittelmeer",
  },
  {
    src: "img/fotografie/katze.webp",
    thumb: "img/fotografie/katze-klein.webp",
    width: 2000,
    height: 1334,
    alt: "Katze im hohen Gras",
  },
  {
    src: "img/fotografie/fuchsstatue.webp",
    thumb: "img/fotografie/fuchsstatue-klein.webp",
    width: 2000,
    height: 1334,
    alt: "Steinfuchs mit rotem Lätzchen, durch einen dunklen Rahmen fotografiert",
  },
  {
    src: "img/fotografie/eisbaer.webp",
    thumb: "img/fotografie/eisbaer-klein.webp",
    width: 2000,
    height: 1334,
    alt: "Eisbär auf einem Felsen in der Sonne",
  },
  {
    src: "img/fotografie/fussball.webp",
    thumb: "img/fotografie/fussball-klein.webp",
    width: 2000,
    height: 1334,
    alt: "Fussballspieler im Zweikampf auf dem Rasen",
  },
  {
    src: "img/fotografie/torii-weg.webp",
    thumb: "img/fotografie/torii-weg-klein.webp",
    width: 1334,
    height: 2000,
    alt: "Rotes Torii-Tor am Anfang eines Steinwegs",
  },
  {
    src: "img/fotografie/grosse-mauer.webp",
    thumb: "img/fotografie/grosse-mauer-klein.webp",
    width: 2000,
    height: 1334,
    alt: "Chinesische Mauer auf bewaldeten Hügeln",
  },
  {
    src: "img/fotografie/automat.webp",
    thumb: "img/fotografie/automat-klein.webp",
    width: 2000,
    height: 1334,
    alt: "Getränkeautomat unter einem Ziegeldach vor blauem Himmel",
  },
  {
    src: "img/fotografie/atelier.webp",
    thumb: "img/fotografie/atelier-klein.webp",
    width: 2000,
    height: 1334,
    alt: "Bilder und Souvenirs in einem kleinen Atelier",
  },
  {
    src: "img/fotografie/garten-pavillon.webp",
    thumb: "img/fotografie/garten-pavillon-klein.webp",
    width: 2000,
    height: 1334,
    alt: "Chinesischer Garten mit Pavillons und Bäumen",
  },
  {
    src: "img/fotografie/altstadt-wolken.webp",
    thumb: "img/fotografie/altstadt-wolken-klein.webp",
    width: 1334,
    height: 2000,
    alt: "Altstadt mit Münsterturm unter Wolken, gerahmt von Zweigen",
  },
  {
    src: "img/fotografie/ema.webp",
    thumb: "img/fotografie/ema-klein.webp",
    width: 2000,
    height: 1334,
    alt: "Hölzerne Wunschtafeln an einem Schrein",
  },
  {
    src: "img/fotografie/fussball-ball.webp",
    thumb: "img/fotografie/fussball-ball-klein.webp",
    width: 1334,
    height: 2000,
    alt: "Fussballspieler am Ball auf dem Rasen",
  },
  {
    src: "img/fotografie/laternen.webp",
    thumb: "img/fotografie/laternen-klein.webp",
    width: 2000,
    height: 1334,
    alt: "Gasse mit hängenden Papierlaternen",
  },
  {
    src: "img/fotografie/koi-bewegung.webp",
    thumb: "img/fotografie/koi-bewegung-klein.webp",
    width: 2000,
    height: 1334,
    alt: "Koi-Karpfen in Bewegung, mit Langzeitbelichtung",
  },
  {
    src: "img/fotografie/stadtblick.webp",
    thumb: "img/fotografie/stadtblick-klein.webp",
    width: 2000,
    height: 1334,
    alt: "Blick über Häuser und Hügel einer Stadt",
  },
  {
    src: "img/fotografie/pavillon.webp",
    thumb: "img/fotografie/pavillon-klein.webp",
    width: 1334,
    height: 2000,
    alt: "Pavillon und Turm zwischen Bäumen",
  },
  {
    src: "img/fotografie/hortensien.webp",
    thumb: "img/fotografie/hortensien-klein.webp",
    width: 1334,
    height: 2000,
    alt: "Blaue Hortensien im Schatten",
  },
  {
    src: "img/fotografie/kuppel.webp",
    thumb: "img/fotografie/kuppel-klein.webp",
    width: 2000,
    height: 1334,
    alt: "Kuppel zwischen Baumkronen",
  },
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

// Fotos der Reihe nach immer in die kürzeste Spalte legen,
// damit die Reihenfolge von links nach rechts erhalten bleibt.
function columnCount() {
  if (window.innerWidth <= 600) return 2;
  if (window.innerWidth <= 960) return 2;
  return 3;
}

function createItem(photo, index) {
  const item = document.createElement("figure");
  item.className = "gallery-item";
  const button = document.createElement("button");
  button.type = "button";
  button.setAttribute("aria-label", `Bild vergrössern: ${photo.alt}`);
  const img = document.createElement("img");
  img.src = photo.thumb || photo.src;
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
  return item;
}

let renderedColumns = 0;
function renderPhotos() {
  const count = columnCount();
  if (count === renderedColumns) return;
  renderedColumns = count;
  gallery.replaceChildren();
  const columns = Array.from({ length: count }, () => {
    const col = document.createElement("div");
    col.className = "gallery-col";
    gallery.append(col);
    return { el: col, height: 0 };
  });
  PHOTOS.forEach((photo, index) => {
    const shortest = columns.reduce((a, b) => (b.height < a.height ? b : a));
    shortest.el.append(createItem(photo, index));
    shortest.height += photo.height / photo.width;
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
  gallery.classList.add("gallery--masonry");
  renderPhotos();
  window.addEventListener("resize", renderPhotos);
} else {
  renderPlaceholders();
}
