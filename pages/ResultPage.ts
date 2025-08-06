import { Page, expect } from '@playwright/test';

export class ResultPage {
  constructor(private page: Page) {}

  async searchDevice(locationId: string) {
    const timeoutMs = 60000;
        const retryInterval = 3000;
        const startTime = Date.now();

        let found = false;

        while (Date.now() - startTime < timeoutMs) {
          console.log(`🔁 Searching for device: ${locationId}`);


          await this.page.getByRole('textbox', { name: 'Search' }).fill(locationId);
          await this.page.getByRole('textbox', { name: 'Search' }).press('Enter');


          const searchResultsHeading = this.page.locator('.heading').filter({ hasText: 'Search Results For' });
          try {
            await searchResultsHeading.waitFor({ state: 'visible', timeout: 3000 });
            await searchResultsHeading.waitFor({ state: 'detached', timeout: 10000 });
          } catch {
            console.log(' No search result page. Proceeding...');
          }

          const spans = this.page.locator('mat-expansion-panel-header span');
          const count = await spans.count();

          for (let i = 0; i < count; i++) {
            const text = await spans.nth(i).textContent();
            if (text?.trim() === `Location Details : ${locationId}`) {
              console.log(`Found location detail span: ${text.trim()}`);
              found = true;
              break;
            }
          }

          if (found) break;

          console.log(`Not found yet. Retrying...`);
          await this.page.waitForTimeout(retryInterval);
        }

        if (!found) {
          throw new Error(`Location Details : ${locationId} not found within ${timeoutMs / 1000} seconds`);
        }
  }
}
