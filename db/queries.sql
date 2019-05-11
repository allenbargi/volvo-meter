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
