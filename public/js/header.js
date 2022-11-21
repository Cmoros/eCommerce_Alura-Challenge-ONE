import BtnLogin from "./modules/BtnLogin.js";

export default class Header {
  static async init () {
    
    const header = document.querySelector(".main-header");
    
    /***************
     * SEARCH FORM *
     ***************/
    
    const searchFormLabel = header.querySelector(".search-form__label");
    const searchFormInput = header.querySelector(".search-form__input");
    const searchFormSubmit = header.querySelector(".search-form__submit");
    const searchFormToggle = header.querySelector(".main-nav-search-form-toggle");
    
    function disableEmptyForm(input, submit) {
      if (input.value === "") {
        submit.style.pointerEvents = "none";
      } else {
        submit.style.pointerEvents = "auto";
      }
    }
    
    function toggleForOfLabelSearchForm(bool = true) {
      if (searchFormToggle.checked === bool) {
        searchFormLabel.removeAttribute("for");
      } else {
        searchFormLabel.setAttribute("for", "search-form__input");
      }
    }
    
    disableEmptyForm(searchFormInput, searchFormSubmit);
    
    searchFormInput.addEventListener("input", (e) => {
      disableEmptyForm(e.target, searchFormSubmit);
    });
    
    searchFormLabel.addEventListener("click", (e) => {
      searchFormToggle.checked = true;
    });
    
    searchFormInput.addEventListener("focusout", (e) => {
      if (e.target.value === "") {
        searchFormToggle.checked = false;
      }
      searchFormInput.blur();
    });
    
    /*************
     * BTN LOGIN *
     *************/
    
    const btnLoginHTML = header.querySelector(".btn--login");
    
    const btnLoginHeader = new BtnLogin(btnLoginHTML);
  }
}

// Header.init()