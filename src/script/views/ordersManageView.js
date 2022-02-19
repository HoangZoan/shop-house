import { View } from "./view.js";
import { convertNumberToPriceString } from "../helpers.js";

class OrdersManageView extends View {
  _parentElement = document.querySelector(".order-manage-cards-container");
  _notFoundMessage = "Chưa có đơn hàng";

  addOrderTabsClickHandler(handler) {
    const menuListEl = document.querySelector(".orders-manage-nav");
    const menuTabEls = document.querySelectorAll(".orders-manage-nav li");

    menuListEl.addEventListener("click", (event) => {
      const tab = event.target.closest("li");
      if (!tab) return;

      menuTabEls.forEach((el) => el.classList.remove("active"));
      tab.classList.add("active");
      handler(null, tab.dataset.type);
    });
  }

  _generateOrdersManageCards(productsData) {
    return productsData
      .map((data) => {
        return `
            <li class="order-manage-card__cards-list__item">
                <div class="order-card-img">
                    <img src="${data.thmbImage}" alt="Product img"/>
                </div>
    
                <div class="order-card-content">
                    <div class="order-card-content__title">
                        ${data.title}
                    </div>
                    <div class="order-card-content__distributor">
                        <div class="order-card-content__distributor__icon center-content">
                            <svg>
                                <use
                                xlink:href="../../resources/icons/sprite.svg#store"
                                ></use>
                            </svg>
                        </div>
    
                        <a 
                            href="../product-list.html?brand=${
                              data.distributor.search
                            }?arrange=most-purchased" 
                            class="order-card-content__distributor__link"
                        >
                                ${data.distributor.name}
                        </a>
                    </div>
                    <div class="order-card-content__quantity">Số lượng: ${
                      data.orderQuantity
                    }</div>
                    <div class="order-card-price order-card-price--responsive">${convertNumberToPriceString(
                      data.totalPrice
                    )}đ</div>
                </div>
                <div class="order-card-price order-card-price--origin">${convertNumberToPriceString(
                  data.totalPrice
                )}đ</div>
            </li>
        `;
      })
      .join("\n");
  }

  _generateMarkup() {
    const _this = this;

    return this._data
      .map((data) => {
        return `
              <div class="order-manage-card on-delivery user-container-detach bg--white">
                  <header class="order-manage-card__header">
                      <div class="order-manage-card__header__icon center-content">
                          <svg>
                              <use
                                  xlink:href="../../resources/icons/sprite.svg#truck"
                              ></use>
                          </svg>
                      </div>
                      <div class="order-manage-card__header__title">
                          Giao hàng dự kiến 
                          ${
                            data.deliveryType === "delivery-fast"
                              ? _this._generateDeliveryDate(
                                  _this._calcDeliveryFastEstimatedDate(
                                    data.deliveryDateStandard
                                  )
                                )
                              : _this._generateDeliveryDate(
                                  data.deliveryDateStandard
                                )
                          }
                      </div>
                  </header>
      
                  <ul class="order-manage-card__cards-list">
                      ${_this._generateOrdersManageCards(data.products)}
                  </ul>
      
                  <footer class="order-manage-card__footer">
                      <a href="./order-detail.html#${
                        data.orderId
                      }" class="btn--sub">Xem chi tiết</a>
                      <div class="order-manage-card__footer__total">
                          Tổng tiền: <span class="text-black">${convertNumberToPriceString(
                            data.receiptTotal,
                            false
                          )}đ</span>
                      </div>
                  </footer>
              </div>
          `;
      })
      .join("\n");
  }
}

export default new OrdersManageView();
