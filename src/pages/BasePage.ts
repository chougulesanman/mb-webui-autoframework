import { Page, Locator, expect } from '@playwright/test';

export class BasePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigate(path: string) {
        await this.page.goto(path, { waitUntil: 'domcontentloaded' });
    }

    async verifyElementsVisible(elements: Locator[]) {
        for (const element of elements) {
            await expect(element).toBeVisible();
        }
    }

    async verifyTableHasData(table: Locator, minRows: number) {
        const rows = table.locator('tbody tr');
        // await expect(rows).toHaveCount(await rows.count());
        await expect(rows.first()).toBeVisible();
        const count = await rows.count();
        expect(count).toBeGreaterThanOrEqual(minRows);
    }

    async scrollToElement(element: Locator) {
        await element.scrollIntoViewIfNeeded();
    }
}