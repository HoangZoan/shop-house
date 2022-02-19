import { View } from "./view.js";
import { convertNumberToPriceString } from "../helpers.js";

class OrderDetailView extends View {
  _parentElement = document.querySelector(".user-content");

  _generateOrderItems(data) {
    return data
      .map((item) => {
        return `
        <li class="order-manage-card__cards-list__item">
          <div class="order-card-img">
            <img
              src="${item.thmbImage}"
              alt="Product img"
            />
          </div>

          <div class="order-card-content">
            <div class="order-card-content__title">
              ${item.title}
            </div>
            <div class="order-card-content__distributor">
              <div
                class="order-card-content__distributor__icon center-content"
              >
                <svg>
                  <use
                    xlink:href="../../resources/icons/sprite.svg#store"
                  ></use>
                </svg>
              </div>

              <a 
                href="../product-list.html?brand=${
                  item.distributor.search
                }?arrange=most-purchased" 
                class="order-card-content__distributor__link"
              >
                ${item.distributor.name}
              </a>
            </div>
            <div class="order-card-content__quantity">Số lượng: ${
              item.orderQuantity
            }</div>
            <div class="order-card-price order-card-price--responsive">
              ${convertNumberToPriceString(item.totalPrice)}đ
            </div>
          </div>
          <div class="order-card-price order-card-price--origin">
            ${convertNumberToPriceString(item.totalPrice)}đ
          </div>
        </li>
      `;
      })
      .join("\n");
  }

  _generatePaymentMethod(method) {
    let textContent;

    switch (method) {
      case "cod":
        textContent = "Thanh toán khi nhận hàng";
        break;
      case "credit-card":
        textContent = "Thẻ ngân hàng";
        break;
      case "e-wallet":
        textContent = "Ví điện tử";
        break;
    }

    return textContent;
  }

  _generateMarkup() {
    const data = this._data;

    return `
        <div class="user-container-detach-sm bg--white">
            <div class="order-id">Chi tiết đơn hàng #${data.orderId}</div>
          </div>

          <div class="user-container-detach-sm bg--white">
            <div class="order-delivery-status">
              Trạng thái:
              <strong>
                Đang vận chuyển - Dự kiến giao hàng 
                ${
                  data.deliveryType === "delivery-fast"
                    ? this._generateDeliveryDate(
                        this._calcDeliveryFastEstimatedDate(
                          data.deliveryDateStandard
                        )
                      )
                    : this._generateDeliveryDate(data.deliveryDateStandard)
                }
              </strong>
            </div>
          </div>

          <div class="user-container-detach bg--white">
            <ul class="order-manage-card__cards-list">
              ${this._generateOrderItems(data.products)}
            </ul>
          </div>

          <div class="order-info">
            <div
              class="order-info__box customer-info user-container-detach bg--white clear-m"
            >
              <header class="order-info__box__title">
                Thông tin người nhận
              </header>

              <ul class="order-info__box__list">
                <li class="order-info__box__list-item">
                  <div class="order-list-title">Người nhận:</div>
                  <div class="order-list-detail">${data.fullName}</div>
                </li>
                <li class="order-info__box__list-item">
                  <div class="order-list-title">Nơi nhận:</div>
                  <div class="order-list-detail">
                    ${data.address}
                  </div>
                </li>
              </ul>
            </div>

            <div
              class="order-info__box payment-info user-container-detach bg--white"
            >
              <header class="order-info__box__title">Hóa đơn thanh toán</header>

              <ul>
                <li class="order-info__box__list-item">
                  <div class="order-list-title">Tạm tính</div>
                  <div class="order-list-detail">
                    ${convertNumberToPriceString(data.netPrice)}đ
                  </div>
                </li>
                <li class="order-info__box__list-item">
                  <div class="order-list-title">Phí vận chuyển</div>
                  <div class="order-list-detail">
                    ${convertNumberToPriceString(data.shipmentCharge)}đ
                  </div>
                </li>
                <li class="order-info__box__list-item">
                  <div class="order-list-title">Mã giảm giá</div>
                  <div class="order-list-detail">
                    - ${convertNumberToPriceString(
                      data.promotionReduce,
                      false
                    )}đ
                  </div>
                </li>
                <li class="order-info__box__list-item">
                  <div class="order-list-title">Thanh toán</div>
                  <div class="order-list-detail">${this._generatePaymentMethod(
                    data.paymentMethod
                  )}</div>
                </li>
              </ul>

              <div class="order-info__box__total-price">
                <div class="order-info__box__list-item">
                  <div class="order-list-title">Tổng</div>
                  <div class="order-list-detail">${convertNumberToPriceString(
                    data.receiptTotal,
                    false
                  )}đ</div>
                </div>
              </div>
            </div>
        </div>
    `;
  }
}

export default new OrderDetailView();
