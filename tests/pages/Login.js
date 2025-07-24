import fs from "fs";
import path from "path";
import { expect } from "@playwright/test";

export class Login {
  constructor(page) {
    this.page = page;
    this.emailField = "#email";
    this.passwordField = "#password";
    this.loginButton = this.page.getByRole("button", { name: "Login" });
  }

  async performLogin() {
    const credentialsPath = path.join(__dirname, "../userCredentials.json");
    const { email, password } = JSON.parse(fs.readFileSync(credentialsPath, "utf-8"));

    await this.page.goto("https://www.quora.com/");
    await expect(this.page.getByRole("button", { name: "Sign In" })).toBeVisible();
    await this.page.getByRole("button", { name: "Sign In" }).click();

    await this.page.locator(this.emailField).fill(email);
    await this.page.locator(this.passwordField).fill(password);
    await this.loginButton.click();

    await this.page.waitForTimeout(3000);
    console.log("✅ Logged in using stored credentials.");
  }
}
