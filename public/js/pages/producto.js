import ProductService from "../../services/ProductService.js";
import Modal from "../modules/Modal.js";
import popup from "../modules/popup.js";
import HbsService from "../../services/HbsService.js";

export default class ProductPage {
  static async init(params) {
    this.state = params;
    this.page = "producto";
    this.container = document.querySelector("main");
    this.id = this.getIdFromHash();
    await this.fillContainer();
    this.cardContainer = this.container.querySelector(
      ".section-card__cards-container"
    );
    // this.renderTemplateCards = InicioPage.renderTemplateCards;
    // await InicioPage.fillCardContainer.call(this,this.cardContainer);
    await HbsService.fillCardContainer(this.cardContainer, this.page);
  }

  static getIdFromHash() {
    return location.hash.split('/').slice(-1)[0];
  }

  static async fillContainer() {
    const product = await ProductService.getProduct(this.id);
    await HbsService.renderTemplate(
      "product",
      { ...product },
      this.container
    );
    // await this.renderTemplate(product);
  }
}
