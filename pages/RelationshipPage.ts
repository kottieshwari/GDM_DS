import { Page } from '@playwright/test';

export class RelationshipPage {
    constructor(private page: Page) { }

    async createDeviceLocationRelation(relationId: string, deviceId: string, locationId: string, startDate: string) {
        await this.page.getByRole('tab', { name: 'Relationship' }).click();
        await this.page.getByRole('button', { name: 'New' }).click();
        await this.page.getByRole('button', { name: 'dropdown trigger' }).click();
        await this.page.getByText('Device -> Location').click();
        await this.page.locator('#relationshipId').fill(relationId);
        await this.page.getByLabel('Organization ID').fill('US Energy Co.');
        await this.page.getByLabel('device ID').fill(deviceId);
        await this.page.getByLabel('location ID').fill(locationId);
        await this.page.locator('span[role="combobox"][aria-label="Status"]').click();
        await this.page.locator('ul[role="listbox"] li[role="option"]:has-text("Active")').first().click();

        const startRDateInput = this.page.locator('#startDate input[type="text"][role="combobox"]');
        await startRDateInput.click();
        await startRDateInput.press('Control+A');
        await startRDateInput.press('Backspace');
        await startRDateInput.type(startDate);
        await startRDateInput.press('Enter');
        await this.page.getByRole('button', { name: 'Save' }).click();
    }

    async createRegisterGroupRelation(registerId: string, deviceId: string, startDate: string) {
        await this.page.getByRole('button', { name: 'New' }).click();
        await this.page.getByRole('button', { name: 'dropdown trigger' }).click();
        await this.page.getByText('Register Group -> Device').click();
        await this.page.locator('#relationshipId').fill(registerId);
        await this.page.getByLabel('Organization ID').fill('US Energy Co.');
        await this.page.getByLabel('device ID').fill(deviceId);
        await this.page.getByLabel('register_group ID').fill('AllReg');
        await this.page.locator('span[role="combobox"][aria-label="Status"]').click();
        await this.page.locator('ul[role="listbox"] li[role="option"]:has-text("Active")').first().click();

        const startRDDateInput = this.page.locator('#startDate input[type="text"][role="combobox"]');
        await startRDDateInput.click();
        await startRDDateInput.press('Control+A');
        await startRDDateInput.press('Backspace');
        await startRDDateInput.type(startDate);
        await startRDDateInput.press('Enter');
        await this.page.getByRole('button', { name: 'Save' }).click();
    }
}
