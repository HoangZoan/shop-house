"use strict";

// DRAFT

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

const brandsItemEl = `
    <a href="#" class="main-cards__cards__brand-card">
        <div class="card-img">
        <img
            src="./resources/images/brands/chilai-wall.png"
            alt="Photo of furniture"
        />
        </div>
        <div class="card-brand-logo">
        <img
            src="./resources/images/brands/chilai-logo.png"
            alt="Chilai Logo"
        />
        </div>
    </a>
`;

const brandsMarkup = [brandsItemEl, brandsItemEl, brandsItemEl].join(" ");
renderMainCards(["main-cards__cards", "variant-banner"], brandsMarkup);

const productReviewEl = `
    <a href="#" class="main-cards__cards__product-card">
        <div class="card-img">
            <img src="./resources/images/products/p1.jpg" alt="Product" />
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

const productReviewMarkup = [
  productReviewEl,
  productReviewEl,
  productReviewEl,
  productReviewEl,
].join(" ");
renderMainCards("test-1", productReviewMarkup);
renderMainCards("test-2", productReviewMarkup);
