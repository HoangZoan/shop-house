import { View } from "./view.js";
import { convertPriceNumber, calcSalesPrice } from "../helpers.js";
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

        persistDataOnLocalStorage("favorite-products", productsAfterDelete);
        handler();
      });
    });
  }

  _generatePrice(initialPrice, discount) {
    if (!discount) {
      return `
          <div class="card-content__price card-content__price--current">
              Giá: <span class="price-text">${convertPriceNumber(
                initialPrice
              )}đ</span>
          </div>
          `;
    } else {
      return `
          <div class="card-content__price card-content__price--current">
              Giá: <span class="price-text">${convertPriceNumber(
                calcSalesPrice(initialPrice, discount)
              )}đ</span>
          </div>
          
          <div class="card-content__price card-content__price--old">
              <del class="price-text">${convertPriceNumber(initialPrice)}đ</del>
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
                        <a href="#" class="card-content__title-link">
                            ${data.title}
                        </a>

                        <div>
                            ${_this._generatePrice(
                              data.initialPrice,
                              data.tags.discount
                            )}
                        </div>

                        <div class="card-content__action">
                            <button data-product-id=${
                              data.id
                            } class="btn--primary">Thêm vào giỏ</button>
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
