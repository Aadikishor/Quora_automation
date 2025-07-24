export class PostActions {
  constructor(page) {
    this.page = page;
  }

  async addQuestion() {
    try {
        // Click the button to start adding a question
        await this.page.click('//*[@id="root"]/div/div[2]/div/div[2]/div/div[2]/div/div[4]/div/button/div/div/div'); // Adjust selector
       
        // Locate the question input field and wait until it's visible
        const questionInput = this.page.locator('//*[@id="root"]/div/div[2]/div/div/div/div/div[2]/div/div/div[2]/div[1]/div/div[1]/div/div/div/div[2]/div[2]/div/div/div[1]/div/div/textarea');
        await questionInput.waitFor({ state: 'visible' });

        // Log the current value of the question input field (if any)
        const currentValue = await questionInput.inputValue();
        console.log("Current question field value:", currentValue);

        // Clear the input field and type a new question with a slight delay between keystrokes
        await questionInput.evaluate(el => el.value = '');
        await questionInput.type('What are the latest trends in AI?', { delay: 50 });

        // Click the button to post the question
        await this.page.click('//*[@id="root"]/div/div[2]/div/div/div/div/div[2]/div/div/div[2]/div[2]/div/div[2]/button[2]/div/div/div'); // Adjust selector
        await this.page.waitForTimeout(4000); // Wait for the post to complete
        console.log(" Question added successfully.");

        // Try to close the post-question window if it's still open
        try {
            const windowLocator = this.page.locator('//*[@id="root"]/div/div[2]/div[2]/div/div/div/div[2]');
            const closeButtonLocator = this.page.locator('//*[@id="root"]/div/div[2]/div[2]/div/div/div/div[2]/div/div/div[1]/div[1]/button');
  
            // Check if the window is visible
            if (await windowLocator.isVisible()) {
                // Wait for the close button to appear and click it
                await closeButtonLocator.waitFor({ state: 'visible', timeout: 5000 });
                await closeButtonLocator.click({ force: true });
                console.log(" Closed the post-question window.");
            } else {
                console.log("Window not visible, no need to close.");
            }
        } catch (error) {
            // Handle any errors that occur while trying to close the window
            console.error("Failed to close the post-question window:", error);
        }
    } catch (error) {
        // Handle any errors that occur during the question posting process
        console.error("Failed to add question:", error);
    }
  }
}
























































// export class PostActions {
//     constructor(page) {
//       this.page = page;
//     }
  
//     async addQuestion() {
//       try {
//           await this.page.click('//*[@id="root"]/div/div[2]/div/div[2]/div/div[2]/div/div[4]/div/button/div/div/div'); // Adjust selector
         
//          const questionInput = this.page.locator('//*[@id="root"]/div/div[2]/div/div/div/div/div[2]/div/div/div[2]/div[1]/div/div[1]/div/div/div/div[2]/div[2]/div/div/div[1]/div/div/textarea');
//          await questionInput.waitFor({ state: 'visible' });

//      // Log current value
//         const currentValue = await questionInput.inputValue();
//         console.log("Current question field value:", currentValue);

//       // Clear and override the value
//          await questionInput.evaluate(el => el.value = '');
//          await questionInput.type('What are the latest trends in AI?', { delay: 50 });

//         await this.page.click('//*[@id="root"]/div/div[2]/div/div/div/div/div[2]/div/div/div[2]/div[2]/div/div[2]/button[2]/div/div/div'); // Adjust selector
//         await this.page.waitForTimeout(4000);
//         console.log(" Question added successfully.");


        
    
//        try
//         {
//          const windowLocator = this.page.locator('//*[@id="root"]/div/div[2]/div[2]/div/div/div/div[2]');
//          const closeButtonLocator = this.page.locator('//*[@id="root"]/div/div[2]/div[2]/div/div/div/div[2]/div/div/div[1]/div[1]/button');
    
//           if (await windowLocator.isVisible())
//              {
//               await closeButtonLocator.waitFor({ state: 'visible', timeout: 5000 });
//                await closeButtonLocator.click({ force: true });
//                console.log(" Closed the post-question window.");
//               } 
//           else 
//           {
//           console.log("Window not visible, no need to close.");
//           }
//         } 
//         catch (error) 
//          {
        
//           console.error("Failed to close the post-question window:", error);
//          }
//       }
    

//      catch (error)
//       {
//         console.error("Failed to add question:", error);
//       }
//     }
// }




















  
    // async addPost() {
    //   try {
    //     await this.page.click('text=Add Post'); // Adjust selector
    //     await this.page.fill('textarea[name="post_text"]', 'AI is transforming industries faster than ever.');
    //     await this.page.click('text=Post'); // Adjust selector
    //     console.log("📝 Post added successfully.");
    //   } catch (error) {
    //     console.error("Failed to add post:", error);
    //   }
    // }
  
  