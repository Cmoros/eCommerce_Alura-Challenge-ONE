import Spin from "./Spin.js";

let modalBG;
const body = document.querySelector("body");

export default class Modal {
  static async init(url, fn = () => {}, objToRender = {}) {
    return new Promise(async (resolve) => {
      body.classList.add("open-modal");
      await Modal.create(url, resolve, fn, objToRender);
    });
  }

  static async create(url, resolve, fn, objToRender) {
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
    const textoToRender = await fetch(url).then((r) =>
      r.text()
    );
    const template = Handlebars.compile(textoToRender);
    const html = template({...objToRender});
    modalBG.innerHTML = html;
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
