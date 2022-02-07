import { View } from "./view.js";
import { Carousel } from "../helpers.js";

class PreviewBrandsView extends View {
  _parentElement = document.querySelector(".brands-preview");

  addCarouselsHandler() {
    const carousel = new Carousel("brands-preview", {
      btnPrev: "slider-btn--prev",
      btnNext: "slider-btn--next",
      sliderType: "multi-slides",
      cardShown: 3,
      gap: "4.8rem",
      responsive: [
        { breakPoint: "31.25em", cardShown: 1 },
        { breakPoint: "40em", gap: "2.8rem" },
        { breakPoint: "60em", cardShown: 2 },
      ],
      hoverEffect: {
        transform: "translateY(-2px)",
      },
    });
  }

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
