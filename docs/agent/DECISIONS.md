# Agent Decisions

## Cloudflare Route

The whiteboard is deployed as its own Cloudflare Worker on `www.inglesconliza.com/whiteboard*`, matching the sibling blog route pattern. The landing Worker keeps owning the root domain and other marketing routes.

## Base Path

The upstream Vite app is kept intact except for supporting `VITE_APP_BASE_PATH`. Production builds use `/whiteboard/` so generated assets, PWA metadata, and share targets stay under the whiteboard route.
