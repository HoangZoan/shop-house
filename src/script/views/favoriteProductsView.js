import { View } from "./view.js";
import { convertNumberToPriceString, calcSalesPrice } from "../helpers.js";
import {
  persistDataOnLocalStorage,
  getDataFromLocalStorage,
} from "../model.js";

class FavoriteProductsView extends View {
  _parentElement = document.querySelector(".favorite-product-preview");
  _deleteButtons;
  _notFoundMessage = "Bạn chưa có sản phẩm yêu thích nào";

  addDeleteClickHandler(handler) {
    this._deleteButtons.forEach((btn) => {
      btn.addEventListener("click", (event) => {
        const productsAfterDelete = getDataFromLocalStorage(
          "favorite-products"
        ).filter((product) => product.id !== event.target.dataset.productId);

        if (productsAfterDelete.length === 0) {
          window.localStorage.removeItem("favorite-products");
        } else {
          persistDataOnLocalStorage("favorite-products", productsAfterDelete);
        }
        handler();
      });
    });
  }

  _generatePrice(initialPrice, discount) {
    if (!discount) {
      return `
          <div class="card-content__price card-content__price--current">
              Giá: <span class="price-text">${convertNumberToPriceString(
                initialPrice - 1000
              )}đ</span>
          </div>
          `;
    } else {
      return `
          <div class="card-content__price card-content__price--current">
              Giá: <span class="price-text">${convertNumberToPriceString(
                calcSalesPrice(initialPrice, discount) - 1
              )}đ</span>
          </div>
          
          <div class="card-content__price card-content__price--old">
              <del class="price-text">${convertNumberToPriceString(
                initialPrice - 1000
              )}đ</del>
          </div>
          `;
    }
  }

  _generateMarkup() {
    const _this = this;
    const datas = this._data;

    return `
        ${datas
          .map((data) => {
            return `
                <li class="main-cards__cards__favorite-card">
                    <div class="card-img">
                        <img
                            src="../resources/images/products/${
                              data.id
                            }/thmb.jpg"
                            alt="Product image"
                        />
                    </div>

                    <div class="card-content">
                        <div class="card-content__title">
                            ${data.title}
                        </div>

                        <div>
                            ${_this._generatePrice(
                              data.initialPrice,
                              data.tags.discount
                            )}
                        </div>

                        <div class="card-content__action">
                            <a 
                              href=${_this._generateHrefLink(
                                _this._currentPage,
                                data.sort,
                                data.id
                              )}
                              class="btn--primary"
                            >
                              Xem chi tiết
                            </a>
                            <button data-product-id=${
                              data.id
                            } class="btn--sub">Xóa</button>
                        </div>
                    </div>
                </li>
            `;
          })
          .join("\n")}
    
        
    `;
  }
}

export default new FavoriteProductsView();
