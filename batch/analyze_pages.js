const { forEachSeries } = require("p-iteration");
const page = require("../src/page");
const fetchPage = require("../src/page_analyzer");

const delay = ms => new Promise(resolve => setTimeout(() => resolve(ms), ms));
const markets = page.allMarkets().map(p => p.market);

const run = async () => {
  await forEachSeries(markets, async m => {
    const pages = page.findAllInMarketNotAnalyzed(m);
    await forEachSeries(pages, async page => {
      await fetchPage(page);
      await delay(1000);
    });
  });
};

run();
