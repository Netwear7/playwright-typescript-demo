import { test, expect } from '@playwright/test';
import { ProgressBarPage } from '../../pages/ProgressBar.page';

test('stop progress bar close to 75%', async ({ page }) => {
  const progressBarPage = new ProgressBarPage(page);
  await progressBarPage.goto();
  await progressBarPage.expectTitle('Progress Bar');

  await progressBarPage.clickStartButton();
  await progressBarPage.waitForProgressBarToReachThreshold(75);
  await progressBarPage.clickStopButton();

  await progressBarPage.expectProgressBarCloseTo(75);
});