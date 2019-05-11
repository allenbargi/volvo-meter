const { fetchSiteMap, fetchMarketSiteMap } = require("../src/sitemap_reporter");
const syncWithFS = require("../src/sync_with_fs");
const syncWithDB = require("../src/sync_with_db");

const fetchVolvoCarsSiteMap = async url => {
  const data = await fetchSiteMap(url);
  const marketsSitemaps = data.sitemapindex.sitemap.map(x => x.loc._text);

  const promises = marketsSitemaps.map(marketUrl =>
    fetchMarketSiteMap(marketUrl)
  );

  const results = await Promise.all(promises);

  syncWithDB(results);
  syncWithFS(results);
};

fetchVolvoCarsSiteMap("https://www.volvocars.com/sitemap-index.xml");
