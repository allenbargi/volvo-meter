const page = require("./page");
const markets = page.allMarkets().map(p => p.market);

const PAGE_MAP = {
  home: /^$/,
  "why-volvo": /\/más-volvo|why-volvo/,
  about: /\/about/,
  pdp: /\/modelos|cars/,
  "car-configurator": /\/car-configurator/,
  buy: /\/buy/,
  own: /\/own/,
  suppport: /\/support/
};

let unmapped = 0;
markets.forEach(m => {
  const urls = page
    .findAllInMarket(m)
    .map(p => p.url.replace(`https://www.volvocars.com/${m}`, ""));

  const mapped = urls.map(url => {
    const categorized = { url, category: null };
    Object.keys(PAGE_MAP).forEach(category => {
      if (url.match(PAGE_MAP[category])) {
        categorized.category = category;
      }
    });
    return categorized;
  });

  const notCategorized = mapped.filter(m => !m.category);
  // console.log(`https://www.volvocars.com/${m}`);
  // console.log(notCategorized);
  // console.log({ total: mapped.length, remaning: notCategorized.length });
  unmapped += notCategorized.length;
});

console.log(unmapped);
