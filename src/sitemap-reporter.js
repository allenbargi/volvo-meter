const fetch = require("isomorphic-unfetch");
const convert = require("xml-js");
const get = require("lodash/get");

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

const fetchVolvoCarsSiteMap = async url => {
  const data = await fetchSiteMap(url);
  const marketsSitemaps = data.sitemapindex.sitemap.map(x => x.loc._text);
  // console.dir(marketsSitemaps, {depth: null, colors: true})

  const promises = marketsSitemaps.map(marketUrl =>
    fetchMarketSiteMap(marketUrl)
  );

  const results = await Promise.all(promises);
  const syncWithDB = require("./sync_with_db");
  syncWithDB(results);

  const syncWithFS = require("./sync_with_fs");
  syncWithFS(results);
};

fetchVolvoCarsSiteMap("https://www.volvocars.com/sitemap-index.xml");
