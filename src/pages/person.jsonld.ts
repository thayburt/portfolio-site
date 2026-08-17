import type { APIRoute } from "astro";
import type { PersonLeaf, WithContext } from "schema-dts";
import { personJsonLd } from "@/data/person";

export const prerender = true;

const personDocument: WithContext<PersonLeaf> = {
	"@context": "https://schema.org",
	...personJsonLd,
};

export const GET: APIRoute = () =>
	new Response(JSON.stringify(personDocument), {
		headers: {
			"Content-Type": "application/ld+json; charset=utf-8",
		},
	});
