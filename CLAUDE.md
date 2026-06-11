# CLAUDE.md

Ce fichier guide Claude Code lors du travail sur ce projet.

## Présentation du projet

Site web professionnel pour une **maquilleuse professionnelle** spécialisée dans :

- le maquillage beauté,
- le maquillage événementiel,
- le maquillage mariage,
- le maquillage pour shooting photo,
- les occasions spéciales.

Le site permet aux visiteuses de découvrir les prestations, le portfolio, les réalisations avant/après, les tarifs et les témoignages clients, puis de prendre contact facilement pour une réservation ou un devis.

## Langue et ton

- **Toute l'interface est en français** (textes, labels, messages d'erreur, attributs `alt`, métadonnées SEO).
- Ton et identité visuelle : **élégant, haut de gamme, féminin, moderne**.
- L'expérience utilisateur doit inspirer **confiance, professionnalisme et qualité premium**.

## Stack technique

- **HTML, CSS et JavaScript pur — aucun framework, aucune bibliothèque externe.**
- Pas d'outil de build : le site doit fonctionner en ouvrant directement `index.html`.
- Le fichier principal est `index.html` à la racine du projet.

## Structure du projet

Organisation claire, évolutive et maintenable :

```
/
├── index.html              # Page principale (point d'entrée)
├── css/
│   ├── style.css           # Styles principaux (variables, layout, sections)
│   └── responsive.css      # Media queries mobile / tablette / desktop
├── js/
│   ├── main.js             # Navigation, animations, interactions générales
│   ├── gallery.js          # Galerie portfolio (lightbox, filtres, avant/après)
│   └── form.js             # Validation et envoi du formulaire de contact
├── assets/
│   └── images/             # Photos portfolio, avant/après, portraits
└── CLAUDE.md
```

## Sections du site (dans l'ordre)

1. **Accueil** — hero immersif avec accroche, photo et appel à l'action (réservation).
2. **À propos** — présentation de la maquilleuse, son parcours, sa philosophie.
3. **Prestations** — cartes détaillant chaque type de prestation (beauté, événementiel, mariage, shooting photo, occasions spéciales).
4. **Portfolio** — galerie moderne et immersive mettant en valeur les réalisations, avec comparaisons **avant/après** et lightbox.
5. **Témoignages** — avis clients (carrousel ou grille).
6. **Tarifs** — grille tarifaire claire par prestation, avec appel à l'action devis.
7. **FAQ** — questions fréquentes (accordéon).
8. **Contact / Réservation** — formulaire de demande de réservation ou de devis.

## Formulaire de contact / réservation

Champs obligatoires :

- Nom
- Téléphone
- Email
- Type de prestation (liste déroulante : beauté, événementiel, mariage, shooting photo, occasion spéciale)
- Date souhaitée
- Message

Validation côté client en JavaScript avec messages d'erreur en français.

## Exigences qualité

### Responsive
- Entièrement responsive : **mobile, tablette et ordinateur** (approche mobile-first).
- Navigation mobile avec menu burger.

### UX/UI
- Appliquer les meilleures pratiques UX/UI : hiérarchie visuelle claire, appels à l'action visibles, animations subtiles, accessibilité (contrastes, navigation clavier, attributs ARIA).
- Typographie et palette de couleurs cohérentes avec l'image haut de gamme et féminine (définies en variables CSS).

### SEO
- HTML sémantique (`header`, `nav`, `main`, `section`, `footer`).
- Balises meta (title, description), Open Graph, attributs `alt` descriptifs en français.
- Une seule balise `h1`, hiérarchie de titres cohérente.

### Performances
- Images optimisées avec chargement différé (`loading="lazy"`).
- CSS et JS sans dépendances externes, code minimal et propre.
- Éviter les reflows inutiles ; privilégier `transform`/`opacity` pour les animations.

## Conventions de développement

- Code commenté en français lorsque nécessaire.
- Nommage des classes CSS en kebab-case et en français ou anglais cohérent (choisir un style et s'y tenir).
- JavaScript moderne (ES6+), sans variables globales inutiles.
- Générer automatiquement tous les fichiers nécessaires au bon fonctionnement du site.
