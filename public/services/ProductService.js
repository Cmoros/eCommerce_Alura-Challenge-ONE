import Http from "../clients/Http.js";
// import config from "/config.js";

export default class ProductService {
  // static URL = `${location.protocol}//${location.hostname}:${config.PORT_DB}/product/`;
  static URL = `${location.origin}/product/`;

  static http = new Http(this.URL);

  static getProduct(id) {
    return ProductService.http.get(id);
  }

  static getAllProducts() {
    return ProductService.http.get();
  }

  static getManyProducts(urlSearchParams) {
    return ProductService.http.get(urlSearchParams);
  }

  static createProduct(data) {
    return ProductService.http.post(data);
  }

  static updateProduct(id, data) {
    return ProductService.http.put(id, data);
  }

  static deleteProduct(id) {
    return ProductService.http.delete(id);
  }

  static checkSuccessfulFetch(result) {
    return Object.keys(result).length > 0;
  }
}
