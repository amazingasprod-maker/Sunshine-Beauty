# CLAUDE.md

Ce fichier guide Claude Code lors du travail sur ce projet.

## Présentation du projet

Site web professionnel pour **Sunshine Beauty by Aimée Camille**, maquilleuse professionnelle à **Abidjan (Côte d'Ivoire)**, spécialisée dans :

- le maquillage mariée (civil, traditionnel, religieux),
- le maquillage DC et DH,
- le maquillage anniversaire,
- le maquillage soirée,
- le maquillage jour et occasions spéciales.

Le site permet aux visiteuses de découvrir les prestations, le portfolio (photos réelles de clientes), les transformations avant/après, les tarifs et les témoignages, puis de prendre contact pour une réservation ou un devis.

## Informations officielles (source : flyer + propriétaire)

- **Nom** : Sunshine Beauty by Aimée Camille
- **Téléphone / WhatsApp** : +225 07 48 40 15 48
- **Adresse** : Rue F34, 522, Abidjan
- **Facebook** : https://www.facebook.com/aimee.camille.sery.2025 (Aimée Camille Sery)
- **Tarifs (FCFA)** : mariée civil 40 000 · traditionnel 35 000 · religieux 30 000 · DC 25 000 · DH 15 000 · anniversaire 15 000 · soirée 10 000 · jour 8 000

## Langue et ton

- **Toute l'interface est en français** (textes, labels, messages d'erreur, attributs `alt`, métadonnées SEO).
- Ton et identité visuelle : **élégant, haut de gamme, féminin, moderne**.
- Palette : crème `#faf7f2`, rose poudré `#f2dcdc`, doré `#c9a227`, brun foncé `#2b2118` (variables CSS). Polices : Playfair Display (titres) + Jost (corps) via Google Fonts.

## Stack technique

- **HTML, CSS et JavaScript pur — aucun framework, aucune bibliothèque externe.**
- Pas d'outil de build : le site fonctionne en ouvrant directement `index.html`.
- Prévisualisation locale : serveur PowerShell `tools/serve.ps1` sur le port 8080 (ni Python ni Node ne sont installés sur cette machine). Configuré dans `.claude/launch.json`.

## Structure du projet

```
/
├── index.html              # Page unique (toutes les sections)
├── css/
│   ├── style.css           # Design system + tous les composants
│   └── responsive.css      # Media queries mobile-first (768 / 1024 / 1400 px)
├── js/
│   ├── main.js             # Header, burger, scroll-spy, animations reveal, carrousel témoignages
│   ├── gallery.js          # Filtres portfolio, lightbox, curseurs avant/après
│   └── form.js             # Validation du formulaire + envoi Formspree optionnel
├── assets/
│   └── images/             # 16 photos réelles optimisées, noms en kebab-case français
├── image/                  # Photos sources fournies par la propriétaire (ne pas modifier)
├── tools/serve.ps1         # Serveur statique local (hors site, gitignoré)
└── CLAUDE.md
```

## Sections du site (dans l'ordre)

1. **Accueil** — hero avec photo réelle (soirée dentelle verte) : photo à droite sur desktop, plein écran voilé sur mobile.
2. **À propos** — portrait réel d'Aimée Camille, parcours, philosophie. ⚠️ Les chiffres « 10 ans / 300+ mariées » sont des exemples à confirmer.
3. **Prestations** — cartes : mariée, DC & DH, anniversaire, soirée, jour + carte devis personnalisé.
4. **Portfolio** — 8 réalisations réelles filtrables (Mariage / Beauté / Shooting / Événementiel), lightbox accessible, + **3 comparateurs avant/après** glissables (vraies transformations).
5. **Témoignages** — carrousel automatique. ⚠️ Avis fictifs à remplacer par de vrais avis.
6. **Tarifs** — 4 cartes avec les prix réels en FCFA, appel à l'action devis.
7. **FAQ** — accordéon (déplacement à Abidjan et environs, durées, produits, essai mariée, réservation, annulation).
8. **Contact / Réservation** — formulaire validé + coordonnées, WhatsApp, Facebook, carte Google Maps (Abidjan).

## Formulaire de contact / réservation

Champs obligatoires : nom, téléphone (format international, ex. +225), email, type de prestation (liste avec prix FCFA), date souhaitée (pas dans le passé), message, consentement RGPD.

- Validation côté client en temps réel, messages d'erreur en français.
- Champ honeypot anti-spam invisible.
- **Mode démonstration par défaut** : pour activer l'envoi réel, créer un formulaire sur https://formspree.io et renseigner l'URL dans l'attribut `action` du `<form>` (form.js lit `getAttribute("action")`, ne pas utiliser `form.action`).

## Exigences qualité

### Responsive
- Mobile-first : breakpoints `min-width` 768 / 1024 / 1400 px ; menu burger sous 1024 px.

### UX/UI
- Animations subtiles via IntersectionObserver (`.reveal`), `prefers-reduced-motion` respecté.
- Accessibilité : ARIA, navigation clavier complète (lightbox : Échap, flèches, piège à focus), contrastes.

### SEO
- HTML sémantique, un seul `h1`, métadonnées « maquilleuse professionnelle à Abidjan ».
- Open Graph + Twitter Card avec photo réelle, JSON-LD schema.org `BeautySalon` (adresse Abidjan, `areaServed`, tarifs, lien Facebook dans `sameAs`), favicon SVG, `robots.txt` et `sitemap.xml`.
- **URL publique** : https://amazingasprod-maker.github.io/Sunshine-Beauty/ (GitHub Pages, dépôt `amazingasprod-maker/Sunshine-Beauty`, branche `main`). Si un domaine personnalisé est acheté un jour, mettre à jour canonical, og:url, og:image, twitter:image, JSON-LD, robots.txt et sitemap.xml.

### Performances
- Images en `loading="lazy"` (sauf hero en `fetchpriority="high"`), dimensions déclarées.
- Animations en `transform`/`opacity` uniquement.

## Conventions de développement

- Code commenté en français ; classes CSS en kebab-case (BEM léger : `bloc__element--modificateur`).
- JavaScript ES6+ en IIFE, aucune variable globale.
- **Git** : le projet est versionné (branche `main`). Faire un commit après chaque lot de modifications validé, messages en français. Les photos sources (`image/`) et les anciennes versions restent récupérables dans l'historique.
- Vérifier le rendu dans le navigateur (preview port 8080) après chaque modification visible.

## Points en attente (propriétaire)

1. Confirmer les chiffres « 10 ans d'expérience / 300+ mariées » (section À propos).
2. Fournir de vrais témoignages clients.
3. Fournir une URL Formspree pour activer l'envoi réel du formulaire.
4. Éventuel domaine personnalisé (le site est en ligne sur GitHub Pages en attendant).
