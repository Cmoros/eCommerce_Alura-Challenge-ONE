import ProductService from "../../services/ProductService.js";
import HbsService from "../../services/HbsService.js";
export default class InicioPage {
  static async init() {
    this.cardsContainers = document.querySelectorAll(
      ".section-card__cards-container"
    );
    this.page = "inicio";
    this.cardsContainers.forEach(async (cardContainer) => {
      HbsService.fillCardContainer(cardContainer, this.page)
    });
  }
}
