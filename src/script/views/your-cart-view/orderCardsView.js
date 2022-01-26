import { View } from "../view.js";
import { getProductById } from "../../model.js";

class OrderCardsView extends View {
  _parentElement = document.querySelector(".order-table-body");
  _saveButton;
  _deleteButton;
  _confirmDeleteButton;
  _cancelDeleteButton;

  addConfirmDeleteButtonClickHandler(handler) {
    this._confirmDeleteButton?.addEventListener("click", () => {
      handler(this._confirmDeleteButton.dataset.productId);
    });
  }

  addCancelDeleteButtonClickHandler() {
    this._cancelDeleteButton?.addEventListener("click", () => {
      this._toggleActionBoxActiveClass();
    });
  }

  addDeleteButtonClickHandler() {
    this._deleteButton?.addEventListener("click", () => {
      this._toggleActionBoxActiveClass();
    });
  }

  addSaveButtonClickHandler(handler) {
    this._saveButton?.addEventListener("click", () => {
      handler(this._saveButton.dataset.productId);
    });
  }

  _toggleActionBoxActiveClass() {
    const initialActionBox = document.querySelector(".initial-action-box");
    const confirmDeleteBox = document.querySelector(".confirm-delete-box");

    initialActionBox.classList.toggle("active");
    confirmDeleteBox.classList.toggle("active");
  }

  _generageImage(productId, query) {
    return `
        <img
            src="../resources/images/products/${productId}/${query}-1.jpg"
            alt="Product image"
        />
    `;
  }

  _generateSpecificationValues(specs) {
    return specs
      .map((data) => {
        return `
            <li>${data.name}: <span class="specification-value">${data.value}</span></li>
        `;
      })
      .join("\n");
  }

  _generatePrice(responsive = false) {
    return `
        <div
            class="order-card__price-box__price order-card__price-box__price--current"
        >
            ${
              responsive === "responsive"
                ? '<span class="price-title-repsonsive text-black">Giá:</span>'
                : ""
            }
            3.999.000đ
        </div>
        <div
            class="order-card__price-box__price order-card__price-box__price--old"
        >
            <del class="price-text">4.499.000đ</del>
        </div>  
    `;
  }

  _generateProductCounter() {
    return `
        <button class="btn--counter add">+</button>
        <input type="text" readonly value="1" />
        <button class="btn--counter remove">-</button>
    `;
  }

  _generateTotalPrice(responsive = false) {
    return `
        ${responsive ? '<strong class="text-black">Tổng:</strong>' : ""}
        3.789.000đ
    `;
  }

  _generateHrefLink(data) {
    return `product-detail.html${data.locationSearch}#${data.id}`;
  }

  _generateMarkup() {
    const _this = this;

    return this._data
      .map((data) => {
        return `
              <tr class="order-card">
                  <td class="order-card__img img-origin">
                    ${_this._generageImage(data.id, data.searchQueries)}
                  </td>
      
                  <td class="order-card__text">
                      <div class="order-card__img img-responsive">
                        ${_this._generageImage(data.id, data.searchQueries)}
                      </div>
      
                      <a 
                        href=${_this._generateHrefLink(data)} 
                        class="order-card__text__title"
                      >
                          ${data.title}
                      </a>
                      <ul class="order-card__text__specification-list">
                          ${_this._generateSpecificationValues(
                            data.specifications
                          )}
                      </ul>
      
                      <div class="order-card__price-box price-box-responsive">
                          ${_this._generatePrice(true)}
                      </div>
      
                      <div
                          class="order-card__total-price text-primary total-price-responsive"
                      >
                          ${_this._generateTotalPrice(true)}
                      </div>
      
                      <div
                          class="order-card__product-quantity__form-control quantity-control-responsive"
                      >
                          ${_this._generateProductCounter()}
                      </div>
      
                      <div class="order-card__text__action initial-action-box active">
                        <div 
                            data-product-id=${data.id} 
                            class="btn--link delete"
                        >
                            Xóa
                        </div>
                        <div 
                            data-product-id=${data.id}
                            class="btn--link save"
                        >
                            Lưu lại
                        </div>
                      </div>

                      <div class="order-card__text__action confirm-delete-box">
                        <p>Tiếp tục mua sản phẩm này?</p>
                        <div class="btn--link cancel-delete">Có</div>
                        <div 
                          class="btn--link confirm-delete"
                          data-product-id=${data.id}
                        >
                          Không
                        </div>
                      </div>
                  </td>
      
                  <td class="order-card__price-box price-box-origin">
                    ${_this._generatePrice()}
                  </td>
      
                  <td class="order-card__product-quantity">
                      <div
                          class="order-card__product-quantity__form-control quantity-control-origin"
                      >
                        ${_this._generateProductCounter()}
                      </div>
                  </td>
      
                  <td class="order-card__total-price text-primary total-price-origin">
                    ${_this._generateTotalPrice()}
                  </td>
              </tr>
          `;
      })
      .join("\n");
  }
}

export default new OrderCardsView();
