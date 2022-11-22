import HbsService from "../../services/HbsService.js";
import ProductService from "../../services/ProductService.js";

export default class ListadoPage {
  static async init(params) {
    ListadoPage.state = params;
    ListadoPage.state.q ||= "";
    const { q } = ListadoPage.state;

    ListadoPage.page = "listado";
    ListadoPage.container = document.querySelector(".section-card");
    const products = await ProductService.getManyProducts({ q });
    products.forEach((product) => (product.page = ListadoPage.page));
    HbsService.renderTemplate(
      "listing",
      { products, q },
      ListadoPage.container
    );
  }
}
