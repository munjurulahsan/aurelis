const puppeteer = require("puppeteer-core");
(async () => {
  const browser = await puppeteer.launch({
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    headless: "new",
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1536, height: 950 });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle0" });
  await new Promise(r => setTimeout(r, 500));

  // scroll to just before philosophy to trigger entrance, wait for reveal to progress
  await page.evaluate(() => window.scrollTo(0, 700));
  await new Promise(r => setTimeout(r, 200));
  await page.screenshot({ path: `${__dirname}/../shots/phil-entering.png` });

  await page.evaluate(() => window.scrollTo(0, 950));
  await new Promise(r => setTimeout(r, 1800));
  await page.screenshot({ path: `${__dirname}/../shots/phil-revealed.png` });

  // move mouse over image area to test parallax
  await page.mouse.move(1150, 500, { steps: 10 });
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: `${__dirname}/../shots/phil-mouse-right.png` });

  await page.mouse.move(850, 300, { steps: 10 });
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: `${__dirname}/../shots/phil-mouse-left.png` });

  await browser.close();
})();
