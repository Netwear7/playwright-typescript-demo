import { test, expect } from '@playwright/test';
import { DynamicIdPage } from '../../pages/dynamicId.page';

test('dynamic ID button', async ({ page }) => {
  const dynamicIdPage = new DynamicIdPage(page);
  await dynamicIdPage.goto();
  await test.step('Verify page title is correct', async () => {
    await dynamicIdPage.expectTitle('Dynamic ID');
  });
  await test.step('Verify button with dynamic ID is visible and has correct text', async () => {
    await dynamicIdPage.expectButtonState('Button with Dynamic ID', 'btn-primary');
  });
  await test.step('Click the button with dynamic ID', async () => {
    await dynamicIdPage.clickButton();
  });
});