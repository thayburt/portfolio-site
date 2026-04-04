// @ts-check

import cloudflare from "@astrojs/cloudflare";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import icon from "astro-icon";
import assetGen from "./generate-assets";

// https://astro.build/config
export default defineConfig({
	site: "https://thayen.dev",
	adapter: cloudflare({
		prerenderEnvironment: "node",
	}),
	integrations: [icon(), sitemap(), assetGen()],
	trailingSlash: "always",
});
