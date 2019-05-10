const fetch = require("isomorphic-unfetch");
const convert = require("xml-js");
const get = require("lodash/get");
const orderBy = require("lodash/orderBy");
const fs = require("fs");
const path = require("path");

const fetchSiteMap = async url => {
  const res = await fetch(url);
  const xml = await res.text();
  const jsonStr = convert.xml2json(xml, { compact: true, spaces: 4 });
  return JSON.parse(jsonStr);
};

const fetchMarketSiteMap = async url => {
  try {
    const marketName = url
      .replace("https://www.volvocars.com/", "")
      .split("/")[0];
    const data = await fetchSiteMap(url);
    let pages = [];
    const urls = get(data, "urlset.url", []);
    pages = urls.map(x => ({
      url: get(x, "loc._text"),
      lastmod: get(x, "lastmod._text")
    }));
    return { marketName, pages };
  } catch (error) {
    console.log(url, error);
  }
};

const numberOfPagesInCSV = results => {
  return (
    "Market, Number of pages\n" +
    orderBy(results, m => m.pages.length, "desc")
      .map(m => `${m.marketName},${m.pages.length}`)
      .join("\n") +
    `\nTOTAL, ${results.reduce((accu, m) => accu + m.pages.length, 0)}`
  );
};

const fetchVolvoCarsSiteMap = async url => {
  const data = await fetchSiteMap(url);
  const marketsSitemaps = data.sitemapindex.sitemap.map(x => x.loc._text);
  // console.dir(marketsSitemaps, {depth: null, colors: true})

  const promises = marketsSitemaps.map(marketUrl =>
    fetchMarketSiteMap(marketUrl)
  );

  const results = await Promise.all(promises);

  const page = require("./page");

  results.forEach(m => {
    m.pages.forEach(p => {
      try {
        page.create({
          market: m.marketName,
          url: p.url,
          lastmod: p.lastmod
        });
      } catch (error) {
        console.log(error);
        console.dir(p, { depth: null, colors: true });
        console.log("----------------------");
      }
    });
  });

  const csv = numberOfPagesInCSV(results);
  const fileName = path.join(__dirname, "../data/markets-number-of-pages.csv");
  fs.writeFileSync(fileName, csv);

  results.map(m => {
    const fileName = path.join(
      __dirname,
      `../data/markets/${m.marketName}.csv`
    );
    fs.writeFileSync(
      fileName,
      "URL, LastMod\n" + m.pages.map(p => `${p.url}, ${p.lastmod}`).join("\n")
    );
  });
};

fetchVolvoCarsSiteMap("https://www.volvocars.com/sitemap-index.xml");
