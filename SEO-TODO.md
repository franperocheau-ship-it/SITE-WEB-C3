# SEO — À faire le jour du lancement du référencement

Ce fichier liste ce qui reste **volontairement en attente** suite à l'audit SEO préparatoire. Rien ci-dessous n'a d'effet sur l'indexation actuelle — tant que cette liste n'est pas traitée, le site n'est pas référencé.

## 1. Contenu à rédiger (actuellement des placeholders vides)

Chaque page publique a désormais un bloc `<meta name="description">` + Open Graph vide, repéré par un commentaire `<!-- SEO: ... -->` dans le `<head>`. À rédiger page par page :
- `meta name="description"` (150-160 caractères, unique par page)
- `og:description` (peut reprendre la meta description)
- `og:image` (choisir/créer une image de partage 1200×630, une par grande section suffit — Français / Mathématiques / Informatique / Rédaction / Accueil)

33 pages concernées (voir liste dans `seo-drafts/sitemap.xml.draft`).

## 2. Activer les brouillons

- Renommer `seo-drafts/sitemap.xml.draft` → `sitemap.xml` (racine du repo).
- Renommer `seo-drafts/robots.txt.draft` → `robots.txt` (racine du repo), décommenter la ligne `Sitemap:`.
- Revérifier la liste `Disallow` de robots.txt : toute page privée ajoutée depuis cet audit doit y figurer.
- Adapter les liens internes vers la page d'accueil : `href="index.html"` → `href="/"` (cohérence avec la balise `canonical` déjà posée sur `index.html`, qui pointe vers `https://proficiamus.eu/`).

## 3. Décider du sort de `exercise.html` et `jogging.html`

Ces deux pages affichent un contenu entièrement différent selon un paramètre d'URL (`?slug=`, `?id=`), mais leur `<title>` HTML statique est générique ("Exercice — Français — LFM"). Un crawler qui n'exécute pas JS (ou qui n'attend pas assez) verra toujours le même titre pour des dizaines d'exercices différents. Options à trancher plus tard :
- les exclure durablement de l'indexation (déjà fait dans les brouillons `robots.txt.draft`/`sitemap.xml.draft`) ;
- ou pré-rendre une version statique par exercice/session (projet à part, pas un simple réglage).

## 4. `test-connexion.html`

Outil de debug Supabase sans valeur publique. Recommandation : le supprimer purement et simplement plutôt que de le laisser en `Disallow`.

## 5. Soumission

- Une fois `sitemap.xml`/`robots.txt` activés et poussés en production : créer/vérifier la propriété dans Google Search Console, soumettre l'URL du sitemap.
- Attendre au moins quelques jours après le lancement avant de juger de l'indexation (délai normal, pas un signe de problème).

## 6. Cohérence de branding (mineur, non bloquant)

`informatique.html` a pour titre "Informatique – Site Web C3" alors que toutes les autres pages utilisent "… — Lycée Français de Madrid" ou "… — PROFICIAMUS". À harmoniser en même temps que la rédaction des vraies title/description (point 1).

## 7. URLs accentuées (`français-*.html`, `mathématiques-*.html`)

Non traité par cet audit : renommer ces fichiers casserait tous les liens internes/nav/breadcrumb qui les référencent, pour un bénéfice SEO mineur. À évaluer séparément si besoin, avec un plan de redirection, pas en modification silencieuse.

## Déjà fait lors de cet audit préparatoire (rien à refaire)

- Title unique sur les 48 pages (déjà en place avant l'audit).
- Meta description / canonical / Open Graph : structure posée (vide) sur les 33 pages publiques.
- H1 manquant sur `index.html` : corrigé (H1 accessible, masqué visuellement, ne change pas le design).
- `alt` sur les images des pages publiques : déjà 100% correct, aucune correction nécessaire.
- Images sur-dimensionnées recompressées (redimensionnées à leur taille d'affichage réelle ×2-3 pour le rétina) : `Astrapi.png`, `proficiamusgrand.png`, `blockly.png`, `icone1/2/3.png`, `iconemaths.png`, `iconefrancais.png`, et les icônes de catégories (conjugaison, grammaire, orthographe, algebre, geometrie, nombres-entiers, proportionnalite, prof, fractions, nombres-decimaux, probabilites, calcul, grandeurs-et-mesures, lecture, vocabulaire) — ~6,3 Mo économisés au total, aucun changement visuel.
- 3 fichiers images morts supprimés (`assets/homepage-reference.png`, `assets/enfants-cm2.png`, `en construction.png` à la racine).
