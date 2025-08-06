import { Page } from '@playwright/test';

export class DevicePage {
  constructor(private page: Page) {}

  async createDevice(deviceId: string, startDate: string) {
    await this.page.locator('.p-tabview-title:has-text("Device")').click();
    await this.page.getByRole('button', { name: 'New' }).click();
    await this.page.locator('span:has-text("Entity ID")').locator('#float-input').fill(deviceId);
    await this.page.locator('span:has-text("Entity Organization")').locator('#float-input').fill('US Energy Co.');
    await this.page.getByRole('combobox', { name: 'Entity TimeZone' }).click();
    await this.page.getByRole('searchbox').fill('UTC');
    await this.page.getByRole('option', { name: 'Etc/UTC' }).click();

    const startDevDateInput = this.page.locator('span', { hasText: 'Start Date' }).locator('input[role="combobox"]');
           await startDevDateInput.click();
           await startDevDateInput.press('Control+A');
           await startDevDateInput.press('Backspace');
           await startDevDateInput.type(startDate);
           await startDevDateInput.press('Enter');

    await this.page.getByRole('combobox', { name: 'Device Type' }).click();
    await this.page.getByRole('option', { name: 'Electric' }).click();
    await this.page.getByRole('button', { name: 'Save' }).click();
  }
}
