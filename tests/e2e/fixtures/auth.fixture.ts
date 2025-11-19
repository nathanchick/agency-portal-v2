import { test as base, Page } from '@playwright/test';

/**
 * Authentication fixture for Playwright tests
 * Provides reusable authentication helpers and state management
 */

export type AuthFixtures = {
  authenticatedPage: Page;
  organisationUser: {
    email: string;
    password: string;
  };
  customerUser: {
    email: string;
    password: string;
  };
};

export const test = base.extend<AuthFixtures>({
  organisationUser: async ({}, use) => {
    // Use the credentials from the test
    await use({
      email: 'nathan.chick@deploy.co.uk',
      password: 'hcu@tjn0vam1whk3YFG',
    });
  },

  customerUser: async ({}, use) => {
    // Add customer user credentials here when available
    await use({
      email: 'customer@example.com',
      password: 'password',
    });
  },

  authenticatedPage: async ({ page, organisationUser }, use) => {
    // Navigate to login page
    await page.goto('/login');

    // Fill in login form
    await page.getByPlaceholder('email@example.com').fill(organisationUser.email);
    await page.getByRole('textbox', { name: /password/i }).fill(organisationUser.password);

    // Submit form
    await page.getByRole('button', { name: /log in/i }).click();

    // Wait for navigation to dashboard
    await page.waitForURL('/dashboard');

    // Verify authentication
    await page.waitForSelector('text=Nathan Chick');

    await use(page);
  },
});

export { expect } from '@playwright/test';
