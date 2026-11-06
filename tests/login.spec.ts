import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('StackDemo - Login', () => {
  test('login exitoso con usuario demo', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();

    await login.login('demouser');

    await expect(login.loggedUser).toHaveText('demouser');
  });

  test('usuario bloqueado muestra mensaje de error', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();

    await login.login('locked_user');

    await expect(login.errorMessage).toContainText(/locked/i);
  });
});
