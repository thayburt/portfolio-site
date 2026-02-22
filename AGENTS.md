# AGENTS.md Context: thayen.dev

## Project Overview

`thayen.dev` is a personal portfolio website for Thayen Burtenshaw, a Software Engineer. The site serves as a digital resume and a showcase for technical projects, including an interactive algorithm visualizer.

### Tech Stack

- **Framework:** [Astro](https://astro.build/) (v6.0.0-beta.1)
- **UI Components:** None (Standard Astro Components)
- **Language:** TypeScript
- **Deployment:** [Cloudflare Pages](https://pages.cloudflare.com/) (using `@astrojs/cloudflare` adapter)
- **Styling:** Vanilla CSS (Global styles + scoped component/page styles)

### Architecture

- **Static First:** The site is designed for performance, with a focus on pre-rendering.
- **Progressive Enhancement:** The main resume page (`index.astro`) is required to be fully functional without JavaScript.

## Building and Running

### Development Commands

- `pnpm dev`: Starts the local development server at `http://localhost:4321`.
- `pnpm build`: Builds the production site into the `./dist/` directory.
- `pnpm preview`: Previews the production build locally.
- `pnpm check`: Runs diagnostic checks (Astro, TypeScript).
- `pnpm typecheck`: Runs diagnostic checks in watch mode.

## Development Conventions

### Aesthetic & Design

- **Inspiration:** Minimalist sites like [gnu.org](https://www.gnu.org/).
- **Navigation:** Single-page-application (SPA) feel for seamless transitions between pages.

### Style Management

- **Global Styles:** Located in `src/styles/global.css`. These include theme variables, resets, and common typography.
- **Page-Specific Styles:** Defined within `<style>` blocks inside `.astro` files in `src/pages/`.
- **Component Styles:** Defined within `<style>` blocks in `.astro` component files.
- **Assets:** All images should be placed in `public/images/`.

### Coding Standards

- **Imports:** Use the `@/` alias for cleaner paths (e.g., `import Keyword from "@/components/keyword.astro"`).
- **TypeScript:** Strict typing is used and required for all typescript codee.

## Key Files

- `astro.config.mjs`: Astro configuration and integrations (Cloudflare).
- `wrangler.jsonc`: Cloudflare Pages deployment configuration.
- `AGENTS.md`: High-level project goals, rules, and design philosophy.
- `src/layouts/site_layout.astro`: The primary layout used across all pages.
- `src/styles/global.css`: Core theme and CSS variables.

