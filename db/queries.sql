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
