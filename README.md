# Abhi Faldu — Portfolio

Personal portfolio site, live at **[abhifaldu.tech](https://abhifaldu.tech)**.

Plain HTML / CSS / JS — no build step, no dependencies. Just static files.

```
portfolio website/
├── index.html          # the whole page
├── styles.css          # styling + light/dark themes
├── script.js           # nav, theme toggle, scroll-reveal, count-up
├── assets/
│   └── Resume_Abhi_Faldu.pdf
├── CNAME               # custom domain for GitHub Pages
└── .nojekyll           # tell GitHub Pages not to run Jekyll
```

## Run locally

Just open `index.html` in a browser. For a local server (recommended):

```bash
python -m http.server 8000
```

Then visit http://localhost:8000

## Deploy to GitHub Pages + abhifaldu.tech

### 1. Create the repo and push

```bash
cd "portfolio website"
git init
git add .
git commit -m "Initial portfolio site"
git branch -M main
git remote add origin https://github.com/abhi-faldu/abhi-faldu.github.io.git
git push -u origin main
```

> Naming the repo `abhi-faldu.github.io` makes it your primary user site.
> Any repo name works too — Pages just serves it at a subpath until the custom domain is set.

### 2. Turn on Pages

Repo → **Settings → Pages** → *Build and deployment* → Source: **Deploy from a branch** → Branch: **main** / **/(root)** → Save.

### 3. Point the .tech domain at GitHub Pages

At your `.tech` domain DNS panel (from the GitHub Student Pack), add:

| Type  | Host / Name | Value                   |
|-------|-------------|-------------------------|
| A     | @           | 185.199.108.153         |
| A     | @           | 185.199.109.153         |
| A     | @           | 185.199.110.153         |
| A     | @           | 185.199.111.153         |
| CNAME | www         | abhi-faldu.github.io    |

The `CNAME` file in this repo already tells Pages the domain is `abhifaldu.tech`.

### 4. Finish in GitHub

Repo → **Settings → Pages** → Custom domain: `abhifaldu.tech` → Save →
wait for the DNS check, then tick **Enforce HTTPS**.

DNS can take from a few minutes up to 24 hours to propagate.

## Editing content

Everything is in `index.html` — projects, skills, experience are plain HTML blocks.
Brand accent colour is `#1a5276` (matches the CV); change it in `styles.css` under `:root`.
To refresh the CV, drop a new PDF at `assets/Resume_Abhi_Faldu.pdf` (keep the filename).
