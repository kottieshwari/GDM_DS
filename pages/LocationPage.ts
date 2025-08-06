import {  Page } from "@playwright/test";

export class LocationPage {
    constructor(private page: Page) { }



    async createLocation(locationId: string, startDate: string) {
        await this.page.locator('.p-tabview-title:has-text("Location")').click();
        await this.page.getByRole('button', { name: 'New' }).click();
        await this.page.locator('span:has-text("Entity ID")').locator('#float-input').fill(locationId);
        await this.page.locator('span:has-text("Entity Organization")').locator('#float-input').fill('US Energy Co.');
        await this.page.getByRole('combobox', { name: 'Entity TimeZone' }).click();
        await this.page.getByRole('searchbox').fill('UTC');
        await this.page.getByRole('option', { name: 'Etc/UTC' }).click();

        const startDateInput = this.page.locator('.p-element.ng-tns-c1685646730-18.p-inputtext.p-component.ng-star-inserted');
        await startDateInput.click();
        await startDateInput.press('Control+A');
        await startDateInput.press('Backspace');
        await startDateInput.type(startDate);
        await startDateInput.press('Enter');

        await this.page.getByRole('combobox', { name: 'Commercial' }).click();
        await this.page.getByRole('option', { name: 'Residential' }).click();
        await this.page.getByRole('button', { name: 'Save' }).click();
    }
}



// export class LocationPage {
//   newButton: any;
//     locationTab: any;
//     entityIdInput: any;
//     entityOrgInput: any;
//     timeZoneCombo: any;
//     timeZoneSearch: any;
//     timeZoneOption: any;
//     startDateInput: any;
//     commercialCombo: any;
//     residentialOption: any;
//     saveButton: any;
//     page: any;
    
//   constructor(page: Page) {
//     this.page = page;

//     this.locationTab = page.getByRole('tab', { name: 'Location' });
//     this.newButton = page.getByRole('button', { name: 'New' });
//     //this.entityIdInput = page.getByLabel('Entity ID');

//     // this.entityIdInput=page.locator('span:has-text("Entity ID")').locator('#float-input')
//     // this.entityOrgInput = page.getByLabel('Entity Organization');

//     this.entityIdInput = page.locator('label:has-text("Entity ID")').locator('..').locator('input');
// this.entityOrgInput = page.locator('label:has-text("Entity Organization")').locator('..').locator('input');

//     this.timeZoneCombo = page.getByRole('combobox', { name: 'Entity TimeZone' });
//     this.timeZoneSearch = page.getByRole('searchbox');
//     this.timeZoneOption = page.getByRole('option', { name: 'Etc/UTC' });
//     this.startDateInput = page.locator('.p-element.ng-tns-c1685646730-18.p-inputtext.p-component.ng-star-inserted') // adjust if needed
//     this.commercialCombo = page.getByRole('combobox', { name: 'Commercial' });
//     this.residentialOption = page.getByRole('option', { name: 'Residential' });
//     this.saveButton = page.getByRole('button', { name: 'Save' });
//   }

//   async createLocation(locationId: string, startDate: string) {
//     await this.locationTab.click();
//     await this.newButton.click();
// await expect(this.entityIdInput).toHaveValue(locationId);
// await expect(this.entityOrgInput).toHaveValue('US Energy Co.');
//     await this.timeZoneCombo.click();
//     await this.timeZoneSearch.fill('UTC');
//     await this.timeZoneOption.click();

//     await this.startDateInput.click();
//     await this.startDateInput.press('Control+A');
//     await this.startDateInput.press('Backspace');
//     await this.startDateInput.type(startDate);
//      await this.startDateInput.press('Enter');
//     await this.commercialCombo.click();
//     await this.residentialOption.click();

//     await this.saveButton.click();
//   }
// }
