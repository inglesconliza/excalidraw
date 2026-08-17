# Agent Decisions

## Cloudflare Route

The whiteboard is deployed as its own Cloudflare Worker on `www.inglesconliza.com/whiteboard*`, matching the sibling blog route pattern. The landing Worker keeps owning the root domain and other marketing routes.

## Base Path

The upstream Vite app is kept intact except for supporting `VITE_APP_BASE_PATH`. Production builds use `/whiteboard/` so generated assets, PWA metadata, and share targets stay under the whiteboard route.

## Service Worker

The whiteboard build emits a self-destroying PWA service worker. This route is embedded under the broader InglesConLiza site, and stale precached app shells can keep older hashed JS bundles active after deploys. Publishing an unregistering worker keeps browser storage for drawings intact while clearing the service-worker caches.
