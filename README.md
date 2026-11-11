# mohankolli.exe

Personal portfolio for Mohan Kolli — Application & AI Security Engineer. Static site, no
framework, no build step, no trackers. Content lives directly in the HTML so it works with
JavaScript disabled; `assets/js/site.js` only adds the typing effect and scroll-reveal.

## Pages
- `index.html` — intro, what I do, featured work, contact
- `work.html` — projects
- `about.html` — story, experience, skills, credentials
- `resume.html` — embedded + downloadable PDF (`assets/resume/mohan-kolli-resume.pdf`)

## Local preview
```
python3 -m http.server 8000
# open http://localhost:8000
```

## Deploy (GitHub Pages)
Create a public repo named `mohankolli9999.github.io`, push these files to `main`, and enable
Pages (Settings → Pages → Branch: `main`). Live at `https://mohankolli9999.github.io` within a
minute. `.nojekyll` keeps Pages from processing `assets/`.
