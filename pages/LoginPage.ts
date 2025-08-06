export class LoginPage {
  constructor(private page) {}

  async login(username: string, password: string) {
    await this.page.getByRole('textbox', { name: 'Username or email' }).fill(username);
    await this.page.getByRole('textbox', { name: 'Password' }).fill(password);
    await this.page.getByRole('button', { name: 'Sign In' }).click();
  }
}