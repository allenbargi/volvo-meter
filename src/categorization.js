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
const unknownBook = {};

const categorize = type => {
  if (book[type]) {
    book[type] += 1;
  } else {
    book[type] = 1;
  }
};

const categorizeUnknown = type => {
  if (unknownBook[type]) {
    unknownBook[type] += 1;
  } else {
    unknownBook[type] = 1;
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
    case "automobiliai":
    case "automobili":
    case "billar":
    case "bilar":
    case "autos":
    case "vozila":
    case "vozy":
    case "coches":
    case "gamme":
    case "mallisto":
    case "autod":
    case "vozidla":
    case "novos":
    case "modelos-volvo":
      return "cars";
      break;
    case "find-a-dealer":
    case "retailer":
    case "dealer":
      return "find-a-dealer";
      break;
    case "about":
    case "o-volvu":
    case "um-volvo":
    case "mondo-volvo":
    case "ueber-volvo":
    case "apie":
    case "acerca-de":
      return "about";
      break;
    case "why-volvo":
    case "porque-volvo":
    case "despre-volvo":
    case "waarom-volvo":
    case "weshalb-volvo":
    case "por-que-volvo":
    case "zakaj-volvo":
    case "sobre-a-volvo":
    case "volvo-fordi":
    case "zasto-volvo":
    case "neden-volvo":
    case "dlaczego-volvo":
    case "over-volvo":
    case "pourquoi-volvo":
    case "más-volvo":
      return "why-volvo";
      break;
    case "homepage":
      return "homepage";
      break;
    case "support":
      return "support";
      break;
    case "own":
    case "aga":
    case "vlastnictvo":
    case "own-and-enjoy":
    case "servis-in-dodatna-oprema":
    case "vlastnictvo":
      return "own";
      break;
    case "buy":
    case "kop":
    case "acheter":
    case "kopen":
    case "comprar":
    case "kupit":
      return "buy";
      break;
    case "accessories":
      return "accessories";
      break;
    case "forms":
      return "forms";
      break;
    case "discover-volvo":
      return "discover-volvo";
      break;
    case "services":
    case "servicios":
    case "sluzby":
    case "uslugi":
    case "servicios-cliente":
    case "servis-i-dodatna-oprema":
    case "service":
    case "palvelut":
    case "hizmetler":
    case "услуги":
      return "services";
      break;
    case "carebyvolvo":
      return "carebyvolvo";
      break;
    case "redirects":
      return "redirects";
      break;
    case "my-volvo":
      return "my-volvo";
      break;
    case "news-and-events":
    case "news-and-event":
      return "news-and-events";
      break;
    case "sales":
    case "vendite":
      return "sales";
      break;
    case "build-your-own":
    case "car-configurator":
    case "konfigurieren":
    case "build-and-price":
    case "build":
      return "car-configurator";
      break;
    case "search":
    case "customsearch":
      return "search";
      break;
    case "test-drive":
      return "test-drive";
      break;
    case "footer":
      return "footer";
      break;
    default:
      categorizeUnknown(type);
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

console.dir(
  orderBy(
    Object.keys(unknownBook).map(i => ({ name: i, value: unknownBook[i] })),
    "value",
    "desc"
  ),
  { depth: null, colors: false }
);
