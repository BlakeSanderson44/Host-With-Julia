import { test, expect } from '@playwright/test';

const baseUrl = process.env['PLAYWRIGHT_TEST_BASE_URL'] ?? 'http://localhost:3000';

test.describe('Primary navigation anchor behavior', () => {
  test('clicking "How" scrolls the section into view', async ({ page }) => {
    await page.goto(baseUrl);

    const navLink = page.getByRole('link', { name: 'How' });
    await navLink.click();

    await expect(page).toHaveURL(/\/#how$/);

    const howHeading = page.getByRole('heading', { name: 'How It Works' });
    await expect(howHeading).toBeInViewport();
  });
});
