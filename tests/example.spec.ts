import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("https://chrisabdo.github.io/IS373-Hexo/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test("get started link", async ({ page }) => {
  await page.goto("https://chrisabdo.github.io/IS373-Hexo/");

  // Click the get started link.
  await page.getByRole("link", { name: "Hello World" }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(
    page.getByRole("heading", { name: "Hello World | Hexo" })
  ).toBeVisible();
});
