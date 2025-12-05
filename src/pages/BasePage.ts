import { Page, Locator, expect } from '@playwright/test';

export class BasePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigate(path: string) {
        await this.page.goto(path, { waitUntil: 'domcontentloaded' });
    }

    async clickAndVerifyNavigation(link: Locator, expectedUrl: string | RegExp) {
        await link.click();
        await expect(this.page).toHaveURL(expectedUrl, { timeout: 45000 });
    }

    async verifyElementsVisible(elements: Locator[]) {
        for (const element of elements) {
            // Wait for element to be attached to DOM first
            await expect(element).toBeAttached({ timeout: 15000 });
            // Scroll into view if needed
            await element.scrollIntoViewIfNeeded();
            // Then verify visibility
            await expect(element).toBeVisible({ timeout: 10000 });
        }
    }

    async verifyTableHasData(table: Locator, minRows: number) {
        const rows = table.locator('tbody tr');
        await expect(rows.first()).toBeAttached({ timeout: 15000 });
        await expect(rows.first()).toBeVisible();
        const count = await rows.count();
        expect(count).toBeGreaterThanOrEqual(minRows);
    }

    async scrollToElement(element: Locator) {
        // Wait for element to be attached before scrolling
        await expect(element).toBeAttached({ timeout: 15000 });
        await element.scrollIntoViewIfNeeded();
    }

    async verifyLinkContainsUrl(link: Locator, expectedUrl: string) {
        const href = await link.getAttribute('href');
        expect(href).toContain(expectedUrl);
    }
}