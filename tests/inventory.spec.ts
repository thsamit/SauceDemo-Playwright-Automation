import { test, expect } from '../fixtures/pageFixtures';
import { ProductDetailsPage } from '../pages/ProductDetailsPage';

test.describe('Inventory Tests', () => {
    test.beforeEach(async ({ loginPage }) => {
        await loginPage.goto();
        await loginPage.login(process.env.STANDARD_USER!, process.env.STANDARD_PASSWORD!);
    });

    test('TC_INV_001 - Verify product catalog layout', async ({ inventoryPage }) => {
        await expect(inventoryPage.inventoryItems).toHaveCount(6);
    });

    test('TC_INV_002 - Verify product sort Name (A to Z)', async ({ inventoryPage }) => {
        await inventoryPage.selectSortOption('Name (A to Z)');
        const names = await inventoryPage.getInventoryItemNames();
        const sortedNames = [...names].sort();
        expect(names).toEqual(sortedNames);
    });

    test('TC_INV_003 - Verify product sort Name (Z to A)', async ({ inventoryPage }) => {
        await inventoryPage.selectSortOption('Name (Z to A)');
        const names = await inventoryPage.getInventoryItemNames();
        const sortedNames = [...names].sort().reverse();
        expect(names).toEqual(sortedNames);
    });

    test('TC_INV_004 - Verify product sort Price (low to high)', async ({ inventoryPage }) => {
        await inventoryPage.selectSortOption('Price (low to high)');
        const prices = await inventoryPage.getInventoryItemPrices();
        const sortedPrices = [...prices].sort((a, b) => a - b);
        expect(prices).toEqual(sortedPrices);
    });

    test('TC_INV_005 - Verify product sort Price (high to low)', async ({ inventoryPage }) => {
        await inventoryPage.selectSortOption('Price (high to low)');
        const prices = await inventoryPage.getInventoryItemPrices();
        const sortedPrices = [...prices].sort((a, b) => b - a);
        expect(prices).toEqual(sortedPrices);
    });

    test('TC_INV_006 & TC_INV_007 - Verify Product details view and Back to products', async ({ inventoryPage, productDetailsPage }) => {
        await inventoryPage.clickProductTitle('Sauce Labs Backpack');
        await expect(productDetailsPage.productName).toHaveText('Sauce Labs Backpack');

        await productDetailsPage.clickBackToProducts();
        await expect(inventoryPage.inventoryItems).toHaveCount(6);
    });
});
