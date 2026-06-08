import { test } from '@playwright/test';
import { ClickPage } from '../../pages/click.page';

test('basic click test', async ({ page }) => {
    const clickPage = new ClickPage(page);
    await clickPage.goto();
    await clickPage.expectButtonState('Button That Ignores DOM Click Event', "btn-primary");
    await clickPage.clickButton();
    await clickPage.expectButtonState('Button That Ignores DOM Click Event', "btn-success"); // Vérifie que le texte et la couleur du bouton ont changé
});