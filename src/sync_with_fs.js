const orderBy = require("lodash/orderBy");
const fs = require("fs");
const path = require("path");

const numberOfPagesInCSV = results => {
  return (
    "Market, Number of pages\n" +
    orderBy(results, m => m.pages.length, "desc")
      .map(m => `${m.marketName},${m.pages.length}`)
      .join("\n") +
    `\nTOTAL, ${results.reduce((accu, m) => accu + m.pages.length, 0)}`
  );
};

module.exports = function syncWithFS(results) {
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
