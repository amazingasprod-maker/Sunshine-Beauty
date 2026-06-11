/* ============================================================
   Élise Moreau — Maquilleuse professionnelle
   gallery.js : filtres du portfolio, lightbox, avant/après
   ============================================================ */
(() => {
  "use strict";

  /* ===== Filtres du portfolio ===== */
  const filterButtons = [...document.querySelectorAll(".filter-btn")];
  const portfolioItems = [...document.querySelectorAll(".portfolio__item")];

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;

      filterButtons.forEach((btn) => {
        btn.classList.toggle("is-active", btn === button);
        btn.setAttribute("aria-pressed", String(btn === button));
      });

      portfolioItems.forEach((item) => {
        const matches = filter === "tous" || item.dataset.category === filter;
        item.classList.toggle("is-hidden", !matches);
      });
    });
  });

  /* ===== Lightbox ===== */
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const closeBtn = document.getElementById("lightbox-close");
  const prevBtn = document.getElementById("lightbox-prev");
  const nextBtn = document.getElementById("lightbox-next");

  let currentIndex = 0;
  let lastFocusedElement = null;

  // Seules les images visibles (après filtrage) sont parcourues dans la lightbox
  const getVisibleItems = () =>
    portfolioItems.filter((item) => !item.classList.contains("is-hidden"));

  const showImage = (index) => {
    const items = getVisibleItems();
    if (!items.length) return;
    currentIndex = (index + items.length) % items.length;
    const img = items[currentIndex].querySelector("img");
    const caption = items[currentIndex].querySelector(".portfolio__caption");
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxCaption.textContent = caption ? caption.textContent : "";
  };

  const openLightbox = (index) => {
    lastFocusedElement = document.activeElement;
    showImage(index);
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
    closeBtn.focus();
  };

  const closeLightbox = () => {
    lightbox.hidden = true;
    document.body.style.overflow = "";
    if (lastFocusedElement) lastFocusedElement.focus();
  };

  portfolioItems.forEach((item) => {
    const trigger = item.querySelector(".portfolio__open");
    trigger.addEventListener("click", () => {
      const visibleIndex = getVisibleItems().indexOf(item);
      openLightbox(visibleIndex);
    });
  });

  closeBtn.addEventListener("click", closeLightbox);
  prevBtn.addEventListener("click", () => showImage(currentIndex - 1));
  nextBtn.addEventListener("click", () => showImage(currentIndex + 1));

  // Clic sur le fond sombre : fermeture
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });

  // Navigation clavier : flèches, Échap et piège à focus
  document.addEventListener("keydown", (event) => {
    if (lightbox.hidden) return;

    switch (event.key) {
      case "Escape":
        closeLightbox();
        break;
      case "ArrowLeft":
        showImage(currentIndex - 1);
        break;
      case "ArrowRight":
        showImage(currentIndex + 1);
        break;
      case "Tab": {
        // Piège à focus : le clavier reste dans la lightbox
        const focusables = [closeBtn, prevBtn, nextBtn];
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
        break;
      }
    }
  });

  /* ===== Sliders avant / après ===== */
  document.querySelectorAll(".ba").forEach((slider) => {
    const range = slider.querySelector(".ba__range");

    const update = () => {
      slider.style.setProperty("--pos", `${range.value}%`);
    };

    range.addEventListener("input", update);
    update();
  });
})();
