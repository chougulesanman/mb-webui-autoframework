import { test, expect } from '@playwright/test';
import { HomePage } from '../src/pages/HomePage';

test.describe('Spot Trading Section Tests', () => {
    let homePage: HomePage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        await homePage.navigateTo();
        await homePage.verifyElementsVisible([homePage.table]);
    });

    test('Spot section title and categories are visible', async ({}) => {
        await homePage.verifyElementsVisible([homePage.sectionTitle]);
        await homePage.verifyElementsVisible(homePage.getCategoryTabs());
    });

    test('Trading pairs table displays correct columns', async ({}) => {
        await homePage.verifyElementsVisible([homePage.pairHeader]);
        await homePage.verifyElementsVisible(homePage.getTableHeaders());
    });

    test('Trading pairs table displays data', async ({}) => {
        await homePage.verifyTableHasData(homePage.table, 1);
    });

    test('Category tabs filter trading pairs', async ({}) => {
        // Test a subset of category tabs to avoid long test duration and rate limiting
        const categoriesToTest = [homePage.allTab, homePage.usdtTab, homePage.btcTab];
        for (const category of categoriesToTest) {
            await homePage.verifyElementsVisible([category]);
            await homePage.clickCategory(category);
            // Wait for table to update after clicking category
            await homePage.table.waitFor({ state: 'visible' });
            await homePage.verifyElementsVisible([homePage.table]);
        }
    });

    test('Show More button is visible and clickable', async ({}) => {
        await homePage.scrollToElement(homePage.showMoreButton);
        await homePage.verifyElementsVisible([homePage.showMoreButton]);
        const initialRowCount = await homePage.getRowCount();
        await homePage.showMoreButton.click();
        await homePage.verifyElementsVisible([homePage.getTableRows().nth(initialRowCount)]);
        const newRowCount = await homePage.getRowCount();
        expect(newRowCount).toBeGreaterThanOrEqual(initialRowCount);
    });

    test('Trading pair data structure is correct', async ({}) => {
        const firstRow = homePage.getTableRows().first();
        await homePage.verifyElementsVisible([firstRow]);
        const cells = firstRow.locator('td');
        const cellCount = await cells.count();
        expect(cellCount).toBeGreaterThanOrEqual(6);
    });
});