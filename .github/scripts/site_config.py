"""Public URLs retained after manual pages were consolidated."""

SITE_ORIGIN = "https://plc-console.fa-labo.com"

# Keep these compatibility URLs crawlable, but out of the sitemap and search.
# GitHub Pages cannot issue per-path HTTP 301 responses, so build_seo.py emits
# instant meta-refresh redirects and the destination page's canonical URL.
REDIRECTS = {
    "monitoring/writing.html": "monitoring/focus-panel.html#writing",
    "settings/project-json.html": "settings/json-export.html",
}
