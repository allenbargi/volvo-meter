const path = require("path");
const DB_FILE = path.join(__dirname, "../db/volvo.sqlite3");
const db = require("better-sqlite3")(DB_FILE);

const CREATE = db.prepare(
  "INSERT INTO pages(url, lastmod, market) VALUES (@url, @lastmod, @market)"
);

const FIND = db.prepare("SELECT * from pages WHERE url=?");
const FIND_ALL_IN_MARKET = db.prepare("SELECT * from pages WHERE market=?");

const UPDATE = db.prepare(
  "UPDATE pages SET url=@url, lastmod=@lastmod, market=@market WHERE url='@url'"
);

const DELETE_ALL = db.prepare("DELETE FROM pages");
const DESTROY = db.prepare("DELETE FROM pages where url=?");

class Page {
  create = payload => CREATE.run(payload);
  update = payload => UPDATE.run(payload);
  find = url => FIND.get(url);
  destroy = url => DESTROY.run(url);
  deleteAll = () => DELETE_ALL.run();
  findAllInMarket = market => FIND_ALL_IN_MARKET.all(market);
}

module.exports = new Page();
