// @ts-check

import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
	site: "https://thayen.dev",
	integrations: [icon(), sitemap()],
});
