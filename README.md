dev page for the landing page for https://jarvisdiscordbot.net

this is using github pages and shows up here 
https://jarvis-discordbot.github.io/landing/
the code will auto deploy to production when commited to the production branch (anyone doing dev please push to main and I'll pr to production when it's tested and checked)

## Repo layout

| File | Purpose | Staging (GitHub Pages) | Production |
|------|---------|------------------------|------------|
| `index.html` | Main landing page | Yes | Deployed as `landing.html` via CI |
| `clusters.html` | Live cluster telemetry dashboard | No* | Deployed as `clusters/index.html` via CI |
| `build/` | HTML validation and site checks (`npm test`) | — | Runs in CI before deploy |

\* `clusters.html` fetches `/clusters` on the same origin as the page, so GitHub Pages staging won't show live data. Production is served from `clusters.jarvisdiscordbot.net`.

## Testing before production

```bash
cd build
npm install
npm test
```

CI runs on pull requests and pushes to `main` when `index.html`, `clusters.html`, or `build/` changes. Pushes to `Production` must pass the same tests before deploy runs.

credits: 
1. @bencos17
2. @savvythunder for the animations on the landing page and a few other things on that page also
