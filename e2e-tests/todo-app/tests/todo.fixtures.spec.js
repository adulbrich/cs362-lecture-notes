import { test as base, expect } from '@playwright/test';

const test = base.extend({
	todoPage: async ({ page }, use) => {
		await page.goto('/');
		await use(page);
	},
	todoPageWithItem: async ({ page }, use) => {
		await page.goto('/');
		await page.getByRole('textbox').fill('Test todo item');
		await page.getByRole('button', { name: 'Add' }).click();
		await expect(page.getByRole('listitem').filter({ hasText: 'Test todo item' })).toBeVisible();
		await use({
			page,
			todoItem: page.getByRole('listitem').filter({ hasText: 'Test todo item' })
		});
	}
});

test('has title', async ({ todoPage: page }) => {
	await expect(page).toHaveTitle(/Todo App/);
});

test('create new todo', async ({ todoPage: page }) => {
	await page.getByRole('textbox').fill('Todo to complete');
	await page.getByRole('button', { name: 'Add' }).click();

	await expect(page.getByText('Todo to complete')).toBeVisible();
	await expect(page.getByRole('listitem').filter({ hasText: 'Todo to complete' })).toBeVisible();
	await expect(page.getByRole('textbox')).toHaveValue('');
});

test('create new todo with Enter', async ({ todoPage: page }) => {
	await page.getByRole('textbox').fill('Todo to complete');
	await page.keyboard.press('Enter');

	await expect(page.getByText('Todo to complete')).toBeVisible();
	await expect(page.getByRole('listitem').filter({ hasText: 'Todo to complete' })).toBeVisible();
	await expect(page.getByRole('textbox')).toHaveValue('');
});

test('mark todos as completed', async ({ todoPageWithItem: { page, todoItem } }) => {
	await todoItem.getByRole('checkbox').click();
	await expect(todoItem.getByRole('checkbox')).toBeChecked();
	await expect(todoItem.getByText('Test todo item')).toHaveCSS('text-decoration', /line-through/);
});

test('mark todos as uncompleted', async ({ todoPageWithItem: { page, todoItem } }) => {
	await todoItem.getByRole('checkbox').click();
	await expect(todoItem.getByRole('checkbox')).toBeChecked();

	await todoItem.getByRole('checkbox').click();
	await expect(todoItem.getByRole('checkbox')).not.toBeChecked();
});
