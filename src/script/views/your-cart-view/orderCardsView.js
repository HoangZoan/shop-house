import { View } from "../view.js";
import { convertPriceNumber, calcSalesPrice } from "../../helpers.js";

class OrderCardsView extends View {
  _parentElement = document.querySelector(".order-table-body");
  _saveButtons;
  _confirmSaveButtons;
  _deleteButtons;
  _confirmDeleteButtons;
  _cancelButtons;
  _quantityCounterControls;
  _yourCartOrderCards = document.querySelector(".section-orders-table");
  _notFoundMessage = "Bạn chưa có sản phẩm trong giỏ";

  _generateTotalPriceByCounter(match, value = 1) {
    const totalPriceEls = document.querySelectorAll(".order-card__total-price");
    let priceData = {};

    this._data.forEach((data) => {
      if (data.locationSearch === match) {
        priceData.initialPrice = data.initialPrice;
        priceData.discount = data.discount;
        return;
      }
    });

    const { initialPrice, discount } = priceData;

    const targetPriceEls = [...totalPriceEls].filter((el) => {
      return el.closest(".order-card").dataset.productSpecs === match;
    });

    targetPriceEls.forEach((el) => {
      const responsive = el.classList.contains("total-price-responsive");

      el.innerHTML = `
        ${responsive ? '<strong class="text-black">Tổng:</strong>' : ""}
        ${
          discount
            ? convertPriceNumber(calcSalesPrice(initialPrice, discount) * value)
            : convertPriceNumber(initialPrice * value)
        }đ
      `;
    });
  }

  addQuantityCounterControlClickHandler() {
    const _this = this;

    this._quantityCounterControls?.forEach((control) => {
      control.addEventListener("click", (event) => {
        const match = control.closest(".order-card").dataset.productSpecs;
        const inputEl = control.querySelector("input");
        const increaseBtn = event.target.closest(".add");
        const decreaseBtn = event.target.closest(".remove");
        if (!increaseBtn && !decreaseBtn) return;

        if (increaseBtn) {
          inputEl.value++;
        }

        if (decreaseBtn) {
          inputEl.value > 1 && inputEl.value--;
        }

        _this._generateTotalPriceByCounter(match, inputEl.value);
      });
    });
  }

  addSaveButtonClickHandler() {
    const _this = this;

    this._saveButtons?.forEach((saveBtn) => {
      const parentDataset = `data-product-specs="${
        saveBtn.closest(".order-card").dataset.productSpecs
      }"`;
      saveBtn.addEventListener("click", () => {
        _this._toggleActionBoxActiveClass(saveBtn, parentDataset);
      });
    });
  }

  addConfirmSaveButtonClickHandler(handler) {
    this._confirmSaveButtons?.forEach((button) => {
      button.addEventListener("click", () => {
        handler(
          button.closest(".order-card").dataset.productId,
          button.closest(".order-card").dataset.productSpecs
        );
      });
    });
  }

  addDeleteButtonClickHandler() {
    const _this = this;

    this._deleteButtons?.forEach((deleteBtn) => {
      const parentDataset = `data-product-specs="${
        deleteBtn.closest(".order-card").dataset.productSpecs
      }"`;
      deleteBtn.addEventListener("click", () => {
        _this._toggleActionBoxActiveClass(deleteBtn, parentDataset);
      });
    });
  }

  addConfirmDeleteButtonClickHandler(handler) {
    this._confirmDeleteButtons?.forEach((button) => {
      button.addEventListener("click", () => {
        handler(button.closest(".order-card").dataset.productSpecs);
      });
    });
  }

  addCancelButtonClickHandler() {
    const _this = this;

    this._cancelButtons?.forEach((button) => {
      const parentDataset = `data-product-specs="${
        button.closest(".order-card").dataset.productSpecs
      }"`;
      button.addEventListener("click", () => {
        _this._toggleActionBoxActiveClass(button, parentDataset);
      });
    });
  }

  _toggleActionBoxActiveClass(callingButton, parentDataset) {
    const orderCardEl = callingButton.closest(`.order-card[${parentDataset}]`);
    const initialActionBox = orderCardEl.querySelector(`.initial-action-box`);
    const confirmDeleteBox = orderCardEl.querySelector(`.confirm-delete-box`);
    const confirmSaveBox = orderCardEl.querySelector(`.confirm-save-box`);

    // Open confirm delete box
    if (callingButton.classList.contains("delete")) {
      initialActionBox.classList.remove("active");
      confirmDeleteBox.classList.add("active");
      return;
    }

    // Open confirm save box
    if (callingButton.classList.contains("save")) {
      initialActionBox.classList.remove("active");
      confirmSaveBox.classList.add("active");
      return;
    }

    // Cancel action boxes
    initialActionBox.classList.add("active");
    confirmDeleteBox.classList.remove("active");
    confirmSaveBox.classList.remove("active");
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

  _generatePrice(initialPrice, discount, responsive = false) {
    if (!discount) {
      return `
        <div
            class="order-card__price-box__price order-card__price-box__price--current"
        >
            ${
              responsive === "responsive"
                ? '<span class="price-title-repsonsive text-black">Giá:</span>'
                : ""
            }
            ${convertPriceNumber(initialPrice)}đ
        </div>
      `;
    } else {
      return `
          <div
              class="order-card__price-box__price order-card__price-box__price--current"
          >
              ${
                responsive === "responsive"
                  ? '<span class="price-title-repsonsive text-black">Giá:</span>'
                  : ""
              }
              ${convertPriceNumber(calcSalesPrice(initialPrice, discount))}đ
          </div>
          <div
              class="order-card__price-box__price order-card__price-box__price--old"
          >
              <del class="price-text">${convertPriceNumber(initialPrice)}đ</del>
          </div>  
      `;
    }
  }

  _generateProductCounter() {
    return `
      <button class="btn--counter remove">-</button>
      <input type="text" readonly value="1" />
      <button class="btn--counter add">+</button>
    `;
  }

  _generateTotalPrice(initialPrice, discount, responsive = false) {
    return `
      ${responsive ? '<strong class="text-black">Tổng:</strong>' : ""}
      ${
        discount
          ? convertPriceNumber(calcSalesPrice(initialPrice, discount))
          : convertPriceNumber(initialPrice)
      }đ
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
              <tr class="order-card" 
                  data-product-id=${data.id} 
                  data-product-specs=${data.locationSearch}
              >
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
                          ${_this._generatePrice(
                            data.initialPrice,
                            data.discount,
                            true
                          )}
                      </div>
      
                      <div
                          class="order-card__total-price text-primary total-price-responsive"
                      >
                          ${_this._generateTotalPrice(
                            data.initialPrice,
                            data.discount,
                            true
                          )}
                      </div>
      
                      <div
                          class="order-card__product-quantity__form-control quantity-control-responsive"
                      >
                          ${_this._generateProductCounter()}
                      </div>
      
                      <div class="order-card__text__action initial-action-box active">
                        <div class="btn--link delete">Xóa</div>
                        <div class="btn--link save">Lưu lại</div>
                      </div>

                      <div 
                        class="order-card__text__action confirm-save-box"
                        data-product-specs=${data.locationSearch}
                        data-product-id=${data.id}
                      >
                        <p>Lưu lại mua sau?</p>
                        <div class="btn--link confirm-save">Có</div>
                        <div class="btn--link cancel">Không</div>
                      </div>

                      <div 
                        class="order-card__text__action confirm-delete-box"
                        data-product-specs=${data.locationSearch}
                      >
                        <p>Tiếp tục mua sản phẩm này?</p>
                        <div class="btn--link cancel">Có</div>
                        <div 
                          class="btn--link confirm-delete"
                        >
                          Không
                        </div>
                      </div>
                  </td>
      
                  <td class="order-card__price-box price-box-origin">
                    ${_this._generatePrice(data.initialPrice, data.discount)}
                  </td>
      
                  <td class="order-card__product-quantity">
                      <div
                          class="order-card__product-quantity__form-control quantity-control-origin"
                      >
                        ${_this._generateProductCounter()}
                      </div>
                  </td>
      
                  <td class="order-card__total-price text-primary total-price-origin">
                    ${_this._generateTotalPrice(
                      data.initialPrice,
                      data.discount
                    )}
                  </td>
              </tr>
          `;
      })
      .join("\n");
  }
}

export default new OrderCardsView();
