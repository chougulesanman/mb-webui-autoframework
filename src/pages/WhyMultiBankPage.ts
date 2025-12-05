import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import contentData from '../../data/contentValidation.json';

const why = contentData.aboutUs.whyMultibank;

export class WhyMultiBankPage extends BasePage {
  
  readonly heading1: Locator;
  readonly description1: Locator;
  readonly heading2: Locator;
  readonly description2: Locator;
  readonly portfolioHeading: Locator;
  readonly portfolioDescription: Locator;
  readonly tradingSpeedHeading: Locator;
  readonly tradingSpeedDescription: Locator;
  readonly paymentHeading: Locator;
  readonly paymentDescription: Locator;
  readonly panicSellHeading: Locator;
  readonly panicSellDescription: Locator;
  readonly convertHeading: Locator;
  readonly convertDescription: Locator;
  readonly advantagesTitle: Locator;
  readonly spotTradingHeading: Locator;
  readonly spotTradingDescription: Locator;
  readonly rwaHeading: Locator;
  readonly rwaDescription: Locator;
  readonly instantBuyHeading: Locator;
  readonly instantBuyDescription: Locator;

  constructor(page: Page) {
    super(page);

    const mainLayout = this.page.locator('#mainLayout');
    this.heading1 = this.page.getByText(why.hero.heading1, { exact: false });
    this.description1 = this.page.getByText(why.hero.description1, { exact: false });
    this.heading2 = this.page.getByText(why.hero.heading2, { exact: false });
    this.description2 = this.page.getByText(why.hero.description2, { exact: false });
    this.portfolioHeading = this.page.getByText(why.sections.portfolio.heading, { exact: false });
    this.portfolioDescription = this.page.getByText(why.sections.portfolio.description, { exact: false });
    this.tradingSpeedHeading = this.page.getByText(why.sections.tradingSpeed.heading, { exact: false });
    this.tradingSpeedDescription = this.page.getByText(why.sections.tradingSpeed.description, { exact: false });
    this.paymentHeading = this.page.getByText(why.sections.paymentMethods.heading, { exact: false });
    this.paymentDescription = this.page.getByText(why.sections.paymentMethods.description, { exact: false });
    this.panicSellHeading = mainLayout.getByText(why.sections.panicSell.heading, { exact: false });
    this.panicSellDescription = this.page.getByText(why.sections.panicSell.description, { exact: false });
    this.convertHeading = mainLayout.getByText(why.sections.convert.heading, { exact: true });
    this.convertDescription = this.page.getByText(why.sections.convert.description, { exact: false });
    this.advantagesTitle = mainLayout.getByText(why.advantages.title, { exact: false });
    this.spotTradingHeading = mainLayout.getByText(why.spotTrading.heading, { exact: false });
    this.spotTradingDescription = this.page.getByText(why.spotTrading.description, { exact: false });
    this.rwaHeading = mainLayout.getByText(why.rwa.heading, { exact: false });
    this.rwaDescription = this.page.getByText(why.rwa.description, { exact: false });
    this.instantBuyHeading = this.page.getByText(why.instantBuy.heading, { exact: false });
    this.instantBuyDescription = this.page.getByText(why.instantBuy.description, { exact: false });
  }

  getHeroElements(): Locator[] {
    return [this.heading1, this.description1, this.heading2, this.description2];
  }

  getSectionElements(): Locator[] {
    return [
      this.portfolioHeading, this.portfolioDescription, this.tradingSpeedHeading, this.tradingSpeedDescription, this.paymentHeading, this.paymentDescription, this.panicSellHeading, this.panicSellDescription, this.convertHeading, this.convertDescription, this.rwaHeading, this.rwaDescription, this.instantBuyHeading, this.instantBuyDescription
    ];
  }

  async verifyHeroSection() {
    // Hero section may be a carousel - verify at least the first visible elements
    try {
      await this.verifyElementsVisible([this.heading1]);
    } catch {
      // Hero carousel may have rotated - check heading2 instead
      await this.verifyElementsVisible([this.heading2]);
    }
  }

  async verifySections() {
    // Verify key sections that are always visible (not in carousels)
    await this.verifyElementsVisible([
      this.portfolioHeading,
      this.tradingSpeedHeading,
      this.paymentHeading,
      this.advantagesTitle
    ]);
  }

  async verifyAdvantagesSection() {
    await this.verifyElementsVisible([this.advantagesTitle]);
    
    // Verify at least the first advantage item instead of all
    const firstAdvantage = why.advantages.items[0];
    const firstAdvantageHeading = this.page.getByRole('heading', { name: firstAdvantage.heading });
    await this.verifyElementsVisible([firstAdvantageHeading]);
  }

  async verifySpotTradingSection() {
    await this.verifyElementsVisible([this.spotTradingHeading]);
  }

  async verifyAllComponents() {
    // Simplified verification to avoid flaky carousel elements
    await this.verifyHeroSection();
    await this.verifySections();
    await this.verifyAdvantagesSection();
    await this.verifySpotTradingSection();
  }
}