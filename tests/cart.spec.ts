import { test, expect } from '../fixtures/pageFixtures';

test.describe('Shopping Cart Tests', () => {
    test.beforeEach(async ({ loginPage }) => {
        await loginPage.goto();
        await loginPage.login(process.env.STANDARD_USER!, process.env.STANDARD_PASSWORD!);
    });

    test('TC_CART_001 - Verify adding an item to the cart', async ({ inventoryPage }) => {
        await inventoryPage.addItemToCartByName('Sauce Labs Backpack');
        expect(await inventoryPage.getShoppingCartBadgeCount()).toBe(1);
    });

    test('TC_CART_002 - Verify removing an item from the cart', async ({ inventoryPage, cartPage }) => {
        await inventoryPage.addItemToCartByName('Sauce Labs Backpack');
        await inventoryPage.goToCart();
        await cartPage.removeItemByName('Sauce Labs Backpack');
        expect(await inventoryPage.getShoppingCartBadgeCount()).toBe(0);
    });

    test('TC_CART_003 - Verify that added items are accurately listed on the shopping cart page', async ({ inventoryPage, cartPage }) => {
        await inventoryPage.addItemToCartByName('Sauce Labs Backpack');
        await inventoryPage.goToCart();
        const items = await cartPage.getCartItemNames();
        expect(items).toContain('Sauce Labs Backpack');
    });

    test('TC_CART_004 - Verify that items can be removed directly from the shopping cart page.', async ({ inventoryPage, cartPage }) => {
        await inventoryPage.addItemToCartByName('Sauce Labs Backpack');
        await inventoryPage.goToCart();
        await cartPage.removeItemByName('Sauce Labs Backpack');
        const items = await cartPage.getCartItemNames();
        expect(items).not.toContain('Sauce Labs Backpack');
    });

    test('TC_CART_005 - Verify that clicking Continue Shopping from cart page returns user to inventory while preserving cart contents', async ({ inventoryPage, cartPage }) => {
        await inventoryPage.addItemToCartByName('Sauce Labs Backpack');
        await inventoryPage.goToCart();
        await cartPage.clickContinueShopping();
        expect(await inventoryPage.getShoppingCartBadgeCount()).toBe(1);
    });

    test('TC_CART_006 - Verify that multiple items can be added to the cart simultaneously', async ({ inventoryPage, cartPage }) => {
        await inventoryPage.addItemToCartByName('Sauce Labs Backpack');
        await inventoryPage.addItemToCartByName('Sauce Labs Bike Light');
        expect(await inventoryPage.getShoppingCartBadgeCount()).toBe(2);
    });
});
