# ShinobiKai portfolio

A responsive, static portfolio for [shinob1kai](https://github.com/shinob1kai). No build step or JavaScript framework is required.

## Preview

Run `python -m http.server 8000` in this directory, then open `http://localhost:8000`. You can also open `index.html` directly.

## Edit

- `index.html`: introduction, featured projects, repository links, and project archive.
- `styles.css`: layout, colors, responsive breakpoints, and CSS illustrations.
- `script.js`: accessible project filtering. Content and links work without JavaScript.

Project names, languages, and archive states were checked against the public GitHub repositories on 2026-09-07. Update the project cards and archive labels when repository status changes. Featured projects are FluentTB and SVGShift. Illustrations are decorative concepts, not product screenshots.

## GitHub Pages

In repository **Settings → Pages**, choose **Deploy from a branch**, select **main** and **/ (root)**, and save. GitHub Pages must be enabled separately; committing this website does not enable it. The expected address is `https://shinob1kai.github.io/`.

## Accessibility and dependencies

Semantic landmarks, a skip link, visible keyboard focus, responsive layouts, reduced-motion support, and announced filter results are included. Google Fonts is optional: local sans-serif fallbacks are configured. No analytics, third-party statistics widgets, or live GitHub API calls are needed to view the projects.

The previous compiled assets remain in `assets/` for reference and are no longer loaded by the page.
