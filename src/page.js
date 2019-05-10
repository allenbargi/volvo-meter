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

const NEEDS_LIGHT_HOUSE_SCORE = db.prepare(
  "SELECT * from pages WHERE lh_report IS NULL LIMIT 1"
);
const UPDATE_LIGHT_HOUSE_SCORE = db.prepare(
  "UPDATE pages SET lh_p=@lh_p, lh_b=@lh_b, lh_a=@lh_a, lh_s=@lh_s, lh_report=@lh_report WHERE url=@url"
);

class Page {
  create = payload => CREATE.run(payload);
  update = payload => UPDATE.run(payload);
  find = url => FIND.get(url);
  destroy = url => DESTROY.run(url);
  deleteAll = () => DELETE_ALL.run();
  findAllInMarket = market => FIND_ALL_IN_MARKET.all(market);
  needsLightHouseScore = () => NEEDS_LIGHT_HOUSE_SCORE.get();
  updateLightHouseScore = payload => UPDATE_LIGHT_HOUSE_SCORE.run(payload);
}

module.exports = new Page();
