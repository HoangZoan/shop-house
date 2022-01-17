"use strict";

const renderMainCards = (parentClasses, markup) => {
  let parentEl;

  if (!Array.isArray(parentClasses)) {
    parentEl = document.querySelector(`.${parentClasses}`);
  } else {
    const parentClassStr = parentClasses
      .map((cl) => {
        return "." + cl;
      })
      .join("");

    parentEl = document.querySelector(`${parentClassStr}`);
  }

  parentEl.insertAdjacentHTML("beforeend", markup);
};

const productReviewMarkup = `
    <a href="#" class="main-cards__cards__product-card">
        <div class="card-img">
            <img src="../resources/images/products/p1.jpg" alt="Product" />
        </div>
        <div class="card-text">
            <div class="card-text__price card-text__price--current">
                Giá: <span class="price-text">3.999.000đ</span>
            </div>
            <div class="card-text__price card-text__price--old">
                <del class="price-text">4.499.000đ</del>
            </div>
            <div class="card-text__product-title">
                Ghế trẻ nhỏ Alcalde Kids Activity
            </div>
        </div>
    </a>
`;

let renderMarkup = [];

for (let i = 1; i <= 12; i++) {
  renderMarkup.push(productReviewMarkup);
}

renderMainCards("variant-product-list", renderMarkup.join(" "));
