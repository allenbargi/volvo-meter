const path = require("path");
const DB_FILE = path.join(__dirname, "../db/volvo.sqlite3");
const db = require("better-sqlite3")(DB_FILE);

const CREATE = db.prepare(
  "INSERT INTO pages(url, lastmod, market) VALUES (@url, @lastmod, @market)"
);

const FIND = db.prepare("SELECT url from pages WHERE url='@url'");

const UPDATE = db.prepare(
  "UPDATE pages SET url=@url, lastmod=@lastmod, market=@market WHERE url='@url'"
);

class Page {
  create = payload => CREATE.run(payload);
  update = payload => UPDATE.run(payload);
  find = payload => FIND.run(payload);
}

module.exports = new Page();
