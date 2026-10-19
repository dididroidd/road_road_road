# Tickets — Bike Route Discovery

Format de chaque ticket (lu par `scripts/create-github-issues.mjs`) :
un titre `## Txx · Titre`, puis une ligne `**Milestone:** … | **Labels:** … | **Taille:** … | **Dépend de:** …`.

Tailles : **S** ≈ ½ journée · **M** ≈ 1-2 jours · **L** ≈ 3-5 jours.

Milestones :

- **M0 · Fondations** : dépôt, outils, design system
- **M1 · Données** : base, import des circuits, API
- **M2 · App V1** : les écrans de la maquette
- **M3 · Publication** : qualité et Play Store
- **Plus tard** : idées hors V1 (label `plus-tard`)

---

## T01 · Initialiser le monorepo

**Milestone:** M0 · Fondations | **Labels:** setup | **Taille:** S | **Dépend de:** —

### Contexte

Un seul dépôt pour l'app, les types partagés, la base Supabase et les scripts d'import (voir `docs/stack.md`).

### À faire

- [ ] Créer le dépôt GitHub et le monorepo (workspaces pnpm) : `apps/mobile`, `packages/shared`, `supabase`, `scripts/import`, `docs`
- [ ] TypeScript strict partagé (`tsconfig.base.json`)
- [ ] ESLint + Prettier + `.editorconfig`
- [ ] `.gitignore`, `.env.example` (sans aucune clé réelle)
- [ ] README : prérequis (Node LTS, pnpm, Android Studio, Supabase CLI) et commandes

### Critères d'acceptation

- `pnpm install`, `pnpm lint` et `pnpm typecheck` passent à la racine
- `packages/shared` est importable depuis `apps/mobile` et `scripts/import`

---

## T02 · Intégration continue GitHub Actions

**Milestone:** M0 · Fondations | **Labels:** setup, ci | **Taille:** S | **Dépend de:** T01

### À faire

- [ ] Workflow sur chaque PR : install (avec cache), lint, typecheck, tests
- [ ] Protection de la branche `main` (CI verte obligatoire)

### Critères d'acceptation

- Une PR avec une erreur de type est bloquée

---

## T03 · Initialiser l'app Expo et la navigation

**Milestone:** M0 · Fondations | **Labels:** setup, mobile | **Taille:** M | **Dépend de:** T01

### Contexte

MapLibre impose un _development build_ (Expo Go ne suffit pas).

### À faire

- [ ] Créer l'app Expo (dernier SDK stable, TypeScript) dans `apps/mobile`
- [ ] Expo Router : écran d'accueil + barre d'onglets Explorer / Circuits / Favoris / Profil (écrans vides)
- [ ] Route de détail `circuit/[id]` et route `circuit/[id]/trace`
- [ ] `eas.json` : profils `development`, `preview` (APK installable) et `production`
- [ ] Variables d'environnement via `app.config.ts` (`EXPO_PUBLIC_…`)
- [ ] Installer `@maplibre/maplibre-react-native` + son plugin, vérifier qu'une carte vide s'affiche

### Critères d'acceptation

- Un build de développement Android tourne sur l'émulateur et sur un vrai téléphone
- On navigue entre les 4 onglets ; une carte MapLibre vide s'affiche dans Explorer

---

## T04 · Mettre en place Supabase

**Milestone:** M0 · Fondations | **Labels:** setup, backend | **Taille:** S | **Dépend de:** T01

### À faire

- [ ] Supabase CLI : environnement local (`supabase start`) dans `supabase/`
- [ ] Projets distants `dev` et `prod`
- [ ] Activer l'extension PostGIS (migration)
- [ ] Script `pnpm db:types` qui génère les types TS dans `packages/shared`
- [ ] Client Supabase dans l'app (URL + clé _anon_ via variables d'environnement)

### Critères d'acceptation

- Les migrations s'appliquent en local et sur `dev` ; les types générés compilent

---

## T05 · Design tokens

**Milestone:** M0 · Fondations | **Labels:** design, mobile | **Taille:** S | **Dépend de:** T03

### Contexte

Reprise de la maquette : vert forêt `#2A6B3F`, crème `#F7F6F2`, encre `#1A1F16`, gris texte `#7A7A6E` ; titres **Fraunces**, texte **Outfit** ; rayons 12 / 16 px.

### À faire

- [ ] `theme.ts` : couleurs, typographie (tailles/graisses), espacements, rayons, ombres
- [ ] Une couleur par pratique, réutilisée partout (tracés, badges, filtres) : Route, VTT, Gravel, VAE
- [ ] Couleurs de difficulté (Facile / Moyen / Difficile) avec contraste AA
- [ ] Charger Fraunces et Outfit avec `expo-font`, écran de démarrage tenu pendant le chargement

### Critères d'acceptation

- Aucun code couleur ou taille de police « en dur » dans les écrans (tout passe par le thème)

---

## T06 · Composants de base

**Milestone:** M0 · Fondations | **Labels:** design, mobile | **Taille:** L | **Dépend de:** T05

### À faire

- [ ] `Button` (plein, contour, discret ; état chargement/désactivé)
- [ ] `Chip` sélectionnable (filtres, rayon), `SegmentedControl` (km/miles)
- [ ] `PracticeBadge` (icône + couleur + libellé), `DifficultyBadge` (couleur **et** texte/icône, jamais la couleur seule)
- [ ] `OfficialBadge` (« ✓ Officiel »), `StatTile` (icône, valeur, libellé)
- [ ] `CircuitCard` (photo, n°, titre, distance, D+, difficulté, commune, distance depuis moi, cœur)
- [ ] `BottomSheet` (`@gorhom/bottom-sheet`), `EmptyState`, `Skeleton`, `Toast`
- [ ] Zones de tap ≥ 48 dp (utilisation avec des gants)

### Critères d'acceptation

- Un écran « catalogue » (dev uniquement) affiche tous les composants dans leurs états
- Les composants ont des libellés d'accessibilité

---

## T07 · Valider les droits de réutilisation des données

**Milestone:** M1 · Données | **Labels:** données, non-dev | **Taille:** S | **Dépend de:** —

### Contexte

Voir `docs/sources-de-donnees.md`. L'API Geotrek d'Auvergne-Rhône-Alpes Tourisme est publique mais n'affiche aucune licence. Les photos ont leur propre auteur/licence.

### À faire

- [ ] Écrire à Auvergne-Rhône-Alpes Tourisme : licence des données Geotrek, conditions d'attribution, usage dans une app gratuite
- [ ] Écrire à la FFVélo (`veloenfrance@ffvelo.fr`) : accès aux circuits Véloenfrance / randonnées permanentes
- [ ] Consigner les réponses et les mentions d'attribution obligatoires dans `docs/sources-de-donnees.md`

### Critères d'acceptation

- La licence applicable à chaque source utilisée en V1 est écrite dans la doc

---

## T08 · Modèle de données des circuits

**Milestone:** M1 · Données | **Labels:** backend, données | **Taille:** M | **Dépend de:** T04

### À faire

- [ ] Table `sources` (nom, type d'adaptateur, URL, licence, attribution)
- [ ] Table `circuits` :
  - identité : `id`, `source_id`, `external_id` (unique par source), `number`, `name`, `slug`
  - pratique : enum `route | vtt | gravel | vae`
  - `difficulty` normalisée (`facile | moyen | difficile`) + `difficulty_raw`
  - `circuit_type` (`boucle | aller_retour | itineraire`), `is_marked` (balisé), `is_permanent_ride`
  - `distance_m`, `ascent_m`, `descent_m`, `min_elevation_m`, `max_elevation_m`
  - `duration_min` + `duration_is_estimated` (booléen)
  - `geom` (LineString 4326, peut être nul), `geom_simplified`, `start_point` (Point 4326)
  - `departure_city`, `organisation`, `description`, `teaser`, `advice`, `access`, `parking`
  - `gpx_path` (Storage, nul si pas de GPX), `elevation_profile` (jsonb, ≤ 200 points)
  - `photos` (jsonb : url, auteur, licence), `source_url`, `source_updated_at`
  - `published`, `hidden`, `created_at`, `updated_at`
- [ ] Table `circuit_overrides` (champ → valeur) appliquée par une vue `circuits_public`, pour que les corrections manuelles survivent aux ré-imports
- [ ] Table `import_runs` (source, début, fin, créés/mis à jour/dépubliés, erreurs)
- [ ] Index GiST sur `start_point` et `geom_simplified`, index sur `practice`, `difficulty`
- [ ] RLS : lecture publique des circuits publiés et non masqués ; écriture réservée à la clé _service role_
- [ ] Bucket Storage public `gpx`

### Critères d'acceptation

- Migration appliquée, types régénérés
- Un circuit masqué ou dépublié n'est pas lisible avec la clé _anon_

---

## T09 · Import des circuits depuis Geotrek

**Milestone:** M1 · Données | **Labels:** backend, données | **Taille:** L | **Dépend de:** T08

### Contexte

Instance : `https://geotrek.auvergnerhonealpes-tourisme.com/api/v2/` — ~1 700 circuits vélo (Route 536, VTT 1 120, Gravel 83, + VAE/VTTAE).

### À faire

- [ ] Interface `SourceAdapter` (`fetchAll()`, `toCircuit()`) pour pouvoir brancher d'autres sources
- [ ] Adaptateur Geotrek : pagination `/trek/?practices=…`, langue `fr`
- [ ] Correspondances depuis `/trek_practice/`, `/trek_difficulty/`, `/trek_route/` → nos enums (VTTAE → VAE à valider)
- [ ] Récupérer le GPX quand il existe et le stocker dans le bucket `gpx` ; sinon `gpx_path = null`
- [ ] Nettoyer le HTML des descriptions (texte simple ou Markdown)
- [ ] Upsert par `(source_id, external_id)` ; dépublier les circuits disparus de la source
- [ ] Respect de l'API : délai entre requêtes, reprise en cas d'erreur
- [ ] Commande `pnpm import:geotrek` + enregistrement dans `import_runs`

### Critères d'acceptation

- Un import complet fonctionne sur la base locale ; le relancer ne crée aucun doublon
- Les Drôme et Ardèche sont bien couvertes ; un circuit sans GPX est importé sans tracé

---

## T10 · Durée estimée quand la source ne la fournit pas

**Milestone:** M1 · Données | **Labels:** backend, données | **Taille:** S | **Dépend de:** T09

### À faire

- [ ] Fonction pure dans `packages/shared` : durée = distance / vitesse moyenne de la pratique + pénalité selon le D+ (valeurs documentées, ex. Route 22 km/h, VTT 12, Gravel 16, VAE 18)
- [ ] À l'import : durée de la source si présente (`duration_is_estimated = false`), sinon calculée (`true`)
- [ ] Tests unitaires

### Critères d'acceptation

- Aucun circuit sans durée après import ; la provenance de la durée est connue

---

## T11 · Profil altimétrique

**Milestone:** M1 · Données | **Labels:** backend, données | **Taille:** M | **Dépend de:** T09

### À faire

- [ ] Récupérer le profil Geotrek (`/trek/{id}/profile/`) ; sinon le calculer depuis les altitudes du GPX
- [ ] Réduire à ≤ 200 points `[distance_m, altitude_m]` et stocker dans `elevation_profile`
- [ ] Recalculer D+, D-, altitudes min/max si la source ne les donne pas

### Critères d'acceptation

- Chaque circuit avec tracé a un profil de moins de 10 Ko

---

## T12 · Fonctions de recherche (RPC PostGIS)

**Milestone:** M1 · Données | **Labels:** backend | **Taille:** M | **Dépend de:** T08

### Contexte

L'Explorer et la liste doivent toujours afficher **les mêmes nombres** (la maquette annonce 24 circuits sur la carte mais en liste 6).

### À faire

- [ ] Géométrie simplifiée (`ST_Simplify`) calculée à l'import pour la carte
- [ ] `search_circuits(lat, lng, radius_km, filters, sort, limit, offset)` → liste paginée avec `distance_from_user_m`
- [ ] `count_circuits(lat, lng, radius_km, filters)` → total + répartition par pratique (pour le panneau Explorer et « Voir N résultats »)
- [ ] `circuits_in_bbox(bbox, filters)` → tracés simplifiés pour la carte
- [ ] `get_circuit(id)` → détail complet (overrides appliqués)
- [ ] Filtres : pratiques, tranches de distance, difficultés, types, D+ max, GPX uniquement, texte
- [ ] Tests SQL (pgTAP) ou tests d'intégration

### Critères d'acceptation

- Une recherche dans un rayon de 100 km répond en moins de 300 ms sur la base `dev`
- `count_circuits` et `search_circuits` donnent le même total pour les mêmes filtres

---

## T13 · Import automatique planifié

**Milestone:** M1 · Données | **Labels:** backend, ci | **Taille:** S | **Dépend de:** T09

### À faire

- [ ] Workflow GitHub Actions hebdomadaire (+ lancement manuel) qui exécute l'import sur `prod`
- [ ] Clé _service role_ en secret GitHub
- [ ] Échec visible (workflow rouge) si l'import échoue ou importe 0 circuit

### Critères d'acceptation

- Un lancement manuel met à jour la base `prod` et crée une ligne dans `import_runs`

---

## T14 · Procédure d'administration

**Milestone:** M1 · Données | **Labels:** backend, docs | **Taille:** S | **Dépend de:** T08

### À faire

- [ ] Documenter dans `docs/admin.md` : masquer un circuit, corriger un champ via `circuit_overrides`, relancer un import, lire `import_runs`
- [ ] Vérifier qu'une correction survit à un ré-import

### Critères d'acceptation

- La procédure est testée de bout en bout sur `dev`

---

## T15 · Écran d'accueil et permission de localisation

**Milestone:** M2 · App V1 | **Labels:** mobile, ecran | **Taille:** M | **Dépend de:** T06

### À faire

- [ ] Écran d'accueil de la maquette (photo, titre, 3 atouts, « Commencer l'exploration », nombre réel de circuits)
- [ ] Affiché au premier lancement seulement (drapeau persistant)
- [ ] Écran qui explique pourquoi on demande la localisation, **avant** la demande système (`expo-location`, précision approximative suffisante)
- [ ] Si refus : proposer de choisir une commune (voir T16), et un lien vers les réglages

### Critères d'acceptation

- Premier lancement : accueil → explication → demande → Explorer
- Refus de la permission : l'app reste utilisable

---

## T16 · Position et recherche de lieu

**Milestone:** M2 · App V1 | **Labels:** mobile | **Taille:** M | **Dépend de:** T15

### À faire

- [ ] Store « centre de recherche » (position GPS ou lieu choisi) + rayon courant
- [ ] Champ « Rechercher un lieu, une commune… » avec autocomplétion API Adresse (`type=municipality`, debounce 300 ms)
- [ ] Bouton « me localiser » pour revenir à la position GPS

### Critères d'acceptation

- Choisir « Crest » recentre la recherche sur Crest ; le bouton de localisation revient à ma position

---

## T17 · Explorer — carte des circuits

**Milestone:** M2 · App V1 | **Labels:** mobile, ecran, carte | **Taille:** L | **Dépend de:** T12, T16

### À faire

- [ ] Fond de carte outdoor (MapTiler ou OpenFreeMap) avec attribution visible
- [ ] Tracés simplifiés (`circuits_in_bbox`) colorés par pratique ; points de départ regroupés (clustering) en dézoom
- [ ] Étiquette n° du circuit ; tap sur un tracé → aperçu (nom, distance, D+, « Voir le circuit »)
- [ ] Cercle du rayon de recherche + chips 10 / 30 / 50 / 100 km
- [ ] Bouton « Filtres » (avec nombre de filtres actifs) et bouton recentrer
- [ ] Chargement par zone visible, sans bloquer l'interface

### Critères d'acceptation

- Fluide avec 200 tracés visibles sur un téléphone Android milieu de gamme
- Changer le rayon met à jour la carte et le panneau

---

## T18 · Explorer — panneau « Autour de vous »

**Milestone:** M2 · App V1 | **Labels:** mobile, ecran | **Taille:** M | **Dépend de:** T17

### À faire

- [ ] Bottom sheet : « N circuits dans un rayon de X km » + répartition Route / VTT / Gravel / VAE (`count_circuits`)
- [ ] Tap sur une pratique = filtre rapide
- [ ] « Voir les circuits » → onglet Circuits avec les mêmes filtres
- [ ] Le panneau peut se remonter pour montrer la liste (optionnel, à valider en test)
- [ ] État vide : « Aucun circuit dans ce rayon » + proposer d'agrandir le rayon

### Critères d'acceptation

- Le nombre affiché est égal au nombre de résultats de la liste

---

## T19 · Écran Filtres

**Milestone:** M2 · App V1 | **Labels:** mobile, ecran | **Taille:** M | **Dépend de:** T06, T12

### À faire

- [ ] Modale : Activité, Distance, Difficulté, Type de circuit (boucle, itinéraire, randonnée permanente, balisé), D+ max (curseur), « GPX disponible uniquement »
- [ ] Store de filtres partagé Explorer / Circuits, persistant
- [ ] Bouton « Voir N résultats » mis à jour en direct (debounce) ; « Réinitialiser »
- [ ] Le vélo préféré du profil pré-sélectionne l'activité au premier lancement

### Critères d'acceptation

- Les filtres appliqués ici s'appliquent à la carte et à la liste

---

## T20 · Liste des circuits

**Milestone:** M2 · App V1 | **Labels:** mobile, ecran | **Taille:** M | **Dépend de:** T19

### À faire

- [ ] Titre « Circuits », recherche texte, chips rapides (Plus proches, Facile, Difficile, VTT, Route, Gravel…)
- [ ] « N circuits dans votre rayon » ; liste `CircuitCard` avec défilement infini (TanStack Query)
- [ ] Squelettes de chargement, tirer pour rafraîchir, état vide, état erreur
- [ ] Image de remplacement quand le circuit n'a pas de photo

### Critères d'acceptation

- La liste défile sans saccade avec 500 éléments chargés

---

## T21 · Fiche circuit

**Milestone:** M2 · App V1 | **Labels:** mobile, ecran | **Taille:** L | **Dépend de:** T11, T20

### À faire

- [ ] Photo d'en-tête avec crédit, retour, cœur favori, badge « Circuit officiel »
- [ ] N°, nom, pratique ; tuiles Distance / Dénivelé / Durée (mention « estimée » si `duration_is_estimated`)
- [ ] Bloc infos : difficulté, type, commune de départ, organisme
- [ ] Profil altimétrique (`react-native-svg`) avec axes en km
- [ ] Description, bloc « Balisage officiel » si le circuit est balisé, accès/parking, lien vers la source
- [ ] Boutons « Voir le tracé » et « Télécharger le GPX » **uniquement s'il y a un GPX**
- [ ] Incrémenter la stat locale « circuits vus »

### Critères d'acceptation

- Un circuit sans GPX affiche ses infos sans aucun bouton de tracé
- Les données affichées tiennent compte des overrides admin

---

## T22 · Vue tracé

**Milestone:** M2 · App V1 | **Labels:** mobile, ecran, carte | **Taille:** M | **Dépend de:** T17, T21

### À faire

- [ ] Carte plein écran cadrée sur le tracé complet (`geom`, pas la version simplifiée)
- [ ] Marqueurs Départ / Arrivée ; **un seul marqueur pour une boucle** (la maquette en montre deux)
- [ ] Bornes kilométriques
- [ ] Panneau bas : n°, nom, résumé, profil, bouton GPX
- [ ] Pas de position de l'utilisateur en V1

### Critères d'acceptation

- Le tracé entier est visible à l'ouverture, sur petit et grand écran

---

## T23 · Télécharger et partager le GPX

**Milestone:** M2 · App V1 | **Labels:** mobile | **Taille:** M | **Dépend de:** T21

### Contexte

V1 simple : un seul bouton qui ouvre la feuille de partage Android (Komoot, Strava, Garmin Connect, Fichiers…) au lieu d'intégrations dédiées.

### À faire

- [ ] Télécharger le GPX (`expo-file-system`) avec un nom de fichier lisible
- [ ] Ouvrir la feuille de partage (`expo-sharing`)
- [ ] Indicateur de chargement, confirmation (toast), message d'erreur clair (absent dans la maquette)
- [ ] Incrémenter la stat locale « GPX téléchargés »

### Critères d'acceptation

- Le fichier s'importe correctement dans Komoot et dans Strava

---

## T24 · Favoris (stockage local)

**Milestone:** M2 · App V1 | **Labels:** mobile, ecran | **Taille:** M | **Dépend de:** T21

### À faire

- [ ] Interface `FavoritesRepository` + implémentation locale (MMKV) — prête pour une version Supabase plus tard
- [ ] Cœur sur les cartes et la fiche, retour visuel immédiat
- [ ] Onglet Favoris : « N circuits enregistrés », liste, état vide avec lien vers Explorer
- [ ] Si un favori n'existe plus côté serveur, l'indiquer au lieu de planter

### Critères d'acceptation

- Les favoris survivent à la fermeture de l'app

---

## T25 · Profil et préférences

**Milestone:** M2 · App V1 | **Labels:** mobile, ecran | **Taille:** M | **Dépend de:** T06

### À faire

- [ ] Vélo préféré (Route / VTT / Gravel / VAE), rayon par défaut, unités km / miles
- [ ] Formatters de distance/altitude dans `packages/shared` qui respectent l'unité choisie, utilisés partout
- [ ] Statistiques locales : circuits vus, favoris, GPX téléchargés
- [ ] Interface `PreferencesRepository` (même logique que les favoris)

### Critères d'acceptation

- Passer en miles change toutes les distances de l'app

---

## T26 · Erreurs réseau et états vides

**Milestone:** M2 · App V1 | **Labels:** mobile | **Taille:** S | **Dépend de:** T20

### À faire

- [ ] Bannière « Pas de connexion » ; bouton réessayer
- [ ] Cache TanStack Query persistant : les derniers résultats et fiches vus restent lisibles hors ligne
- [ ] Revue de tous les écrans : chargement, vide, erreur

### Critères d'acceptation

- En mode avion, l'app ne plante pas et affiche les dernières données en cache

---

## T27 · À propos, attributions et confidentialité

**Milestone:** M2 · App V1 | **Labels:** mobile, legal | **Taille:** S | **Dépend de:** T07, T25

### À faire

- [ ] Écran « À propos » accessible depuis le Profil : sources des données et licences, attribution du fond de carte (© OpenStreetMap, MapTiler…), crédits photos
- [ ] Politique de confidentialité (pas de compte, localisation utilisée seulement sur le téléphone, Sentry) publiée sur une page web (exigée par le Play Store)
- [ ] Version de l'app

### Critères d'acceptation

- Toutes les attributions exigées par T07 apparaissent

---

## T28 · Identité de l'application

**Milestone:** M3 · Publication | **Labels:** design, mobile | **Taille:** S | **Dépend de:** T03

### À faire

- [ ] Nom définitif, identifiant de package Android (`fr.…`)
- [ ] Icône adaptative Android, écran de démarrage (`expo-splash-screen`)

### Critères d'acceptation

- L'icône et le splash s'affichent correctement sur Android 10 à 15

---

## T29 · Suivi des erreurs

**Milestone:** M3 · Publication | **Labels:** mobile, qualite | **Taille:** S | **Dépend de:** T03

### À faire

- [ ] Intégrer `@sentry/react-native` (envoi des source maps via EAS)
- [ ] Aucune donnée personnelle ni position envoyée

### Critères d'acceptation

- Une erreur volontaire en build `preview` apparaît dans Sentry, lisible

---

## T30 · Tests de bout en bout

**Milestone:** M3 · Publication | **Labels:** qualite | **Taille:** M | **Dépend de:** T22, T23, T24

### À faire

- [ ] Scénarios Maestro : premier lancement → Explorer → filtre → liste → fiche → tracé → favori → GPX
- [ ] Scénario « localisation refusée »
- [ ] Lancement documenté (local), et en CI si possible

### Critères d'acceptation

- Les scénarios passent sur un build `preview`

---

## T31 · Publication Play Store (test interne)

**Milestone:** M3 · Publication | **Labels:** release | **Taille:** M | **Dépend de:** T27, T28

### À faire

- [ ] Compte développeur Google Play
- [ ] Fiche Play Store : description, captures d'écran, catégorie, classification, section « Sécurité des données »
- [ ] Build `production` (AAB) via EAS, envoi en piste de test interne (EAS Submit)
- [ ] Liste de vérification de publication dans `docs/release.md`

### Critères d'acceptation

- L'app s'installe depuis le Play Store pour les testeurs internes

---

## T32 · [Plus tard] Comptes utilisateurs et synchronisation

**Milestone:** Plus tard | **Labels:** plus-tard, backend, mobile | **Taille:** L | **Dépend de:** T24, T25

### Idée

Supabase Auth (connexion anonyme liée ensuite à e-mail/Google), implémentations Supabase de `FavoritesRepository` et `PreferencesRepository`, envoi des favoris locaux au premier login.

---

## T33 · [Plus tard] Version iOS

**Milestone:** Plus tard | **Labels:** plus-tard, mobile | **Taille:** M | **Dépend de:** T31

### Idée

Build iOS via EAS (sans Mac), compte Apple Developer, tests sur iPhone, publication TestFlight.

---

## T34 · [Plus tard] Nouvelles sources de circuits

**Milestone:** Plus tard | **Labels:** plus-tard, données | **Taille:** L | **Dépend de:** T09

### Idée

Recenser d'autres instances Geotrek (départements, parcs) et écrire leurs adaptateurs ; FFVélo / Véloenfrance si accord ; relations vélo d'OpenStreetMap ; dédoublonnage entre sources.

---

## T35 · [Plus tard] Mode hors ligne

**Milestone:** Plus tard | **Labels:** plus-tard, mobile, carte | **Taille:** L | **Dépend de:** T22

### Idée

Télécharger une zone de carte et les circuits favoris pour les consulter sans réseau.

---

## T36 · [Plus tard] Back-office web

**Milestone:** Plus tard | **Labels:** plus-tard, backend | **Taille:** L | **Dépend de:** T14

### Idée

Si Supabase Studio ne suffit plus : Directus branché sur la base, ou petite app web pour modérer, corriger et ajouter des circuits.

---

## T37 · [Plus tard] Traduction anglaise

**Milestone:** Plus tard | **Labels:** plus-tard, mobile | **Taille:** M | **Dépend de:** T25

### Idée

Extraire les textes (i18n), traduire l'interface ; Geotrek fournit déjà des champs multilingues.
