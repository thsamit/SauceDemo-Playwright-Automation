import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductDetailsPage extends BasePage {
    readonly productName: Locator;
    readonly productPrice: Locator;
    readonly backToProductsButton: Locator;
    readonly addToCartButton: Locator;
    readonly removeButton: Locator;

    constructor(page: Page) {
        super(page);
        this.productName = page.locator('.inventory_details_name');
        this.productPrice = page.locator('.inventory_details_price');
        this.backToProductsButton = page.locator('#back-to-products');
        this.addToCartButton = page.locator('#add-to-cart');
        this.removeButton = page.locator('#remove');
    }

    async clickBackToProducts() {
        await this.backToProductsButton.click();
    }

    async clickAddToCart() {
        await this.addToCartButton.click();
    }

    async clickRemove() {
        await this.removeButton.click();
    }
}
