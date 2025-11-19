import { test, expect } from '@playwright/test';
import { generateTestEmail } from '../utils/helpers';

test.describe('Authentication - Login', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  test('should display login form', async ({ page }) => {
    await expect(page).toHaveTitle(/log in/i);
    await expect(page.getByRole('heading', { name: /log in to your account/i })).toBeVisible();
    await expect(page.getByPlaceholder('email@example.com')).toBeVisible();
    await expect(page.getByRole('textbox', { name: /password/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /log in/i })).toBeVisible();
  });

  test('should show validation errors for empty fields', async ({ page }) => {
    await page.getByRole('button', { name: /log in/i }).click();

    // Check for validation errors
    await expect(page.locator('text=/email.*required/i')).toBeVisible();
    await expect(page.locator('text=/password.*required/i')).toBeVisible();
  });

  test('should show error for invalid credentials', async ({ page }) => {
    await page.getByPlaceholder('email@example.com').fill(generateTestEmail());
    await page.getByRole('textbox', { name: /password/i }).fill('wrongpassword');
    await page.getByRole('button', { name: /log in/i }).click();

    // Check for error message
    await expect(page.locator('text=/invalid.*credentials/i')).toBeVisible();
  });

  test('should successfully login with valid credentials', async ({ page }) => {
    await page.getByPlaceholder('email@example.com').fill('nathan.chick@deploy.co.uk');
    await page.getByRole('textbox', { name: /password/i }).fill('hcu@tjn0vam1whk3YFG');
    await page.getByRole('button', { name: /log in/i }).click();

    // Should redirect to dashboard
    await page.waitForURL('/dashboard');

    // Check if user is logged in
    await expect(page.getByText('Nathan Chick')).toBeVisible();
    await expect(page.getByRole('heading', { name: /good morning, nathan/i })).toBeVisible();
  });

  test('should remember user when "Remember me" is checked', async ({ page }) => {
    await page.getByPlaceholder('email@example.com').fill('nathan.chick@deploy.co.uk');
    await page.getByRole('textbox', { name: /password/i }).fill('hcu@tjn0vam1whk3YFG');
    await page.getByLabel(/remember me/i).check();
    await page.getByRole('button', { name: /log in/i }).click();

    await page.waitForURL('/dashboard');

    // Check for remember me cookie
    const cookies = await page.context().cookies();
    const rememberCookie = cookies.find(c => c.name.includes('remember'));
    expect(rememberCookie).toBeDefined();
  });

  test('should navigate to forgot password page', async ({ page }) => {
    await page.getByRole('link', { name: /forgot password/i }).click();
    await page.waitForURL('/forgot-password');
    await expect(page.getByRole('heading', { name: /forgot.*password/i })).toBeVisible();
  });

  test('should redirect authenticated users away from login', async ({ page }) => {
    // First login
    await page.getByPlaceholder('email@example.com').fill('nathan.chick@deploy.co.uk');
    await page.getByRole('textbox', { name: /password/i }).fill('hcu@tjn0vam1whk3YFG');
    await page.getByRole('button', { name: /log in/i }).click();
    await page.waitForURL('/dashboard');

    // Try to access login again
    await page.goto('/login');

    // Should be redirected to dashboard
    await expect(page).toHaveURL('/dashboard');
  });
});
