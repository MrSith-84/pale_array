# The Pale Array — Site Scaffold
Static, multi-page site with JSON-driven intel and rosters.

## Pages
- `index.html` — Landing & doctrine fragments
- `intel.html` — Apex Separatist Consortium faction intel (cards from `data/factions.json`)
- `concord.html` — Concord of Unity operations overview (from `data/concord_ops.json`)
- `leadership.html` — Pale Array authority figures (from `data/leadership.json`)
- `fleets.html` — Elite semi‑autonomous fleets (from `data/fleets.json`)

## Run
Serve as static files (Replit, Caddy, Nginx, file server). No build step required.

## Customize
- Update JSON files under `/data` to change content.
- Replace SVG crests under `/assets/img` to rebrand.
- Colors are CSS variables in `assets/css/styles.css`.

