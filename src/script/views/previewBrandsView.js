import { View } from "./view.js";

class PreviewBrandsView extends View {
  _parentElement = document.querySelector(".brands-preview");

  _generateMarkup() {
    return this._data
      .map((data) => {
        return `
        <a 
          href="./pages/product-list.html?brand=${data.value}?arrange=most-purchased" 
          class="main-cards__cards__brand-card">
            <div class="card-img">
                <img
                src="./resources/images/brands/${data.value}-wall.png"
                alt="Photo of product from ${data.value}"
                />
            </div>
            <div class="card-brand-logo">
                <img
                src="./resources/images/brands/${data.value}-logo.png"
                alt="${data.value} logo"
                />
            </div>
        </a>
        `;
      })
      .join("\n");
  }
}

export default new PreviewBrandsView();
