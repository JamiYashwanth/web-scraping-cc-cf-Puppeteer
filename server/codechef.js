const { people } = require('./people')
const puppeteer = require('puppeteer');

async function info(username,id){
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const url=`https://www.codechef.com/users/${username}`;
  await page.setDefaultNavigationTimeout(0); 
  await page.goto(url);
  const rating = await page.evaluate(
      () => document.querySelector("body > main > div > div > div > aside > div.widget.pl0.pr0.widget-rating > div > div.rating-header.text-center > div.rating-number").textContent
    );
  const name = await page.evaluate(
      () => document.querySelector("body > main > div > div > div > div > div > header > h1").textContent
  )
  const highestRating = await page.evaluate(
      () => document.querySelector("body > main > div > div > div > aside > div.widget.pl0.pr0.widget-rating > div > div.rating-header.text-center > small").textContent
  );
   const stars = await page.evaluate(
      () => document.querySelector("body > main > div > div > div > div > div > section.user-details > ul > li:nth-child(1) > span > span.rating").textContent
  );
  const longChallenge = await page.evaluate(
      () => document.querySelector("#hp-sidebar-blurbRating > div > table > tbody > tr:nth-child(1) > td:nth-child(2)").textContent
  );
  const cookoff = await page.evaluate(
      () => document.querySelector("#hp-sidebar-blurbRating > div > table > tbody > tr:nth-child(2) > td:nth-child(2)").textContent
  );
  const lunchtime = await page.evaluate(
      () => document.querySelector("#hp-sidebar-blurbRating > div > table > tbody > tr:nth-child(3) > td:nth-child(2)").textContent
  );
  const user = people.findIndex(x => x.id === id)
  const information = {
      name ,rating , highestRating , url , longChallenge , cookoff , lunchtime , stars
  }
  people[user].codechef=information;
  await browser.close();
}

for (const link of people){
    info(link.codechef_username,link.id);
}
