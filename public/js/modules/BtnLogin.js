import { logout } from "../../controllers/login.controller.js";
import paramsPage from "../paramsPage.js";
import Modal from "./Modal.js";

export default class BtnLogin {
  static btnsEls = [];

  static updatedToAdmin = false;

  constructor(btnEl) {
    this.btnEl = btnEl;
    this.loginObj = paramsPage.login;
    BtnLogin.btnsEls.push(this);
    this.btnEl.addEventListener("click", async (e) => {
      if (this.loginObj.admin) {
        e.preventDefault();
        const logoutRes = await Modal.init("/templates/modal.hbs");
        if (!logoutRes) return;
        // this.loginObj.admin = false;
        logout();
        this.update();
      }
    });
    this.update();
  }

  update() {
    const admin = this.loginObj.admin;
    if (admin === BtnLogin.updatedToAdmin) {
      return;
    }
    BtnLogin.updatedToAdmin = admin;
    this.btnEl.innerHTML = admin ? "Logout" : "Login";
    console.log("paramsPage", paramsPage);
    if (typeof paramsPage.current[0].updateLoginState === "function") {
      paramsPage.current[0].updateLoginState();
    }
  }

  static updateAll() {
    BtnLogin.btnsEls.forEach((btnLogin) => btnLogin.update());
  }
}
