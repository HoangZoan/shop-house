import { View } from "../view.js";
import { convertPriceStringToNumber } from "../../helpers.js";

class CheckOutFormView extends View {
  _parentElement = document.querySelector(".section-form-check-out");
  _formEl = this._parentElement;
  _totalPriceEls;

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
    const inputEls = document.querySelectorAll(
      ".user-info-field__form-control input"
    );
  }
}

export default new CheckOutFormView();
