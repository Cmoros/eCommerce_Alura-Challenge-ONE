document.addEventListener("click", (e) => {
  let id = "";
  if ((id = e.target.dataset.scroll)) {
    e.preventDefault();
    const el = document.getElementById(id);
    scrollTo(0, el.scrollTop + window.innerHeight / 2);
  }
});

window.addEventListener("hashchange", () => {
  scrollTo(0, 0);
});
