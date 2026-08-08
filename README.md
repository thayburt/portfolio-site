# Thayen's Personal Portfolio

Welcome to the source code for my personal portfolio site, [thayen.ca](https://thayen.ca). This project serves as a digital showcase of my work, skills, and experience. It is designed with a unique "Environmental Depth / Manuscript" theme, aiming to simulate the feel of physical parchment and ink on a desk.

This project also marks my very first time building a site with [Astro](https://astro.build/)!

## 🛠️ Tech Stack

- **Framework:** [Astro](https://astro.build/)
- **Hosting:** [Cloudflare Workers](https://workers.cloudflare.com/)
- **Language:** TypeScript
- **Package Manager:** pnpm

## 🚀 Local Development

To get started with local development, first clone the repository:

```bash
git clone https://github.com/N0tAI/thayen.dev.git
cd thayen.dev
```

Then, install the dependencies:

```bash
pnpm install
```

Start the local development server:

```bash
pnpm dev
```

The site will be available at `http://localhost:4321`.

The generated favicon and PWA icons are checked into `public/`. To regenerate them after
changing the source SVGs, install ImageMagick and run:

```bash
pnpm generate:icons
```

## Testing

Install the Playwright Chromium browser once:

```bash
pnpm exec playwright install chromium
```

Then build the site and run its browser, accessibility, and local-link smoke tests:

```bash
pnpm test
```

## 📦 Deployment

Deployment is handled via Cloudflare Wrangler. A custom deployment script is included in `package.json` for convenience.

To deploy the site to Cloudflare Workers, simply run:

```bash
pnpm build:deploy
```

This will execute `wrangler deploy -c ./wrangler.jsonc`.

## 🙏 Acknowledgements

A special thanks to Gemini for being instrumental in helping me figure out some of the complex styling for the thematic elements and for generating the initial SVGs.
