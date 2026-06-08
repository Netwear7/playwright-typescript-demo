import { Page, Locator } from '@playwright/test';

export class HomePage {
  private readonly page: Page;
  private readonly header: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = page.locator('h1');
  }

  async open() {
    await this.page.goto('http://uitestingplayground.com/home');
  }

  async getHeaderText() {
    return await this.header.textContent();
  }
}