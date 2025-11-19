import { test, expect } from '../fixtures/auth.fixture';

test.describe('Authentication - Logout', () => {
  test('should successfully logout', async ({ authenticatedPage: page }) => {
    // Verify we're logged in
    await expect(page).toHaveURL('/dashboard');
    await expect(page.getByText('Nathan Chick')).toBeVisible();

    // Click on user menu
    await page.getByRole('button', { name: /nathan chick/i }).click();

    // Click logout
    await page.getByRole('menuitem', { name: /log out/i }).click();

    // Should redirect to login
    await page.waitForURL('/login');
    await expect(page.getByRole('heading', { name: /log in to your account/i })).toBeVisible();
  });

  test('should clear session after logout', async ({ authenticatedPage: page }) => {
    // Logout
    await page.getByRole('button', { name: /nathan chick/i }).click();
    await page.getByRole('menuitem', { name: /log out/i }).click();
    await page.waitForURL('/login');

    // Try to access protected route
    await page.goto('/dashboard');

    // Should redirect to login
    await page.waitForURL('/login');
  });

  test('should not be able to go back after logout', async ({ authenticatedPage: page }) => {
    // Logout
    await page.getByRole('button', { name: /nathan chick/i }).click();
    await page.getByRole('menuitem', { name: /log out/i }).click();
    await page.waitForURL('/login');

    // Try to go back
    await page.goBack();

    // Should still be on login page or redirected to login
    await expect(page).toHaveURL(/\/(login)?$/);
  });
});
