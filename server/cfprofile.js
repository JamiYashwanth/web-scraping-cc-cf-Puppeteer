const router = require('express').Router()
const puppeteer = require('puppeteer');

async function info(username,id){
    const puppeteer = require('puppeteer');
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
    const information = {
        name ,rating , highestRating , url , level , problemsSolved
    }
    return information;
}

router.get('/info/codeforces/:id' , async (req,res) => {
    const username = req.params.id;
    const data = await info(username,0);
    console.log('data = ',data);
    res.send(data);
    console.log(req.params['id'])
})

module.exports = router;