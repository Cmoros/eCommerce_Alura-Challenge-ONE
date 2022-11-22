import BtnLogin from "./modules/BtnLogin.js";
import SearchForm from "./modules/SearchForm.js";

export default class Header {
  static async init () {
    
    
    
    /***************
     * SEARCH FORM *
     ***************/
    
    SearchForm.init();
    
    /*************
     * BTN LOGIN *
     *************/
    const header = document.querySelector(".main-header");
    const btnLoginHTML = header.querySelector(".btn--login");
    
    const btnLoginHeader = new BtnLogin(btnLoginHTML);
  }
}

// Header.init()