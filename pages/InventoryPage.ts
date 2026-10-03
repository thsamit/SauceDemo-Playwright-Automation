import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { SideMenu } from './SideMenu';

export class InventoryPage extends BasePage {
    readonly sideMenu: SideMenu;
    readonly inventoryItems: Locator;
    readonly inventoryItemNames: Locator;
    readonly inventoryItemPrices: Locator;
    readonly sortDropdown: Locator;
    readonly shoppingCartBadge: Locator;
    readonly addToCartButton: Locator;
    readonly shoppingCartLink: Locator;

    constructor(page: Page) {
        super(page);
        this.sideMenu = new SideMenu(page);
        this.inventoryItems = page.locator('.inventory_item');
        this.inventoryItemNames = page.locator('.inventory_item_name');
        this.inventoryItemPrices = page.locator('.inventory_item_price');
        this.sortDropdown = page.locator('.product_sort_container');
        this.shoppingCartBadge = page.locator('.shopping_cart_badge');
        this.addToCartButton = page.getByRole('button', { name: 'Add to cart' });
        this.shoppingCartLink = page.locator('.shopping_cart_link');
    }

    async selectSortOption(option: string) {
        await this.sortDropdown.selectOption(option);
    }

    async getInventoryItemNames() {
        return await this.inventoryItemNames.allTextContents();
    }

    async getInventoryItemPrices() {
        const rawPrices = await this.inventoryItemPrices.allTextContents();
        return rawPrices.map((price) => parseFloat(price.replace('$', '')));
    }

    async addItemToCartByName(itemName: string) {
        const itemLocator = this.inventoryItems.filter({ hasText: itemName });
        await itemLocator.locator('button', { hasText: 'Add to cart' }).click();
    }

    async removeItemFromCartByName(itemName: string) {
        const itemLocator = this.inventoryItems.filter({ hasText: itemName });
        await itemLocator.locator('button', { hasText: 'Remove' }).click();
    }

    async clickProductTitle(itemName: string) {
        const itemLocator = this.inventoryItems.filter({ hasText: itemName });
        await itemLocator.locator('.inventory_item_name').click();
    }

    async getShoppingCartBadgeCount() {
        if (await this.shoppingCartBadge.isVisible()) {
            const badgeText = await this.shoppingCartBadge.textContent();
            return badgeText ? parseInt(badgeText, 10) : 0;
        }
        return 0;
    }

    async goToCart() {
        await this.shoppingCartLink.click();
    }
}
