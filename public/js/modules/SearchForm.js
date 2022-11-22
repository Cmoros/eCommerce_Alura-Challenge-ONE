import paramsPage from "../paramsPage.js";

export default class SearchForm {
  static init() {
    SearchForm.header = document.querySelector(".main-header");
    SearchForm.form = SearchForm.header.querySelector(".search-form");
    SearchForm.searchFormLabel = SearchForm.form.querySelector(
      ".search-form__label"
    );
    SearchForm.searchFormInput = SearchForm.form.querySelector(
      ".search-form__input"
    );
    SearchForm.searchFormSubmit = SearchForm.form.querySelector(
      ".search-form__submit"
    );
    SearchForm.searchFormToggle = document.querySelector(
      ".main-nav-search-form-toggle"
    );

    SearchForm.disableEmptyForm(
      SearchForm.searchFormInput,
      SearchForm.searchFormSubmit
    );

    SearchForm.addEvents();
  }

  static disableEmptyForm(input, submit) {
    if (input.value === "") {
      submit.style.pointerEvents = "none";
    } else {
      submit.style.pointerEvents = "auto";
    }
  }

  static toggleForOfLabelSearchForm(bool = true) {
    if (searchFormToggle.checked === bool) {
      SearchForm.searchFormLabel.removeAttribute("for");
    } else {
      SearchForm.searchFormLabel.setAttribute("for", "search-form__input");
    }
  }

  static addEvents() {
    SearchForm.searchFormInput.addEventListener("input", (e) => {
      SearchForm.disableEmptyForm(e.target, SearchForm.searchFormSubmit);
    });

    SearchForm.searchFormLabel.addEventListener("click", (e) => {
      SearchForm.searchFormToggle.checked = true;
    });

    SearchForm.searchFormInput.addEventListener("focusout", (e) => {
      if (e.target.value === "") {
        SearchForm.searchFormToggle.checked = false;
      }
      SearchForm.searchFormInput.blur();
    });

    SearchForm.form.addEventListener('submit', async (e) => {
      e.preventDefault();
      paramsPage.listado ||= {};
      paramsPage.listado.q = SearchForm.searchFormInput.value;
      console.log(paramsPage)
      if (location.hash == "#/listado") {
        await paramsPage.current[0].init(paramsPage.listado);
        return;
      }
      location.hash = "#/listado";
    })
  }
}
