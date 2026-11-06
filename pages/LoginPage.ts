import { Page, Locator } from '@playwright/test';

/**
 * Page Object del login de bstackdemo.com
 * El sitio demo usa dropdowns (react-select) para usuario y contraseña.
 */
export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly loggedUser: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('#react-select-2-input');
    this.passwordInput = page.locator('#react-select-3-input');
    this.loginButton = page.locator('#login-btn');
    this.loggedUser = page.locator('.username');
    this.errorMessage = page.locator('.api-error');
  }

  async goto() {
    await this.page.goto('/signin');
  }

  async login(username: string, password = 'testingisfun99') {
    await this.usernameInput.fill(username);
    await this.usernameInput.press('Enter');
    await this.passwordInput.fill(password);
    await this.passwordInput.press('Enter');
    await this.loginButton.click();
  }
}
