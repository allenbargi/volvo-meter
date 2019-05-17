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

// editorial page template {BC702582-CCF2-46B7-A64F-BF9BB4CF64D7}

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
    try {
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
      if (res.status === 200) {
        this.cookie = this.getCookie(res.headers.get("set-cookie"));
      } else {
        console.error(res);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async request(endpoint) {
    try {
      // @ts-ignore
      const res = await fetch(`${this.host}/sitecore/api/ssc/item${endpoint}`, {
        headers: { cookie: this.cookie, "Content-Type": "application/json" }
      });
      if (res.status < 400) {
        return await res.json();
      } else {
        console.error(res);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getItemById(id, options = {}) {
    return await this.request(`/${id}?${querystring.stringify(options)}`);
  }

  async getItemByPath(path, options = {}) {
    return await this.request(
      `/?path=${encodeURI(path)}&${querystring.stringify(options)}`
    );
  }

  async getItemAndAllChildrenByPath(path, options = {}) {
    let parent = await this.request(
      `/?path=${encodeURI(path)}&${querystring.stringify(options)}`
    );
    if (parent.HasChildren === "True") {
      parent = {
        ...parent,
        children: await this.getItemAllChildren(parent.ItemID, options)
      };
    }
    return parent;
  }

  async getItemAllChildren(id, options = {}) {
    let items = await this.request(
      `/${id}/children?${querystring.stringify(options)}`
    );
    const nestedItems = items.map(async item => {
      if (item.HasChildren === "True") {
        return {
          ...item,
          children: await this.getItemAllChildren(item.ItemID, options)
        };
      }
      return item;
    });
    return await Promise.all(nestedItems);
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
  const res4 = await sc.getItemAndAllChildrenByPath(
    "/sitecore/templates/CAAS/Care By Volvo B2B",
    { language: "de-de" }
  );
  console.dir(res4, { depth: null, colors: true });
  // const res = await sc.getItemByPath(
  //   "/sitecore/content/CAAS/Content/Impressions/Content/Landing Page"
  // );
  // console.log(res);

  const res2 = await sc.getItemById("3416345C-FD7D-4F44-96AC-7D306E89136B");
  console.log(res2);
  // const res3 = await sc.getItemChildren("EBC11ECA-2ADC-4AB4-9BD4-C3120F58920C");
  // console.log(res3);
};

run();
