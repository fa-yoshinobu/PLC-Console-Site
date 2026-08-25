# Development History

Last consolidated: 2026-08-25

This document preserves the useful content that used to live in temporary
refactor memo files. Keep this file as the durable engineering record for the
static documentation site.

## Site Contracts

- The site is a set of hand-written static HTML pages.
- Do not change public URLs during maintenance unless the redirect plan is
  explicit.
- Do not change manual content, navigation semantics, or visual styling as part
  of mechanical refactors.
- Keep checks lightweight enough to run in GitHub Actions before deploy.

## 2026-08-14 Repository And Domain Migration

- Renamed the repository to `PLC-Console-Site`.
- Updated repository links for `PLC-Console-ProjectBuilder`.
- Changed the canonical public URL to `https://plc-console.fa-labo.com/`.

## 2026-08-25 Manual And Site Navigation Update

Completed work:

- Aligned the top navigation and homepage sections with the current manual structure.
- Removed pre-release compatibility pages that were no longer needed.
- Added the Formspree support form and aligned support, privacy, permissions,
  terms, purchase, release notes, glossary, and troubleshooting content with
  the current application and publication plan.
- Added `search.html`, a generated static search index, and search links to the
  shared header and footer.
- Added `404.html` with links to the manual top, site search, and support form.
- Split previous/next navigation into reciprocal main, ProjectBuilder, and
  support sequences.
- Updated README and TODO page inventories to match the actual file layout.
- Clarified that numeric data type width does not determine a fixed number of
  PLC device points.

Validation:

- The search index contains 55 manual pages and excludes `search.html` and
  `404.html`.
- The static checker validates 57 HTML pages, including internal links,
  anchors, image alternatives, `nav.js`, and shared header/footer drift.
- GitHub Actions checks search-index freshness before deploying GitHub Pages.

## Refactoring And Guard Rails

### Static Site Checker

Completed work:

- Added `.github/scripts/check_site.py`.
- Added a GitHub Pages workflow check job.
- Made deploy depend on the site check.
- Checked internal links and anchor targets.
- Checked images for common problems such as missing files and missing `alt`
  text.
- Checked enough shared header/navigation shape to catch accidental drift across
  the hand-written pages.

Effect:

- The site now catches common hand-written HTML mistakes before deploy.
- The check is intentionally static and does not require adopting a site
  generator.

### Anchor Checks, Lazy Images, And Image Compression

Completed in commit `5396997 Add site anchor checks and lazy images`.

Completed work:

- Expanded anchor validation in `.github/scripts/check_site.py`.
- Added `loading="lazy"` to non-critical images where appropriate.
- Added explicit image dimensions where needed to reduce layout instability.
- Recompressed `assets/images/transfer/qr-import.jpg`.

Measurement:

- `assets/images/transfer/qr-import.jpg` was reduced from 761,372 bytes to
  416,345 bytes.

Effect:

- Faster image transfer for the QR import page.
- Better static validation before deploy.
- Lower layout-shift risk from images that now declare dimensions.

## Work Intentionally Not Done

- No static-site-generator migration.
- No navigation redesign.
- No URL rewrite.
- No broad copy rewrite.
- No dark-mode or theme redesign as part of this maintenance pass.

## Future Notes

- Keep the site checker focused on defects that matter for deploy safety:
  broken links, broken anchors, missing images, missing accessibility metadata,
  and shared navigation drift.
- If another large image is added, measure byte size before and after
  compression and preserve the result here.
- If the hand-written page count grows much further, consider a generator only
  after confirming that the current checker is no longer enough.
