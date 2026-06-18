const { test, expect } = require("@playwright/test");

const variants = ["a", "b", "c"];
const keyPages = [
  "/",
  "/a/index.html",
  "/a/agents.html",
  "/a/agent.html?id=1",
  "/b/index.html",
  "/b/agents.html",
  "/b/agent.html?id=1",
  "/c/index.html",
  "/c/agents.html",
  "/c/agent.html?id=1"
];

async function monitorPage(page) {
  const errors = [];
  page.on("pageerror", error => errors.push(error.message));
  page.on("console", message => {
    if (message.type() === "error") errors.push(message.text());
  });
  return errors;
}

test.describe("static site smoke", () => {
  for (const pagePath of keyPages) {
    test(`${pagePath} renders without runtime errors`, async ({ page }) => {
      const errors = await monitorPage(page);
      await page.goto(pagePath, { waitUntil: "domcontentloaded" });
      await expect(page.locator("body")).toBeVisible();
      await expect(page.locator(".site-head, .head").first()).toBeVisible();
      expect(errors).toEqual([]);
    });
  }
});

test.describe("variant home pages", () => {
  for (const variant of variants) {
    test(`${variant} home renders dynamic sections`, async ({ page }) => {
      const errors = await monitorPage(page);
      await page.goto(`/${variant}/index.html`, { waitUntil: "domcontentloaded" });

      await expect(page.locator("[data-stat='total']").first()).toHaveText(/\d/);
      await expect(page.locator("#picks .card").first()).toBeVisible();
      await expect(page.locator("#cat-index").first()).toBeVisible();
      await expect(page.locator("#ranking").first()).toBeVisible();
      await expect(page.locator("#newest .card").first()).toBeVisible();

      expect(errors).toEqual([]);
    });
  }
});

test.describe("directory interactions", () => {
  for (const variant of variants) {
    test(`${variant} directory supports search, filters, sort, and pagination`, async ({ page }) => {
      const errors = await monitorPage(page);
      await page.goto(`/${variant}/agents.html`, { waitUntil: "domcontentloaded" });

      const cards = page.locator("#grid .card");
      await expect(cards.first()).toBeVisible();
      const initialCount = await cards.count();
      expect(initialCount).toBeGreaterThan(0);

      await page.locator("#q").fill("__no_match__");
      await expect(page.locator("#empty")).toBeVisible();
      await expect(page.locator("#result-count")).toHaveText("0");

      await page.locator("#q").fill("");
      await expect(cards.first()).toBeVisible();

      await page.locator("#sort").selectOption("newest");
      await expect(cards.first()).toBeVisible();

      await page.locator("#facet-pick").check();
      await expect(cards.first()).toBeVisible();
      await page.locator("#facet-pick").uncheck();

      const more = page.locator("#more");
      if (await more.isVisible()) {
        const before = await cards.count();
        await more.click();
        await expect.poll(() => cards.count()).toBeGreaterThan(before);
      }

      expect(errors).toEqual([]);
    });
  }
});

test.describe("detail page interactions", () => {
  for (const variant of variants) {
    test(`${variant} detail page supports tabs, slider, and try action`, async ({ page }) => {
      const errors = await monitorPage(page);
      await page.goto(`/${variant}/agent.html?id=1`, { waitUntil: "domcontentloaded" });

      await expect(page.locator(".detail-title")).toBeVisible();
      await expect(page.locator(".tab").first()).toBeVisible();
      await page.locator(".tab").nth(1).click();
      await expect(page.locator(".panel.active")).toBeVisible();

      const next = page.locator(".detail-slider-next");
      if (await next.isVisible()) {
        const track = page.locator(".detail-slider-track");
        await next.click();
        await expect(track).toHaveAttribute("style", /translateX\(-100%\)/);
      }

      const tryButton = page.locator(".try-cta");
      await tryButton.click();
      await expect(tryButton).toHaveClass(/tried/);

      expect(errors).toEqual([]);
    });

    test(`${variant} detail page handles unknown ids`, async ({ page }) => {
      const errors = await monitorPage(page);
      await page.goto(`/${variant}/agent.html?id=999999`, { waitUntil: "domcontentloaded" });
      await expect(page.locator("#detail a[href='agents.html']")).toBeVisible();
      expect(errors).toEqual([]);
    });
  }
});

test.describe("responsive layout", () => {
  for (const pagePath of ["/a/index.html", "/a/agents.html", "/a/agent.html?id=1"]) {
    test(`${pagePath} does not overflow mobile viewport`, async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(pagePath, { waitUntil: "domcontentloaded" });
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow).toBeLessThanOrEqual(2);
    });
  }
});
