import ProductService from "../../services/ProductService.js";
import Modal from "../modules/Modal.js";
import popup from "../modules/popup.js";
import paramsPage from "../paramsPage.js";
import HbsService from "../../services/HbsService.js";

export default class ProductsPage {
  static async init(params) {
    this.state = params;
    // this.page = "products"
    this.cardsContainer = document.querySelector(
      ".section-card__cards-container"
    );
    this.addEventsToCardsButtons();
    await HbsService.fillCardContainer(this.cardsContainer);
  }

  static addEventsToCardsButtons() {
    this.cardsContainer.addEventListener("click", async (e) => {
      let id;
      if ((id = e.target.dataset.delete)) {
        e.preventDefault();
        if (!this.state.login.admin) {
          popup.init(
            `<i class="fa-solid fa-circle-exclamation"></i> 
            Función solo válida para usuarios logeados`
          );
          return;
        }
        const productToDelete = await ProductService.getProduct(id);

        if (!ProductService.checkSuccessfulFetch(productToDelete)) {
          popup.init(
            `<i class="fa-solid fa-circle-exclamation"></i> 
            Algo salió mal, inténtelo más tarde`
          );
          return;
        }
        const confirm = await Modal.init("modalRemove", null, productToDelete);
        if (!confirm) return;
        const deleted = await ProductService.deleteProduct(id);
        console.info("Producto Eliminado:", productToDelete);

        // Nunca se va a activar ya que JSON server devuelve un objeto vacio cuando borra
        // if (!ProductService.checkSuccessfulFetch(deleted)) {
        //   popup.init(
        //     `<i class="fa-solid fa-circle-exclamation"></i>
        //     Algo salió mal, inténtelo más tarde`
        //   );
        //   return;
        // }

        popup.init(
          `<i class="fa-solid fa-check"></i> 
          Producto eliminado correctamente`
        );
        await HbsService.fillCardContainer(this.cardsContainer);
        return;
      }
      if ((id = e.target.dataset.edit)) {
        e.preventDefault();
        if (!this.state.login.admin) {
          popup.init(
            `<i class="fa-solid fa-circle-exclamation"></i> 
            Función solo válida para usuarios logeados`
          );
        }
        paramsPage.alta ||= {};
        paramsPage.alta.id = id;
        paramsPage.alta.state = "update";
        window.location.hash = "#/alta";
      }
    });
  }
}
