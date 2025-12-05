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
            await homePage.scrollToElement(homePage.bannerCarousel);
            await homePage.verifyElementsVisible([homePage.bannerCarousel]);
        });

        test('Marketing banner contains expected content', async ({}) => {
            await homePage.scrollToElement(homePage.bannerCarousel);
            await homePage.verifyElementsVisible([homePage.bannerCarousel]);
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
