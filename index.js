const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const options = {
    width: 1920,
    height: 1080
  }
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto('https://www.amazon.com.br/gp/goldbox')
  
  await page.waitForSelector('.DealItem-module__dealItem_1ALQj-8DFdBjwNoMaYwM4P')

  const lista = await page.evaluate(() => {
    const nodeList = document.querySelectorAll('.DealCard-module__card_1u9yKYV4EIA-fL4ibeMVIU')
    const itensArray = [...nodeList]
    const list = itensArray.map(div => ({
      name: div.children[4].textContent,
      price: div.children[3].children[0].children[0].firstChild.textContent,
      url: div.children[6].children[1].children[0].children[0].children[0].href,
      src: div.children[0].children[0].children[0].children[0].src
    }))
    console.log(list)
    return list
  })

  var date = new Date()
  var month = date.getUTCMonth() + 1
  var day = date.getUTCDate()
  const dateString = `${month}-${day}`

  fs.writeFile(`./files/amazon-${dateString}.json`, JSON.stringify(lista, null, 2), err => {
    if(err) throw new Error('deu pau')

    console.log('deu bom')
  })

  await page.screenshot({ path: './images/amazon.jpg' })
  await browser.close()
})();