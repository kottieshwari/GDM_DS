import { Page, expect} from '@playwright/test';


export class HesSimulatorPage {
  constructor(private page: Page) {}

  async generateReads(deviceId: string, startDate: string) {
    await this.page.locator('a').filter({ hasText: /^HES Simulator$/ }).click();
    await this.page.getByRole('link', { name: ' Reads' }).click();
    await this.page.getByRole('button', { name: 'Generate Reads' , exact: true}).click();
    await this.page.getByRole('textbox', { name: 'AMI Meter Number ' }).fill(deviceId);
    await this.page.locator('div').filter({ hasText: /^Use Profile as absolute$/ }).locator('div').nth(2).click();

       const startReDateInput = this.page.locator('div[role="dialog"] input[role="combobox"]').nth(0);
        await expect(startReDateInput).toBeVisible({ timeout: 10000 });
        await startReDateInput.click();
        await startReDateInput.press('Control+A');
        await startReDateInput.press('Backspace');
        await startReDateInput.type(startDate);
        await startReDateInput.press('Enter');

        await this.page.locator('div:nth-child(6) > .p-element.ng-untouched > .p-checkbox > .p-checkbox-box').click();
        await this.page.getByRole('combobox', { name: 'Select Profile Group' }).click();
        await this.page.getByText('All-profile').click();
        await this.page.locator("div.p-multiselect-label.p-placeholder").nth(1).click();
        await expect(this.page.locator("div[role='checkbox'][aria-label='All items unselected']")).toBeVisible();
        await this.page.locator("div[role='checkbox'][aria-label='All items unselected']").click();
        await this.page.getByRole('combobox', { name: 'Select Message Format' }).click();
        await this.page.getByRole('option', { name: 'gdm' }).click();
        await this.page.locator('span').filter({ hasText: 'Read Source' }).locator('#float-input').fill('MDM');
        await this.page.locator('div').filter({ hasText: /^Apply Random Factor$/ }).locator('div').nth(2).click();
        await this.page.getByRole('button', { name: 'Save' }).click();

        await expect(this.page.locator('div.p-toast-message-text', { hasText: 'Request Processed Successfully.' })).toBeVisible({ timeout: 5000 });
  }
}
