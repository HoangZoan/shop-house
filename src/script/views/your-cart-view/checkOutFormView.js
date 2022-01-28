import { View } from "../view.js";
import {
  convertPriceStringToNumber,
  validateInput,
  calcPromotionCodePrice,
  convertNumberToPriceString,
} from "../../helpers.js";

class CheckOutFormView extends View {
  _parentElement = document.querySelector(".section-form-check-out");
  _formEl = this._parentElement;
  _promotionCodeNotFoundMessage = "Không có mã này. Vui lòng thử lại";
  _totalPriceEls;

  addPromotionCodeClickHandler() {
    const _this = this;
    const applyBtn = document.querySelector(".promotion-code button");
    const inputEl = document.querySelector(".promotion-code input");
    const promotionCodePriceEl = document.querySelector(
      ".price-decrement .extra-count-box__amount"
    );
    const priceNet = document.querySelector(
      ".payment-info-field__segment__form .price-net"
    );

    this._clearErrorMessageWhenTyping(inputEl);

    applyBtn.addEventListener("click", () => {
      const promotionCodePrice = calcPromotionCodePrice(
        convertPriceStringToNumber(priceNet.innerText),
        inputEl.value
      );

      if (inputEl.value.length === 0) return;
      inputEl.value = "";

      if (!promotionCodePrice) {
        _this._showInputErrorMessage(
          inputEl.parentElement,
          _this._promotionCodeNotFoundMessage
        );
        return;
      }

      promotionCodePriceEl.textContent =
        convertNumberToPriceString(promotionCodePrice) + "đ";
      _this.generateReceiptPriceDetail();
    });
  }

  _getNumberValueFromPriceDetail(className) {
    return convertPriceStringToNumber(
      document.querySelector(className).innerText
    );
  }

  _getReceiptDetail() {
    const netPrice = this._getNumberValueFromPriceDetail(
      ".payment-info-field__segment__form .price-net"
    );
    const promotionReduce = this._getNumberValueFromPriceDetail(
      ".extra-count-box.price-decrement .extra-count-box__amount"
    );
    const shipmentCharge = this._getNumberValueFromPriceDetail(
      ".extra-count-box.shipment-charge .extra-count-box__amount"
    );
    const receiptTotal = this._getNumberValueFromPriceDetail(
      ".payment-info-field__total__amount"
    );

    return {
      netPrice,
      promotionReduce,
      shipmentCharge,
      receiptTotal,
    };
  }

  _validateInputValues() {
    const _this = this;
    const inputEls = document.querySelectorAll(
      ".user-info-field__form-control input"
    );
    const selectEls = document.querySelectorAll(
      ".user-info-field__form-control select"
    );

    inputEls.forEach((input) => {
      if (input.name === "email") return;
      _this._clearErrorMessageWhenTyping(input);

      const inputIsValid = _this._handleEmptyTextFieldError(input);
      if (!inputIsValid) {
        return false;
      }
    });

    selectEls.forEach((input) => {
      _this._clearErrorMessageWhenTyping(input);
      const inputIsValid = _this._handleEmptyTextFieldError(input);
      if (!inputIsValid) {
        return false;
      }
    });

    return true;
  }
}

export default new CheckOutFormView();
