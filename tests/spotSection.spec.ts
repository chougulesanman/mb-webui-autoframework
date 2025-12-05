import { test, expect } from '@playwright/test';
import { HomePage } from '../src/pages/HomePage';

test.describe('Spot Trading Section Tests', () => {
    let homePage: HomePage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        await homePage.navigateTo();
        // await expect(homePage.table).toBeVisible();
        await homePage.verifyElementsVisible([homePage.table]);
    });

    test('Spot section title and categories are visible', async ({}) => {
        // await expect(homePage.sectionTitle).toBeVisible();
        await homePage.verifyElementsVisible([homePage.sectionTitle]);
        await homePage.verifyElementsVisible(homePage.getCategoryTabs());
    });

    test('Trading pairs table displays correct columns', async ({}) => {
        // await expect(homePage.pairHeader).toBeVisible();
        await homePage.verifyElementsVisible([homePage.pairHeader]);
        await homePage.verifyElementsVisible(homePage.getTableHeaders());
    });

    test('Trading pairs table displays data', async ({}) => {
        await homePage.verifyTableHasData(homePage.table, 1);
    });

    test('Category tabs filter trading pairs', async ({}) => {
        const categories = homePage.getCategoryTabs();
        for (const category of categories) {
            // await expect(category).toBeVisible();
            await homePage.verifyElementsVisible([category]);
            await homePage.clickCategory(category);
            // await expect(homePage.table).toBeVisible();
            await homePage.verifyElementsVisible([homePage.table]);
        }
    });

    test('Show More button is visible and clickable', async ({}) => {
        await homePage.scrollToElement(homePage.showMoreButton);
        // await expect(homePage.showMoreButton).toBeVisible();
        await homePage.verifyElementsVisible([homePage.showMoreButton]);
        const initialRowCount = await homePage.getRowCount();
        await homePage.showMoreButton.click();
        // await expect(homePage.getTableRows().nth(initialRowCount)).toBeVisible();
        await homePage.verifyElementsVisible([homePage.getTableRows().nth(initialRowCount)]);
        const newRowCount = await homePage.getRowCount();
        expect(newRowCount).toBeGreaterThanOrEqual(initialRowCount);
    });

    test('Trading pair data structure is correct', async ({}) => {
        const firstRow = homePage.getTableRows().first();
        // await expect(firstRow).toBeVisible();
        await homePage.verifyElementsVisible([firstRow]);
        const cells = firstRow.locator('td');
        const cellCount = await cells.count();
        expect(cellCount).toBeGreaterThanOrEqual(6);
    });
});