-- number of pages per market
SELECT
	market,
	count(*) AS numberOfPages
FROM
	pages
GROUP BY
	market
ORDER BY
	numberOfPages DESC


-- top modules
SELECT
	module_id,
	count(*) AS count
FROM
	pages_modules
GROUP BY
	module_id
ORDER BY
	count DESC


-- ghost and 404 pages
SELECT
	*
FROM
	pages
WHERE
	analyzed_at IS NOT NULL
	AND id NOT IN (
		SELECT
			DISTINCT page_id
		FROM
			pages_modules)


-- find all pages that have a specific module
SELECT
	url
FROM
	pages
WHERE
	id IN (
		SELECT
			DISTINCT page_id
		FROM
			pages_modules
		WHERE
			module_id = "storytelling")
