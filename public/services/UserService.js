import Http from "../clients/Http.js";
// import config from "/config.js";

export default class UserService {
  // static URL = `${location.protocol}//${location.hostname}:${config.PORT_DB}/user/`;
  static URL = `${location.origin}/user/`;

  static http = new Http(this.URL);

  static getUser(id) {
    return UserService.http.get(id);
  }

  static getAllUsers() {
    return UserService.http.get();
  }

  static getManyUsers(urlSearchParams) {
    return UserService.http.get(urlSearchParams);
  }

  static createUser(data) {
    return UserService.http.post(data);
  }

  static updateUser(id, data) {
    return UserService.http.put(id, data);
  }

  static deleteUser(id) {
    return UserService.http.delete(id);
  }

  static checkSuccessfulFetch(result) {
    if (Array.isArray(result)) return result.length > 0;
    return Object.keys(result).length > 0;
  }
}
