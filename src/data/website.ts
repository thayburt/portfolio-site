import type { WebSite } from "schema-dts";
import { jsonLdIds, siteUrl } from "@/data/jsonld-ids";

export const websiteJsonLd: WebSite = {
	"@type": "WebSite",
	"@id": jsonLdIds.website,
	url: siteUrl,
	name: "Thayen",
	about: {
		"@id": jsonLdIds.person,
	},
};
