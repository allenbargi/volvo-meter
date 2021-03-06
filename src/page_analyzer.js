const cheerio = require("cheerio");
const fetch = require("isomorphic-unfetch");
const page = require("./page");
const pageModules = require("./page_modules");

const detectModuleName = (id, classNames) => {
  if (classNames.includes("oxp-richText")) {
    return "oxp-richText";
  }

  if (classNames.includes("oxp-innovations")) {
    return "oxp-innovations";
  }

  let moduleName = id
    ? id.split("_")[0]
    : classNames
    ? classNames.split(" ").join("-")
    : "UNKNOWN";
  if (moduleName.includes("pdpHeroGroup")) moduleName = "pdpHeroGroup";
  if (moduleName.includes("fullscreen-hero")) moduleName = "fullscreen-hero";

  return moduleName;
};

const fetchPage = async ({ url, id }) => {
  try {
    const res = await fetch(encodeURI(url));
    const html = await res.text();
    const $ = cheerio.load(html);
    const root = $("#volvo");
    const is404 = () => $("h1").text() === "Oops!";

    if (root.length !== 1) {
      if (is404()) {
        page.updateAnalyzedAt({ analyzed_at: new Date().getTime(), id });
        console.log("404:", url);
        return;
      } else {
        throw { message: "ROOT NOT FOUND" };
      }
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
      .not("#backupSection")
      .not("#sticky_navigation_mobile");

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

// fetchPage({
//   url: "https://www.volvocars.com/et-ee/support/bluetooth/sensus",
//   id: 9426
// });
