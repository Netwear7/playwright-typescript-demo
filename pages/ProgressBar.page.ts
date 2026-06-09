import { Page, Locator, expect } from '@playwright/test';

/**
 * Page object for the progress bar playground.
 * Encapsulates navigation, interactions and assertions for the progress bar page.
 */
export class ProgressBarPage {
    private readonly page: Page;
    private readonly startButton: Locator;
    private readonly stopButton: Locator;
    private readonly title: Locator;
    private readonly progressBar: Locator;


    constructor(page: Page) {
        this.page = page;
        this.startButton = page.getByRole('button', { name: 'Start' });
        this.stopButton = page.getByRole('button', { name: 'Stop' });
        this.title = page.getByRole('heading', { name: 'Progress Bar' });
        this.progressBar = page.locator('div#progressBar.progress-bar[role="progressbar"]');
    }


    /**
     * Navigates to the progress bar playground page.
     */
    async goto(): Promise<void> {
        await this.page.goto('http://uitestingplayground.com/progressbar');
    }


    /**
     * Clicks the Start button to begin the progress animation.
     */
    async clickStartButton(): Promise<void> {
        await this.startButton.waitFor({ state: 'visible' });
        await this.startButton.click();
    }

    /**
     * Clicks the Stop button to halt the progress animation.
     */
    async clickStopButton(): Promise<void> {
        await this.stopButton.waitFor({ state: 'visible' });
        await this.stopButton.click();
    }


    /**
     * Verifies that the page title matches the expected text.
     *
     * @param expectedTitle Expected page title text.
     */
    async expectTitle(expectedTitle: string): Promise<void> {
        await expect(this.title).toHaveText(expectedTitle);
    }

    /**
     * Waits until the progress bar reaches or exceeds the expected numeric value.
     *
     * @param expectedValue Target progress value to wait for.
     */
    async waitForProgressBarToReachThreshold(expectedValue: number): Promise<void> {
        await expect.poll(async () => {
            return Number(await this.progressBar.getAttribute('aria-valuenow'));
        }, {
            timeout: 30000,
            message: `The progress bar must reach ${expectedValue}%`,
            intervals: [10]
        }).toBeGreaterThanOrEqual(expectedValue);
    }

    /**
     * Reads the current progress bar value from the aria-valuenow attribute.
     *
     * @returns Current progress value as a number.
     */
    async getProgressBarValue(): Promise<number> {
        const value = await this.progressBar.getAttribute('aria-valuenow');
        return Number(value);
    }

    /**
     * Verifies the progress bar value is within the allowed tolerance of the expected value.
     *
     * @param expectedValue Target progress value.
     * @param tolerance Maximum allowed deviation from the expected value.
     */
    async expectProgressBarCloseTo(expectedValue: number, tolerance = 2): Promise<void> {
        const actualValue = await this.getProgressBarValue();
        expect(Math.abs(actualValue - expectedValue)).toBeLessThan(tolerance);
    }
}