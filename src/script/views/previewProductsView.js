import { View } from "./view.js";
import { convertPriceNumber, calcSalesPrice } from "../helpers.js";

export class PreviewProductsView extends View {
  _parentElement;
  _heartButtonsElement;

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

  setHeartButtonsElement(handler) {
    this.setMultiComponentElementsClass(
      "_heartButtonsElement",
      ".card-favorite-btn"
    );
    this._addHeartButtonClickHandler(handler);
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
            Giá: <span class="price-text">${convertPriceNumber(
              initialPrice
            )}đ</span>
        </div>
        `;
    } else {
      return `
        <div class="card-text__price--current">
            Giá: <span class="price-text">${convertPriceNumber(
              calcSalesPrice(initialPrice, discount)
            )}đ</span>
        </div>
        
        <div class="card-text__price--old">
            <del class="price-text">${convertPriceNumber(initialPrice)}đ</del>
        </div>
        `;
    }
  }

  _generateHrefLink(currentPage) {
    if (currentPage === "home") return "./pages/product-detail.html";

    if (currentPage === "branch-page") return "";

    if (currentPage === "side-page") return "./product-detail.html";
  }

  _generateMarkup(homepage) {
    const _this = this;

    return this._data
      .map((data, index) => {
        return `
          <div class="main-cards__cards__product-card-container">
              <a 
                href="${_this._generateHrefLink(
                  _this._currentPage
                )}${_this.setLocationSearch(
          null,
          _this._data[index].sort,
          false
        )}#${data.id}" 
                class="main-cards__cards__product-card">
                  <div class="card-img">
                      <img 
                        src="${
                          homepage === "home" ? "" : "."
                        }./resources/images/products/${data.id}/thmb.jpg" 
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
                      ${_this._generatePrice(
                        data.initialPrice,
                        data.tags.discount
                      )}

                      <div class="card-text__product-title">
                          ${data.title}
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
