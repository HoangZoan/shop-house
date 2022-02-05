import { View } from "./view.js";
import { convertNumberToPriceString, calcSalesPrice } from "../helpers.js";

export class PreviewProductsView extends View {
  _parentElement;
  _heartButtonsElement;

  getLocationSearchQueries() {
    return window.location.search
      .slice(1)
      .split("?")
      .map((item) => item.split("="))
      .reduce((obj, data) => {
        obj[data[0]] = data[1];

        return obj;
      }, {});
  }

  getProductBySearchQueries(products, queries) {
    let bestSeller = [],
      newComing = [],
      regular = [],
      output;

    const getProductsArrangedByPrice = (products, asc = true) => {
      const productsData = products.slice(0);

      for (let i = 0; i < productsData.length; i++) {
        for (let j = 0; j < productsData.length; j++) {
          const isSmaller =
            calcSalesPrice(
              productsData[i].initialPrice,
              productsData[i].tags.discount
            ) <
            calcSalesPrice(
              productsData[j].initialPrice,
              productsData[j].tags.discount
            );

          if (asc ? isSmaller : !isSmaller) {
            let middle;
            middle = productsData[i];
            productsData[i] = productsData[j];
            productsData[j] = middle;
          }
        }
      }

      return productsData;
    };

    for (const product of products) {
      if (product.tags.new) {
        newComing.push(product);
        continue;
      }
      if (product.tags.bestSeller) {
        bestSeller.push(product);
        continue;
      }
      regular.push(product);
    }

    if (queries.arrange === "most-purchased")
      output = [...bestSeller, ...newComing, ...regular];

    if (queries.arrange === "new-release")
      output = [...newComing, ...bestSeller, ...regular];

    if (queries.arrange === "price-asc") {
      output = getProductsArrangedByPrice(products.slice(0));
    }

    if (queries.arrange === "price-des") {
      output = getProductsArrangedByPrice(products.slice(0), false);
    }

    const sortQueries = Object.keys(queries).slice(0, -1);
    console.log(sortQueries);

    return output;
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
                  _this._data[index].sort,
                  data.id
                )}" 
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
                      <div class="card-text__product-title">
                          ${data.title}
                      </div>

                      ${_this._generatePrice(
                        data.initialPrice,
                        data.tags.discount
                      )}
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
