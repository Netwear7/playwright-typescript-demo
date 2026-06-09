import { Page, Locator, expect } from '@playwright/test';

/**
 * Page object for the text input playground.
 * Encapsulates navigation and button label interactions for the text input page.
 */
export class TextInputPage {
    private readonly page: Page;
    private readonly nameInput: Locator;
    private readonly actionButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.nameInput = page.getByRole('textbox', { name: 'Set New Button Name' });
        this.actionButton = page.locator("#updatingButton");
    }

    /**
     * Navigates to the text input playground page.
     */
    async goto(): Promise<void> {
        await this.page.goto('http://uitestingplayground.com/textinput');
    }

    /**
     * Sets the new button label text in the input field.
     *
     * @param name The text to set for the button label.
     */
    async setNewButtonName(name: string): Promise<void> {
        await this.nameInput.waitFor({ state: 'visible' });
        await this.nameInput.click();
        await this.nameInput.fill(name);
    }

    /**
     * Clicks the action button whose label is updated by the input.
     */
    async clickActionButton(): Promise<void> {
        await this.actionButton.waitFor({ state: 'visible' });
        await this.actionButton.click();
    }

    /**
     * Verifies that the action button contains the expected visible text.
     *
     * @param expectedText Expected text fragment inside the button label.
     */
    async expectActionButtonTextContains(expectedText: string): Promise<void> {
        await expect(this.actionButton).toContainText(expectedText);
    }
}
