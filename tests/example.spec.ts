import { test, expect } from "@playwright/test";

test("verify recent posts and their page titles", async ({ page }) => {
  // Navigate to the home page
  await page.goto("/");

  // Locate the recent posts widget
  const recentPostsWidget = await page.locator('.widget-wrap:has-text("Recent Posts")');

  // Get all post links within the widget
  const postLinks = await recentPostsWidget.locator('li a').all();

  for (const link of postLinks) {
    const postTitle = await link.textContent();
    if (postTitle) {
      // Click the link
      await link.click();

      // Wait for navigation
      await page.waitForLoadState('networkidle');

      // Check if the page title contains the post title
      await expect(page).toHaveTitle(new RegExp(postTitle, 'i'));

      // Go back to the home page for the next iteration
      await page.goto("/");
    }
  }
});