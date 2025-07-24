

export class Error 
{
  constructor(page)
   {
    this.page = page;

    // XPath selector for the specific error message shown when an invalid email is entered
    this.error = '//div[@class="q-text qu-dynamicFontSize--small qu-color--red_error"][normalize-space()="The email address you entered is not valid."]';
  }

  // This method captures a full-page screenshot when an error occurs
  async Error_Screenshot()
   {
    // Generate a timestamp to make the screenshot filename unique
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');

    // Create a filename using the timestamp
    const path = `error-${timestamp}.png`;

    // Take a full-page screenshot and save it with the generated filename
    await this.page.screenshot({ path, fullPage: true });

    // Log the screenshot path for reference
    console.log(`Error screenshot saved: ${path}`);
  }
}





























// export class Error {
//   constructor(page) {
//     this.page = page;
//     this.error = '//div[@class="q-text qu-dynamicFontSize--small qu-color--red_error"][normalize-space()="The email address you entered is not valid."]';
//   }

//   async Error_Screenshot() {
//     const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
//     const path = `error-${timestamp}.png`;

//     await this.page.screenshot({ path, fullPage: true });
//     console.log(`❌ Error screenshot saved: ${path}`);
//   }
// }









































































// export class Error
// {
//  constructor(page)
//  {
//     this.page=page;
//     this.error='//div[@class="q-text qu-dynamicFontSize--small qu-color--red_error"][normalize-space()="The email address you entered is not valid."]';

//  }
//  async Error_Screenshot(){
//          //await this.page.locator(this.error).screenshot({path:"./Assets/error.png"});

//          const timestamp = new Date().toISOString().replace(/[:.]/g, '-'); // Create a unique timestamp
//          const path = `error-${timestamp}.png`; // Name the screenshot file
//          await this.page.screenshot({ path, fullPage: true }); // Take a full-page screenshot
//          console.log(`❌ Error screenshot saved: ${path}`); // Log the file name

//  }
// }







// export class Error {
//         constructor(page) {
//           this.page = page;
//           this.error = '//div[@class="q-text qu-dynamicFontSize--small qu-color--red_error"][normalize-space()="The email address you entered is not valid."]';
//         }
      
//         async Error_Screenshot() {
//           const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
//           const path = `error-${timestamp}.png`;
      
//           await this.page.screenshot({ path, fullPage: true });
//           console.log(`❌ Error screenshot saved: ${path}`);
//         }
//       }
      