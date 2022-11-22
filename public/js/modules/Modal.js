import Spin from "./Spin.js";
import HbsService from "../../services/HbsService.js"

let modalBG;
const body = document.querySelector("body");

export default class Modal {
  static async init(hbs, fn = () => {}, objToRender = {}) {
    return new Promise(async (resolve) => {
      body.classList.add("open-modal");
      await Modal.create(hbs, resolve, fn, objToRender);
    });
  }

  static async create(hbs, resolve, fn, objToRender) {
    modalBG = document.createElement("div");
    modalBG.classList.add("modal__bg");
    modalBG.addEventListener("click", (e) => {
      if (
        e.target.classList.contains("modal__bg") ||
        e.target.classList.contains("modal__close-btn")
      ) {
        Modal.close(fn);
        resolve(false);
        return;
      }
      if (e.target.classList.contains("modal__success")) {
        Modal.close(fn);
        resolve(true);
        return;
      }
      if (e.target.classList.contains("modal__link")) {
        Modal.close(fn);
        resolve(e.target.href);
      }
    });
    body.append(modalBG);
    Spin.init();
    await HbsService.renderTemplate(hbs, objToRender, modalBG)
    Spin.remove();
  }

  static close(fn) {
    body.classList.remove("open-modal");
    modalBG.remove();
    if (typeof fn == "function") {
      fn();
    }
  }
}
