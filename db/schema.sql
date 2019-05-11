DROP TABLE IF EXISTS "pages";

CREATE TABLE "pages" (
  "id" integer NOT NULL,
  "url" varchar NOT NULL,
  "lastmod" text,
  "market" text,
  "lh_p" integer,
  "lh_a" integer,
  "lh_b" integer,
  "lh_s" integer,
  "lh_created_at" datetime,
  "analyzed_at" datetime,
  PRIMARY KEY (id)
);

CREATE INDEX "market_index" ON "pages" ("market","url");
CREATE UNIQUE INDEX "url_index" ON "pages" ("url");

DROP TABLE IF EXISTS "pages_modules";

CREATE TABLE "pages_modules" (
  "id" integer NOT NULL,
  "page_id" integer NOT NULL,
  "module_id" text,
  "content_id" integer,
  "position" integer,
  PRIMARY KEY (id)
);

CREATE INDEX "page_id_index" ON "pages_modules" ("page_id");
CREATE INDEX "module_id_index" ON "pages_modules" ("module_id");
