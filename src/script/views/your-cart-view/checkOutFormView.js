import { View } from "../view.js";

class CheckOutFormView extends View {
  _parentElement = document.querySelector(".section-form-check-out");
  _totalPriceEls;

  _generateMarkup() {
    return `
        <div class="user-info-field">
            <div class="field-title">Thông tin khách hàng</div>

            <div class="user-info-field__form-control">
                <label for="user-name">Họ và tên:<sup>*</sup></label>
                <div class="input-wrapper">
                    <input class="input-border" type="text" id="user-name" required />
                </div>
            </div>
            <div class="user-info-field__form-control">
                <label for="phone-number">Số điện thoại:<sup>*</sup></label>
                <div class="input-wrapper">
                    <input
                    class="input-border"
                    type="tel"
                    id="phone-number"
                    required
                    />
                </div>
            </div>
            <div class="user-info-field__form-control">
                <label for="address">Địa chỉ nhận hàng:<sup>*</sup></label>
                <div class="input-wrapper">
                    <input class="input-border" type="text" id="address" required />
                </div>
            </div>
            <div class="user-info-field__form-control">
                <label for="email">Email:</label>
                <div class="input-wrapper">
                    <input class="input-border" type="email" id="email" />
                </div>
            </div>
        </div>

        <div class="payment-info-field">
          <div class="field-title">Hóa đơn thanh toán</div>

          <div class="payment-info-field__segment">
            <div class="payment-info-field__segment__title">Tạm tính</div>

            <div class="payment-info-field__segment__form">
              <div class="price-net text-primary">4.688.000đ</div>
              <div class="extra-count-box price-decrement">
                <div class="extra-count-box__title">Giảm giá:</div>
                <div class="extra-count-box__amount text-primary">0đ</div>
              </div>
              <div class="promotion-code">
                <input class="input-border" type="text" />
                <button type="submit" class="btn--primary">Mã giảm giá</button>
              </div>
            </div>
          </div>
          <div class="divider"></div>

          <div class="payment-info-field__segment">
            <div class="payment-info-field__segment__title">Giao hàng</div>

            <div class="payment-info-field__segment__form">
              <label class="payment-form-checkbox" for="delivery-standard">
                <input
                  name="delivery"
                  type="radio"
                  id="delivery-standard"
                  value="delivery-standard"
                  checked
                />
                <span>Giao hàng tiêu chuẩn</span>
              </label>
              <label class="payment-form-checkbox" for="delivery-fast">
                <input
                  name="delivery"
                  type="radio"
                  id="delivery-fast"
                  value="delivery-fast"
                />
                <span>Giao hàng nhanh</span>
              </label>
              <div class="shipment-location">
                <span>Giao hàng tại <strong>Hà Nội</strong></span>
                <div class="btn--link fz-small-link-btn">Thay đổi</div>
              </div>

              <div class="extra-count-box price-shipment">
                <div class="extra-count-box__title">Phí vận chuyển:</div>
                <div class="extra-count-box__amount text-primary">0đ</div>
              </div>
            </div>
          </div>
          <div class="divider"></div>

          <div class="payment-info-field__segment">
            <div class="payment-info-field__segment__title">Thanh toán</div>

            <div class="payment-info-field__segment__form">
              <label class="payment-form-checkbox" for="payment-cod">
                <input
                  name="payment"
                  type="radio"
                  id="payment-cod"
                  value="cod"
                  checked
                />
                <span>Thanh toán khi nhận hàng</span>
              </label>

              <label class="payment-form-checkbox" for="payment-card">
                <input
                  name="payment"
                  type="radio"
                  id="payment-card"
                  value="credit-card"
                />
                <span>Thẻ ngân hàng/Thẻ tín dụng</span>
                <div class="btn--link fz-small-link-btn">Liên kết thẻ</div>
              </label>

              <label class="payment-form-checkbox" for="payment-wallet">
                <input
                  name="payment"
                  type="radio"
                  id="payment-wallet"
                  value="e-wallet"
                />
                <span>Ví điện tử</span>
                <div class="btn--link fz-small-link-btn">
                  Liên kết ví điện tử
                </div>
              </label>
            </div>
          </div>

          <div class="payment-info-field__total">
            <div class="payment-info-field__total__title">Tổng hóa đơn</div>
            <div class="payment-info-field__total__amount text-primary">
              4.688.000đ
            </div>
          </div>

          <button type="submit" class="btn--primary button-submit">
            Thanh toán
          </button>
        </div>
    `;
  }
}

export default new CheckOutFormView();
