import { login } from "../controllers/login.controller.js";
import paramsPage from "./paramsPage.js";
// import ImageDefault from "./modules/img.js";

const exceptions = ["producto"];

class Main {
  async ajax(url, method = "get") {
    return await fetch(url, { method: method }).then((r) => r.text());
  }

  getIdFromHash() {
    let id = location.hash.slice(1);
    for (const exception of exceptions) {
      if (id.split('/').includes(exception)) {
        id = exception;
        break;
      }
    }
    if (id[0] === "/") {
      id = id.slice(1);
    }
    return id || "inicio";
  }

  getViewUrlFromId(id) {
    return `./views/${id}.html`;
  }

  getModuleUrlFromId(id) {
    return `/js/pages/${id}.js`;
  }

  // setActiveLink(id) {
  //     const links = document.querySelectorAll('.main-nav__link');
  //     links.forEach(link => {
  //         if (link.getAttribute('href') === `#/${id}`) {
  //             link.classList.add('main-nav__link--active');
  //             link.ariaCurrent = 'page';
  //         } else {
  //             link.classList.remove('main-nav__link--active');
  //             link.removeAttribute('aria-current');
  //         }
  //     });
  // }

  async initJS(id) {
    const moduleUrl = this.getModuleUrlFromId(id);
    try {
      paramsPage[id] ||= { login: paramsPage.login };
      console.log(`Current Params for ${id}:`);
      console.log(paramsPage[id]);
      const { default: module } = await import(moduleUrl);
      paramsPage.current.pop();
      paramsPage.current.push(module);
      if (typeof module.init !== "function") {
        console.error(`El módulo ${id} no posee un método init().`);
        return;
      }
      await module.init(paramsPage[id]);
    } catch (error) {
      console.error(`No se pudo importar el módulo ${moduleUrl}.`, error);
    }
  }

  async loadTemplate() {
    const id = this.getIdFromHash();

    const viewUrl = this.getViewUrlFromId(id);
    const viewContent = await this.ajax(viewUrl);
    document.querySelector("main").innerHTML = viewContent;
    // ImageDefault.init();
    // this.setActiveLink(id);

    await this.initJS(id);
  }

  async loadTemplates() {
    await this.loadTemplate();
    window.addEventListener("hashchange", () => this.loadTemplate());
  }

  async checkAdmin() {
    const mail = localStorage.getItem("mail");
    const password = localStorage.getItem("password");
    try {
      await login(mail, password);
    } catch (e) {
      localStorage.removeItem("mail");
      localStorage.removeItem("password");
    }
  }

  async start() {
    await this.checkAdmin();
    await this.loadTemplates();
    const { default: header } = await import("./header.js");
    await header.init();
    const { default: footer } = await import("./footer.js");
    await footer.init();
  }
}

const main = new Main();
await main.start();

export { paramsPage };
