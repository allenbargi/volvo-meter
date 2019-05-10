const lighthouse = require("lighthouse");
const chromeLauncher = require("chrome-launcher");
const page = require("./page");

let chrome = null;

const launchChrome = async opts => {
  chrome = await chromeLauncher.launch({ chromeFlags: opts.chromeFlags });
};
const killChrome = async () => {
  await chrome.kill();
};

const getSummary = report => {
  return {
    lh_p: parseInt(report.categories["performance"].score * 100, 10),
    lh_b: parseInt(report.categories["best-practices"].score * 100, 10),
    lh_a: parseInt(report.categories["accessibility"].score * 100, 10),
    lh_s: parseInt(report.categories["seo"].score * 100, 10)
  };
};

const lighthouseReport = async (
  opts = {
    chromeFlags: ["--headless"]
  },
  config = null
) => {
  await launchChrome(opts);

  let p = page.needsLightHouseScore();
  console.log(p.url);

  while (p) {
    const results = await lighthouse(
      p.url,
      { ...opts, port: chrome.port },
      config
    );
    const summary = getSummary(JSON.parse(results.report));
    console.log(summary);

    page.updateLightHouseScore({
      ...summary,
      lh_report: results.report,
      url: p.url
    });
    p = page.needsLightHouseScore();
  }

  await killChrome();
};

lighthouseReport();
