import { View } from "./view.js";
import { convertNumberToPriceString, calcSalesPrice } from "../helpers.js";
import { Carousel } from "../helpers.js";

export class PreviewProductsView extends View {
  _parentElement;
  _heartButtonsElement;
  _notFoundMessage = "Chưa có sản phẩm";

  addCarouselsHandler(sliderClassName) {
    const carousel = new Carousel(sliderClassName, {
      btnPrev: "slider-btn--prev",
      btnNext: "slider-btn--next",
      sliderType: "multi-slides",
      cardShown: 4,
      gap: "2.4rem",
      responsive: [
        { breakPoint: "31.25em", cardShown: 1 },
        { breakPoint: "40em", cardShown: 2 },
        { breakPoint: "60em", cardShown: 3 },
      ],
    });
  }

  setHeartButtonsElement(handler) {
    this.setMultiComponentElementsClass(
      "_heartButtonsElement",
      ".card-favorite-btn"
    );
    this._addHeartButtonClickHandler(handler);
  }

  _setHeartButtonStyle(heartButton, iconSvg) {
    heartButton.classList.add("active");
    iconSvg.style.animation = "growAndShrink 0.4s";

    setTimeout(() => {
      heartButton.classList.remove("active");
      iconSvg.style.animation = "none";
    }, 600);
  }

  _addHeartButtonClickHandler(handler) {
    const _this = this;

    this._heartButtonsElement.forEach((element) => {
      element.addEventListener("click", (event) => {
        const btn = event.target.closest(".card-favorite-btn");
        const iconSvg = btn.querySelector("svg");
        if (!btn) return;

        _this._setHeartButtonStyle(btn, iconSvg);
        handler(btn.dataset.productId);
      });
    });
  }

  _generateTags(tagName, data) {
    if (!data) return "";

    let content;

    switch (tagName) {
      case "new":
        content = "Mới";
        break;
      case "best-seller":
        content = "Bán chạy";
        break;
      case "discount":
        content = `Giảm ${data}%`;
        break;
      case "free-ship":
        content = "Free ship";
        break;
      case "gift":
        content = "Quà tặng";
        break;
    }

    return `
    <div class="product-card-tags__item product-card-tags__item--${tagName}">
        ${content}
    </div>
    `;
  }

  _generatePrice(initialPrice, discount) {
    if (!discount) {
      return `
        <div class="card-text__price--current">
            Giá: <span class="price-text">${convertNumberToPriceString(
              initialPrice - 1000
            )}đ</span>
        </div>
        `;
    } else {
      return `
        <div class="card-text__price--current">
            Giá: <span class="price-text">${convertNumberToPriceString(
              calcSalesPrice(initialPrice, discount) - 1
            )}đ</span>
        </div>
        
        <div class="card-text__price--old">
            <del class="price-text">${convertNumberToPriceString(
              initialPrice - 1000
            )}đ</del>
        </div>
        `;
    }
  }

  _generateMarkup(homepage) {
    const _this = this;

    return this._data
      .map((data, index) => {
        return `
          <div class="main-cards__cards__product-card-container">
              <a 
                href="${_this._generateHrefLink(
                  _this._currentPage,
                  _this._data[index].sort || [],
                  data.id
                )}" 
                class="main-cards__cards__product-card">
                  <div class="card-img">
                      <img 
                        src="${data.thmbImage}" 
                        alt="Product" 
                      />
      
                      <div class="product-card-tags">
                          ${_this._generateTags("new", data.tags.new)}
                          ${_this._generateTags(
                            "best-seller",
                            data.tags.bestSeller
                          )}
                          ${_this._generateTags("discount", data.tags.discount)}
                          ${_this._generateTags(
                            "free-ship",
                            data.tags.freeShip
                          )}
                          ${_this._generateTags("gift", data.tags.gift)}
                      </div>
                  </div>
                  <div class="card-text">
                      <div class="card-text__product-title">
                          ${data.title}
                      </div>

                      <div class="card-text__price-wrapper">
                        ${_this._generatePrice(
                          data.initialPrice,
                          data.tags.discount
                        )}
                      </div>
                  </div>
              </a>
      
              <div class="card-favorite-btn center-content" data-product-id=${
                data.id
              }>
                  <svg>
                      <use xlink:href="${
                        homepage === "home" ? "" : "../"
                      }resources/icons/sprite.svg#heart-fill"></use>
                  </svg>

                  <div class="card-favorite-btn__pop-up">Đã thêm</div>
              </div>
          </div>
          `;
      })
      .join("\n");
  }
}

export default new PreviewProductsView();
