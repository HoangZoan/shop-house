import { View } from "./view.js";
import {
  convertNumberToPriceString,
  calcSalesPrice,
  Carousel,
} from "../helpers.js";
import {
  renderBadgesNumber,
  checkUserAuthentication,
  toggleShowAuthenticationModal,
} from "../model.js";

export class PreviewProductsView extends View {
  _parentElement;
  _heartButtonsElement;
  _bestSellerHasRendered = false;
  _newComingHasRendered = false;
  _followingPurchaseHasRendered = false;
  _similarProductsHasRendered = false;
  _notFoundMessage = "Chưa có sản phẩm";

  clearHeartedButtonsWhenLogout() {
    if (!this._checkAuthenticationUser()) {
      console.log(this._checkAuthenticationUser());
      const allHeartedButtonsEl = document.querySelectorAll(
        ".card-favorite-btn.is-hearted"
      );

      allHeartedButtonsEl.forEach((el) => el.classList.remove("is-hearted"));
    }
  }

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

  checkProductsTypeHasRendered(type) {
    switch (type) {
      case "best-seller":
        return this._bestSellerHasRendered;
      case "new-coming":
        return this._newComingHasRendered;
      case "following-purchase":
        return this._followingPurchaseHasRendered;
      case "similar-products":
        return this._similarProductsHasRendered;
    }
  }

  setProductTypeHasRendered(type) {
    switch (type) {
      case "best-seller":
        this._bestSellerHasRendered = true;
        break;
      case "new-coming":
        this._newComingHasRendered = true;
        break;
      case "following-purchase":
        this._followingPurchaseHasRendered = true;
        break;
      case "similar-products":
        this._similarProductsHasRendered = true;
        break;
    }
  }

  checkIfHeartButtonEventIsAllSet() {
    return this._heartButtonsElement;
  }

  setHeartButtonsElement(addHandler, removeHandler, reload) {
    this.setMultiComponentElementsClass(
      "_heartButtonsElement",
      ".card-favorite-btn"
    );
    this._addHeartButtonClickHandler(addHandler, removeHandler, reload);
  }

  _setHeartButtonStyle(heartButton, iconSvg, isHearted) {
    if (!isHearted) {
      heartButton.classList.add("active");
    }

    iconSvg.style.animation = "growAndShrink 0.4s";

    setTimeout(() => {
      heartButton.classList.remove("active");
      iconSvg.style.animation = "none";
    }, 600);
  }

  _addHeartButtonClickHandler(addHandler, removeHandler, reload = false) {
    const _this = this;

    this._heartButtonsElement.forEach((element) => {
      element.addEventListener("click", (event) => {
        const user = checkUserAuthentication();
        if (!user) {
          toggleShowAuthenticationModal();
          return;
        }

        const btn = event.target.closest(".card-favorite-btn");
        const iconSvg = btn.querySelector("svg");
        const isHearted = btn.classList.contains("is-hearted");
        const productId = btn.dataset.productId;

        if (!btn) return;

        if (Boolean(isHearted)) {
          btn.classList.remove("is-hearted");
          removeHandler(productId, "favorite-products");

          if (reload) {
            window.location.reload();
          }
        } else {
          btn.classList.add("is-hearted");
          addHandler(productId);
        }

        _this._setHeartButtonStyle(btn, iconSvg, isHearted);
        renderBadgesNumber();
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
      
              <div 
                class="card-favorite-btn center-content ${
                  _this._checkFavoriteProduct(data.id) ? "is-hearted" : ""
                }" 
                data-product-id=${data.id}
              >
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
