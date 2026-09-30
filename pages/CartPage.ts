import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
    readonly cartItem: Locator;
    readonly continueShoppingButton: Locator;
    readonly checkoutButton: Locator;

    constructor(page: Page) {
        super(page);
        this.cartItem = page.locator('.inventory_item_name');
        this.continueShoppingButton = page.locator('#continue-shopping');
        this.checkoutButton = page.locator('#checkout');
    }

    async getCartItemNames() {
        return await this.cartItem.allTextContents();
    }

    async removeItemByName(itemName: string) {
        const itemLocator = this.cartItem.filter({ hasText: itemName });
        await itemLocator.locator('button', { hasText: 'Remove' }).click();
    }

    async continueShopping() {
        await this.continueShoppingButton.click();
    }

    async proceedToCheckout() {
        await this.checkoutButton.click();
    }
}
