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
  _ordersData;

  handlePopupModal(orderId) {
    const modal = document.querySelector(".modal");
    const linkToOrderDetail = document.querySelector(".link-to-order-detail");

    linkToOrderDetail.href += "#" + orderId;
    modal.classList.add("active");
  }

  addDeliveryOptionSelectHandler() {
    const _this = this;
    const formCheckBoxLabelEls = document.querySelectorAll(
      ".delivery-form .payment-form-checkbox"
    );
    const deliveryPriceEl = document.querySelector(
      ".shipment-charge .extra-count-box__amount"
    );

    formCheckBoxLabelEls.forEach((el) => {
      el.addEventListener("click", (event) => {
        const optionValue = event.target
          .closest(".payment-form-checkbox")
          .querySelector("input").value;
        let deliveryChargeText;

        if (optionValue === "delivery-standard") {
          deliveryChargeText = "50.000đ";
        }
        if (optionValue === "delivery-fast") {
          deliveryChargeText = "80.000đ";
        }

        deliveryPriceEl.textContent = deliveryChargeText;
        _this.generateReceiptPriceDetail(deliveryChargeText);
      });
    });
  }

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
        convertNumberToPriceString(promotionCodePrice, false) + "đ";
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
    let inputsAreValid = true;

    inputEls.forEach((input) => {
      if (input.name === "email") return;
      _this._clearErrorMessageWhenTyping(input);

      const inputIsEmpty = !_this._handleEmptyTextFieldError(input);
      if (inputIsEmpty) {
        inputsAreValid = false;
        return;
      }

      if (input.name === "phoneNumber") {
        const inputValidation = validateInput(input.value, input.name);

        if (!inputValidation.isValid) {
          inputsAreValid = false;
          _this._showInputErrorMessage(
            input.parentElement,
            inputValidation.message
          );
          return;
        }
      }
    });

    selectEls.forEach((input) => {
      _this._clearErrorMessageWhenTyping(input);
      const inputIsEmpty = !_this._handleEmptyTextFieldError(input);

      if (inputIsEmpty) {
        inputsAreValid = false;
      }
    });

    return inputsAreValid;
  }
}

export default new CheckOutFormView();
