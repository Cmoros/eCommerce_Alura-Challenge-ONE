import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

export default class Http {
  constructor(url) {
    this.url = url;
  }

  /* GET */
  static async get(url, id) {
    try {
      return await fetch(url + (id || ""), { method: "get" }).then((r) =>
        r.json()
      );
    } catch (error) {
      console.error("ERROR GET", error);
    }
  }

  /* POST */
  static async post(url, data) {
    data.id ||= uuidv4()
    try {
      return await fetch(url, {
        method: "post",
        body: JSON.stringify(data),
        headers: { "content-type": "application/json" },
      }).then((r) => r.json());
    } catch (error) {
      console.error("ERROR POST", error);
    }
  }

  /* PUT */
  static async put(url, id, data) {
    try {
      return await fetch(url + id, {
        method: "put",
        body: JSON.stringify(data),
        headers: { "content-type": "application/json" },
      }).then((r) => r.json());
    } catch (error) {
      console.error("ERROR PUT", error);
    }
  }

  /* DELETE */
  static async delete(url, id) {
    try {
      return await fetch(url + id, { method: "delete" }).then((r) => r.json());
    } catch (error) {
      console.error("ERROR DELETE", error);
    }
  }


  /* GET */
  async get(id = "", expected = "json") {
    if (id instanceof URLSearchParams) {
      id = "?" + id;
    }
    try {
      return await fetch(this.url + id, { method: "get" }).then((r) =>
        r[expected]()
      );
    } catch (error) {
      console.error("ERROR GET", error);
      return {};
    }
  }

  /* POST */
  async post(data) {
    data.id ||= uuidv4()
    try {
      return await fetch(this.url, {
        method: "post",
        body: JSON.stringify(data),
        headers: { "content-type": "application/json" },
      }).then((r) => r.json());
    } catch (error) {
      console.error("ERROR POST", error);
      return {};
    }
  }

  /* PUT */
  async put(id, data) {
    try {
      return await fetch(this.url + id, {
        method: "put",
        body: JSON.stringify(data),
        headers: { "content-type": "application/json" },
      }).then((r) => r.json());
    } catch (error) {
      console.error("ERROR PUT", error);
      return {};
    }
  }

  /* DELETE */
  async delete(id) {
    try {
      return await fetch(this.url + id, { method: "delete" }).then((r) =>
        r.json()
      );
    } catch (error) {
      console.error("ERROR DELETE", error);
      return {};
    }
  }
}
