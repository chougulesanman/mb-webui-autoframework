import { test } from '@playwright/test';
import { HomePage } from '../src/pages/HomePage';

test.describe('Navigation & Layout Tests', () => {
    let homePage: HomePage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        await homePage.navigateTo();
    });

    test('all main menu items are visible and clickable', async ({}) => {
        await homePage.verifyElementsVisible(homePage.getAllMenuItems());
    });

    test('Markets link navigates to markets page', async () => {
        await homePage.clickAndVerifyNavigation(homePage.markets, '/markets');
    });

    test('Spot link navigates to spot page', async () => {
        await homePage.trade.click();
        await homePage.verifyElementsVisible([homePage.spot]);
        await homePage.clickAndVerifyNavigation(homePage.spot, /\/trade\/.+/);
    });
});