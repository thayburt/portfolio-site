import type { ProfilePage } from "schema-dts";
import { jsonLdIds, siteUrl } from "@/data/jsonld-ids";

export const profilePageJsonLd: ProfilePage = {
	"@type": "ProfilePage",
	"@id": jsonLdIds.profile,
	url: siteUrl,
	isPartOf: {
		"@id": jsonLdIds.website,
	},
	mainEntity: {
		"@id": jsonLdIds.person,
	},
};
