import { View } from "./view.js";

class OrderDetailView extends View {
  _parentElement = document.querySelector(".user-content");

  _generateMarkup() {
    const data = this._data;
    console.log(this._data);

    return `
        <div class="user-container-detach-sm bg--white">
            <div class="order-id">Chi tiết đơn hàng #${data.orderId}</div>
          </div>

          <div class="user-container-detach-sm bg--white">
            <div class="order-delivery-status">
              Trạng thái:
              <strong
                >Đang vận chuyển - Dự kiến giao hàng 12/01 - 14/01/2021</strong
              >
            </div>
          </div>

          <div class="user-container-detach bg--white">
            <ul class="order-manage-card__cards-list">
              <li class="order-manage-card__cards-list__item">
                <div class="order-card-img">
                  <img
                    src="../../resources/images/products/p1.jpg"
                    alt="Product img"
                  />
                </div>

                <div class="order-card-content">
                  <div class="order-card-content__title">
                    Bộ rèm phòng tắm Lush Decor Bộ rèm phòng tắm Lush Decor Bộ
                    rèm phòng tắm Lush Decor
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

                    <a href="#" class="order-card-content__distributor__link">
                      Phố Xinh
                    </a>
                  </div>
                  <div class="order-card-content__quantity">Số lượng: x1</div>
                  <div class="order-card-price order-card-price--responsive">
                    3.789.000đ
                  </div>
                </div>
                <div class="order-card-price order-card-price--origin">
                  3.789.000đ
                </div>
              </li>
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
                  <div class="order-list-detail">Nguyễn Văn B</div>
                </li>
                <li class="order-info__box__list-item">
                  <div class="order-list-title">Nơi nhận:</div>
                  <div class="order-list-detail">
                    Số 10, Đường A, Phường B, Quận C, TP. Hà Nội
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
                  <div class="order-list-detail">4.688.000đ</div>
                </li>
                <li class="order-info__box__list-item">
                  <div class="order-list-title">Phí vận chuyển</div>
                  <div class="order-list-detail">0đ</div>
                </li>
                <li class="order-info__box__list-item">
                  <div class="order-list-title">Mã giảm giá</div>
                  <div class="order-list-detail">0đ</div>
                </li>
                <li class="order-info__box__list-item">
                  <div class="order-list-title">Thanh toán</div>
                  <div class="order-list-detail">Khi nhận hàng</div>
                </li>
              </ul>

              <div class="order-info__box__total-price">
                <div class="order-info__box__list-item">
                  <div class="order-list-title">Tổng</div>
                  <div class="order-list-detail">4.688.000đ</div>
                </div>
              </div>
            </div>
        </div>
    `;
  }
}

export default new OrderDetailView();
