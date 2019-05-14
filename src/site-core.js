require("dotenv").config();
const fetch = require("isomorphic-unfetch");
const querystring = require("querystring");

// options = {
//   language: null,
//   version: null,
//   fields: null,
//   includeStandardTemplateFields: false,
//   includeMetadata: false
// }

class SiteCoreItemClient {
  constructor(host, username, password) {
    this.host = host;
    this.username = username;
    this.password = password;
    this.cookie = null;
  }

  getCookie(str) {
    return str.match(/(\.ASPXAUTH=.+?;)/)[0];
  }

  async login() {
    // @ts-ignore
    const res = await fetch(`${this.host}/sitecore/api/ssc/auth/login`, {
      method: "POST",
      body: JSON.stringify({
        domain: "sitecore",
        username: this.username,
        password: this.password
      }),
      headers: { "Content-Type": "application/json" }
    });

    this.cookie = this.getCookie(res.headers.get("set-cookie"));
  }

  async request(endpoint) {
    // @ts-ignore
    const res = await fetch(`${this.host}/sitecore/api/ssc/item${endpoint}`, {
      headers: { cookie: this.cookie, "Content-Type": "application/json" }
    });
    return await res.json();
  }

  async getItemById(id, options = {}) {
    return await this.request(`/${id}?${querystring.stringify(options)}`);
  }

  async getItemByPath(path, options = {}) {
    return await this.request(
      `/?path=${encodeURI(path)}&${querystring.stringify(options)}`
    );
  }

  async getItemChildren(id, options = {}) {
    return await this.request(
      `/${id}/children?${querystring.stringify(options)}`
    );
  }

  // create
  // edit
  // delete
}

const run = async () => {
  const { SC_HOST, SC_USERNAME, SC_PASSWORD } = process.env;
  const sc = new SiteCoreItemClient(SC_HOST, SC_USERNAME, SC_PASSWORD);
  await sc.login();
  const res = await sc.getItemByPath(
    "/sitecore/content/CAAS/Content/Impressions/Content/Landing Page/components"
  );

  console.log(res);
  const res2 = await sc.getItemById("EBC11ECA-2ADC-4AB4-9BD4-C3120F58920C");
  const res3 = await sc.getItemChildren("EBC11ECA-2ADC-4AB4-9BD4-C3120F58920C");
  console.log(res2);
  console.log(res3);
};

run();
