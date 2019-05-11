const path = require("path");
const DB_FILE = path.join(__dirname, "../db/volvo.sqlite3");
const db = require("better-sqlite3")(DB_FILE);

const CREATE = db.prepare(
  "INSERT INTO pages_modules(page_id, module_id, position) VALUES (@page_id, @module_id, @position)"
);

class PageModules {
  create = payload => CREATE.run(payload);
}

module.exports = new PageModules();
