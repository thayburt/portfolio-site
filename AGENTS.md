# AGENTS.md Context: thayen.dev

## Project Overview

`thayen.dev` is a personal portfolio website for Thayen Burtenshaw, a Software Engineer. The site serves as a digital resume and a showcase for technical projects, including an interactive algorithm visualizer.

### Tech Stack

- **Framework:** [Astro](https://astro.build/) (v6.0.0-beta.1)
- **UI Components:** [Svelte](https://svelte.dev/) (v5.x)
- **Language:** TypeScript
- **Deployment:** [Cloudflare Pages](https://pages.cloudflare.com/) (using `@astrojs/cloudflare` adapter)
- **Styling:** Vanilla CSS (Global styles + scoped component/page styles)

### Architecture

- **Static First:** The site is designed for performance, with a focus on pre-rendering.
- **Progressive Enhancement:** The main resume page (`index.astro`) is required to be fully functional without JavaScript.
- **Interactive Features:** Complex interactions, like the algorithm visualizer on the `/algorithms` page, are handled by Svelte components.
- **Algorithm Visualization:** Algorithms are implemented as generator functions (`src/algorithms/`) that yield state updates (compare, swap, move, etc.) which the Svelte visualizer (`src/components/AlgorithmVisualizer.svelte`) consumes to animate the process.

## Building and Running

### Development Commands

- `pnpm dev`: Starts the local development server at `http://localhost:4321`.
- `pnpm build`: Builds the production site into the `./dist/` directory.
- `pnpm preview`: Previews the production build locally.
- `pnpm check`: Runs diagnostic checks (Astro, TypeScript, Svelte).
- `pnpm typecheck`: Runs diagnostic checks in watch mode.

### Deployment

The project is configured for Cloudflare Pages. Deployment is handled via `wrangler` or automated through Cloudflare's git integration. The `wrangler.jsonc` file contains the environment configuration.

## Development Conventions

### Aesthetic & Design

- **Theme:** "Magical Fantasy CRPG" theme—distinctive and memorable but remaining simple, elegant, and minimalistic.
- **Inspiration:** Minimalist sites like [gnu.org](https://www.gnu.org/).
- **Navigation:** Single-page-application (SPA) feel for seamless transitions between pages.

### Style Management

- **Global Styles:** Located in `src/styles/global.css`. These include theme variables, resets, and common typography.
- **Page-Specific Styles:** Defined within `<style>` blocks inside `.astro` files in `src/pages/`.
- **Component Styles:** Defined within `<style>` blocks in `.astro` or `.svelte` component files.
- **Assets:** All images should be placed in `public/images/`.

### Coding Standards

- **Algorithms:** New algorithms should follow the generator pattern defined in `src/types/sorting.ts` and yield specific step types (`compare`, `swap`, `move`, `insert`, `remove`, `done`).
- **Imports:** Use the `@/` alias for cleaner paths (e.g., `import Keyword from "@/components/keyword.astro"`).
- **TypeScript:** Strict typing is preferred, especially for shared types in `src/types/`.

## Key Files

- `astro.config.mjs`: Astro configuration and integrations (Svelte, Cloudflare).
- `wrangler.jsonc`: Cloudflare Pages deployment configuration.
- `AGENTS.md`: High-level project goals, rules, and design philosophy.
- `src/layouts/site_layout.astro`: The primary layout used across all pages.
- `src/styles/global.css`: Core theme and CSS variables.
- `src/algorithms/`: Implementation of sorting algorithms for visualization.
