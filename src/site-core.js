// TODO:
// - add .env

const fetch = require("isomorphic-unfetch");

class SiteCoreClient {
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

  async getItemByPath(path) {
    // @ts-ignore
    const res = await fetch(
      `${this.host}/sitecore/api/ssc/item/?path=${encodeURI(path)}`,
      {
        headers: { cookie: this.cookie, "Content-Type": "application/json" }
      }
    );
    const json = await res.json();
    console.log(json);
  }
}

const run = async () => {
  const HOST = "https://oxp.authoring.volvocars.com";
  const USERNAME = "abargi";
  const PASSWORD = "Power4212";
  const sc = new SiteCoreClient(HOST, USERNAME, PASSWORD);
  await sc.login();
  sc.getItemByPath("/sitecore/content/CAAS");
};

run();
