import Http from "../clients/Http.js";
import popup from "../js/modules/popup.js";
import Spin from "../js/modules/Spin.js";
import ProductService from "./ProductService.js";

export default class HbsService {
  // static URL = `${location.protocol}//${location.hostname}:${config.PORT_DB}/templates/`;
  static URL = `${location.origin}/templates/`;

  static http = new Http(HbsService.URL, "text");

  static async renderTemplate(hbs, params, container) {
    Spin.init(container);
    try {
      const textoToRender = await HbsService.http.get(hbs + ".hbs");
      const template = Handlebars.compile(textoToRender);
      const html = template(params);
      container.innerHTML = html;
    } catch (error) {
      popup.init(`<i class="fa-solid fa-bug"></i> Error cargando esta página`);
      console.info("Error intentando renderizar templates:", error);
      container.innerHTML = "Error cargando esta pagina";
    }
    Spin.remove();
  }

  static fillCardContainer = async (cardContainer, page, searchParams = {}) => {
    const category = cardContainer.dataset.category;
    if (category) {
      searchParams.category = category;
      searchParams._limit = 6;
    }
    const params = new URLSearchParams(searchParams);
    let products = await ProductService.getManyProducts(params);
    if (products.length == 0 && category) {
      products = await ProductService.getManyProducts({ _limit: 6 });
    }
    page && products.forEach((product) => (product.page = page));
    HbsService.renderTemplate("cards", { products }, cardContainer);
  };
}
