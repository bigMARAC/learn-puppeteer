const puppeteer = require('puppeteer');

(async () => {
  const options = {
    width: 1280,
    height: 720
  }
  const browser = await puppeteer.launch({ headless: false, args: [`--window-size=${options.width},${options.height}`]  })
  const page = await browser.newPage()
  await page.goto('https://twitter.com/bigmarac/followers')
  await page.setViewport({
    width: options.width,
    height: options.height
  });
  
  await page.waitForSelector('.css-1dbjc4n')

  await page.evaluate(() => {
    var input = document.querySelector('input.gLFyf.gsfi')
    var search = document.querySelector('input.gNO89b')
    input.setAttribute('value', 'pato careca')
    search.click()
  })


  await page.screenshot({ path: './images/pato-careca.png' })
  await browser.close()
})();