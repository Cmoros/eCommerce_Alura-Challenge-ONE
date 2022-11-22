const main = document.querySelector('main')

export default class ImageDefault {
  static init(container = main) {
    const images = container.querySelectorAll('img')
    images.forEach((img => {
      img.addEventListener("error", (e) => {
        if (e.target.tagname == "IMG") {
          e.target.src = "/assets/default.jpg";
        }
      });
    }))
  }
}
