const page = require("./page");
const orderBy = require("lodash/orderBy");
// const markets = page.allMarkets().map(p => p.market);

// const PAGE_MAP = {
//   home: /^$/,
//   "why-volvo": /\/más-volvo|why-volvo/,
//   about: /\/about/,
//   pdp: /\/modelos|cars/,
//   "car-configurator": /\/car-configurator/,
//   buy: /\/buy/,
//   own: /\/own/,
//   suppport: /\/support/
// };

// let unmapped = 0;
// markets.forEach(m => {
//   const urls = page
//     .findAllInMarket(m)
//     .map(p => p.url.replace(`https://www.volvocars.com/${m}`, ""));

//   const mapped = urls.map(url => {
//     const categorized = { url, category: null };
//     Object.keys(PAGE_MAP).forEach(category => {
//       if (url.match(PAGE_MAP[category])) {
//         categorized.category = category;
//       }
//     });
//     return categorized;
//   });

//   const notCategorized = mapped.filter(m => !m.category);
//   // console.log(`https://www.volvocars.com/${m}`);
//   // console.log(notCategorized);
//   // console.log({ total: mapped.length, remaning: notCategorized.length });
//   unmapped += notCategorized.length;
// });

// console.log(unmapped);

const book = {};

const categorize = type => {
  if (book[type]) {
    book[type] += 1;
  } else {
    book[type] = 1;
  }
};

const normalize = type => {
  switch (type) {
    case "cars":
    case "modelle":
    case "modeles":
    case "modelli":
    case "modellen":
    case "modele":
    case "modelos":
    case "modeller":
    case "automobiļi":
    case "autos":
      return "cars";
      break;
    case "find-a-dealer":
      return "find-a-dealer";
      break;
    case "about":
      return "about";
      break;
    case "why-volvo":
      return "why-volvo";
      break;
    case "homepage":
      return "homepage";
      break;
    default:
      return "UNKNOWN";
      // return type
      break;
  }
};

page.all().map(p => {
  const [market, root, ...rest] = p.url
    .replace("https://www.volvocars.com/", "")
    .split("/");
  categorize(normalize(root || "homepage"));
});

console.dir(
  orderBy(
    Object.keys(book).map(i => ({ name: i, value: book[i] })),
    "value",
    "desc"
  ),
  { depth: null, colors: false }
);
