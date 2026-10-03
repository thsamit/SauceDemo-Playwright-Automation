import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutCompletePage extends BasePage {
    readonly completeHeader: Locator;
    readonly backHomeButton: Locator;

    constructor(page: Page) {
        super(page);
        this.completeHeader = page.locator('.complete-header');
        this.backHomeButton = page.locator('#back-to-products');
    }

    async getCompleteHeaderText() {
        return await this.completeHeader.textContent();
    }

    async clickBackHome() {
        await this.backHomeButton.click();
    }
}
