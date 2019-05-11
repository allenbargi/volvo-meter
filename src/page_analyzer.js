const cheerio = require("cheerio");
const fetch = require("isomorphic-unfetch");
const page = require("./page");
const pageModules = require("./page_modules");

const detectModuleName = (id, classNames) =>
  id ? id.split("_")[0] : classNames.split(" ").join("-");

const fetchPage = async ({ url, id }) => {
  try {
    const res = await fetch(url);
    const html = await res.text();
    const $ = cheerio.load(html);
    const root = $("#volvo");

    if (root.length !== 1) {
      throw "ROOT NOT FOUND";
    }

    const content = root
      .children()
      .not("script")
      .not("noscript")
      .not("iframe")
      .not("style")
      .not("link")
      .not("a")
      .not("footer")
      .not("nav")
      .not(".fbi-custom-style")
      .not(".V2nav-search")
      .not("#mask")
      .not("#backupSection");

    if (content.length === 0) {
      console.log("GHOST:", url);
    }

    let modules = [];

    content.each((i, node) => {
      modules.push(detectModuleName($(node).attr("id"), $(node).attr("class")));
    });

    modules.forEach((m, i) =>
      pageModules.create({ page_id: id, module_id: m, position: i + 1 })
    );

    page.updateAnalyzedAt({ analyzed_at: new Date().getTime(), id });
  } catch (error) {
    console.log("ERROR:", url);
    console.log(error.message);
    console.log("----------------------");
  }
};

module.exports = fetchPage;

// fetchPage({ url: "https://www.volvocars.com/ar-ae", id: 1 });
