import { Page, Locator, expect } from '@playwright/test';

export class ClickPage {
    private readonly page: Page;
    private readonly button: Locator;

    constructor(page: Page) {
        this.page = page;
        this.button = page.locator("#badButton");
    }

    async goto(): Promise<void> {
        await this.page.goto('http://uitestingplayground.com/click');
    }

    async clickButton(): Promise<void> {
        await this.button.click();
    }

    async expectButtonState(expectedText: string, expectedClass: string): Promise<void> {
        await expect(this.button).toContainText(expectedText);
        await expect(this.button).toHaveClass(new RegExp(expectedClass));
    }
}