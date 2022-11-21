import Http from "../clients/Http.js";
import ProductService from "./ProductService.js";

export default class HbsService {
  // static URL = `${location.protocol}//${location.hostname}:${config.PORT_DB}/templates/`;
  static URL = `${location.origin}/templates/`;

  static http = new Http(HbsService.URL, "text");

  static async renderTemplate(url, params, container) {
    try {
      const textoToRender = await HbsService.http.get(url);
      const template = Handlebars.compile(textoToRender);
      const html = template(params);
      container.innerHTML = html;
    } catch (error) {
      console.log("Error intentando renderizar templates:", error);
      container.innerHTML = "Error cargando esta pagina";
    }
  }

  static fillCardContainer = async (cardContainer) => {
    const category = cardContainer.dataset.category;
    const searchParams = {};
    if (category) {
      searchParams.category = category;
      searchParams._limit = 6;
    }
    const params = new URLSearchParams(searchParams);
    let products = await ProductService.getManyProducts(params);
    if (products.length == 0) {
      products = await ProductService.getManyProducts({ _limit: 6 });
    }
    products.forEach((product) => (product.page = this.page));
    HbsService.renderTemplate('cards.hbs', {products}, cardContainer);
  }
}
