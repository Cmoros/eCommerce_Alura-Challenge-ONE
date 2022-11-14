import ProductService from "../../services/ProductService.js";

export default class InicioPage {
  static async init() {
    this.cardsContainers = document.querySelectorAll(
      ".section-card__cards-container"
    );
    this.productService = ProductService;
    // await Promise.all(
    this.cardsContainers.forEach(async (cardContainer) => {
      const category = cardContainer.dataset.category;
      const params = new URLSearchParams({ category });
      const products = await this.productService.getManyProducts(params);
      products.forEach((product) => (product.page = "inicio"));
      this.renderTemplateCards(cardContainer, products);
    });
    // );
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
