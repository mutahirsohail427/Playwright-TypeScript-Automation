import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { CartUtils } from '../utils/CartUtils';

test.only('Complete checkout flow of vegetables', async ({ page }) => {
  const homePage = new HomePage(page);
  const cartUtils = new CartUtils(page);
  await homePage.navigateTo();
  const vegetablesToMatch = ['Cauliflower - 1 Kg', 'Capsicum', 'Cashews - 1 Kg', 'Carrot - 1 Kg'];
  await cartUtils.selectMatchingProducts(vegetablesToMatch);
  homePage.clickCartIcon();
  homePage.proceedtoCheck();
  await page.waitForSelector('.totAmt'); 
  const totalSum = await cartUtils.calculateTotalSum();
  const totalAmt = await cartUtils.getTotalAmount();   
  expect(totalSum).toBe(totalAmt);
  await page.click('text="Place Order"');
  await page.selectOption('select', { value: 'Pakistan' });
  await page.click('.chkAgree');
  await page.click('button');
  cartUtils.orderVerification();
});

