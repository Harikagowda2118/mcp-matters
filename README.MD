# MCP Matters — AI agents for everyday life

Static website prototype. No build step, no dependencies.

## Structure
```
mcp-matters/
├── index.html      # page markup
├── css/style.css   # styles (light + dark mode)
├── js/data.js      # demo scenarios (edit to add more)
├── js/app.js       # demo logic
└── README.md
```

## Run
- Quick: double-click `index.html`
- Local server: `python -m http.server 8000` then open http://localhost:8000

## Deploy (GitHub Pages)
Push the folder to a repo → Settings → Pages → Deploy from branch `main` / root.

## Add a scenario
1. Add an entry in `js/data.js`.
2. Add a keyword rule in `pick()` in `js/app.js`.
