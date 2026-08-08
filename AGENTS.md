# AGENTS.md Context: thayen.ca

## Project Overview

`thayen.ca` is a personal portfolio website for Thayen Burtenshaw, a Software Engineer. The site is designed as a CRPG-inspired digital scroll (or parchment) that serves as a resume and project showcase.

### Tech Stack

- **Framework:** [Astro](https://astro.build/) (v6.0.0-beta.16)
- **Integrations:** `astro-icon` (for MDI icons)
- **UI Components:** Standard Astro Components
- **Language:** TypeScript (Strict)
- **Deployment:** [Cloudflare Pages](https://pages.cloudflare.com/) (using `@astrojs/cloudflare` adapter and `wrangler`)
- **Styling:** Vanilla CSS (Global styles + scoped component/page styles)

### Architecture

- **Static First:** The site is designed for performance and readability, with a focus on pre-rendering.
- **Simplicity:** Prioritize standard browser behavior (scrolling) over complex custom interactions to ensure the resume is easily readable by recruiters.
- **Thematic Consistency:** Every design choice must align with the "Fantasy Scroll / CRPG" aesthetic.

## Folder Structure

- `src/components/`: Reusable Astro components (e.g., `keyword.astro`, `link.astro`).
- `src/layouts/`: Global page layouts (e.g., `site_layout.astro`).
- `src/pages/`: Page routes. `index.astro` is the primary entry point.
- `src/styles/`: Global CSS files (`global.css`, `torch.css`).
- `public/images/`: Static assets including textures and icons.

## Building and Running

### Environment Setup

- `sh setup.sh`: Installs dependencies and prepares the environment.
- `.env.example`: Template for environment variables.

### Development Commands

- `pnpm dev`: Starts the local development server at `http://localhost:4321`.
- `pnpm build`: Builds the production site into the `./dist/` directory.
- `pnpm preview`: Previews the production build locally.
- `pnpm check`: Runs diagnostic checks (Astro, TypeScript).
- `pnpm deploy`: Deploys the site to Cloudflare Pages using Wrangler.

## Development Conventions

### Aesthetic & Design

- **Theme:** Computer Role-Playing Game (CRPG) / Fantasy Scroll. The interface mimics a physical scroll or parchment found in a fantasy setting.
- **Visual Metaphor:**
  - **Continuous Scroll:** The content flows vertically as a single, continuous document, resembling a long scroll.
  - **Parchment Texture:** The background uses parchment or paper textures to fit the theme.
- **Navigation & Interaction:**
  - **Standard Scrolling:** Uses native vertical scrolling for maximum accessibility and ease of use.
  - **Typography:** Fonts should be readable but thematic (e.g., "Cinzel" for headers, "Spectral" for body text).

### Style Management

- **Global Styles:** Located in `src/styles/global.css`. Responsible for the scroll container, background atmosphere, and typography resetting.
- **Page-Specific Styles:** Defined within `<style>` blocks inside `.astro` files.
- **Component Styles:** Defined within `<style>` blocks in `.astro` component files.
- **Assets:** All images should be placed in `public/images/`.

### Coding Standards

- **Functional Components:** Prefer functional patterns in Astro components.
- **Imports:** Use the `@/` alias for cleaner paths (e.g., `import Keyword from "@/components/keyword.astro"`).
- **TypeScript:** Strict typing is required. Use `// @ts-check` in `.mjs` files.
- **Accessibility:** Maintain high accessibility standards (Aria labels, semantic HTML, color contrast).

## Tools and MCP

This project is configured with MCP (Model Context Protocol) servers to enhance agent capabilities:

- **Astro Docs:** Accessible via the `Astro docs` MCP server (configured in `.gemini/settings.json`). Use this for up-to-date Astro documentation and best practices.

## Key Files

- `astro.config.mjs`: Astro configuration and integrations.
- `wrangler.jsonc`: Cloudflare Pages deployment configuration.
- `AGENTS.md`: This file; source of truth for agent context.
- `src/layouts/site_layout.astro`: The primary layout used across all pages.
- `src/styles/global.css`: Core theme and CSS variables.
