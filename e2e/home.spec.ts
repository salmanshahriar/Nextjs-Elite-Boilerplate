import { expect, test } from '@playwright/test';

test('home page has title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Next.js|Production-Ready|Boilerplate/i);
});

test('home page has main content', async ({ page }) => {
  await page.goto('/');
  await expect(
    page.getByRole('link', { name: /source code|github/i }),
  ).toBeVisible();
});

test('health check returns ok', async ({ request }) => {
  const res = await request.get('/api/health');
  expect(res.ok()).toBeTruthy();
  const body = await res.json();
  expect(body).toEqual({ status: 'ok' });
});

test('login page loads', async ({ page }) => {
  await page.goto('/auth/login');
  await expect(page).toHaveURL(/\/auth\/login/);
  await expect(page.getByRole('textbox', { name: /email/i })).toBeVisible();
});
