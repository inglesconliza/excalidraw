# Excalidraw Whiteboard Instructions

This fork serves the InglesConLiza whiteboard at `https://www.inglesconliza.com/whiteboard`.

- Keep upstream Excalidraw changes small and isolated so the fork remains easy to rebase.
- Deploy with `node scripts/deploy-with-metadata.mjs`; it builds the app with `VITE_APP_BASE_PATH=/whiteboard/` through `corepack yarn` and deploys the Cloudflare Worker `inglesconliza-whiteboard`.
- Verify production with `curl -fsS https://www.inglesconliza.com/whiteboard/health`.
- `/whiteboard/health` must expose `branch`, `commitHash`, and `deployedAt`.
- The Telegram topic for this repo is `excalidraw` with topic id `29933`.
