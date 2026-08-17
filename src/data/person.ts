import type { PersonLeaf } from "schema-dts";
import { jsonLdIds, siteUrl } from "@/data/jsonld-ids";

export const personJsonLd: PersonLeaf = {
	"@type": "Person",
	"@id": jsonLdIds.person,
	name: "Thayen Burtenshaw",
	url: siteUrl,
	jobTitle: "Software Developer",
	description:
		"Software developer focused on systems, developer tooling, infrastructure, and backend software.",
	homeLocation: {
		"@type": "Place",
		name: "Ontario, Canada",
	},
	alumniOf: {
		"@type": "CollegeOrUniversity",
		"@id": "https://www.fanshawec.ca",
		name: "Fanshawe College",
		url: "https://www.fanshawec.ca",
	},
	knowsAbout: ["C#", ".NET", "C", "C++", "Linux", "Containers"],
	sameAs: [
		"https://github.com/thayburt",
		"https://forgejo.thayen.dev/thayen",
		"https://codeberg.org/thayen",
		"https://www.linkedin.com/in/thayen",
	],
};
