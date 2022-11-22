import Form from "../modules/Form.js";
import ProductService from "../../services/ProductService.js";
import popup from "../modules/popup.js";

const errors = {
  "alta-image": {
    regExp: /^.{1,}$/,
    message: "URL de Imagen inválido",
  },
  "alta-category": {
    regExp: /^.{1,30}$/,
    message: "Campo categoría con máximo de 30 caracteres",
  },
  "alta-name": {
    regExp: /^.{1,30}$/,
    // Segun la consigna eran 20 pero los mismos nombres del figma no entraban
    message: "Campo nombre con máximo de 30 caracteres",
  },
  "alta-price": {
    regExp: /^\d{1,10}$/,
    message: "Campo de nombre solo debe contener números",
  },
  "alta-description": {
    regExp: /^.{1,375}$/,
    // Segun configna eran 150 pero la descripcion dada en la pagina individual del figma no entraba
    message: "Campo descripción con máximo de 375 caracteres",
  },
};

export default class AltaPage {
  static async init(params) {
    this.state = params;
    this.state.state ||= "create";
    this.id = params.id;
    this.altaFormHTML = document.querySelector(".form--alta");
    this.altaForm = new Form(
      this.altaFormHTML,
      errors,
      this[this.state.state + "SubmitFn"]
    );
    this.altaForm.fields = this.altaFormHTML.querySelectorAll("[name]");
    this.submitBtn = this.altaFormHTML.querySelector(".form__submit");
    this.altaForm.fillForm = function (product) {
      this.fields.forEach((field) => {
        field.value = product[field.name];
      });
    };
    this.formTitle = this.altaFormHTML.querySelector(".form__title");
    this.formSubmitBtn = this.altaFormHTML.querySelector(".form__submit");
    this.formResetBtn = this.altaFormHTML.querySelector(".form__reset");
    this.altaFormHTML.addEventListener("reset", (e) => {
      this.state.state = "create";
      this.updateFormByState();
    });

    await this.updateLoginState();
  }

  static async createSubmitFn() {
    const data = this.gatherData();
    try {
      const result = await ProductService.createProduct(data);
      if (!ProductService.checkSuccessfulFetch(result)) {
        throw new Error("Objeto vacío devuelto por json server");
      }
      this.restartForm();
      console.info("Producto creado correctamente:");
      console.info(result);
      popup.init(`<i class="fa-solid fa-check"></i> Producto creado correctamente!`)
    } catch (e) {
      console.error("Error en creación de producto: ", e);
    }
  }

  static async updateSubmitFn() {
    const data = this.gatherData();
    try {
      const result = await ProductService.updateProduct(AltaPage.id, data);
      if (!ProductService.checkSuccessfulFetch(result)) {
        throw new Error("Objeto vacío devuelto por json server");
      }
      this.restartForm();
      AltaPage.state = "create";
      AltaPage.updateFormByState();
      console.info("Producto actualizado correctamente:");
      console.info(result);
      popup.init(`<i class="fa-solid fa-check"></i> Producto actualizado correctamente!`)
    } catch (e) {
      console.error("Error en actualización de producto: ", e);
    }
  }

  static async updateFormByState() {
    if (this.state.state == "update") {
      const product = await ProductService.getProduct(AltaPage.id);
      this.altaForm.fillForm(product);
      this.altaForm.updateValidations();
      this.formTitle.innerHTML = "Modificar el producto de ID: " + product.id;
      this.formSubmitBtn.innerHTML = "Modificar Producto";
      this.formResetBtn.classList.remove("hidden");
    } else if (this.state.state == "create") {
      this.formTitle.innerHTML = "Agregar nuevo producto";
      this.formSubmitBtn.innerHTML = "Agregar Producto";
      this.formResetBtn.classList.add("hidden");
    } else {
      console.warn("bug");
    }
  }

  static async updateLoginState() {
    const admin = this.state.login.admin;
    this.submitBtn.classList.toggle("proc-none", !admin);
    this.submitBtn.classList.toggle("disabled", !admin);
    if (admin) {
      this.altaForm.enableForm();
      this.updateFormByState();
    } else {
      this.state.state = "create";
      this.updateFormByState();
      this.altaForm.restartForm();
      this.altaForm.disableForm();
      this.submitBtn.innerHTML = "Disponible para Admins";
    }
  }
}
