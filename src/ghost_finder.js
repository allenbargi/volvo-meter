const cheerio = require("cheerio");
const fetch = require("isomorphic-unfetch");
const page = require("./page");
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
      .not("link")
      .not("footer")
      .not("nav")
      .not("#mask")
      .not("#backupSection");

    if (content.length === 0) {
      console.log("GHOST:", url);
    }

    content.each((i, node) => {
      detectModuleName($(node).attr("id"), $(node).attr("class"));
      console.log(
        $(node)
          .attr("id")
          .split("_")[0]
      );
    });
    // console.log(content);
  } catch (error) {
    console.log(error.message);
    console.log(url);
    console.log("----------------------");
  }
  // console.log(content.length);
  // content.each((i, node) => {
  //   console.log(node);
  // });
  // console.log($("#volvo").children().length);
};

const run = async () => {
  [markets[0]].forEach(async m => {
    const urls = page.findAllInMarket(m).map(p => p.url);
    const all = urls.map(async url => {
      await fetchPage(url);
    });
    await Promise.all(all);
  });
};

run();

// fetchPage(
//   "https://www.volvocars.com/en-jo/cars/new-models/xc90-my19/accessories_1"
// );
