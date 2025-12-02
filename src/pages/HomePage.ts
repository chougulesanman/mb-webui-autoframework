import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import navTexts from '../../data/navigation.json';

export class HomePage extends BasePage {
    readonly dashboard: Locator;
    readonly markets: Locator;
    readonly trade: Locator;
    readonly features: Locator;
    readonly aboutus: Locator;
    readonly support: Locator;
    readonly spot: Locator;
    
    constructor(page: Page) {
        super(page);

        this.dashboard = this.page.getByRole('link', { name: navTexts.topMenu.dashboard, exact: true });
        this.markets = this.page.getByRole('link', { name: navTexts.topMenu.markets, exact: true });
        
        /* this.trade = this.page.getByText(navTexts.topMenu.trade, { exact: true }).first();
        this.features = this.page.getByText(navTexts.topMenu.features, { exact: true }).first();
        this.aboutus = this.page.getByText(navTexts.topMenu.aboutus, { exact: true }).first();
        this.support = this.page.getByText(navTexts.topMenu.support, { exact: true }).first();
        */

        this.trade = this.page.locator(`#${navTexts.topMenu.trade_id}`);
        this.features = this.page.locator(`#${navTexts.topMenu.features_id}`);
        this.aboutus = this.page.locator(`#${navTexts.topMenu.aboutus_id}`);
        this.support = this.page.locator(`#${navTexts.topMenu.support_id}`);
        
        this.spot = this.page.getByRole('link').filter({ hasText: navTexts.topMenu.tradeDropdown.spot });
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
}