import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

test.describe('StackDemo - Página principal', () => {
  test('carga la página y muestra productos', async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();

    await expect(page).toHaveTitle(/StackDemo/);
    expect(await home.products.count()).toBeGreaterThan(0);
  });

  test('agrega un producto al carrito', async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();

    const productName = await home.addProductToCart(0);

    await expect(home.cartItems).toHaveCount(1);
    await expect(home.cartItems.first()).toContainText(productName);
  });

  test('filtra productos por marca Apple', async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();
    const total = await home.products.count();

    await home.filterByVendor('Apple');

    await expect.poll(async () => home.products.count()).toBeLessThan(total);
    const names = await home.productNames.allInnerTexts();
    for (const name of names) {
      expect(name).toMatch(/iPhone/i);
    }
  });
});
