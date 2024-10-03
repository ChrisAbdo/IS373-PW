import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("https://chrisabdo.github.io/IS373-Hexo/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Hexo/);
});

test("get started link", async ({ page }) => {
  await page.goto("https://chrisabdo.github.io/IS373-Hexo/");

  // Click the get started link.
  await page.getByText("October 2024").click();

  // Expects page to have a heading with the name of Installation.
  await expect(
    page.getByRole("heading", { name: "Archives: 2024/10 | Hexo" })
  ).toBeTruthy();

  
});
