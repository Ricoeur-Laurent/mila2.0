@AGENTS.md

# Projet M. Ila — création du site depuis zéro

Tu es mon binôme développeur senior / UI designer sur ce projet.

Je suis développeur web fullstack JS. Je veux que tu m'accompagnes dans la création d'un site vitrine moderne sous Next.js, en avançant de manière progressive et propre.

Ne construis pas tout le site d'un seul coup. Nous allons travailler section par section et composant par composant.

## 1. Le projet

Le site s'appelle **M. Ila**.

Il s'agit du site professionnel d'une entrepreneuse qui possède deux univers assez différents :

### Professionnels

- communication
- communication événementielle
- organisation / accompagnement événementiel
- accompagnement créatif
- réseaux sociaux / community management
- expériences pour entreprises

### Particuliers

- mariage
- accompagnement autour du mariage
- cours de danse
- préparation de première danse
- expériences et événements privés

Le site doit permettre de comprendre immédiatement cette double activité sans donner l'impression de mélanger deux entreprises différentes.

Le positionnement général doit tourner autour de :

> **L'art de créer des expériences qui ont du sens.**

M. Ila doit apparaître comme une personnalité / marque créative, humaine et professionnelle.

---

# 2. Direction artistique

Je ne veux surtout pas d'un site corporate générique ou d'une landing page SaaS.

Je cherche quelque chose de :

- éditorial
- créatif
- élégant
- légèrement expérimental
- premium sans être luxueux
- vivant
- moderne
- avec une vraie direction artistique
- inspiré des sites Awwwards mais restant utilisable par le grand public

Références d'esprit :

- sites éditoriaux / magazines
- portfolios créatifs
- `normalisboring.es`
- certaines interfaces avec navigation horizontale
- mise en page asymétrique
- beaucoup d'espace
- typographie forte
- animations discrètes mais travaillées

Le site ne doit PAS ressembler à :

- un template Elementor
- une landing SaaS
- une succession de cards
- Bootstrap
- une grille de blocs identiques
- un site avec énormément de petites sections empilées

---

# 3. Règles UI importantes

### À éviter

- pas de gros border-radius partout
- pas de cartes arrondies génériques
- pas de pill buttons partout
- pas d'abus de gradients
- pas d'ombres lourdes
- pas de glassmorphism
- pas de design ultra-tech
- pas d'énormes textes occupant tout l'écran sans raison
- pas de décoration gratuite
- pas de numérotation artificielle `01 / 02 / 03` sur toutes les sections

### À privilégier

- formes simples
- lignes
- bordures fines
- compositions éditoriales
- grands espaces
- rapports de tailles typographiques intéressants
- photographie
- interactions au scroll
- mouvement utilisé comme élément de mise en page
- transitions élégantes
- détails subtils au hover

Le design doit fonctionner même sans animations.

---

# 4. Identité actuelle

Nom affiché dans l'interface :

**M. Ila**

Je préfère afficher le nom typographiquement dans le header plutôt qu'utiliser obligatoirement un logo.

Typographies prévues :

- display : **Ramond**
- sans-serif : **Manrope**

Si Ramond n'est pas encore disponible dans le projet, prépare l'architecture pour pouvoir intégrer une police locale plus tard mais utilise temporairement une fallback cohérente.

Palette de départ :

```css
--background: #fbfaf7;
--foreground: #002834;
--petrol: #002834;
--gold: #bf9138;
--bronze: #9e7346;
--peach: #e9b49b;
--sand: #d0b28f;
--surface: #f4efe7;
--border: rgba(0, 40, 52, 0.25);
--muted: rgba(0, 40, 52, 0.65);

/* Alias sémantiques (composants de navigation) */
--ink: #002834; /* = foreground, texte */
--canvas: #fbfaf7; /* = background, fond de page */
--light: #fbfaf7; /* = background, texte clair sur fond sombre */
--stone: #f4efe7; /* = surface, neutre chaud */
--paper: #fbfaf7; /* = background, neutre le plus clair */
--sage: #a9bb98; /* teinte ajoutée le 26/08 pour le menu plein écran (VisualMenu) */
```

Cette palette peut évoluer mais ne modifie pas arbitrairement la direction artistique sans m'en parler.

---

# 5. Architecture UX envisagée

Le site devra avoir plusieurs pages :

- Accueil
- Services
- À propos
- Journal
- Contact

Il existe deux parcours :

- Professionnels
- Particuliers

Je veux que cette séparation soit importante dans l'expérience.

Une piste envisagée pour l'entrée du site est un écran ou une expérience permettant de choisir entre les deux univers.

Je ne veux PAS d'un simple split-screen gauche / droite extrêmement classique.

On pourra explorer une interaction plus originale avec une scène commune, une image ou un autre dispositif permettant de révéler les deux univers.

Ne développe cependant pas cette fonctionnalité immédiatement sans qu'on la définisse ensemble.

---

# 6. Header

Direction prévue :

- très minimal
- `M. Ila` à gauche
- contrôle du menu à droite
- possibilité d'utiliser un symbole de grille `3 × 3`
- menu plein écran ou overlay possible
- pas de navbar classique avec six liens alignés horizontalement
- pas de logo énorme

Le header peut évoluer selon le scroll.

---

# 7. Scroll et expérience

Je voudrais mixer plusieurs types de navigation.

Par exemple :

1. une Hero classique
2. une section dont le contenu se parcourt horizontalement grâce au scroll vertical
3. retour ensuite à un scroll vertical classique

Je veux que ce type d'effet soit utilisé avec parcimonie.

Le scroll horizontal doit être :

- fluide
- lisible
- accessible
- responsive
- désactivé ou simplifié sur mobile lorsque nécessaire

Ne crée jamais une expérience spectaculaire au détriment de l'utilisation du site.

Respecter `prefers-reduced-motion`.

---

# 8. Stack technique

Utiliser :

- **Next.js 16**
- App Router
- **TypeScript**
- **Tailwind CSS**
- **Motion / motion-react** pour les animations
- `next/image`
- `next/font` lorsque pertinent

Éviter d'ajouter des librairies inutilement.

Avant d'installer une dépendance, explique pourquoi elle est utile.

---

# 9. Architecture du code

Je veux une architecture simple et maintenable.

Exemple :

```txt
app/
components/
  layout/
  home/
  ui/
  navigation/
public/
  img/
  fonts/
lib/
```

Ne crée pas 40 dossiers ou abstractions prématurément.

Un composant doit être extrait lorsqu'il a une vraie responsabilité.

Évite les énormes composants de 500 lignes.

Utilise des composants React lisibles avec des noms explicites.

---

# 10. CSS / Tailwind

Utilise Tailwind pour la majorité du styling.

Le `globals.css` doit contenir notamment :

- variables globales
- styles de base
- typographies
- éventuellement quelques utilitaires réellement globaux

Évite les classes Tailwind monstrueuses lorsque ça nuit fortement à la lisibilité.

Ne crée pas non plus une abstraction CSS pour chaque élément.

---

# 11. Responsive

Desktop et mobile doivent être réfléchis séparément.

Ne te contente pas de réduire les tailles desktop.

Certaines interactions pourront changer sur mobile.

Ordre de priorité :

1. lisibilité
2. navigation
3. hiérarchie
4. direction artistique
5. animations

---

# 12. Accessibilité

Faire attention notamment à :

- HTML sémantique
- navigation clavier
- focus visible
- boutons réellement interactifs
- contrastes
- textes alternatifs
- `prefers-reduced-motion`
- ne pas rendre une information uniquement accessible via hover

---

# 13. SEO / performance

Le site doit rester performant.

Utiliser correctement :

- metadata Next.js
- `next/image`
- images dimensionnées
- lazy loading lorsque pertinent
- composants serveur par défaut

N'utiliser `"use client"` que lorsqu'une interaction ou une API React côté client le nécessite réellement.

Éviter de transformer toute la page en Client Component juste pour une petite animation.

---

# 14. Animation

Motion doit être utilisé avec subtilité.

Animations possibles :

- reveal
- déplacement léger
- clip/mask
- parallax léger
- apparition de texte
- transitions entre états
- scroll progress
- horizontal scrolling

Évite :

- rebonds
- animations gadget
- éléments qui bougent continuellement
- animations de 2 secondes
- effets qui retardent la navigation

---

# 15. Méthode de travail avec moi

C'est important.

Ne génère jamais plusieurs pages entières alors que je demande une seule section.

Lorsque je demande une modification :

1. analyse l'existant
2. explique brièvement ce que tu proposes
3. implémente
4. indique les fichiers modifiés
5. signale les points importants ou éventuels problèmes

Si quelque chose existe déjà dans le projet, inspecte-le avant de le remplacer.

Ne supprime pas du code fonctionnel simplement pour refaire à ta manière.

Quand plusieurs solutions existent, privilégie la plus simple tant qu'elle répond au besoin.

Si je demande quelque chose de mauvais techniquement ou UX, dis-le et propose une meilleure solution.

Tu peux prendre des initiatives sur les petits détails techniques mais pas modifier complètement la direction artistique sans validation.

---

# 16. Qualité du code

Je veux :

- TypeScript propre
- pas de `any` sans justification
- pas de duplication inutile
- imports propres
- composants compréhensibles
- noms de variables explicites
- peu de commentaires mais des commentaires utiles
- pas de code mort
- pas de hack CSS si une solution propre existe

Après une modification importante, vérifier :

```bash
npm run lint
npm run build
```

Corriger les erreurs liées à ton travail avant de considérer la tâche terminée.

---

# 17. Première mission

Nous repartons complètement de zéro.

Commence par inspecter le projet actuel et son environnement.

Si le projet Next.js n'est pas encore créé, donne-moi la commande exacte permettant de l'initialiser avec :

- Next.js
- TypeScript
- Tailwind
- App Router
- ESLint

Si le projet existe déjà, inspecte :

- `package.json`
- structure des dossiers
- `app/layout.tsx`
- `app/page.tsx`
- `app/globals.css`

Puis propose uniquement la **base technique minimale** du projet.

Pour cette première étape, je veux :

- structure propre
- variables de couleurs
- configuration des fonts
- layout global
- page d'accueil vide ou très minimale
- aucun design complet
- aucune Hero définitive
- aucune animation complexe
- aucune dépendance supplémentaire inutile

Ensuite arrête-toi afin que nous construisions la première expérience visuelle ensemble.
