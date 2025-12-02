import { test, expect } from '@playwright/test';
import { HomePage } from '../src/pages/HomePage';

test.describe('Navigation & Layout Tests', () => {
    let homePage: HomePage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        await homePage.navigateTo();
    });

    // Test to verify that top navigation menu displays correctly with all expected options
    test('all main menu items are visible and clickable', async ({}) => {
        const menuItems = homePage.getAllMenuItems();
        for (const item of menuItems) {
            await expect(item).toBeVisible();
        }
    });

    test('Markets link navigates to markets page', async ({ page }) => {
        await homePage.markets.click();
        await expect(page).toHaveURL('/markets');
    });

    test('Spot link navigates to spot page', async ({ page }) => {
        await homePage.trade.click();
        await expect(homePage.spot).toBeVisible();
        await homePage.spot.click();
        await expect(page).toHaveURL(/\/trade\/.+/);
    });
});