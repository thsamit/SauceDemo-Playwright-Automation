import { test, expect } from '../fixtures/pageFixtures';

test.describe('Checkout Flow Tests', () => {
    test.beforeEach(async ({ loginPage, inventoryPage, cartPage }) => {
        await loginPage.goto();
        await loginPage.login(process.env.STANDARD_USER!, process.env.STANDARD_PASSWORD!);
        await inventoryPage.addItemToCartByName('Sauce Labs Backpack');
        await inventoryPage.goToCart();
        await cartPage.clickCheckout();
    });

    test('TC_CHK_001 - Verify that a user can successfully complete an end-to-end order checkout', async ({ checkoutStepOnePage, checkoutStepTwoPage, checkoutCompletePage }) => {
        await checkoutStepOnePage.fillCheckoutInformation('John', 'Doe', '12345');
        await checkoutStepOnePage.clickContinue();

        await checkoutStepTwoPage.clickFinish();
        expect(await checkoutCompletePage.getCompleteHeaderText()).toContain('Thank you for your order!');
    });

    test('TC_CHK_002 - Verify that appropriate validation errors are displayed when submitting empty or incomplete user information during checkout', async ({
        checkoutStepOnePage,
        checkoutStepTwoPage,
        checkoutCompletePage,
    }) => {
        await checkoutStepOnePage.clickContinue();
        expect(await checkoutStepOnePage.getErrorMessage()).toContain('Error: First Name is required');

        await checkoutStepOnePage.fillCheckoutInformation('John', '', '');
        await checkoutStepOnePage.clickContinue();
        expect(await checkoutStepOnePage.getErrorMessage()).toContain('Error: Last Name is required');

        await checkoutStepOnePage.fillCheckoutInformation('John', 'Doe', '');
        await checkoutStepOnePage.clickContinue();
        expect(await checkoutStepOnePage.getErrorMessage()).toContain('Error: Postal Code is required');
    });

    test('TC_CHK_003 - Verify that item subtotal, tax, and total price calculations are accurate on the checkout overview page ', async ({
        checkoutStepOnePage,
        checkoutStepTwoPage,
    }) => {
        await checkoutStepOnePage.fillCheckoutInformation('John', 'Doe', '12345');
        await checkoutStepOnePage.clickContinue();
        const itemTotal = await checkoutStepTwoPage.getItemTotal();
        const tax = await checkoutStepTwoPage.getTax();
        const total = await checkoutStepTwoPage.getTotal();

        expect(itemTotal + tax).toBeCloseTo(total, 2);
    });

    test('TC_CHK_004 - Verify that the user can cancel the checkout process and return to the cart page', async ({ checkoutStepOnePage, checkoutStepTwoPage }) => {
        await checkoutStepOnePage.fillCheckoutInformation('John', 'Doe', '12345');
        await checkoutStepOnePage.clickContinue();
        await checkoutStepTwoPage.clickCancel();
    });
});
