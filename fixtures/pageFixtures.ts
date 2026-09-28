import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { SideMenu } from '../pages/SideMenu';

type PageFixtures = {
    loginPage: LoginPage;
    sideMenu: SideMenu;
};

export const test = base.extend<PageFixtures>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    sideMenu: async ({ page }, use) => {
        await use(new SideMenu(page));
    },
});

export { expect } from '@playwright/test';
