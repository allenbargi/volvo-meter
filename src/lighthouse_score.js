// TODO: write a separate batch score and a single scorer
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
    lh_p: Math.round(report.categories["performance"].score * 100),
    lh_b: Math.round(report.categories["best-practices"].score * 100),
    lh_a: Math.round(report.categories["accessibility"].score * 100),
    lh_s: Math.round(report.categories["seo"].score * 100)
  };
};

const lighthouseReport = async (
  opts = { chromeFlags: ["--headless"] },
  config = null
) => {
  await launchChrome(opts);

  let p = page.needsLightHouseScore();

  while (p) {
    try {
      console.log(p.url);
      const results = await lighthouse(
        p.url,
        { ...opts, port: chrome.port },
        config
      );
      const summary = getSummary(JSON.parse(results.report));
      console.log(summary);

      page.updateLightHouseScore({
        ...summary,
        lh_created_at: new Date().getTime(),
        url: p.url
      });
      p = page.needsLightHouseScore();
    } catch (error) {
      p = page.needsLightHouseScore(p.id + 1);
      console.log(error);
    }
  }

  await killChrome();
};

lighthouseReport();
