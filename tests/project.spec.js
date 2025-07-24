
import { test, chromium } from "@playwright/test";
import { Signup } from "./Signup";
import { Search } from "./pages/search";
import fs from "fs";
import path from "path";
import { PostActions } from "./PostActions";

// Reading the list of topics from a JSON file so we can run the same test with different inputs
const topicsPath = path.join(__dirname, "searchTopics.json");
const searchTopics = JSON.parse(fs.readFileSync(topicsPath, "utf-8")).topics;
const resultsLog = [];
test('kishore',async()=>{
  console.log("kishore");
})


// Main test for  user signing in, performing searches, and interacting with the page
test("Data-Driven Search Test", async () => {
 // Launching the browser in headed mode 

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    // Starting the signup flow
    const signup = new Signup(page);
    await signup.goto();
    const signedIn = await signup.SIgn_In();

    // If sign-in fails or the page closes unexpectedly, we skip the rest of the test
    if (!signedIn || page.isClosed()) {
      console.log("Signup failed or page closed. Skipping search.");
      return;
    }

    // Now we loop through each topic and perform a search, collecting the results
    const searchbar = new Search(page);
    for (const topic of searchTopics) {
      const result = await searchbar.search(topic);
      resultsLog.push(result);
    }

    // Saving all the search results to a file so we can review them later
    const logPath = path.join(__dirname, "searchResultsLog.json");
    fs.writeFileSync(logPath, JSON.stringify({ results: resultsLog }, null, 2));
    console.log("Results saved to searchResultsLog.json");
    test.setTimeout(120000);



    // Giving the page a moment to settle before doing any further actions
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    // If the page is still open, we try to perform a post-action (like adding a question)
    if (!page.isClosed())
       {
         const postActions = new PostActions(page);
         try {
                 await postActions.addQuestion();
             } 
         catch (err)
          {
                 console.error("Failed to add question:", err);
          }
       }
     else 
     {
         console.warn("Page was closed before post actions.");
     }

  }
  // Catching any unexpected errors so the test doesn’t crash silently 
  catch (error)
   {
    console.error("Test failed:", error);
    } 
  // close the browser at the end to clean up resources
  finally
   {
    // Always close the browser at the end to clean up resources
    await browser.close()
  }

  page.selectOption({index:1})
  page.frame({url:"gdh"}).locator(".cvv").fill()
});











































































































// import { test, chromium } from "@playwright/test";
// import { Signup } from "./Signup";
// import { Search } from "./pages/search";
// import fs from "fs";
// import path from "path";
// import { PostActions } from "./PostActions";

// const topicsPath = path.join(__dirname, "searchTopics.json");
// const searchTopics = JSON.parse(fs.readFileSync(topicsPath, "utf-8")).topics;
// const resultsLog = [];

// test("Data-Driven Search Test", async () => {
//   const browser = await chromium.launch({ headless: false });
//   const context = await browser.newContext();
//   const page = await context.newPage();
//   test.setTimeout(120000);
//   try {
//     const signup = new Signup(page);
//     await signup.goto();
//     const signedIn = await signup.SIgn_In();

//     if (!signedIn || page.isClosed()) {
//       console.log("Signup failed or page closed. Skipping search.");
//       return;
//     }

//     const searchbar = new Search(page);
//     for (const topic of searchTopics) {
//       const result = await searchbar.search(topic);
//       resultsLog.push(result);
//     }

//     const logPath = path.join(__dirname, "searchResultsLog.json");
//     fs.writeFileSync(logPath, JSON.stringify({ results: resultsLog }, null, 2));
//     console.log("Results saved to searchResultsLog.json");

//     //Wait for page to stabilize before post actions
//     await page.waitForLoadState('networkidle');
//     await page.waitForTimeout(2000);

//     //  Check if page is still open before executing post actions
//     if (!page.isClosed()) {
//       const postActions = new PostActions(page);
//       try {
//         await postActions.addQuestion();
//       } catch (err) {
//         console.error("Failed to add question:", err);
//       }

//     } else {
//       console.warn(" Page was closed before post actions.");
//     }

//   } catch (error) {
//     console.error("Test failed:", error);
//   } finally {
//     await browser.close();
//   }
// });








































































































































// Problem Statement:  

// Automate the search in quora and verify the results.  

// Suggested site: https://www.quora.com/profile/Quora

// Detailed Description:     
//Launch //the browser and open the quora site using the given URL 
//  Search for the Topic “Testing” 
// Select the first option that appears in the search suggestion  
// Verify if the text “Results for testing” is displayed in the result page
// Click on “sign In” link
// In the prompt, click on “Sign up with email” link
// Verify if the “Sign Up” button is disabled
// Enter an invalid mail In Email field (ex: abc@abc)
// Verify and capture the respective error message shown
// Close the Browser 
//  Key Automation Scope:  

// Do the automation for more than one Browser 
// Handle the Exceptions 
// Verify if the title matches with the search topic 
// Handle multiple windows
// Capture screen

// import {test,expect,chromium} from  "@playwright/test"
// import {Signup} from "./Signup"
// import {Search} from "./pages/search"

// test("Mini",async()=>
//     {

//         const browser=await chromium.launch({headless:false});
//         const context=await browser.newContext();
//         const page=await context.newPage();
        

//         const signup=new Signup(page);
//         await signup.goto();
//         await signup.SIgn_In();
//         const Searchbar=new Search(page);
//         await Searchbar.search();

  
    


// })



//..................................above mainModule......



// import { test, expect, chromium, firefox, webkit } from "@playwright/test";
// import { Signup } from "./Signup";
// import { Search } from "./pages/search";

// const browsers = [chromium]// firefox, webkit];

// for (const browserType of browsers) {
//   test(`Mini Test on ${browserType.name()}`, async () => {
//     const browser = await browserType.launch({ headless: false });
//     const context = await browser.newContext();
//     const page = await context.newPage();

//     try {
//       const signup = new Signup(page);
//       await signup.goto();
//       const signedIn = await signup.SIgn_In();

//       if (!signedIn) {
//         console.log(`Signup failed on ${browserType.name()}, skipping search.`);
//         return;
//       }

//       if (page.isClosed()) {
//         console.log(`Page closed unexpectedly on ${browserType.name()}`);
//         return;
//       }

//       const searchbar = new Search(page);
//       await searchbar.search();
//     } catch (error) {
//       console.error(`Test failed on ${browserType.name()}:`, error);
//     } finally {
//       await browser.close();
//     }
//   });
// }

//.................................................comments below//////////




// 

//......................adding json below


// import { test, chromium } from "@playwright/test";
// import { Signup } from "./Signup";
// import { Search } from "./pages/search";
// import fs from "fs";
// import path from "path";

// // Load topics from JSON
// const topicsPath = path.join(__dirname, "searchTopics.json");
// const searchTopics = JSON.parse(fs.readFileSync(topicsPath, "utf-8")).topics;

// // Initialize log array
// const resultsLog = [];

// test("Data-Driven Search Test", async () => {
//   const browser = await chromium.launch({ headless: false });
//   const context = await browser.newContext();
//   const page = await context.newPage();

//   try {
//     const signup = new Signup(page);
//     await signup.goto();
//     const signedIn = await signup.SIgn_In();

//     if (!signedIn || page.isClosed()) {
//       console.log("Signup failed or page closed. Skipping search.");
//       return;
//     }

//     const searchbar = new Search(page);

//     for (const topic of searchTopics) {
//       const result = await searchbar.search(topic);
//       resultsLog.push(result);
//     }

//     // Save results to JSON log
//     const logPath = path.join(__dirname, "searchResultsLog.json");
//     fs.writeFileSync(logPath, JSON.stringify({ results: resultsLog }, null, 2));
//     console.log("✅ Results saved to searchResultsLog.json");

//   } catch (error) {
//     console.error("Test failed:", error);
//   } finally {
//     await browser.close();
//   }
// });




///>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>upvote
// import { test, chromium } from "@playwright/test";
// import { Signup } from "./Signup";
// import { Search } from "./pages/search";
// import fs from "fs";
// import path from "path";
// import { PostActions } from "./PostActions";

// const topicsPath = path.join(__dirname, "searchTopics.json");
// const searchTopics = JSON.parse(fs.readFileSync(topicsPath, "utf-8")).topics;
// const resultsLog = [];

// test("Data-Driven Search Test", async () => {
//   const browser = await chromium.launch({ headless: false });
//   const context = await browser.newContext();
//   const page = await context.newPage();

//   try {
//     const signup = new Signup(page);
//     await signup.goto();
//     const signedIn = await signup.SIgn_In();

//     if (!signedIn || page.isClosed()) {
//       console.log("Signup failed or page closed. Skipping search.");
//       return;
//     }

//     const searchbar = new Search(page);
//     for (const topic of searchTopics) {
//       const result = await searchbar.search(topic);
//       resultsLog.push(result);
//     }

//     const logPath = path.join(__dirname, "searchResultsLog.json");
//     fs.writeFileSync(logPath, JSON.stringify({ results: resultsLog }, null, 2));
//     console.log("✅ Results saved to searchResultsLog.json");

//     const postActions = new PostActions(page);
//      await postActions.addQuestion();
//      await postActions.addPost();


//   } catch (error) {
//     console.error("Test failed:", error);
//   } finally {
//     await browser.close();
//   }
// });


//.............................................................................................................................




// import { test, chromium } from "@playwright/test";
// import { Signup } from "./Signup";
// import { Search } from "./pages/search";
// import fs from "fs";
// import path from "path";
// import { PostActions } from "./PostActions";

// // ⏱ Increase test timeout to 2 minutes
// test.setTimeout(120000);

// const topicsPath = path.join(__dirname, "searchTopics.json");
// const searchTopics = JSON.parse(fs.readFileSync(topicsPath, "utf-8")).topics;
// const resultsLog = [];

// test("Data-Driven Search Test", async () => {
//   const browser = await chromium.launch({ headless: false });
//   const context = await browser.newContext();
//   const page = await context.newPage();

//   try {
//     const signup = new Signup(page);
//     await signup.goto();
//     const signedIn = await signup.SIgn_In();

//     if (!signedIn || page.isClosed()) {
//       console.log("Signup failed or page closed. Skipping search.");
//       return;
//     }

//     const searchbar = new Search(page);
//     for (const topic of searchTopics) {
//       const result = await searchbar.search(topic);
//       resultsLog.push(result);
//     }

//     const logPath = path.join(__dirname, "searchResultsLog.json");
//     fs.writeFileSync(logPath, JSON.stringify({ results: resultsLog }, null, 2));
//     console.log("✅ Results saved to searchResultsLog.json");

//     // ✅ Wait for page to stabilize before post actions
//     await page.waitForLoadState('networkidle');
//     await page.waitForTimeout(2000);

//     // ✅ Check if page is still open before executing post actions
//     if (!page.isClosed()) {
//       const postActions = new PostActions(page);
//       try {
//         await postActions.addQuestion();
//       } catch (err) {
//         console.error("Failed to add question:", err);
//       }

//       // try {
//       //   await postActions.addPost();
//       // } catch (err) {
//       //   console.error("Failed to add post:", err);
//       //}
//     } else {
//       console.warn("🚫 Page was closed before post actions.");
//     }

//   } catch (error) {
//     console.error("Test failed:", error);
//   } finally {
//     await browser.close();
//   }
// });



































// import { test, expect, chromium } from "@playwright/test";
// import { Signup } from "./Signup";
// import { Search } from "./pages/search";

// test("Mini - Quora Search and Signup Flow", async () => {
//   const browser = await chromium.launch({ headless: false });
//   const context = await browser.newContext();
//   const page = await context.newPage();

//   try {
//     const signup = new Signup(page);
//     await signup.goto();

//     // Perform Sign In and handle new tab
//     const newPage = await signup.SIgn_In();
//     if (!newPage) {
//       console.error("❌ Sign-up failed or error encountered.");
//       return;
//     }

//     // Perform search on the new page
//     const searchbar = new Search(newPage);
//     await searchbar.search();

//   } catch (error) {
//     console.error("❌ Test failed with error:", error);
//   } finally {
//     await browser.close();
//   }
// });









// test(":dnckwd",async()=>{
// const browser = await chromium.launch();
// const context  = await browser.launch();
// const quoraPage = await context.newPage();
// const mailPage = await context.newPage();

// await quoraPage.goto("https://www.quora.com/profile/Quora")
// await quoraPage.click("email ")
// await mailPage.goto('https://temporarymail.com/en/');
// const myLatestEmail = klvj;
// quoraPage.fill('kfhf',myLatestEmail);

// });