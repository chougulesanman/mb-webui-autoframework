import { test, expect } from '@playwright/test';
import { HomePage } from '../src/pages/HomePage';
import contentData from '../data/contentValidation.json';

test.describe('Content Validation Tests', () => {
    
    test.describe('Homepage - Marketing Banners', () => {
        let homePage: HomePage;

        test.beforeEach(async ({ page }) => {
            homePage = new HomePage(page);
            await homePage.navigateTo();
        });

        test('Marketing banner appear at page bottom', async ({}) => {
            // Scroll to bottom of page first
            await homePage.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
            // Wait for scroll and content to settle
            await homePage.bannerCarousel.waitFor({ state: 'attached', timeout: 10000 });
            await homePage.verifyElementsVisible([homePage.bannerCarousel]);
        });

        test('Marketing banner contains expected content', async ({}) => {
            // Scroll to bottom of page first
            await homePage.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
            // Wait for scroll and content to settle
            await homePage.bannerCarousel.waitFor({ state: 'attached', timeout: 10000 });
            await homePage.verifyMarketingBannersExist();
        });
    });

    test.describe('Homepage - Download Section', () => {
        let homePage: HomePage;

        test.beforeEach(async ({ page }) => {
            homePage = new HomePage(page);
            await homePage.navigateTo();
        });

        test('Download section title is visible', async ({}) => {
            await homePage.scrollToElement(homePage.downloadSectionTitle);
            await homePage.verifyElementsVisible([homePage.downloadSectionTitle]);
        });

        contentData.homepage.downloadSection.links.forEach(({ text, urlContains }) => {
            test(`${text} link is visible and correct`, async ({}) => {
                const link = homePage.getDownloadLink(text);
                await homePage.scrollToElement(link);
                await expect(link).toBeVisible();
                await homePage.verifyLinkContainsUrl(link, urlContains);
            });
          });
    });

    test.describe('About Us - Why Multibank', () => {
        let homePage: HomePage;

        test.beforeEach(async ({ page }) => {
            homePage = new HomePage(page);
            await homePage.navigateTo();
            await homePage.verifyElementsVisible([homePage.dashboard]);
        });

        test('Why Multibank option is clickable', async () => {
            const whyMultiBankPage = await homePage.clickWhyMultibank();
            await whyMultiBankPage.verifyAllComponents();
        });
    });
});
