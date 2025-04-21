// @ts-check

import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
	await page.goto('/');

	await expect(page).toHaveTitle(/Todo App/);
});

test('create new todo', async ({ page }) => {
	await page.goto('/');
	await page.getByRole('textbox').fill('Todo to complete');
	await page.getByRole('button', { name: 'Add' }).click();

	await expect(page.getByText('Todo to complete')).toBeVisible();
	await expect(page.getByRole('listitem').filter({ hasText: 'Todo to complete' })).toBeVisible();
	await expect(page.getByRole('textbox')).toHaveValue('');

	await expect(page.locator('body')).toMatchAriaSnapshot(`
        - heading \"Todo List\"
        - textbox \"Add a new todo\"
        - button \"Add\":
            - img
            - text: Add
        - list:
            - listitem:
                - checkbox
                - text: Todo to complete
                - button \"Delete\"
        - button \"Archive Completed Items\":
          - img
          - text: Archive Completed Items
        - button \"View Archive\":
          - img
          - text: View Archive
    `);
});

test('create new todo with Enter', async ({ page }) => {
	await page.goto('/');
	await page.getByRole('textbox').fill('Todo to complete');
	await page.keyboard.press('Enter');

	await expect(page.getByText('Todo to complete')).toBeVisible();
	await expect(page.getByRole('listitem').filter({ hasText: 'Todo to complete' })).toBeVisible();
	await expect(page.getByRole('textbox')).toHaveValue('');
});

test('mark todos as completed', async ({ page }) => {
	await page.goto('/');
	await page.getByRole('textbox').fill('Todo to complete');
	await page.getByRole('button', { name: 'Add' }).click();

	const todoItem = page.getByRole('listitem').filter({ hasText: 'Todo to complete' });
	await todoItem.getByRole('checkbox').click();

	await expect(todoItem.getByRole('checkbox')).toBeChecked();
	await expect(todoItem.getByText('Todo to complete')).toHaveCSS('text-decoration', /line-through/);
});

test('mark todos as uncompleted', async ({ page }) => {
	await page.goto('/');
	await page.getByRole('textbox').fill('Todo to complete');
	await page.getByRole('button', { name: 'Add' }).click();

	const todoItem = page.getByRole('listitem').filter({ hasText: 'Todo to complete' });
	await todoItem.getByRole('checkbox').click();

	await expect(todoItem.getByRole('checkbox')).toBeChecked();

	await todoItem.getByRole('checkbox').click();

	await expect(todoItem.getByRole('checkbox')).not.toBeChecked();
});

test.describe('todos with hooks', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
		await page.getByRole('textbox').fill('Todo to complete');
		await page.getByRole('button', { name: 'Add' }).click();
	});
	test('create new todo', async ({ page }) => {
		await expect(page.getByText('Todo to complete')).toBeVisible();
		await expect(page.getByRole('listitem').filter({ hasText: 'Todo to complete' })).toBeVisible();
		await expect(page.getByRole('textbox')).toHaveValue('');
	});
});

test('nothing to archive', async ({ page }) => {
	await page.goto('/');
	await page.getByRole('textbox').fill('Todo to complete');
	await page.getByRole('button', { name: 'Add' }).click();

	let dialogMessage = '';
	page.on('dialog', async (dialog) => {
		dialogMessage = dialog.message();
		await dialog.accept();
	});

	await page.getByRole('button', { name: 'Archive Completed Items' }).click();

	expect(dialogMessage).toContain('Nothing to archive.');
});
