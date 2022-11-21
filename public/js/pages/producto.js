import ProductService from "../../services/ProductService.js";
import Modal from "../modules/Modal.js";
import popup from "../modules/popup.js";
import HbsService from "../../services/hbsService.js";

export default class ProductPage {
  static async init(params) {
    this.state = params;
    this.page = "products";
    this.container = document.querySelector("main");
    this.id = this.getIdFromHash();
    await this.fillContainer();
    this.cardContainer = this.container.querySelector(
      ".section-card__cards-container"
    );
    // this.renderTemplateCards = InicioPage.renderTemplateCards;
    // await InicioPage.fillCardContainer.call(this,this.cardContainer);
    await HbsService.fillCardContainer(this.cardContainer);
  }

  static getIdFromHash() {
    return location.hash.slice(-1)[0];
  }

  static async fillContainer() {
    const product = await ProductService.getProduct(this.id);
    await HbsService.renderTemplate(
      "product.hbs",
      { ...product },
      this.container
    );
    // await this.renderTemplate(product);
  }

  static async renderTemplate(product) {
    try {
      const textoToRender = await fetch("/templates/product.hbs").then((r) =>
        r.text()
      );
      this.cardsTemplate = Handlebars.compile(textoToRender);
      const html = this.cardsTemplate({ ...product });
      this.container.innerHTML = html;
    } catch (error) {
      console.log("Error intentando renderizar templates:", error);
      this.container.innerHTML = "No se pudieron encontrar los productos";
    }
  }
}
