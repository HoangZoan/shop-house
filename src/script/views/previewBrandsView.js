import { View } from "./view.js";

class PreviewBrandsView extends View {
  _parentElement = document.querySelector(".brands-preview");

  _generateMarkup() {
    return this._data
      .map((data) => {
        return `
        <a href="./pages/product-list.html?category=${data}" class="main-cards__cards__brand-card">
            <div class="card-img">
                <img
                src="./resources/images/brands/${data}-wall.png"
                alt="Photo of product from ${data}"
                />
            </div>
            <div class="card-brand-logo">
                <img
                src="./resources/images/brands/${data}-logo.png"
                alt="${data} logo"
                />
            </div>
        </a>
        `;
      })
      .join("\n");
  }
}

export default new PreviewBrandsView();
