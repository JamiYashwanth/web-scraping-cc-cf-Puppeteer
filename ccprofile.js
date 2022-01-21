const router = require('express').Router()
const puppeteer = require('puppeteer');

async function info(username,id){
    const puppeteer = require('puppeteer');
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
    const information = {
        name ,rating , highestRating , url , longChallenge , cookoff , lunchtime , stars
    }
    console.log(information)
    return information;
}

router.get('/info/codechef/:id' , async (req,res) => {
    const username = req.params.id;
    const data = await info(username,0);
    console.log('data = ',data);
    res.send(data);
    console.log(req.params['id'])
})

module.exports = router;