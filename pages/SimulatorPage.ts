export class SimulatorPage {
  constructor(private page) {}

  async openSimulator(name: string) {
    await this.page.locator('a').filter({ hasText: new RegExp(`^${name}$`) }).click();
  }

  async navigateTo(section: string) {
    await this.page.getByRole('link', { name: section }).click();
  }
}