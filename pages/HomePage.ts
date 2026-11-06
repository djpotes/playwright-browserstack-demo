import { Page, Locator, expect } from '@playwright/test';

/**
 * Page Object de la página principal de bstackdemo.com
 */
export class HomePage {
  readonly page: Page;
  readonly products: Locator;
  readonly productNames: Locator;
  readonly addToCartButtons: Locator;
  readonly cartContent: Locator;
  readonly cartItems: Locator;
  readonly cartCloseButton: Locator;
  readonly signInLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.products = page.locator('.shelf-item');
    this.productNames = page.locator('.shelf-item__title');
    this.addToCartButtons = page.locator('.shelf-item__buy-btn');
    this.cartContent = page.locator('.float-cart__content');
    this.cartItems = page.locator('.float-cart__shelf-container .shelf-item');
    this.cartCloseButton = page.locator('.float-cart__close-btn');
    this.signInLink = page.locator('#signin');
  }

  async goto() {
    await this.page.goto('/');
    await expect(this.products.first()).toBeVisible();
  }

  async addProductToCart(index = 0): Promise<string> {
    const name = (await this.productNames.nth(index).innerText()).trim();
    await this.addToCartButtons.nth(index).click();
    await expect(this.cartContent).toBeVisible();
    return name;
  }

  async filterByVendor(vendor: 'Apple' | 'Samsung' | 'Google' | 'OnePlus') {
    await this.page.locator('.filters-available-size', { hasText: vendor }).click();
  }
}
