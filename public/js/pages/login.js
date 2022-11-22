import { login, logout } from "../../controllers/login.controller.js";
import Form from "../modules/Form.js";
import BtnLogin from "../modules/BtnLogin.js";


const errors = {
  "login-mail": {
    regExp: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    message: "El mail debe contener un @ y dominio",
  },
  "login-password": {
    regExp: /^.{1,}$/,
    message: "Error en el campo de contraseña",
  },
};

export default class LoginPage {
  static async init(params) {
    this.state = params;
    this.loginFormHTML = document.querySelector(".form--login");
    this.loginForm = new Form(this.loginFormHTML, errors, async function (e) {
      e.preventDefault();
      const data = this.gatherData();
      if (!params?.admin) {
        const result = await login(data.mail, data.password);
        if (result) {
          console.info("Logeado correctamente");
          this.restartForm();
          LoginPage.updateLoginState();
          return;
        }
        console.warn("Hubo un error en el logeo");
        return;
      }
      console.warn("El usuario ya está logeado");
    });
    this.loginFormHTML.querySelectorAll("[name]").forEach((field) => {
      this.loginForm.fields.push(field);
    });
    this.logoutBtn = this.loginFormHTML.querySelector(".form__logout");
    this.submitBtn = this.loginFormHTML.querySelector(".form__submit");
    this.updateLoginState();

    this.logoutBtn.addEventListener("click", (e) => {
      logout();
      this.updateLoginState();
    });
  }

  static updateLoginState() {
    const admin = this.state.admin;

    this.submitBtn.classList.toggle("proc-none", !!admin);
    this.submitBtn.classList.toggle("disabled", !!admin);
    this.submitBtn.innerHTML = admin ? "Ya se encuentra loggeado" : "Entrar";
    admin ? this.loginForm.disableForm() : this.loginForm.enableForm();

    this.logoutBtn.classList.toggle("hidden", !admin);
    BtnLogin.updateAll();
  }
}
