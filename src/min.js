const puppeteer = require("puppeteer");
const { baiduimg } = require("./config/default");
const srcToimg = require("./helper/srcToimg");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://image.baidu.com");

  console.log("https://image.baidu.com");

  await page.setViewport({
    width: 1920,
    height: 1080,
  });

  await page.focus("#kw");
  await page.keyboard.sendCharacter("狗");
  //   await page.click(".s_btn");
  await page.evaluate(() => {
    document.querySelector(".s_btn").click();
  });

  console.log("click-.s_btn");

  page.on("load", async () => {
    console.log("start load");
    const srcs = await page.evaluate(() => {
      const images = document.querySelectorAll("img.main_img");
      return Array.prototype.map.call(images, (img) => img.src);
    });
    console.log(srcs.length);
    srcs.forEach(async (src) => {
      //sleep
      await page.waitForTimeout(500);

      await srcToimg(src, baiduimg);
    });
  });
  // await browser.close();
})();
