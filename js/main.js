/* ============================================================
   Élise Moreau — Maquilleuse professionnelle
   main.js : navigation, animations, carrousel, retour en haut
   ============================================================ */
(() => {
  "use strict";

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ===== Header : fond opaque au scroll ===== */
  const header = document.getElementById("header");

  const onScrollHeader = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 30);
  };

  window.addEventListener("scroll", onScrollHeader, { passive: true });
  onScrollHeader();

  /* ===== Menu burger (mobile) ===== */
  const burger = document.getElementById("burger");
  const nav = document.getElementById("nav");

  const closeMenu = () => {
    nav.classList.remove("is-open");
    burger.setAttribute("aria-expanded", "false");
    burger.setAttribute("aria-label", "Ouvrir le menu de navigation");
    document.body.style.overflow = "";
  };

  burger.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    burger.setAttribute("aria-expanded", String(isOpen));
    burger.setAttribute("aria-label", isOpen ? "Fermer le menu de navigation" : "Ouvrir le menu de navigation");
    // Bloque le défilement de la page quand le menu plein écran est ouvert
    document.body.style.overflow = isOpen ? "hidden" : "";
  });

  // Ferme le menu après un clic sur un lien ou avec Échap
  nav.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && nav.classList.contains("is-open")) {
      closeMenu();
      burger.focus();
    }
  });

  /* ===== Scroll-spy : lien actif selon la section visible ===== */
  const navLinks = [...document.querySelectorAll(".nav__link")];
  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  const spyObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          const isActive = link.getAttribute("href") === `#${entry.target.id}`;
          link.classList.toggle("is-active", isActive);
          if (isActive) {
            link.setAttribute("aria-current", "true");
          } else {
            link.removeAttribute("aria-current");
          }
        });
      });
    },
    { rootMargin: "-40% 0px -55% 0px" }
  );

  sections.forEach((section) => spyObserver.observe(section));

  /* ===== Animations d'apparition au scroll ===== */
  const revealElements = document.querySelectorAll(".reveal");

  if (prefersReducedMotion) {
    revealElements.forEach((el) => el.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  }

  /* ===== Carrousel de témoignages ===== */
  const track = document.getElementById("carousel-track");

  if (track) {
    const slides = [...track.children];
    const prevBtn = document.getElementById("carousel-prev");
    const nextBtn = document.getElementById("carousel-next");
    const dotsContainer = document.getElementById("carousel-dots");
    let currentIndex = 0;
    let autoplayTimer = null;

    // Crée une pastille par diapositive
    const dots = slides.map((_, index) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "carousel__dot";
      dot.setAttribute("aria-label", `Afficher le témoignage ${index + 1}`);
      dot.addEventListener("click", () => goTo(index));
      dotsContainer.appendChild(dot);
      return dot;
    });

    const goTo = (index) => {
      currentIndex = (index + slides.length) % slides.length;
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
      dots.forEach((dot, i) => dot.classList.toggle("is-active", i === currentIndex));
    };

    prevBtn.addEventListener("click", () => goTo(currentIndex - 1));
    nextBtn.addEventListener("click", () => goTo(currentIndex + 1));

    // Défilement automatique, en pause au survol / au focus
    const startAutoplay = () => {
      if (prefersReducedMotion) return;
      stopAutoplay();
      autoplayTimer = setInterval(() => goTo(currentIndex + 1), 6000);
    };

    const stopAutoplay = () => {
      if (autoplayTimer) clearInterval(autoplayTimer);
      autoplayTimer = null;
    };

    const carousel = document.getElementById("carousel");
    carousel.addEventListener("mouseenter", stopAutoplay);
    carousel.addEventListener("mouseleave", startAutoplay);
    carousel.addEventListener("focusin", stopAutoplay);
    carousel.addEventListener("focusout", startAutoplay);

    goTo(0);
    startAutoplay();
  }

  /* ===== Bouton retour en haut ===== */
  const backToTop = document.getElementById("back-to-top");

  window.addEventListener(
    "scroll",
    () => {
      backToTop.classList.toggle("is-visible", window.scrollY > 600);
    },
    { passive: true }
  );

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
  });

  /* ===== Année courante dans le pied de page ===== */
  const yearEl = document.getElementById("annee");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
