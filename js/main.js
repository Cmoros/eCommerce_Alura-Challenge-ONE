const searchFormLabel = document.querySelector(".search-form__label");
const searchFormInput = document.querySelector(".search-form__input");
const searchFormSubmit = document.querySelector(".search-form__submit");
const searchFormToggle = document.querySelector(".main-nav-search-form-toggle");

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