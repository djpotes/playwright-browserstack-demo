import { defineConfig, devices } from '@playwright/test';

/**
 * Configuración de Playwright.
 * - `npm test`      -> corre en tu máquina local con los proyectos definidos abajo.
 * - `npm run test:bs` -> el SDK de BrowserStack toma esta config y ejecuta
 *   en las plataformas definidas en browserstack.yml.
 */
export default defineConfig({
  testDir: './tests',
  timeout: 60_000,
  expect: { timeout: 10_000 },
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: 'https://bstackdemo.com',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
});
