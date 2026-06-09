import { Page, Locator, expect } from '@playwright/test';

/**
 * Page object for the dynamic ID page.
 * This page hosts a button with a dynamic ID that changes on each page load. 
 * The page object encapsulates the navigation, click behavior, and state assertions needed to test the button using stable locators based on role and name.
 */
export class DynamicIdPage {
    private readonly page: Page;
    private readonly button: Locator;
    private readonly title: Locator;

    constructor(page: Page) {
        this.page = page;
        this.button = page.getByRole('button', { name: 'Button with Dynamic ID' });
        this.title = page.getByRole('heading', { name: 'Dynamic ID' });
    }

    /**
     * Navigates to the click playground page.
     */
    async goto(): Promise<void> {
        await this.page.goto('http://uitestingplayground.com/dynamicid');
    }

    /**
     * Clicks the dynamic-ID button on the Dynamic ID playground page.
     */
    async clickButton(): Promise<void> {
        await this.button.waitFor({ state: 'visible' });
        await this.button.click();
    }

    /**
     * Verifies that the button has the expected text and CSS class.
     *
     * @param expectedText Expected button label text.
     * @param expectedClass Expected CSS class name substring.
     */
    async expectButtonState(expectedText: string, expectedClass: string): Promise<void> {
        await expect(this.button).toContainText(expectedText);
        await expect(this.button).toHaveClass(new RegExp(expectedClass));
    }

    /**
     * Verifies that the page title matches the expected text.
     *
     * @param expectedTitle Expected page title text.
     */
    async expectTitle(expectedTitle: string): Promise<void> {
        await expect(this.title).toHaveText(expectedTitle);
    }
}