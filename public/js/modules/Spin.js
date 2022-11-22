const container = document.createElement("div");
container.classList.add("spin__container");
container.innerHTML = `<div class="loading-spinner-container">
<div class="loading-spinner">
<div class="loading-spinner-block loading-spinner-block--1"></div>
<div class="loading-spinner-block loading-spinner-block--2"></div>
<div class="loading-spinner-block loading-spinner-block--3"></div>
<div class="loading-spinner-block loading-spinner-block--4"></div>
<div class="loading-spinner-block loading-spinner-block--5"></div>
<div class="loading-spinner-block loading-spinner-block--6"></div>
<div class="loading-spinner-block loading-spinner-block--7"></div>
<div class="loading-spinner-block loading-spinner-block--8"></div>
</div></div>`;

const body = document.querySelector("body");

export default class Spin {
  static init(target = body) {
    getComputedStyle(target).width;
    target.append(container);
  }

  static remove() {
    container.remove();
  }
}
