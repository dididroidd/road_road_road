# Stack technique

## Choix validés

| Domaine    | Choix                                                                                   |
| ---------- | --------------------------------------------------------------------------------------- |
| App mobile | **React Native + Expo** (dernier SDK stable), **TypeScript** strict                     |
| Navigation | Expo Router (onglets : Explorer, Circuits, Favoris, Profil)                             |
| Backend    | **Supabase** : Postgres + **PostGIS**, Storage (GPX, photos en cache), Auth (plus tard) |
| Cible      | Android d'abord, iOS possible ensuite (même code)                                       |
| Tickets    | GitHub Issues                                                                           |

## Bibliothèques proposées

| Besoin              | Bibliothèque                                                  | Remarque                                       |
| ------------------- | ------------------------------------------------------------- | ---------------------------------------------- |
| Carte               | `@maplibre/maplibre-react-native`                             | Nécessite un _development build_ (pas Expo Go) |
| Fond de carte       | MapTiler « Outdoor » (clé gratuite) ou OpenFreeMap (sans clé) | Relief et chemins visibles                     |
| Données serveur     | `@supabase/supabase-js` + TanStack Query                      | Cache, retry, pagination                       |
| État local          | Zustand + `react-native-mmkv` (persistance)                   | Filtres, préférences, favoris                  |
| Bottom sheet        | `@gorhom/bottom-sheet`                                        | Panneau Explorer / vue tracé                   |
| Profil altimétrique | `react-native-svg`                                            | Graphique simple fait main                     |
| Polices             | `expo-font` (Fraunces, Outfit)                                |                                                |
| GPX                 | `expo-file-system` + `expo-sharing`                           | « Ouvrir avec… » Komoot, Strava, Garmin…       |
| Recherche de lieu   | API Adresse (BAN) — `api-adresse.data.gouv.fr`                | Gratuite, sans clé                             |
| Calcul géo (import) | `@turf/turf`, `@tmcw/togeojson`                               | Distance, D+, simplification                   |
| Tests               | Jest + React Native Testing Library, Maestro (e2e)            |                                                |
| Build / publication | EAS Build & Submit                                            | Build iOS possible sans Mac plus tard          |
| Suivi d'erreurs     | Sentry (`@sentry/react-native`)                               |                                                |

## Organisation du dépôt (monorepo)

```
bike-route-discovery/
├─ apps/mobile/          # App Expo
├─ packages/shared/      # Types (générés depuis Supabase), formatters, constantes
├─ supabase/             # Migrations SQL, fonctions RPC, seed
├─ scripts/import/       # Import des circuits (adaptateurs de sources)
└─ docs/
```

## Comptes utilisateurs : plus tard, sans douleur

V1 sans compte : favoris, préférences et statistiques stockés sur le téléphone.
Pour pouvoir ajouter des comptes ensuite :

- tout accès aux favoris/préférences passe par une interface (`FavoritesRepository`, `PreferencesRepository`) ; une implémentation locale en V1, une implémentation Supabase plus tard ;
- Supabase Auth gère les **connexions anonymes** qu'on peut ensuite lier à un e-mail / Google → migration transparente ;
- au premier login, on envoie les favoris locaux vers le serveur une seule fois.

## Administration « au cas où »

- V1 : **Supabase Studio** (éditeur de tables) + une table `circuit_overrides` et un champ `hidden` pour corriger/masquer un circuit sans que le ré-import écrase la correction.
- Plus tard si besoin : back-office web (Directus branché sur la base, ou petite app Next.js).
