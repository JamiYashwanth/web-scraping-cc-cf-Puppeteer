const { people } = require('./people')
const puppeteer = require('puppeteer');

async function info(username,id){
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const url=`https://codeforces.com/profile/${username}`;
  await page.setDefaultNavigationTimeout(0); 
  await page.goto(url);
  const rating = await page.evaluate(
      () => document.querySelector("#pageContent > div:nth-child(3) > div.userbox > div.info > ul > li:nth-child(1) > span.user-green").textContent
    );
  const name = await page.evaluate(
      () => document.querySelector("#pageContent > div:nth-child(3) > div.userbox > div.info > div > h1 > a").textContent
  )
  const highestRating = await page.evaluate(
      () => document.querySelector("#pageContent > div:nth-child(3) > div.userbox > div.info > ul > li:nth-child(1) > span.smaller > span:nth-child(2)").textContent
  );
  const level = await page.evaluate(
      () => document.querySelector("#pageContent > div:nth-child(3) > div.userbox > div.info > div > div.user-rank > span").textContent
  );
  const problemsSolved = await page.evaluate(
      () => document.querySelector("#pageContent > div._UserActivityFrame_frame > div > div._UserActivityFrame_footer > div:nth-child(1) > div:nth-child(1) > div._UserActivityFrame_counterValue").textContent
  );
  const user = people.findIndex(x => x.id === id)
  const information = {
      name ,rating , highestRating , url , level , problemsSolved
  }
  people[user].codeforces=information;
  await browser.close();
}

for (const link of people){
    info(link.codeforces_username,link.id);
}