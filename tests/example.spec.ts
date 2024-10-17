import { test, expect } from "@playwright/test";

test("verify recent posts and their page titles", async ({ page }) => {
  console.log("Starting test: verify recent posts and their page titles");

  // Navigate to the home page
  await page.goto("/");
  console.log("Navigated to home page");

  // Locate the recent posts widget
  const recentPostsWidget = await page.locator('.widget-wrap:has-text("Recent Posts")');
  console.log("Located recent posts widget");

  // Get all post links within the widget
  const postLinks = await recentPostsWidget.locator('li a').all();
  console.log(`Found ${postLinks.length} post links`);

  for (const link of postLinks) {
    const postTitle = await link.textContent();
    if (postTitle) {
      console.log(`Checking post: "${postTitle}"`);

      // Click the link
      await link.click();
      console.log(`Clicked on post link: "${postTitle}"`);

      // Wait for navigation
      await page.waitForLoadState('networkidle');
      console.log("Page loaded");

      // Check if the page title contains the post title
      const pageTitle = await page.title();
      console.log(`Page title: "${pageTitle}"`);
      await expect(page).toHaveTitle(new RegExp(postTitle, 'i'));
      console.log(`Title check passed for: "${postTitle}"`);

      // Go back to the home page for the next iteration
      await page.goto("/");
      console.log("Returned to home page");
    }
  }

  console.log("Test completed successfully");
});