CREATE TABLE "pages" (
  "id" integer NOT NULL,
  "url" varchar NOT NULL,
  "lastmod" text,
  "market" text,
  "lh_p" integer,
  "lh_a" integer,
  "lh_b" integer,
  "lh_s" integer,
  "lh_report" blob,
  PRIMARY KEY (id)
);

CREATE INDEX "market_index" ON "pages" ("market","url");
CREATE UNIQUE INDEX "url_index" ON "pages" ("url");
