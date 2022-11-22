import Http from "../clients/Http.js";
// import config from "/config.js";

export default class UserService {
  // static URL = `${location.protocol}//${location.hostname}:${config.PORT_DB}/user/`;
  static URL = `${location.origin}/user/`;

  static http = new Http(this.URL);

  static async getUser(id) {
    if (typeof id == "object" && !(id instanceof URLSearchParams)) {
      id = new URLSearchParams(id)
    }
    const user = await UserService.http.get(id);
    return Array.isArray(user) ? user[0] : user;
  }

  static async getAllUsers() {
    return await UserService.http.get();
  }

  static async getManyUsers(urlSearchParams) {
    return await UserService.http.get(urlSearchParams);
  }

  static async createUser(data) {
    return await UserService.http.post(data);
  }

  static async updateUser(id, data) {
    return await UserService.http.put(id, data);
  }

  static async deleteUser(id) {
    return await UserService.http.delete(id);
  }

  static async checkSuccessfulFetch(result) {
    if (Array.isArray(result)) return result.length > 0;
    return Object.keys(result).length > 0;
  }
}
