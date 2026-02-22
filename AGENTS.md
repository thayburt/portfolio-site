# AGENTS.md Context: thayen.dev

## Project Overview

`thayen.dev` is a personal portfolio website for Thayen Burtenshaw, a Software Engineer. The site is designed as a CRPG-inspired digital scroll (or parchment) that serves as a resume and project showcase.

### Tech Stack

- **Framework:** [Astro](https://astro.build/) (v6.0.0-beta.1)
- **UI Components:** None (Standard Astro Components)
- **Language:** TypeScript
- **Deployment:** [Cloudflare Pages](https://pages.cloudflare.com/) (using `@astrojs/cloudflare` adapter)
- **Styling:** Vanilla CSS (Global styles + scoped component/page styles)

### Architecture

- **Static First:** The site is designed for performance and readability, with a focus on pre-rendering.
- **Simplicity:** Prioritize standard browser behavior (scrolling) over complex custom interactions to ensure the resume is easily readable by recruiters.

## Building and Running

### Development Commands

- `pnpm dev`: Starts the local development server at `http://localhost:4321`.
- `pnpm build`: Builds the production site into the `./dist/` directory.
- `pnpm preview`: Previews the production build locally.
- `pnpm check`: Runs diagnostic checks (Astro, TypeScript).
- `pnpm typecheck`: Runs diagnostic checks in watch mode.

## Development Conventions

### Aesthetic & Design

- **Theme:** Computer Role-Playing Game (CRPG) / Fantasy Scroll. The interface mimics a physical scroll or parchment found in a fantasy setting.
- **Visual Metaphor:**
    - **Continuous Scroll:** The content flows vertically as a single, continuous document, resembling a long scroll.
    - **Unrolling Effect:** The bottom of the viewport should feature a visual "roll" or edge that stays fixed or animates to simulate the scroll unrolling as the user scrolls down, enhancing the physical metaphor (CSS-only implementation preferred).
    - **Parchment Texture:** The background uses parchment or paper textures to fit the theme.
    - **Ornate Borders:** Sections may be separated by stylized dividers or borders typical of CRPG UI.
- **Navigation & Interaction:**
    - **Standard Scrolling:** Uses native vertical scrolling for maximum accessibility and ease of use.
    - **Typography:** Fonts should be readable but thematic (e.g., a clean serif that looks like hand-written text or print).

### Style Management

- **Global Styles:** Located in `src/styles/global.css`. Responsible for the scroll container, background atmosphere, and typography resetting.
- **Page-Specific Styles:** Defined within `<style>` blocks inside `.astro` files.
- **Component Styles:** Defined within `<style>` blocks in `.astro` component files.
- **Assets:** All images should be placed in `public/images/`.

### Coding Standards

- **Imports:** Use the `@/` alias for cleaner paths (e.g., `import Keyword from "@/components/keyword.astro"`).
- **TypeScript:** Strict typing is used and required for all typescript code.

## Key Files

- `astro.config.mjs`: Astro configuration and integrations (Cloudflare).
- `wrangler.jsonc`: Cloudflare Pages deployment configuration.
- `AGENTS.md`: High-level project goals, rules, and design philosophy.
- `src/layouts/site_layout.astro`: The primary layout used across all pages.
- `src/styles/global.css`: Core theme and CSS variables.
