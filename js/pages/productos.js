import ProductService from "../../services/ProductService.js";

export default class ProductosPage {
  static async init() {
    this.cardsContainer = document.querySelector(
      ".section-card__cards-container"
    );
    this.productService = ProductService;
    const products = await this.productService.getAllProducts();
    this.renderTemplateCards(this.cardsContainer, products, 'inicio');
  }

  static async renderTemplateCards(cardContainer, products, page) {
    try {
      const textoToRender = await fetch("/templates/cards.hbs").then((r) =>
        r.text()
      );
      const template = Handlebars.compile(textoToRender);
      const html = template({ products });
      cardContainer.innerHTML = html;
    } catch (error) {
      console.log("Error intentando renderizar templates:", error);
    }
  }
}
