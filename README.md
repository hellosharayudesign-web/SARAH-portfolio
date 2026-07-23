# Sharayu.Design — Static Site

This is a **static HTML / CSS / vanilla JavaScript** build of the Sharayu.Design portfolio.
It is a like-for-like technical conversion of the original React (JSX) implementation —
same design, same content, same typography, colours, spacing, images, animations, hover
effects, navigation and responsive behaviour. There is no React, no JSX, no build tool
(Vite/webpack/etc.) and no Node.js dependency to run it — it's just files a browser reads
directly.

## How it's put together

- Every page listed below is a real, standalone `.html` file (not a single-page app), so
  each one works as its own URL on GitHub Pages, can be linked to directly, and has a
  working browser Back/Forward button.
- Shared visuals and behaviour (navbar, footer, icons, project cards, reveal-on-scroll,
  tab switchers, carousels, etc.) live once in `js/components.js` and `js/app.js`, and are
  rendered into each page's `<div id="app">` on load. This keeps every page pixel-identical
  without duplicating markup by hand.
- All images that were inline base64 data in the original React file have been extracted
  into real files under `assets/images/`.
- All animations, hover states and transitions are done with plain CSS (`css/styles.css`)
  and vanilla JS — no frameworks.

## File structure

```
index.html                  Landing page ("/")
home.html                   Home / work overview
projects.html                Projects listing
about.html                  About page
contact.html                Contact page
404.html                    Custom not-found page (used automatically by GitHub Pages)
projects/
  treasury.html              Government Treasury Finance Platform case study
  msme-banking.html          Designing MSME Banking At Scale case study
  pos-research.html          Scaling Enterprise POS Under Pressure case study
  crimson-neurology.html     Crimson Neurology brand identity page
  sterling-homes.html        Placeholder ("coming soon") page
  moodle-hive.html           Placeholder ("coming soon") page
css/
  styles.css                 All global styles, animations and responsive rules
js/
  icons.js                   Inline SVG icon set + icon/badge renderers
  data.js                    All content data (project copy, case-study data, image paths)
  components.js               Shared UI components (navbar, footer, cards, reveal system…)
  app.js                     Page bootstrapping + per-page render/interaction logic
assets/
  images/                     All site images (extracted from the original React build)
  icons/                      Reserved for any additional standalone icon assets
```

## Publishing to GitHub Pages

1. Create a new GitHub repository (or use an existing one).
2. Unzip this package and push its **contents** (not the zip itself) to the repository —
   `index.html`, `css/`, `js/`, `assets/`, etc. should sit at the repo root (or inside
   `/docs` if you prefer that workflow — see step 4).
   ```bash
   git init
   git add .
   git commit -m "Static site export"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo>.git
   git push -u origin main
   ```
3. In your repository on GitHub, go to **Settings → Pages**.
4. Under **Build and deployment → Source**, choose **Deploy from a branch**, then pick the
   `main` branch and the `/ (root)` folder (or `/docs` if you placed the files there
   instead). Click **Save**.
5. GitHub will publish the site at:
   `https://<your-username>.github.io/<your-repo>/`
   (or your custom domain, if configured under the same Pages settings).
6. Wait a minute or two for the first deployment, then open the URL. Every link uses
   relative paths, so the site works correctly whether it's served from the repo root or
   from a sub-path like `/<your-repo>/`.

### Notes
- No build step is required — GitHub Pages serves the files exactly as committed.
- If you update content, just edit the relevant file (`js/data.js` for text/data, files in
  `assets/images/` for imagery) and push again.
- The Google Fonts stylesheet (`Cormorant Garamond` + `Roboto`) is loaded via `@import` in
  `css/styles.css` from `fonts.googleapis.com`, so an internet connection is required for
  the exact typefaces to load; the site falls back to system serif/sans-serif fonts
  otherwise.
