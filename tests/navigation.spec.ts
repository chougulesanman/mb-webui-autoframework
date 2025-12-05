import { test } from '@playwright/test';
import { HomePage } from '../src/pages/HomePage';

test.describe('Navigation & Layout Tests', () => {
    let homePage: HomePage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        await homePage.navigateTo();
    });

    // Test to verify that top navigation menu displays correctly with all expected options
    test('all main menu items are visible and clickable', async ({}) => {
        // const menuItems = homePage.getAllMenuItems();
        // for (const item of menuItems) {
        //     await expect(item).toBeVisible();
        // }
        await homePage.verifyElementsVisible(homePage.getAllMenuItems());
    });

    test('Markets link navigates to markets page', async () => {
        await homePage.clickAndVerifyNavigation(homePage.markets, '/markets');
    });

    test('Spot link navigates to spot page', async () => {
        await homePage.trade.click();
        // await expect(homePage.spot).toBeVisible();
        await homePage.verifyElementsVisible([homePage.spot]);
        await homePage.clickAndVerifyNavigation(homePage.spot, /\/trade\/.+/);
    });
});