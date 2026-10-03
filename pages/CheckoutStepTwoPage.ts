import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutStepTwoPage extends BasePage {
    readonly itemTotal: Locator;
    readonly tax: Locator;
    readonly total: Locator;
    readonly finishButton: Locator;
    readonly cancelButton: Locator;

    constructor(page: Page) {
        super(page);
        this.itemTotal = page.locator('.summary_subtotal_label');
        this.tax = page.locator('.summary_tax_label');
        this.total = page.locator('.summary_total_label');
        this.finishButton = page.locator('#finish');
        this.cancelButton = page.locator('#cancel');
    }

    async getItemTotal() {
        const itemTotalText = await this.itemTotal.textContent();
        return parseFloat(itemTotalText?.replace(/[^0-9.]/g, '') ?? '0');
    }

    async getTax() {
        const taxText = await this.tax.textContent();
        return parseFloat(taxText?.replace(/[^0-9.]/g, '') ?? '0');
    }

    async getTotal() {
        const totalText = await this.total.textContent();
        return parseFloat(totalText?.replace(/[^0-9.]/g, '') ?? '0');
    }

    async clickFinish() {
        await this.finishButton.click();
    }

    async clickCancel() {
        await this.cancelButton.click();
    }
}
