import { checkAdmin } from "../controllers/login.controller.js";
import {} from "../controllers/scroll.controller.js";
import paramsPage from "./paramsPage.js";
import Spin from "./modules/Spin.js";
import PageService from "../services/PageService.js";

// import ImageDefault from "./modules/img.js";

const exceptions = ["producto"];

class Main {
  getIdFromHash() {
    let id = location.hash.slice(1);
    for (const exception of exceptions) {
      if (id.split("/").includes(exception)) {
        id = exception;
        break;
      }
    }
    if (id[0] === "/") {
      id = id.slice(1);
    }
    return id || "inicio";
  }

  getModuleUrlFromId(id) {
    return `/js/pages/${id}.js`;
  }

  async initJS(id) {
    const moduleUrl = this.getModuleUrlFromId(id);
    try {
      paramsPage[id] ||= {};
      paramsPage[id].login = paramsPage.login;
      console.info(`Current Params for ${id}:`);
      console.info(paramsPage[id]);
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
    const main = document.querySelector("main");

    Spin.init(main);
    const viewContent = await PageService.getPage(id);
    this.updateTitle(id)
    main.innerHTML = viewContent;
    Spin.remove();

    await this.initJS(id);
  }

  async loadTemplates() {
    await this.loadTemplate();
    window.addEventListener("hashchange", () => {
      this.loadTemplate();
    });
  }

  updateTitle(id) {
    id = id[0].toUpperCase() + id.slice(1);
    document.title = `${id} - Alura Geek - Cesar Moros`;
  }

  async start() {
    await checkAdmin();
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
