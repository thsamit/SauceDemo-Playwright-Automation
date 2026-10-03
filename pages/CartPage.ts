import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
    readonly cartItem: Locator;
    readonly cartItemName: Locator;
    readonly continueShoppingButton: Locator;
    readonly checkoutButton: Locator;

    constructor(page: Page) {
        super(page);
        this.cartItem = page.locator('.cart_item');
        this.cartItemName = page.locator('.inventory_item_name');
        this.continueShoppingButton = page.locator('#continue-shopping');
        this.checkoutButton = page.locator('#checkout');
    }

    async getCartItemNames() {
        return await this.cartItemName.allTextContents();
    }

    async removeItemByName(itemName: string) {
        const itemLocator = this.cartItem.filter({ hasText: itemName });
        await itemLocator.locator('button', { hasText: 'Remove' }).click();
    }

    async clickContinueShopping() {
        await this.continueShoppingButton.click();
    }

    async clickCheckout() {
        await this.checkoutButton.click();
    }
}
