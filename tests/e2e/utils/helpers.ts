import { Page } from '@playwright/test';

/**
 * Utility functions for E2E tests
 */

/**
 * Wait for page to be fully loaded including network idle
 */
export async function waitForPageLoad(page: Page) {
  await page.waitForLoadState('networkidle');
}

/**
 * Take a screenshot with a descriptive name
 */
export async function takeScreenshot(page: Page, name: string) {
  await page.screenshot({ path: `test-results/screenshots/${name}.png`, fullPage: true });
}

/**
 * Clear all notifications/toasts
 */
export async function clearNotifications(page: Page) {
  const notifications = page.locator('[role="status"]');
  const count = await notifications.count();

  for (let i = 0; i < count; i++) {
    const closeButton = notifications.nth(i).locator('button[aria-label="Close"]');
    if (await closeButton.isVisible()) {
      await closeButton.click();
    }
  }
}

/**
 * Wait for a toast/notification with specific text
 */
export async function waitForNotification(page: Page, text: string) {
  await page.waitForSelector(`[role="status"]:has-text("${text}")`);
}

/**
 * Navigate using sidebar menu
 */
export async function navigateToSection(page: Page, section: string) {
  const menuButton = page.getByRole('button', { name: section });
  await menuButton.click();
}

/**
 * Navigate to a specific subsection from an expanded menu
 */
export async function navigateToSubsection(page: Page, section: string, subsection: string) {
  await navigateToSection(page, section);
  await page.getByRole('link', { name: subsection }).click();
}

/**
 * Fill form field by label
 */
export async function fillFormField(page: Page, label: string, value: string) {
  const field = page.getByLabel(label);
  await field.fill(value);
}

/**
 * Select dropdown option by label
 */
export async function selectDropdown(page: Page, label: string, option: string) {
  await page.getByLabel(label).click();
  await page.getByRole('option', { name: option }).click();
}

/**
 * Wait for table to load and return row count
 */
export async function getTableRowCount(page: Page): Promise<number> {
  await page.waitForSelector('table tbody tr');
  const rows = page.locator('table tbody tr');
  return await rows.count();
}

/**
 * Search in table/list
 */
export async function searchTable(page: Page, searchTerm: string) {
  const searchInput = page.getByPlaceholder(/search/i);
  await searchInput.fill(searchTerm);
  await page.waitForLoadState('networkidle');
}

/**
 * Click table row action button
 */
export async function clickRowAction(page: Page, rowIndex: number, action: 'edit' | 'delete' | 'view') {
  const row = page.locator('table tbody tr').nth(rowIndex);
  const actionButton = row.getByRole('button', { name: new RegExp(action, 'i') });
  await actionButton.click();
}

/**
 * Generate random email for testing
 */
export function generateTestEmail(): string {
  const timestamp = Date.now();
  return `test-${timestamp}@example.com`;
}

/**
 * Generate random company name for testing
 */
export function generateTestCompanyName(): string {
  const timestamp = Date.now();
  return `Test Company ${timestamp}`;
}

/**
 * Wait for specific URL pattern
 */
export async function waitForURL(page: Page, urlPattern: string | RegExp) {
  await page.waitForURL(urlPattern);
}

/**
 * Check if user is authenticated
 */
export async function isAuthenticated(page: Page): Promise<boolean> {
  try {
    await page.waitForSelector('text=Nathan Chick', { timeout: 2000 });
    return true;
  } catch {
    return false;
  }
}

/**
 * Logout user
 */
export async function logout(page: Page) {
  await page.getByRole('button', { name: /nathan chick/i }).click();
  await page.getByRole('menuitem', { name: /log out/i }).click();
  await page.waitForURL('/login');
}
