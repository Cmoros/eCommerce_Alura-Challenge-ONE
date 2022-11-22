import Form from "../js/modules/Form.js";
import MessageService from "../services/MessageService.js";

const errors = {
  "nosotros-name": {
    message: "Máximo de 40 caracteres",
    regExp: /^.{1,40}$/,
  },
  "nosotros-message": {
    message: "Máximo de 120 caracteres",
    regExp: /^.{1,120}$/,
  },
};

export default class Footer {
  static async init() {
    const footerFormHTML = document.querySelector(".form--contacto");
    const footerForm = new Form(footerFormHTML, errors, async function () {
      const inputs = footerFormHTML.querySelectorAll("[name]");
      const data = {};
      inputs.forEach((input) => (data[input.name] = input.value));
      const message = await MessageService.createMessage(data);
      console.info(message);
      if (Object.keys(message).length > 0) {
        console.info("Mensaje enviado correctamente");
        this.restartForm();
        return;
      }
      console.error("Error enviando el mensaje");
    });
  }
}

// Footer.init();
