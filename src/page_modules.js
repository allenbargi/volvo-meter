const path = require("path");
const DB_FILE = path.join(__dirname, "../db/volvo.sqlite3");
const db = require("better-sqlite3")(DB_FILE);

const CREATE = db.prepare(
  "INSERT INTO pages_modules(page_id, module_id, position) VALUES (@page_id, @module_id, @position)"
);

const FIND_ALL_BY_PAGE_URL = db.prepare(
  "SELECT * FROM pages_modules m JOIN pages p ON m.page_id = p.id WHERE p.url=?"
);

const DESTROY_MODULES_FOR_URL = db.prepare(
  `DELETE FROM pages_modules WHERE id IN (
    SELECT m.id
    FROM pages_modules m
		JOIN pages p ON m.page_id = p.id
		WHERE p.url=?)`
);

class PageModules {
  create = payload => CREATE.run(payload);
  findAllByPageURL = url => FIND_ALL_BY_PAGE_URL.all(url);
  destroyModulesForUrl = url => DESTROY_MODULES_FOR_URL.run(url);
}

module.exports = new PageModules();
