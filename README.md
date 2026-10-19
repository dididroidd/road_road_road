# road_road_road

App mobile (Android d'abord) pour découvrir les circuits vélo officiels autour de soi : carte, fiches, profils altimétriques et fichiers GPX.

- Stack : React Native + Expo (TypeScript), Supabase (Postgres + PostGIS) — voir [docs/stack.md](docs/stack.md)
- Sources de données : [docs/sources-de-donnees.md](docs/sources-de-donnees.md)
- Tickets : [GitHub Issues](https://github.com/dididroidd/road_road_road/issues) (générés depuis [docs/tickets.md](docs/tickets.md))

## Structure

```
apps/mobile/        App Expo (@road/mobile)
packages/shared/    Types et utilitaires partagés (@road/shared)
scripts/import/     Import des circuits depuis les sources (@road/import)
supabase/           Migrations et fonctions SQL (arrive avec T04)
docs/               Documentation du projet
```

## Prérequis

- Node.js 24 (voir `.nvmrc`)
- pnpm, via Corepack fourni avec Node :
  ```bash
  corepack enable
  ```
  Sous Windows, si la commande échoue (`EPERM` dans `C:\Program Files`), installer le raccourci dans le dossier npm de l'utilisateur, sans droits admin :
  ```bash
  mkdir -p "$APPDATA/npm" && corepack enable --install-directory "$APPDATA/npm" pnpm
  ```
- Plus tard : Android Studio (émulateur), Supabase CLI, compte Expo (EAS)

## Commandes

| Commande                            | Rôle                                        |
| ----------------------------------- | ------------------------------------------- |
| `pnpm install`                      | Installe toutes les dépendances du monorepo |
| `pnpm lint`                         | ESLint sur tout le dépôt                    |
| `pnpm typecheck`                    | Vérification TypeScript de chaque paquet    |
| `pnpm format` / `pnpm format:check` | Prettier                                    |
| `pnpm --filter @road/import start`  | Lance le script d'import                    |

## Lancer l'app Android

La carte (MapLibre) contient du code natif : l'app ne marche pas dans Expo Go, il faut un **development build**.

- **En local** (Android Studio installé, émulateur lancé ou téléphone branché en mode développeur) :
  ```bash
  pnpm --filter @road/mobile android
  ```
- **Dans le cloud avec EAS** (pas besoin d'Android Studio) : construit un APK à installer sur le téléphone.
  ```bash
  cd apps/mobile && npx eas-cli@latest build --profile development --platform android
  ```

Ensuite, `pnpm --filter @road/mobile start` lance le serveur de développement auquel l'app se connecte.

Profils EAS (`apps/mobile/eas.json`) : `development` (dev client, APK), `preview` (APK installable sans serveur), `production` (AAB pour le Play Store).

## Variables d'environnement

Copier `.env.example` en `.env` et le remplir. Seules les variables `EXPO_PUBLIC_*` sont embarquées dans l'app ; la clé `SUPABASE_SERVICE_ROLE_KEY` ne sert qu'aux scripts d'import.
