import { expect } from "@playwright/test";

// This class handles the search functionality on Quora
export class Search
 {
     constructor(page)
      {
         this.page = page;
      }

  // This method performs a search for a given topic and returns the result details
  async search(topic)
   {
    // Locate the search box using its placeholder text
    const searchBox = this.page.getByPlaceholder("Search Quora");
    await expect(searchBox).toBeVisible(); // Make sure it's visible before interacting
    await searchBox.fill(topic); // Type the topic into the search box
    await this.page.waitForTimeout(2000); // Wait for suggestions to load

    // Define the selector for auto-suggestions
    const suggestionSelector = 'div[role="listbox"] div[role="option"]';
    const suggestions = this.page.locator(suggestionSelector);
    const suggestionCount = await suggestions.count(); // Count how many suggestions appeared

    // If suggestions are available, click the first one
    if (suggestionCount > 0) {
      await suggestions.nth(0).click();
      console.log(`Clicked first auto-suggestion for "${topic}".`);
    } else {
      console.log(`No suggestions found for "${topic}".`);
    }

    // Wait for the search result section to appear
    const resultDiv = '//*[@id="mainContent"]/div/div/div[1]/div/div[1]/div';
    await this.page.waitForSelector(resultDiv, { state: "visible" });
    await expect(this.page.locator(resultDiv)).toBeVisible();

    // Take a screenshot of the result page for reference
    const screenshotPath = `screenshots/${topic.replace(/\s+/g, "_")}_result.png`;
    await this.page.screenshot({ path: screenshotPath });

    // Try to apply the "Past Year" filter if it's visible
    const pastYearFilter = this.page.locator('text=Past Year');
    if (await pastYearFilter.isVisible()) {
      await pastYearFilter.click();
      console.log("Filtered by Past Year.");
      await this.page.waitForTimeout(2000); // Wait for filter to apply
    }

    // Try to upvote the first post if the upvote button is visible
    const upvoteButton = this.page.locator('[aria-label="Upvote"]').first();
    if (await upvoteButton.isVisible()) {
      await upvoteButton.click();
      console.log("Upvoted first post.");
      await this.page.waitForTimeout(1000); // Short wait after interaction
    }

    // Get the page title and check if it matches the topic
    const title = await this.page.title();
    const titleMatch = title.toLowerCase().includes(topic.toLowerCase());

    // Return a summary of the search result
    return {
      topic,
      title_match: titleMatch,
      screenshot_path: screenshotPath,
      timestamp: new Date().toISOString(),
      outcome: titleMatch ? "Success" : "Failure"
    };
  }
}






















































































































// import { expect } from "@playwright/test";

// export class Search {
//   constructor(page) {
//     this.page = page;
//   }

//   async search(topic) {
//     const searchBox = this.page.getByPlaceholder("Search Quora");
//     await expect(searchBox).toBeVisible();
//     await searchBox.fill(topic);
//     await this.page.waitForTimeout(2000);

//     const suggestionSelector = 'div[role="listbox"] div[role="option"]';
//     const suggestions = this.page.locator(suggestionSelector);
//     const suggestionCount = await suggestions.count();

//     if (suggestionCount > 0) {
//       await suggestions.nth(0).click();
//       console.log(`Clicked first auto-suggestion for "${topic}".`);
//     } else {
//       console.log(`No suggestions found for "${topic}".`);
//     }

//     const resultDiv = '//*[@id="mainContent"]/div/div/div[1]/div/div[1]/div';
//     await this.page.waitForSelector(resultDiv, { state: "visible" });
//     await expect(this.page.locator(resultDiv)).toBeVisible();

//     const screenshotPath = `screenshots/${topic.replace(/\s+/g, "_")}_result.png`;
//     await this.page.screenshot({ path: screenshotPath });

//     const pastYearFilter = this.page.locator('text=Past Year');
//     if (await pastYearFilter.isVisible()) {
//       await pastYearFilter.click();
//       console.log("🕒 Filtered by Past Year.");
//       await this.page.waitForTimeout(2000);
//     }

//     const upvoteButton = this.page.locator('[aria-label="Upvote"]').first();
//     if (await upvoteButton.isVisible()) {
//       await upvoteButton.click();
//       console.log("👍 Upvoted first post.");
//       await this.page.waitForTimeout(1000);
//     }

//     const title = await this.page.title();
//     const titleMatch = title.toLowerCase().includes(topic.toLowerCase());

//     return {
//       topic,
//       title_match: titleMatch,
//       screenshot_path: screenshotPath,
//       timestamp: new Date().toISOString(),
//       outcome: titleMatch ? "Success" : "Failure"
//     };
//   }
// }


























































































































// import {test,expect} from "@playwright/test";
// export class Search
//  {
//     constructor(page)
//     {
//         this.page=page;
//     }
//     async search()
//     {        
//         //    await this.page.waitForLoadState('networkidle');
//            //await this.page.waitForTimeout(2000);
           
//            await this.page.getByPlaceholder("Search Quora").waitFor({state:"visible"});
//            await this.page.getByPlaceholder("Search Quora").fill("Testing");
//            await this.page.waitForTimeout(2000);
//            const title=await this.page.title();
//            console.log(title);
//            const pagetitle="Testing";
           
//           if (title.toLowerCase().includes(pagetitle.toLowerCase())) 
//             {
//                console.log('Title matches the search topic.');
//             }
//           else
//             {
//               console.log('Title does not match the search topic.');
//             }

//             await this.page.waitForSelector('//*[@id="selector:1"]/div',{state:"visible"});
//             const myDiv = await this.page.locator('//*[@id="selector:1"]/div').count();
//             if(myDiv>0)
//             {
//                 await this.page.click('//*[@id="selector:1"]/div/div[1]');
//                 console.log("Clicked finally");
//             }
//             else{
//                 console.log("Nothing to show");
//             }

//             await this.page.waitForSelector('//*[@id="mainContent"]/div/div/div[1]/div/div[1]/div',{state:"visible"});
//             if(true)
//             {
//             await expect(this.page.locator('//*[@id="mainContent"]/div/div/div[1]/div/div[1]/div')).toBeVisible();
//             console.log("verified");
//             }

//             else{

//                 console.log("not verified");
//             }
//         }}
       





//...>>>>>>>>>>>>>>>>>>>>above  main module>>>>>>>>>>>>>>>>>>>>>>>>>>>>




// 



///..................................................................below commented....


// import { expect } from "@playwright/test";

// export class Search {
//   constructor(page) {
//     this.page = page;
//   }

//   async search() {
//     const topic = "Testing";

//     // Wait for and fill the search bar
//     const searchBox = this.page.getByPlaceholder("Search Quora");
//     await expect(searchBox).toBeVisible();
//     await searchBox.fill(topic);
//     await this.page.waitForTimeout(2000);

//     // Validate page title
//     const title = await this.page.title();
//     if (title.toLowerCase().includes(topic.toLowerCase())) {
//       console.log("Title matches the search topic.");
//     } else {
//       console.log("Title does not match the search topic.");
//     }

//     // Click the first suggestion if available
//     const suggestionDiv = '//*[@id="selector:1"]/div';
//     const count = await this.page.locator(suggestionDiv).count();

//     if (count > 0) {
//       await this.page.click('//*[@id="selector:1"]/div/div[1]');
//       console.log("Clicked first suggestion.");
//     } else {
//       console.log("No suggestions found.");
//     }

//     // Verify search results are visible
//     const resultDiv = '//*[@id="mainContent"]/div/div/div[1]/div/div[1]/div';
//     await this.page.waitForSelector(resultDiv, { state: "visible" });
//     await expect(this.page.locator(resultDiv)).toBeVisible();
//     console.log("Results for search are visible.");
//   }
// }



///json files...............



// import { expect } from "@playwright/test";

// export class Search {
//   constructor(page) {
//     this.page = page;
//   }

//   async search(topic) {
//     const searchBox = this.page.getByPlaceholder("Search Quora");
//     await expect(searchBox).toBeVisible();
//     await searchBox.fill(topic);
//     await this.page.waitForTimeout(2000);

//     const title = await this.page.title();
//     const titleMatch = title.toLowerCase().includes(topic.toLowerCase());

//     const suggestionDiv = '//*[@id="selector:1"]/div';
//     const count = await this.page.locator(suggestionDiv).count();

//     if (count > 0) {
//       await this.page.click('//*[@id="selector:1"]/div/div[1]');
//       console.log(`Clicked suggestion for "${topic}".`);
//     } else {
//       console.log(`No suggestions found for "${topic}".`);
//     }

//     const resultDiv = '//*[@id="mainContent"]/div/div/div[1]/div/div[1]/div';
//     await this.page.waitForSelector(resultDiv, { state: "visible" });
//     await expect(this.page.locator(resultDiv)).toBeVisible();

//     // Capture screenshot
//     const screenshotPath = `screenshots/${topic.replace(/\\s+/g, "_")}_result.png`;
//     await this.page.screenshot({ path: screenshotPath });

//     // Return result log entry
//     return {
//       topic,
//       title_match: titleMatch,
//       screenshot_path: screenshotPath,
//       timestamp: new Date().toISOString(),
//       outcome: titleMatch ? "Success" : "Failure"
//     };
//   }
// }



//.................................................................second json



// import { expect } from "@playwright/test";

// export class Search {
//   constructor(page) {
//     this.page = page;
//   }

//   async search(topic) {
//     const searchBox = this.page.getByPlaceholder("Search Quora");
//     await expect(searchBox).toBeVisible();
//     await searchBox.fill(topic);
//     await this.page.waitForTimeout(2000);

//     // Wait for auto-suggestions to appear
//     const suggestionSelector = 'div[role="listbox"] div[role="option"]';
//     const suggestions = this.page.locator(suggestionSelector);
//     const suggestionCount = await suggestions.count();

//     if (suggestionCount > 0) {
//       await suggestions.nth(0).click(); // Click the first suggestion
//       console.log(`Clicked first auto-suggestion for "${topic}".`);
//     } else {
//       console.log(`No suggestions found for "${topic}".`);
//     }

//     // Wait for search results to load
//     const resultDiv = '//*[@id="mainContent"]/div/div/div[1]/div/div[1]/div';
//     await this.page.waitForSelector(resultDiv, { state: "visible" });
//     await expect(this.page.locator(resultDiv)).toBeVisible();

//     // Capture screenshot
//     const screenshotPath = `screenshots/${topic.replace(/\s+/g, "_")}_result.png`;
//     await this.page.screenshot({ path: screenshotPath });

//     // Return result log entry
//     const title = await this.page.title();
//     const titleMatch = title.toLowerCase().includes(topic.toLowerCase());

//     return {
//       topic,
//       title_match: titleMatch,
//       screenshot_path: screenshotPath,
//       timestamp: new Date().toISOString(),
//       outcome: titleMatch ? "Success" : "Failure"
//     };
//   }
// }





//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>upvote below..............



// import { expect } from "@playwright/test";

// export class Search {
//   constructor(page) {
//     this.page = page;
//   }

//   async search(topic) {
//     const searchBox = this.page.getByPlaceholder("Search Quora");
//     await expect(searchBox).toBeVisible();
//     await searchBox.fill(topic);
//     await this.page.waitForTimeout(2000);

//     const suggestionSelector = 'div[role="listbox"] div[role="option"]';
//     const suggestions = this.page.locator(suggestionSelector);
//     const suggestionCount = await suggestions.count();

//     if (suggestionCount > 0) {
//       await suggestions.nth(0).click();
//       console.log(`Clicked first auto-suggestion for "${topic}".`);
//     } else {
//       console.log(`No suggestions found for "${topic}".`);
//     }

//     const resultDiv = '//*[@id="mainContent"]/div/div/div[1]/div/div[1]/div';
//     await this.page.waitForSelector(resultDiv, { state: "visible" });
//     await expect(this.page.locator(resultDiv)).toBeVisible();

//     const screenshotPath = `screenshots/${topic.replace(/\\s+/g, "_")}_result.png`;
//     await this.page.screenshot({ path: screenshotPath });

//     const pastYearFilter = this.page.locator('text=Past Year');
//     if (await pastYearFilter.isVisible()) {
//       await pastYearFilter.click();
//       console.log("🕒 Filtered by Past Year.");
//       await this.page.waitForTimeout(2000);
//     }

//     const upvoteButton = this.page.locator('[aria-label="Upvote"]').first();
//     if (await upvoteButton.isVisible()) {
//       await upvoteButton.click();
//       console.log("👍 Upvoted first post.");
//       await this.page.waitForTimeout(1000);
//     }


//     const title = await this.page.title();
//     const titleMatch = title.toLowerCase().includes(topic.toLowerCase());

//     return {
//       topic,
//       title_match: titleMatch,
//       screenshot_path: screenshotPath,
//       timestamp: new Date().toISOString(),
//       outcome: titleMatch ? "Success" : "Failure"
//     };
//   }
// }

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>post

// import { expect } from "@playwright/test";

// export class Search {
//   constructor(page) {
//     this.page = page;
//   }

//   async search(topic) {
//     const searchBox = this.page.getByPlaceholder("Search Quora");
//     await expect(searchBox).toBeVisible();
//     await searchBox.fill(topic);
//     await this.page.waitForTimeout(2000);

//     const suggestionSelector = 'div[role="listbox"] div[role="option"]';
//     const suggestions = this.page.locator(suggestionSelector);
//     const suggestionCount = await suggestions.count();

//     if (suggestionCount > 0) {
//       await suggestions.nth(0).click();
//       console.log(`Clicked first auto-suggestion for "${topic}".`);
//     } else {
//       console.log(`No suggestions found for "${topic}".`);
//     }

//     const resultDiv = '//*[@id="mainContent"]/div/div/div[1]/div/div[1]/div';
//     await this.page.waitForSelector(resultDiv, { state: "visible" });
//     await expect(this.page.locator(resultDiv)).toBeVisible();

//     const screenshotPath = `screenshots/${topic.replace(/\s+/g, "_")}_result.png`;
//     await this.page.screenshot({ path: screenshotPath });

//     const pastYearFilter = this.page.locator('text=Past Year');
//     if (await pastYearFilter.isVisible()) {
//       await pastYearFilter.click();
//       console.log("🕒 Filtered by Past Year.");
//       await this.page.waitForTimeout(2000);
//     }

//     const upvoteButton = this.page.locator('[aria-label="Upvote"]').first();
//     if (await upvoteButton.isVisible()) {
//       await upvoteButton.click();
//       console.log("👍 Upvoted first post.");
//       await this.page.waitForTimeout(1000);
//     }

//     const title = await this.page.title();
//     const titleMatch = title.toLowerCase().includes(topic.toLowerCase());

//     return {
//       topic,
//       title_match: titleMatch,
//       screenshot_path: screenshotPath,
//       timestamp: new Date().toISOString(),
//       outcome: titleMatch ? "Success" : "Failure"
//     };
//   }
// }































// import { expect } from "@playwright/test";

// export class Search {
//   constructor(page) {
//     this.page = page;
//   }

//   async search() {
//     try {
//       // Wait for search bar and enter topic
//       await this.page.getByPlaceholder("Search Quora").waitFor({ state: "visible" });
//       await this.page.getByPlaceholder("Search Quora").fill("Testing");
//       await this.page.waitForTimeout(2000);

//       // Verify page title
//       const title = await this.page.title();
//       const pagetitle = "Testing";
//       console.log(`🔍 Page title: ${title}`);

//       if (title.toLowerCase().includes(pagetitle.toLowerCase())) {
//         console.log("✅ Title matches the search topic.");
//       } else {
//         console.log("❌ Title does not match the search topic.");
//       }

//       // Wait for suggestions and click first one
//       await this.page.waitForSelector('//*[@id="selector:1"]/div', { state: "visible" });
//       const suggestionCount = await this.page.locator('//*[@id="selector:1"]/div').count();

//       if (suggestionCount > 0) {
//         await this.page.click('//*[@id="selector:1"]/div/div[1]');
//         console.log("✅ Clicked first suggestion.");
//       } else {
//         console.log("❌ No suggestions found.");
//         return;
//       }

//       // Verify "Results for testing" text
//       await this.page.waitForSelector('text=Results for testing', { timeout: 5000 });
//       console.log("✅ Verified: Results for testing");

//       // Verify main content is visible
//       const resultLocator = this.page.locator('//*[@id="mainContent"]/div/div/div[1]/div/div[1]/div');
//       await expect(resultLocator).toBeVisible();
//       console.log("✅ Search result verified.");

//     } catch (error) {
//       console.error("❌ Error during search flow:", error);
//     }
//   }
// }

       
       
       
       
       
       
       
       
       
       
       
            //    await this.page.waitForSelector('//*[@id="selector-option-0"]/div/div/div/div[2]/div/div/div/span[2]',{state:"visible"});
        //    await this.page.locator('//*[@id="selector-option-0"]/div/div/div/div[2]/div/div/div/span[2]').click();
        //    console.log("selected 1 ");
        //    await this.page.locator('//*[@id="mainContent"]/div/div/div[1]/div/div[1]/div').waitFor({state:"visible"})
        //    const Results=await this.page.locator('//*[@id="mainContent"]/div/div/div[1]/div/div[1]/div');
        //    await expect(Results).toContain("Results for Testing");     

    
    
