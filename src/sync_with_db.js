const page = require("./page");

module.exports = function syncWithDB(results) {
  results.forEach(m => {
    m.pages.forEach(p => {
      try {
        const found = page.find(p.url);
        if (found) {
          found.lastmod < p.lastmod &&
            page.update({
              market: m.marketName,
              url: p.url,
              lastmod: p.lastmod
            });
        } else {
          page.create({
            market: m.marketName,
            url: p.url,
            lastmod: p.lastmod
          });
        }
      } catch (error) {
        console.log(error.message);
        console.dir(p, { depth: null, colors: true });
        console.log("----------------------");
      }
    });

    const allCurrentUrls = m.pages.map(p => p.url);
    const allDBUrls = page.findAllInMarket(m.marketName).map(p => p.url);
    const deleted = allDBUrls.filter(x => !allCurrentUrls.includes(x));
    deleted.forEach(url => page.destroy(url));
  });
};
