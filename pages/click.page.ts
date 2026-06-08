import { Page, Locator, expect } from '@playwright/test';

/**
 * Page object for the click playground page.
 *
 * This page hosts a button that ignores synthetic DOM click events in some
 * browsers. The page object encapsulates the navigation, click behavior, and
 * state assertions needed to test the special WebKit behavior.
 */
export class ClickPage {
    private readonly page: Page;
    private readonly button: Locator;

    constructor(page: Page) {
        this.page = page;
        this.button = page.locator("#badButton");
    }

    /**
     * Navigates to the click playground page.
     */
    async goto(): Promise<void> {
        await this.page.goto('http://uitestingplayground.com/click');
    }

    /**
     * Clicks the badButton on the click playground page.
     *
     * For WebKit, the page is designed to ignore synthetic DOM click events,
     * so we dispatch a click event with explicit screen coordinates.
     * For other browsers, a normal Playwright locator click is sufficient.
     *
     * @param browserName Optional browser name from Playwright fixtures.
     */
    async clickButton(browserName?: string): Promise<void> {
        await this.button.waitFor({ state: 'visible' });

        if (browserName === 'webkit') {
            await this.button.scrollIntoViewIfNeeded();
            const box = await this.button.boundingBox();
            if (!box) {
                throw new Error('Unable to compute button position for physical click');
            }
            const x = Math.round(box.x + box.width / 2);
            const y = Math.round(box.y + box.height / 2);
            await this.page.evaluate(({ x, y }) => {
                const button = document.getElementById('badButton');
                if (!button) {
                    throw new Error('Unable to find badButton element');
                }
                const mouseEvent = new MouseEvent('click', {
                    cancelable: true,
                    screenX: x,
                    screenY: y,
                    button: 0,
                });
                button.dispatchEvent(mouseEvent);
            }, { x, y });
        } else {
            await this.button.click();
        }
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
}