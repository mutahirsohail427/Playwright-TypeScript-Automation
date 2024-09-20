import { Page } from 'playwright';
import { test, expect } from '@playwright/test';

export class CartUtils {
  private page: Page;

  constructor(page: Page) {
    this.page = page;  // Assign the page instance to the class
  }

  // Function to select matching products
  async selectMatchingProducts(vegetablesToMatch: string[]) {
    const products = await this.page.$$('.products > .product');
    for (const product of products) {
      const title = await product.$eval('h4.product-name', (el: Element) => el.textContent?.trim());
      if (title && vegetablesToMatch.includes(title)) {
        await product.$eval('button', (btn: Element) => (btn as HTMLButtonElement).click());
      }
      console.log(`Product title: ${title}`);
    }
  }

  // Function to calculate the total sum from the price cells
  async calculateTotalSum() {
    const priceCells = await this.page.$$eval('tr td:nth-child(4)', cells => 
      cells.slice(1).map(cell => cell.textContent || '0')
    );
    const totalSum = priceCells.reduce((sum, price) => sum + parseFloat(price.replace(/[^0-9.-]+/g, '')), 0);
    return totalSum;
  }

  // Function to get the total amounts displayed on the page
  async getTotalAmount() {
    const totalAmt = await this.page.$eval('.totAmt', el => el.textContent?.trim());
    return Number(totalAmt);  // Convert to number here if needed
  }

  async orderVerification() {
    const elementText = await this.page.textContent('[style="color:green;font-size:25px"]');
    expect(elementText).toContain('Thank you, your order has been placed successfully');
  }
}
