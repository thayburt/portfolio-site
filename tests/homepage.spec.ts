import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const baseURL = "http://127.0.0.1:4321";

function isSameOrigin(url: string) {
	return new URL(url).origin === baseURL;
}

test("homepage loads without local runtime or accessibility errors", async ({ page }) => {
	const runtimeErrors: string[] = [];
	const failedRequests: string[] = [];
	const failedResponses: string[] = [];

	page.on("console", (message) => {
		const sourceURL = message.location().url;
		if (message.type() === "error" && (!sourceURL || isSameOrigin(sourceURL))) {
			runtimeErrors.push(message.text());
		}
	});
	page.on("pageerror", (error) => runtimeErrors.push(error.message));
	page.on("requestfailed", (request) => {
		if (isSameOrigin(request.url())) {
			failedRequests.push(`${request.method()} ${request.url()}: ${request.failure()?.errorText}`);
		}
	});
	page.on("response", (response) => {
		if (isSameOrigin(response.url()) && response.status() >= 400) {
			failedResponses.push(`${response.status()} ${response.url()}`);
		}
	});

	await page.goto("/");

	await expect(page).toHaveTitle("Thayen | Software Developer");
	await expect(page.getByRole("heading", { level: 1, name: "Thayen Burtenshaw" })).toBeVisible();
	await expect(page.getByRole("main")).toBeVisible();

	const firstKeyword = page.locator("[data-keyword][role=term]").first();
	await firstKeyword.focus();
	await expect(firstKeyword.locator(".popup")).toBeVisible();

	const accessibilityScanResults = await new AxeBuilder({ page })
		.withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
		.analyze();

	expect(accessibilityScanResults.violations).toEqual([]);
	expect(runtimeErrors).toEqual([]);
	expect(failedRequests).toEqual([]);
	expect(failedResponses).toEqual([]);
});

test("local page links and assets resolve", async ({ page, request }) => {
	await page.goto("/");

	const urls = await page
		.locator("a[href], link[href], script[src], img[src], source[src]")
		.evaluateAll((elements) =>
			elements
				.map((element) => element.getAttribute("href") ?? element.getAttribute("src"))
				.filter((value): value is string => Boolean(value))
				.map((value) => new URL(value, document.baseURI))
				.filter((url) => url.origin === location.origin)
				.map((url) => url.href),
		);

	const manifestURL = await page.locator('link[rel="manifest"]').getAttribute("href");
	if (manifestURL) {
		const manifestResponse = await request.get(manifestURL);
		expect(manifestResponse.ok(), `Manifest returned ${manifestResponse.status()}`).toBeTruthy();

		const manifest = (await manifestResponse.json()) as { icons?: Array<{ src: string }> };
		for (const icon of manifest.icons ?? []) {
			urls.push(new URL(icon.src, baseURL).href);
		}
	}

	for (const url of new Set(urls)) {
		const response = await request.get(url);
		expect.soft(response.ok(), `${url} returned ${response.status()}`).toBeTruthy();
	}
});
