import { Page, Locator } from '@playwright/test';

export class SideMenu {
    readonly page: Page;
    readonly menuButton: Locator;
    readonly allItemsLink: Locator;
    readonly aboutLink: Locator;
    readonly logoutLink: Locator;
    readonly resetAppStateLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.menuButton = page.locator('#react-burger-menu-btn');
        this.allItemsLink = page.locator('#inventory_sidebar_link');
        this.aboutLink = page.locator('#about_sidebar_link');
        this.logoutLink = page.locator('#logout_sidebar_link');
        this.resetAppStateLink = page.locator('#reset_sidebar_link');
    }

    async clickMenuButton() {
        await this.menuButton.click();
    }

    async clickAllItems() {
        await this.clickMenuButton();
        await this.allItemsLink.click();
    }

    async clickAbout() {
        await this.clickMenuButton();
        await this.aboutLink.click();
    }

    async clickLogout() {
        await this.clickMenuButton();
        await this.logoutLink.click();
    }

    async clickResetAppState() {
        await this.clickMenuButton();
        await this.resetAppStateLink.click();
    }
}
