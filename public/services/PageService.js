import Http from "../clients/Http.js"

export default class PageService {
  static URL = "./views/"
  static http = new Http(PageService.URL, 'text');

  static async getPage(page) {
    return await PageService.http.get(page + ".html");
  }
}