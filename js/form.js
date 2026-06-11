/* ============================================================
   Élise Moreau — Maquilleuse professionnelle
   form.js : validation du formulaire de réservation
   ------------------------------------------------------------
   Envoi réel : créer un formulaire sur https://formspree.io
   et renseigner l'URL obtenue dans l'attribut action du <form>.
   Sans action, le formulaire affiche une confirmation locale.
   ============================================================ */
(() => {
  "use strict";

  const form = document.getElementById("booking-form");
  if (!form) return;

  const status = document.getElementById("form-status");

  /* ===== Date minimale : aujourd'hui ===== */
  const dateInput = form.elements.date;
  const today = new Date().toISOString().split("T")[0];
  dateInput.min = today;

  /* ===== Règles de validation (messages en français) ===== */
  const validators = {
    nom: (value) => {
      if (!value.trim()) return "Veuillez indiquer votre nom.";
      if (value.trim().length < 2) return "Le nom doit comporter au moins 2 caractères.";
      return "";
    },
    telephone: (value) => {
      if (!value.trim()) return "Veuillez indiquer votre numéro de téléphone.";
      const digits = value.replace(/[\s.\-()]/g, "");
      if (!/^\+?\d{8,14}$/.test(digits)) {
        return "Veuillez saisir un numéro de téléphone valide (ex. +225 07 48 40 15 48).";
      }
      return "";
    },
    email: (value) => {
      if (!value.trim()) return "Veuillez indiquer votre adresse email.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim())) {
        return "Veuillez saisir une adresse email valide.";
      }
      return "";
    },
    prestation: (value) => (value ? "" : "Veuillez choisir un type de prestation."),
    date: (value) => {
      if (!value) return "Veuillez choisir une date.";
      if (value < today) return "La date ne peut pas être dans le passé.";
      return "";
    },
    message: (value) => {
      if (!value.trim()) return "Veuillez écrire un message.";
      if (value.trim().length < 10) return "Votre message doit comporter au moins 10 caractères.";
      return "";
    },
    consentement: (_, field) =>
      field.checked ? "" : "Veuillez accepter l'utilisation de vos données pour traiter la demande.",
  };

  const validateField = (field) => {
    const validator = validators[field.name];
    if (!validator) return true;

    const errorMessage = validator(field.value, field);
    const errorEl = document.getElementById(`${field.id}-error`);

    field.classList.toggle("is-invalid", Boolean(errorMessage));
    field.setAttribute("aria-invalid", errorMessage ? "true" : "false");
    if (errorEl) errorEl.textContent = errorMessage;

    return !errorMessage;
  };

  /* ===== Validation en temps réel ===== */
  const fields = [...form.elements].filter((el) => validators[el.name]);

  fields.forEach((field) => {
    // À la sortie du champ : validation complète
    field.addEventListener("blur", () => validateField(field));
    // Pendant la saisie : on efface l'erreur dès que le champ redevient valide
    field.addEventListener("input", () => {
      if (field.classList.contains("is-invalid")) validateField(field);
    });
    field.addEventListener("change", () => validateField(field));
  });

  /* ===== Soumission ===== */
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Honeypot anti-spam : un humain laisse ce champ vide
    if (form.elements["site-web"].value) return;

    const allValid = fields.map(validateField).every(Boolean);

    if (!allValid) {
      status.textContent = "Veuillez corriger les champs signalés en rouge.";
      status.className = "form__status is-error";
      form.querySelector(".is-invalid")?.focus();
      return;
    }

    const submitBtn = form.querySelector(".form__submit");
    const successMessage =
      "Merci ! Votre demande a bien été envoyée. Je vous réponds sous 24h. ✨";

    // Envoi réel si une URL Formspree est configurée dans l'attribut action
    const actionUrl = form.getAttribute("action");
    if (actionUrl) {
      submitBtn.disabled = true;
      status.textContent = "Envoi en cours…";
      status.className = "form__status";

      try {
        const response = await fetch(actionUrl, {
          method: "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" },
        });
        if (!response.ok) throw new Error(`Erreur ${response.status}`);
        status.textContent = successMessage;
        status.className = "form__status is-success";
        form.reset();
      } catch {
        status.textContent =
          "Une erreur est survenue lors de l'envoi. Réessayez ou contactez-moi directement par téléphone ou WhatsApp.";
        status.className = "form__status is-error";
      } finally {
        submitBtn.disabled = false;
      }
      return;
    }

    // Mode démonstration (aucun service d'envoi configuré)
    status.textContent = successMessage;
    status.className = "form__status is-success";
    form.reset();
  });
})();
