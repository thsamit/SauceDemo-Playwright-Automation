import { test, expect } from '../fixtures/pageFixtures';

test.describe('Authentication Tests', () => {
    test.beforeEach(async ({ loginPage }) => {
        await loginPage.goto();
    });

    test('TC_AUTH_001 - Verify that user can successfully login with valid credentials', async ({ page, loginPage, inventoryPage }) => {
        await loginPage.login(process.env.STANDARD_USER!, process.env.STANDARD_PASSWORD!);
        await expect(page).toHaveURL(/.*inventory.html/);
        await expect(inventoryPage.inventoryItems).toHaveCount(6);
    });

    test('TC_AUTH_002 - Verify that a locked-out user receives an appropriate error message upon login attempt', async ({ loginPage }) => {
        await loginPage.login(process.env.LOCKED_OUT_USER!, process.env.STANDARD_PASSWORD!);
        const errorMessage = await loginPage.getErrorMessage();
        expect(errorMessage).toContain('Sorry, this user has been locked out.');
    });

    test('TC_AUTH_003 - Verify that an invalid password results in an appropriate error message', async ({ loginPage }) => {
        await loginPage.login(process.env.STANDARD_USER!, 'invalid_password');
        const errorMessage = await loginPage.getErrorMessage();
        expect(errorMessage).toContain('Username and password do not match');
    });

    test('TC_AUTH_004 - Verify that login with empty credentials shows appropriate validation message', async ({ loginPage }) => {
        await loginPage.login('', '');
        const errorMessage = await loginPage.getErrorMessage();
        expect(errorMessage).toContain('Username is required');
    });

    test('TC_AUTH_005 - Verify that a logged-in user can successfully log out of the application', async ({ loginPage, sideMenu }) => {
        await loginPage.login(process.env.STANDARD_USER!, process.env.STANDARD_PASSWORD!);
        await sideMenu.clickLogout();
        await expect(loginPage.page).toHaveURL(process.env.BASE_URL!);
    });
});
