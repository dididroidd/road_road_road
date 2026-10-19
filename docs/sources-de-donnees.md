# Sources de données — circuits vélo officiels

> État de la recherche au 19/10/2026. À compléter au fil des contacts avec les producteurs.

## Recommandation V1

**Démarrer avec l'API Geotrek d'Auvergne-Rhône-Alpes Tourisme**, puis ajouter d'autres sources via un système d'« adaptateurs » d'import.

## Sources étudiées

### 1. Geotrek — ⭐ source principale V1

Geotrek est le logiciel libre utilisé par ~170 structures (départements, parcs nationaux/régionaux, agences de tourisme) pour publier leurs randonnées. Chaque structure a **sa propre instance** avec une API JSON/GeoJSON standard (`/api/v2/`).

Instance testée : `https://geotrek.auvergnerhonealpes-tourisme.com/api/v2/`

| Pratique (id)                              | Nombre de circuits |
| ------------------------------------------ | ------------------ |
| Route (2)                                  | 536                |
| VTT (3)                                    | 1 120              |
| Gravel (6)                                 | 83                 |
| VAE (10), VTTAE (13), Itinérance vélo (19) | non comptés        |

Couvre la Drôme et l'Ardèche (Agence d'Attractivité de la Drôme, ADT Ardèche…) : 99 structures productrices.

Champs disponibles par circuit (`/api/v2/trek/`) — couvrent quasiment toute la maquette :

- `name`, `description`, `description_teaser`, `ambiance`, `advice`, `access`
- `practice` (Route/VTT/Gravel/VAE), `difficulty`, `route` (boucle / aller-retour / itinéraire)
- `length_2d`, `length_3d`, `ascent`, `descent`, `min_elevation`, `max_elevation`
- `duration` (en heures, **fournie par la source**)
- `gpx`, `kml` (URL de fichiers prêts à télécharger), `geometry`, `departure_geom`
- `altimetric_profile` (endpoint de profil altimétrique), `elevation_svg_url`
- `departure`, `arrival`, `departure_city`, `cities`, `advised_parking`
- `structure`, `source` (organisme producteur), `labels`, `networks`, `themes`
- `attachments` (photos avec `author` et `license`), `pdf`, `update_datetime`, `published`

Endpoints utiles : `/trek_practice/`, `/trek_difficulty/`, `/trek_route/`, `/structure/`, `/source/`, `/city/`.

**⚠️ Licence à confirmer** : aucune mention de licence sur l'instance. À faire : écrire à Auvergne-Rhône-Alpes Tourisme pour obtenir l'autorisation/la licence de réutilisation (souvent Licence Ouverte Etalab, mais à vérifier). Les photos ont leur propre auteur/licence → toujours afficher le crédit.

Autres instances Geotrek à explorer ensuite (Gard, Vaucluse, Tarn, Hautes-Pyrénées, Alpes-Maritimes, parcs nationaux…) : il n'existe pas de liste publique centralisée, il faudra les recenser.

### 2. Apidae (Auvergne-Rhône-Alpes)

Base touristique régionale. Les circuits Geotrek y sont poussés (avec GPX/KML). Accès par projet + clés API, conditions à vérifier. **Redondant avec Geotrek** pour AuRA → pas prioritaire.

### 3. FFVélo — Véloenfrance.fr

Site de la Fédération française de cyclotourisme : ~4 000 circuits gratuits route/VTT avec GPX, dont les **randonnées permanentes** (filtre présent dans la maquette). **Pas d'API publique connue**. → Contacter `veloenfrance@ffvelo.fr` pour un partenariat / export.

### 4. DATAtourisme

Plateforme nationale (Licence Ouverte 2.0, API avec clé). Contient des « itinéraires touristiques », mais **pas de tracés GPX/KML documentés** — surtout des points. Utile plus tard pour enrichir (points d'intérêt, hébergements), pas pour les tracés.

### 5. OpenStreetMap

Relations `type=route` + `route=bicycle` / `route=mtb`, avec `network=lcn|rcn|ncn` et parfois `cycle_network=FR:26`. Licence ODbL (attribution + partage à l'identique des données dérivées). Données hétérogènes : peu de VTT ont un `network`, peu d'infos de difficulté/durée. → Source complémentaire, pas principale.

### 6. data.gouv.fr (jeux locaux)

Quelques jeux de circuits VTT/rando (Brest métropole, Eure-et-Loir…), formats variés (SHP, ArcGIS), métadonnées inégales. Au cas par cas.

### 7. France Vélo Tourisme

Grands itinéraires (ViaRhôna…) avec GPX, mais réutilisation soumise à accord écrit. → À contacter plus tard.

## Règles fonctionnelles décidées

- Si un GPX existe → on affiche le tracé et le bouton de téléchargement. Sinon → uniquement les infos du parcours.
- Durée : on prend celle de la source ; sinon on la calcule et on l'indique à l'utilisateur (« durée estimée »).
- Les modifications manuelles (admin) ne doivent pas être écrasées par les ré-imports.
- Toujours afficher l'organisme producteur et les crédits photos.
