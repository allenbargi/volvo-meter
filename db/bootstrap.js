const { readFileSync } = require("fs");
const { join } = require("path");
const DB_FILE = join(__dirname, "./volvo.sqlite3");
const db = require("better-sqlite3")(DB_FILE);
const migration = readFileSync(join(__dirname, "./pages.sql"), "utf8");
db.exec(migration);
