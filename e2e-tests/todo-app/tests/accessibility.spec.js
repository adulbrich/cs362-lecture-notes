import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('cs362.alexulbrich.com', () => {
	test('should not have any automatically detectable accessibility issues', async ({ page }) => {
		await page.goto('https://cs362.alexulbrich.com');

		const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

		expect(accessibilityScanResults.violations).toEqual([]);
	});
});

test.describe('capucity', () => {
	test('should not have any automatically detectable accessibility issues', async ({ page }) => {
		await page.goto('https://capucity.be');

		const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

		expect(accessibilityScanResults.violations).toEqual([]);
	});
});

test.describe('alexulbrich.com', () => {
	test('should not have any automatically detectable accessibility issues', async ({ page }) => {
		await page.goto('https://alexulbrich.com');

		const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

		expect(accessibilityScanResults.violations).toEqual([]);
	});
});
