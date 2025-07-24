import { expect } from "@playwright/test";
import fs from "fs";
import path from "path";
import { Error } from "./ErrorScreenshot";

// This class handles the signup/sign-in flow on the Quora profile page
export class Signup {
  constructor(page) {
    this.page = page;

    // Define all the UI elements we’ll interact with
    this.signin = this.page.getByRole("button", { name: "Sign In" });
    this.signup = "//div[normalize-space()='Sign up with email']";
    this.name = "#profile-name";
    this.email = "#email";
    this.next = this.page.getByRole("button", { name: "Next" });
    this.my = '//*[@id="root"]/div/div[2]/div[2]/div/div/div/div[2]/div/div[2]/div[2]/div/div/button/div/div/div';
    this.error = '//div[contains(text(),"The email address you entered is not valid.")]';
    this.password = '//*[@id="password"]';
  }

  // Navigates to the Quora profile page and checks if the page title is correct
  async goto() {
    await this.page.goto("https://www.quora.com/profile/Quora");
    await expect(this.page).toHaveTitle(/Quora/);
  }

  // Handles the full sign-in flow
  async SIgn_In() {
    try {
      // Make sure the "Sign In" button is visible and click it
      await expect(this.signin).toBeVisible();
      await this.signin.click();

      // Wait for the "Sign up with email" option and click it
      const signupOption = this.page.locator(this.signup);
      await expect(signupOption).toBeVisible();
      await signupOption.click();

      // Fill in user details
      const email = "niccot7622@allfreemail.net"; // intentionally invalid email for testing error handling
      const password = "Aadi8341058";

      await this.page.locator(this.name).fill("Aadi");
      await this.page.locator(this.email).fill(email);
      await this.page.waitForTimeout(2000); // short wait to allow validation to trigger

      // Check if an error message appears for invalid email
      const errVisible = await this.page.locator(this.error).isVisible();
      if (errVisible)
         {
        console.log("Invalid email error message is visible.");

        // Take a screenshot for debugging purposes
        const error = new Error(this.page);
        await error.Error_Screenshot();

        // Stop the flow since email is invalid
        return false;
      }

      // Proceed to the next step if no error
      await expect(this.next).toBeVisible();
      await this.next.click();

      // Wait for the next UI element and click it
      const nextStep = this.page.locator(this.my);
      await expect(nextStep).toBeVisible();
      await this.page.waitForTimeout(4000); // wait for UI to stabilize
      await nextStep.click();

      // Fill in the password field
      const passwordField = this.page.locator(this.password);
      await expect(passwordField).toBeVisible();
      await passwordField.fill(password);

      // Click the final button to complete sign-in
      const finalButton = this.page.locator('//*[@id="root"]/div/div[2]/div[3]/div/div/div/div[2]/div/div[2]/div[2]/div/div/button');
      await expect(finalButton).toBeVisible();
      await finalButton.click();

      // Save the credentials to a local file for reference or debugging
      const credentialsPath = path.join(__dirname, "userCredentials.json");
      fs.writeFileSync(credentialsPath, JSON.stringify({ email, password }, null, 2));

      console.log("Signup flow completed successfully.");
      return true;
    }
    
    catch (err)
     {
      // Catch any unexpected errors and log them
      console.error("Error during sign-in:", err);
      return false;
    }
  }
}














































































































// import { expect } from "@playwright/test";
// import fs from "fs";
// import path from "path";
// import { Error } from "./ErrorScreenshot";

// export class Signup {
//   constructor(page) {
//     this.page = page;
//     this.signin = this.page.getByRole("button", { name: "Sign In" });
//     this.signup = "//div[normalize-space()='Sign up with email']";
//     this.name = "#profile-name";
//     this.email = "#email";
//     this.next = this.page.getByRole("button", { name: "Next" });
//     this.my = '//*[@id="root"]/div/div[2]/div[2]/div/div/div/div[2]/div/div[2]/div[2]/div/div/button/div/div/div';
//     this.error = '//div[contains(text(),"The email address you entered is not valid.")]';
//     this.password = '//*[@id="password"]';
//   }

//   async goto() {
//     await this.page.goto("https://www.quora.com/profile/Quora");
//     await expect(this.page).toHaveTitle(/Quora/);
//   }

//   async SIgn_In() {
//     try {
//       await expect(this.signin).toBeVisible();
//       await this.signin.click();

//       const signupOption = this.page.locator(this.signup);
//       await expect(signupOption).toBeVisible();
//       await signupOption.click();

//       const email = "jarian.chaos@dsitip.comcls";
//       const password = "Aadi834105";

//       await this.page.locator(this.name).fill("Aadi");
//       await this.page.locator(this.email).fill(email);
//       await this.page.waitForTimeout(2000);

//       const errVisible = await this.page.locator(this.error).isVisible();
//       if (errVisible) {
//         console.log("Invalid email error message is visible.");
//         const error = new Error(this.page);
//         await error.Error_Screenshot();
//         return false;
//       }

//       await expect(this.next).toBeVisible();
//       await this.next.click();

//       const nextStep = this.page.locator(this.my);
//       await expect(nextStep).toBeVisible();
//       await this.page.waitForTimeout(4000);
//       await nextStep.click();

//       const passwordField = this.page.locator(this.password);
//       await expect(passwordField).toBeVisible();
//       await passwordField.fill(password);

//       const finalButton = this.page.locator('//*[@id="root"]/div/div[2]/div[3]/div/div/div/div[2]/div/div[2]/div[2]/div/div/button');
//       await expect(finalButton).toBeVisible();
//       await finalButton.click();

//       // Save credentials
//       const credentialsPath = path.join(__dirname, "userCredentials.json");
//       fs.writeFileSync(credentialsPath, JSON.stringify({ email, password }, null, 2));

//       console.log("Signup flow completed successfully.");
//       return true;
  //   } catch (err) {
  //     console.error("Error during sign-in:", err);
  //     return false;
  //   }
  // }
//}












































































































// import {Error} from "./ErrorScreenshot"
// import {expect} from '@playwright/test'
// export class Signup
// {
//    constructor (page)
//    {     this.page=page;
//          this.signin=this.page.getByRole("button",{name:"Sign In"})
//          this.signup="//div[normalize-space()='Sign up with email']"
//          this.name="#profile-name";
//          this.email="#email";
//          this.next=this.page.getByRole("button",{name:"Next"});
//          this.my = '//*[@id="root"]/div/div[2]/div[2]/div/div/div/div[2]/div/div[2]/div[2]/div/div/button/div/div/div';
//          //this.error='//div[@class="q-text qu-dynamicFontSize--small qu-color--red_error"][normalize-space()="The email address you entered is not valid."]'
//          this.error='//div[@class="q-text qu-dynamicFontSize--small qu-color--red_error"][normalize-space()="The email address you entered is not valid."]';
//          this.password='//input[@name="password"]';
//          this.pagetitle="Testing";

         

//    } 

//    async goto()
//    {
//        await this.page.goto("https://www.quora.com/profile/Quora");
//    }

//    async SIgn_In()
//    {
//         await this.signin.click();
//         await this.page.locator(this.signup).click();
//         await this.page.locator(this.name).fill("Aadi");
//         await this.page.locator(this.email).fill("tomaxa@cyclelove.cc")
//         await this.page.waitForTimeout(2000); 
//         const err=await this.page.locator(this.error).isVisible();

        

        
//         if(err)
//         {
//             const error=new Error(this.page);
//             await error.Error_Screenshot();
//         }
//         else{

//             //first click
//             await expect(this.next).toBeVisible();
//             await this.next.click();
//             // await expect(this.page.waitForSelector("this.next")).toBeVisible;
        


//             //second next
//             await this.page.waitForSelector(this.my, {state : "visible"});
//             await this.page.waitForTimeout(4000)
//             await this.page.locator(this.my).click();
            


//              //password fill
//             await this.page.waitForSelector('//*[@id="password"]',{state:"visible"});
//             console.log("Visble pass");


            


//         await this.page.waitForSelector('//*[@id="password"]',{state:"visible"});
//         await this.page.locator("//*[@id='password']").fill("Aa1234567");
//         await this.page.waitForSelector('//*[@id="root"]/div/div[2]/div[3]/div/div/div/div[2]/div/div[2]/div[2]/div/div/button',{state:"visible"});
        
       

//         //const[newPage]=await Promise.all([
//             //this.page.context().waitForEvent('page'),
//             //this.page.waitForNavigation({ waitUntil: 'load' }),
//             this.page.waitForSelector('//*[@id="root"]/div/div[2]/div[3]/div/div/div/div[2]/div/div[2]/div[2]/div/div/button',{state:"visible"}),
//             this.page.locator('//*[@id="root"]/div/div[2]/div[3]/div/div/div/div[2]/div/div[2]/div[2]/div/div/button').click()
             
//     }}
// }









//................................................................above main..................................


// 









//.................................................altered below.........................


// 



//.............................................login also added below........................


// import { expect } from "@playwright/test";
// import fs from "fs";
// import path from "path";
// import { Error } from "./ErrorScreenshot";

// export class Signup {
//   constructor(page) {
//     this.page = page;
//     this.signin = this.page.getByRole("button", { name: "Sign In" });
//     this.signup = "//div[normalize-space()='Sign up with email']";
//     this.name = "#profile-name";
//     this.email = "#email";
//     this.next = this.page.getByRole("button", { name: "Next" });
//     this.my = '//*[@id="root"]/div/div[2]/div[2]/div/div/div/div[2]/div/div[2]/div[2]/div/div/button/div/div/div';
//     this.error = '//div[contains(text(),"The email address you entered is not valid.")]';
//     this.password = '//*[@id="password"]';
//   }

//   async goto() {
//     await this.page.goto("https://www.quora.com/profile/Quora");
//     await expect(this.page).toHaveTitle(/Quora/);
//   }

//   async SIgn_In() {
//     try {
//       await expect(this.signin).toBeVisible();
//       await this.signin.click();

//       const signupOption = this.page.locator(this.signup);
//       await expect(signupOption).toBeVisible();
//       await signupOption.click();

//       const email = "gula.puig@allfreemail.net";
//       const password = "Aa1234567";

//       await this.page.locator(this.name).fill("Aadi");
//       await this.page.locator(this.email).fill(email);
//       await this.page.waitForTimeout(2000);

//       const errVisible = await this.page.locator(this.error).isVisible();
//       if (errVisible) {
//         console.log("Invalid email error message is visible.");
//         const error = new Error(this.page);
//         await error.Error_Screenshot();
//         return false;
//       }

//       await expect(this.next).toBeVisible();
//       await this.next.click();

//       const nextStep = this.page.locator(this.my);
//       await expect(nextStep).toBeVisible();
//       await this.page.waitForTimeout(4000);
//       await nextStep.click();

//       const passwordField = this.page.locator(this.password);
//       await expect(passwordField).toBeVisible();
//       await passwordField.fill(password);

//       const finalButton = this.page.locator('//*[@id="root"]/div/div[2]/div[3]/div/div/div/div[2]/div/div[2]/div[2]/div/div/button');
//       await expect(finalButton).toBeVisible();
//       await finalButton.click();

//       // Save credentials
//       const credentialsPath = path.join(__dirname, "userCredentials.json");
//       fs.writeFileSync(credentialsPath, JSON.stringify({ email, password }, null, 2));

//       console.log("Signup flow completed successfully.");
//       return true;
//     } catch (err) {
//       console.error("Error during sign-in:", err);
//       return false;
//     }
//   }
// }



//.................................................logout
// import { expect } from "@playwright/test";
// import fs from "fs";
// import path from "path";
// import { Error } from "./ErrorScreenshot";

// export class Signup {
//   constructor(page) {
//     this.page = page;
//     this.signin = this.page.getByRole("button", { name: "Sign In" });
//     this.signup = "//div[normalize-space()='Sign up with email']";
//     this.name = "#profile-name";
//     this.email = "#email";
//     this.next = this.page.getByRole("button", { name: "Next" });
//     this.my = '//*[@id="root"]/div/div[2]/div[2]/div/div/div/div[2]/div/div[2]/div[2]/div/div/button/div/div/div';
//     this.error = '//div[contains(text(),"The email address you entered is not valid.")]';
//     this.password = '//*[@id="password"]';
//     this.finalButton = '//*[@id="root"]/div/div[2]/div[3]/div/div/div/div[2]/div/div[2]/div[2]/div/div/button';
//     this.profileMenu = '[aria-label="Profile"]';
//     this.logoutButton = 'text=Log Out';
//   }

//   async goto() {
//     await this.page.goto("https://www.quora.com/profile/Quora");
//     await expect(this.page).toHaveTitle(/Quora/);
//   }

//   async SIgn_In() {
//     try {
//       await expect(this.signin).toBeVisible();
//       await this.signin.click();

//       const signupOption = this.page.locator(this.signup);
//       await expect(signupOption).toBeVisible();
//       await signupOption.click();

//       const email = "lykoryru@cyclelove.cc";
//       const password = "Aa1234567";

//       await this.page.locator(this.name).fill("Aadi");
//       await this.page.locator(this.email).fill(email);
//       await this.page.waitForTimeout(2000);

//       const errVisible = await this.page.locator(this.error).isVisible();
//       if (errVisible) {
//         console.log("Invalid email error message is visible.");
//         const error = new Error(this.page);
//         await error.Error_Screenshot();
//         return false;
//       }

//       await expect(this.next).toBeVisible();
//       await this.next.click();

//       const nextStep = this.page.locator(this.my);
//       await expect(nextStep).toBeVisible();
//       await this.page.waitForTimeout(4000);
//       await nextStep.click();

//       const passwordField = this.page.locator(this.password);
//       await expect(passwordField).toBeVisible();
//       await passwordField.fill(password);

//       const finalButton = this.page.locator(this.finalButton);
//       await expect(finalButton).toBeVisible();
//       await finalButton.click();

//       // Save credentials
//       const credentialsPath = path.join(__dirname, "../userCredentials.json");
//       fs.writeFileSync(credentialsPath, JSON.stringify({ email, password }, null, 2));

//       console.log("✅ Signup flow completed successfully.");

//       // ✅ Logout after signup
//       await this.page.waitForTimeout(3000);
//       const profileIcon = this.page.locator(this.profileMenu);
//       await expect(profileIcon).toBeVisible();
//       await profileIcon.click();

//       const logout = this.page.locator(this.logoutButton);
//       await expect(logout).toBeVisible();
//       await logout.click();

//       console.log("🔓 Logged out after signup.");
//       return true;

//     } catch (err) {
//       console.error("Error during sign-in:", err);
//       return false;
//     }
//   }
// }































// import { expect } from '@playwright/test';
// import { Error } from './ErrorScreenshot';

// export class Signup {
//   constructor(page) {
//     this.page = page;
//     this.signin = this.page.getByRole("button", { name: "Sign In" });
//     this.signup = "//div[normalize-space()='Sign up with email']";
//     this.name = "#profile-name";
//     this.email = "#email";
//     this.next = this.page.getByRole("button", { name: "Next" });
//     this.my = '//*[@id="root"]/div/div[2]/div[2]/div/div/div/div[2]/div/div[2]/div[2]/div/div/button/div/div/div';
//     this.error = '//div[contains(text(),"email address you entered is not valid")]';
//     this.password = '//*[@id="password"]';
//   }

//   async goto() {
//     await this.page.goto("https://www.quora.com/profile/Quora");
//   }

//   async SIgn_In() {
//     try {
//       // Step 1: Click Sign In and Sign up with email
//       await this.signin.click();
//       await this.page.locator(this.signup).click();

//       // Step 2: Verify "Next" button is disabled before input
//       await expect(this.next).toBeDisabled();

//       // Step 3: Fill name and invalid email
//       await this.page.locator(this.name).fill("Aadi");
//       await this.page.locator(this.email).fill("jelerare@cyclelove.cc");
//       await this.page.waitForTimeout(2000);

//       // Step 4: Check for error message
//       const errorVisible = await this.page.locator(this.error).isVisible();
//       if (errorVisible) {
//         const error = new Error(this.page);
//         await error.Error_Screenshot();
//         console.log("❌ Invalid email error captured.");
//         return null;
//       }

//       // Step 5: Proceed if no error
//       await expect(this.next).toBeVisible();
//       await this.next.click();

//       // Step 6: Click next button after email
//       await this.page.waitForSelector(this.my, { state: "visible" });
//       await this.page.waitForTimeout(4000);
//       await this.page.locator(this.my).click();

//       // Step 7: Fill password
//       await this.page.waitForSelector(this.password, { state: "visible" });
//       await this.page.locator(this.password).fill("Aa1234567");

//       // Step 8: Wait for final button and handle new tab
//       const finalButton = '//*[@id="root"]/div/div[2]/div[3]/div/div/div/div[2]/div/div[2]/div[2]/div/div/button';
//       await this.page.waitForSelector(finalButton, { state: "visible" });

//       const [newPage] = await Promise.all([
//         this.page.context().waitForEvent("page"),
//         this.page.locator(finalButton).click()
//       ]);

//       console.log("✅ New page opened after signup.");
//       return newPage;

//     } catch (err) {
//       console.error("❌ Error during signup flow:", err);
//       return null;
//     }
//   }
// }



//......................................json


















        //finish button
        // await this.page.waitForSelector('//*[@id="root"]/div/div[2]/div[3]/div/div/div/div[2]/div/div[2]/div[2]/div/div/button',{state:"visible"})
        // await this.page.locator('//*[@id="root"]/div/div[2]/div[3]/div/div/div/div[2]/div/div[2]/div[2]/div/div/button').click()

    

    //     async search()
    //     {
    //         await this.page.locator('//input[@role="combobox"]').waitFor([state="visible"]);
    //        this.page.locator('//input[@role="combobox"]').fill("Testing");
    //        this.page.waitForTimeout(2000);
    //        const title=this.page.title();
           
    //    if (title.toLowerCase().includes(this.pagetitle.toLowerCase())) 
    //     {
    //     console.log('Title matches the search topic.');
    //       }
    //    else {
    //     console.log('Title does not match the search topic.');
    //       }
    
    //        this.page.locator('//div[@class="q-text qu-dynamicFontSize--regular"]/span[2]').waitFor([state="visible"])
    //        this.page.locator('//div[@class="q-text qu-dynamicFontSize--regular"]/span[2]').click();
    //        this.page.locator('//*[@id="mainContent"]/div/div/div[1]/div/div[1]/div').waitFor([state="visible"])
    //        const Results=this.page.locator('//*[@id="mainContent"]/div/div/div[1]/div/div[1]/div');
    //        expect(Results).toContain("Results for Testing");
           

    //     }
    // }
    




// import { expect } from '@playwright/test';
// import { Error } from './ErrorScreenshot';

// export class Signup {
//   constructor(page) {
//     this.page = page;

//     // Locators
//     this.signin = this.page.getByRole('button', { name: 'Sign In' });
//     this.signup = this.page.locator("//div[normalize-space()='Sign up with email']");
//     this.name = this.page.locator('#profile-name');
//     this.email = this.page.locator('#email');
//     this.password = this.page.locator('//input[@name="password"]');
//     this.next = this.page.getByRole('button', { name: 'Next' });
//     this.otpContinueBtn = this.page.locator(
//       '//*[@id="root"]/div/div[2]/div[2]/div/div/div/div[2]/div/div[2]/div[2]/div/div/button'
//     );
//     this.finishBtn = this.page.locator(
//       '//*[@id="root"]/div/div[2]/div[3]/div/div/div/div[2]/div/div[2]/div[2]/div/div/button'
//     );
//     this.emailError = this.page.locator(
//       '//div[@class="q-text qu-dynamicFontSize--small qu-color--red_error"][normalize-space()="The email address you entered is not valid."]'
//     );
//   }

//   async goto() {
//     await this.page.goto('https://www.quora.com/profile/Quora');
//   }

//   async SIgn_In() {
//     // Step 1: Start signup
//     await this.signin.click();
//     await this.signup.click();

//     await this.name.fill('Aadi');
//     await this.email.fill('aadikishore.8341@gmail.com');
//     await this.page.waitForTimeout(2000);

//     const hasError = await this.emailError.isVisible();
//     if (hasError) {
//       const errorHandler = new Error(this.page);
//       await errorHandler.Error_Screenshot();
//       return;
//     }

//     // Step 2: Click "Next"
//     await expect(this.next).toBeEnabled();
//     await this.next.click();

//     // Step 3: OTP page – wait and pause for manual input
//     await expect(this.otpContinueBtn).toBeVisible({ timeout: 6000 });
//     console.log('⏸️ Pausing for OTP entry. Please enter OTP in the browser...');
//     await this.page.pause(); // Enter OTP manually

//     // Step 4: Click after entering OTP
//     await this.otpContinueBtn.click();

//     // Step 5: Fill Password
//     await this.password.waitFor({ state: 'visible', timeout: 10000 });
//     await this.password.fill('Aa123456');

//     // Step 6: Final "Next" button after password
//     await expect(this.next).toBeEnabled({ timeout: 10000 });
//     await this.next.click();

//     // Step 7: Click "Finish"
//     await expect(this.finishBtn).toBeVisible({ timeout: 10000 });
//     await this.finishBtn.click();

//     console.log('✅ Signup flow completed.');
//   }
// }