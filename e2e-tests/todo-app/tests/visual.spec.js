import { test, expect } from '@playwright/test';

test('cs362', async ({ page }) => {
	await page.goto('https://cs362.alexulbrich.com');
	await expect(page).toHaveScreenshot();
});
