# KisanAI – AI Farmer Advisory & Support System

KisanAI is a single-page web app that gives Indian farmers instant, AI-powered guidance on crops, pests, diseases, fertilizers, weather, market prices, and government schemes.

## 📁 Project Structure

```
├── index.html   # Page structure & content (all sections/pages)
├── style.css    # All styling, layout, colors, responsive rules
├── script.js    # Navigation, chat logic, crop/disease/scheme data, Claude API calls
└── README.md    # This file
```

## ✨ Features

- **AI Advisory Chat** – live chat powered by the Claude API, acting as an expert agricultural advisor
- **Crop Library** – 16+ major Indian crops with sowing season filters (Kharif/Rabi/Vegetable/Fruit/Perennial)
- **Disease & Pest Guide** – common crop diseases with treatment info
- **Government Schemes** – PM-KISAN, PMFBY, KCC, Soil Health Card, and more
- **Market Prices & MSP** – mandi price reference table
- **Weather Advisory** – forecast + agri-calendar section
- **Fully responsive** – mobile nav drawer and adaptive grid layouts

## 🚀 Setup

Since this is a static site, you can open `index.html` directly in a browser, or serve it locally:

```bash
# Option 1: just open it
open index.html

# Option 2: serve with a simple local server
npx serve .
```

## 🔑 API Key Note

The chat feature (`script.js`) calls the Anthropic API endpoint directly from the browser:

```js
fetch('https://api.anthropic.com/v1/messages', { ... })
```

For a public GitHub Pages / static deployment, calling the Anthropic API directly from client-side JS will expose your API key and usually gets blocked by CORS. For production, route this call through a small backend/serverless function (Node/Express, Vercel/Netlify function, Cloudflare Worker, etc.) that holds the API key server-side, and call that endpoint from `script.js` instead.

## 📦 Deploying to GitHub Pages

1. Push `index.html`, `style.css`, and `script.js` to your repo root (or a `/docs` folder).
2. In your repo: **Settings → Pages → Source** → select the branch/folder.
3. Your site will be live at `https://<username>.github.io/<repo-name>/`.

## 🛠 Tech Stack

- Plain HTML5 / CSS3 / vanilla JavaScript (no build step required)
- Google Fonts: Playfair Display, Inter, JetBrains Mono
- Claude API (Anthropic) for the AI advisory chat
