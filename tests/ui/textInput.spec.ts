import { test } from '@playwright/test';
import { TextInputPage } from '../../pages/textInput.page';

test('text input updates button label', async ({ page }) => {
  const textInputPage = new TextInputPage(page);

  await textInputPage.goto();
  await textInputPage.setNewButtonName('New name');
  await textInputPage.expectActionButtonTextContains("Button That Should Change it's Name Based on Input Value");
  await textInputPage.clickActionButton();
  await textInputPage.expectActionButtonTextContains('New name');
});