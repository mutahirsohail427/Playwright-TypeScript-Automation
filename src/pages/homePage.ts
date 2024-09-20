import { Page } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly cartIconSelector: string;
  readonly proceed: string;
  readonly totalAmount: string;

  constructor(page: Page) {
    this.page = page;
    this.cartIconSelector = '.cart-icon > img';
    this.proceed = '.cart-preview > .action-block > button';
    this.totalAmount = '.totAmt';
  }

  async navigateTo() {
    await this.page.goto('https://rahulshettyacademy.com/seleniumPractise/#/');
    await this.page.waitForSelector('.search-keyword');
    await this.page.fill('.search-keyword','C')
    await this.page.waitForTimeout(3000)
    
  }

  async getTitleText() {
    return this.page.title();
  }

  async clickCartIcon(){
    await this.page.click(this.cartIconSelector);  // Perform the click
    return this;
  }

  async proceedtoCheck(){
    await this.page.click(this.proceed);  // Perform the click
    return this;
  }

  async totalItemAmount(){
    const text = await this.page.textContent(this.totalAmount);  // Perform the click
    return text;
  }
}
