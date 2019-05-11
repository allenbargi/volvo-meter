const cheerio = require("cheerio");
const fetch = require("isomorphic-unfetch");
const page = require("./page");
const { forEachSeries } = require("p-iteration");
const delay = ms => new Promise(resolve => setTimeout(() => resolve(ms), ms));
const markets = page.allMarkets().map(p => p.market);

const detectModuleName = (id, classNames) =>
  id ? id.split("_")[0] : classNames.split(" ").join("-");

const fetchPage = async url => {
  try {
    const res = await fetch(url);
    const html = await res.text();
    const $ = cheerio.load(html);
    const root = $("#volvo");

    if (!root) {
      throw "ROOT NOT FOUND";
    }

    const content = root
      .children()
      .not("script")
      .not("style")
      .not("link")
      .not("a")
      .not("footer")
      .not("nav")
      .not(".fbi-custom-style")
      .not("#mask")
      .not("#backupSection");

    if (content.length === 0) {
      console.log("GHOST:", url);
      console.log("----------------------");
      return;
    }

    let modules = [];
    content.each((i, node) => {
      modules.push(detectModuleName($(node).attr("id"), $(node).attr("class")));
    });

    console.log(url);
    console.log(modules);
    console.log("----------------------");
  } catch (error) {
    console.log("ERROR:", url);
    console.log(error.message);
    console.log("----------------------");
  }
};

// TODO: extract to another file
const run = async () => {
  [markets[1]].forEach(async m => {
    const urls = page.findAllInMarket(m).map(p => p.url);
    await forEachSeries(urls, async url => {
      await fetchPage(url);
      await delay(1000);
    });
  });
};

run();

// fetchPage(
//   "https://www.volvocars.com/ar/why-volvo/human-innovation/future-of-driving/safety/cars-safe-for-all"
// );
