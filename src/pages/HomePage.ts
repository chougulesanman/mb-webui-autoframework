import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { WhyMultiBankPage } from './WhyMultiBankPage';
import navTexts from '../../data/navigation.json';
import spotData from '../../data/spotSection.json';
import contentData from '../../data/contentValidation.json';

export class HomePage extends BasePage {
    //navigation
    readonly dashboard: Locator;
    readonly markets: Locator;
    readonly trade: Locator;
    readonly features: Locator;
    readonly aboutus: Locator;
    readonly support: Locator;
    readonly spot: Locator;

    //spot section
    readonly sectionTitle: Locator;
    readonly table: Locator;
    readonly showMoreButton: Locator;
    readonly favoriteTab: Locator;
    readonly allTab: Locator;
    readonly usdtTab: Locator;
    readonly btcTab: Locator;
    readonly fiatTab: Locator;
    readonly themesTab: Locator;
    readonly pairHeader: Locator;
    readonly priceHeader: Locator;
    readonly change24hHeader: Locator;
    readonly highHeader: Locator;
    readonly lowHeader: Locator;
    readonly last7DaysHeader: Locator;

    //content validation
    readonly downloadSectionTitle: Locator;
    // readonly appStoreLink: Locator;
    // readonly googlePlayLink: Locator;
    readonly bannerCarousel: Locator;

    //Why Multibank
    readonly whyMultibankOption: Locator;
    
    constructor(page: Page) {
        super(page);

        //navigation locators
        this.dashboard = this.page.getByRole('link', { name: navTexts.topMenu.dashboard, exact: true });
        this.markets = this.page.getByRole('link', { name: navTexts.topMenu.markets, exact: true });
        this.trade = this.page.locator(`#${navTexts.topMenu.trade_id}`);
        this.features = this.page.locator(`#${navTexts.topMenu.features_id}`);
        this.aboutus = this.page.locator(`#${navTexts.topMenu.aboutus_id}`);
        this.support = this.page.locator(`#${navTexts.topMenu.support_id}`);
        this.spot = this.page.getByRole('link').filter({ hasText: navTexts.topMenu.tradeDropdown.spot });

        //spot section locators
        this.sectionTitle = this.page.getByRole('button', { name: spotData.title, exact: true });
        this.table = this.page.locator('table').first();
        // this.showMoreButton = this.page.getByRole('button', { name: spotData.showMore });
        this.showMoreButton = this.page.getByText(spotData.showMore, { exact: true });
        this.favoriteTab = this.page.locator(`#${spotData.categories.favorites_id}`);
        this.allTab = this.page.locator(`#${spotData.categories.all_id}`);
        this.usdtTab = this.page.locator(`#${spotData.categories.usdt_id}`);
        this.btcTab = this.page.locator(`#${spotData.categories.btc_id}`);
        this.fiatTab = this.page.locator(`#${spotData.categories.fiat_id}`);
        this.themesTab = this.page.locator(`#${spotData.categories.themes_id}`);
        this.pairHeader = this.page.locator(`#${spotData.tableColumns.pair_id}`).first();
        this.priceHeader = this.page.locator(`#${spotData.tableColumns.price_id}`).first();
        this.change24hHeader = this.page.locator(`#${spotData.tableColumns.change24h_id}`).first();
        this.highHeader = this.page.locator(`#${spotData.tableColumns.high_id}`).first();
        this.lowHeader = this.page.locator(`#${spotData.tableColumns.low_id}`).first();
        this.last7DaysHeader = this.page.locator(`#${spotData.tableColumns.last7Days_id}`).first();

        //content validation locators
        this.downloadSectionTitle = this.page.getByRole('heading', { name: contentData.homepage.downloadSection.title });
        // this.appStoreLink = this.page.getByRole('link', { name: new RegExp(contentData.homepage.downloadSection.links[0].text) });
        // this.googlePlayLink = this.page.getByRole('link', { name: new RegExp(contentData.homepage.downloadSection.links[1].text) });
        this.bannerCarousel = this.page.locator('div.style_wrapper__ag9kn').filter({ has: this.page.getByText(contentData.homepage.marketingBanner.texts[0]) }).first();

        //Why Multibank locators
        this.whyMultibankOption = this.page.getByText(contentData.aboutUs.whyMultibank.menuText);
    
    }

    async navigateTo() {
        await this.navigate('/');
    }

    getAllMenuItems(): Locator[] {
        return [
            this.dashboard,
            this.markets,
            this.trade,
            this.features,
            this.aboutus,
            this.support
        ];
    }

    getCategoryTabs(): Locator[] {
        return [
            this.favoriteTab,
            this.allTab,
            this.usdtTab,
            this.btcTab,
            this.fiatTab,
            this.themesTab
        ];
    }

    getTableHeaders(): Locator[] {
        return [
            this.pairHeader,
            this.priceHeader,
            this.change24hHeader,
            this.highHeader,
            this.lowHeader,
            this.last7DaysHeader
        ];
    }

    getTableRows(): Locator {
        return this.table.locator('tbody tr');
    }

    async clickCategory(category: Locator) {
        await category.click();
    }

    async getRowCount(): Promise<number> {
        return await this.getTableRows().count();
    }

    async verifyMarketingBannersExist() {
        const bannerTexts = contentData.homepage.marketingBanner.texts;
        for (const text of bannerTexts) {
            const banner = this.bannerCarousel.getByText(text).first();
            await expect(banner).toBeVisible();
        }
    }

    getDownloadLink(text: string): Locator {
        return this.page.getByRole('link').filter({ hasText: text });
    }

    async openAboutUsMenu() {
        await this.aboutus.click();
    }

    async clickWhyMultibank() {
        await this.openAboutUsMenu();
        await this.verifyElementsVisible([this.whyMultibankOption]);
        await this.clickAndVerifyNavigation(this.whyMultibankOption, new RegExp(contentData.aboutUs.whyMultibank.urlContains));
        return new WhyMultiBankPage(this.page);
    }
}