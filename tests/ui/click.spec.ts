import { test } from '@playwright/test';
import { ClickPage } from '../../pages/click.page';

// This page ignores event-based click actions, so we use a physical mouse click
// emulation to make the scenario work in WebKit as well.
test('basic click test', async ({ page, browserName }) => {
    const clickPage = new ClickPage(page);
    await clickPage.goto();
    await clickPage.expectTitle('Click');
    await test.step('Verify button state before click', async () => {
        await clickPage.expectButtonState('Button That Ignores DOM Click Event', "btn-primary");
    });
    await clickPage.clickButton(browserName);
    await test.step('Verify button state after click', async () => {
        await clickPage.expectButtonState('Button That Ignores DOM Click Event', "btn-success");
    }); 
});