dev page for the landing page for https://jarvisdiscordbot.net

this is using github pages and shows up here 
https://jarvis-discordbot.github.io/landing/
the code will auto deploy to production when commited to the production branch (anyone doing dev please push to main and I'll pr to production when it's tested and checked)

## Pages in this repo

| File | Purpose | Staging (GitHub Pages) | Production |
|------|---------|------------------------|------------|
| `index.html` | Main landing page | Yes | Deployed as `landing.html` via CI |
| `clusters.html` | Live cluster telemetry dashboard | No* | Served from the bot API host (e.g. `clusters.jarvisdiscordbot.net`) |

\* `clusters.html` fetches `/clusters` on the same origin as the page, so it must be deployed alongside the bot API—not via GitHub Pages. Keep it in this repo for version control; deploy it to the cluster status server separately.

credits: 
1. @bencos17
2. @savvythunder
