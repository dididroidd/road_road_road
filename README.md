# road_road_road

App mobile (Android d'abord) pour découvrir les circuits vélo officiels autour de soi : carte, fiches, profils altimétriques et fichiers GPX.

- Stack : React Native + Expo (TypeScript), Supabase (Postgres + PostGIS) — voir [docs/stack.md](docs/stack.md)
- Sources de données : [docs/sources-de-donnees.md](docs/sources-de-donnees.md)
- Tickets : [GitHub Issues](https://github.com/dididroidd/road_road_road/issues) (générés depuis [docs/tickets.md](docs/tickets.md))

## Structure

```
apps/mobile/        App Expo (arrive avec T03)
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

## Variables d'environnement

Copier `.env.example` en `.env` et le remplir. Seules les variables `EXPO_PUBLIC_*` sont embarquées dans l'app ; la clé `SUPABASE_SERVICE_ROLE_KEY` ne sert qu'aux scripts d'import.
