import { View } from "./view.js";
import { validateInput } from "../helpers.js";
import { SUCCESS_MESSAGE_TIMEOUT } from "../config.js";

class RegisterEmailFormView extends View {
  _formEl = document.querySelector(".info-cta__form");
  _inputEl = this._formEl.querySelector("input");
  _formControlEl = this._formEl;
  _succesMessage = "Đăng ký email thành công!";

  constructor() {
    super();
    this._clearMessageWhenTyping(this._inputEl);
  }

  _validateInputValues() {
    const inputValidation = validateInput(this._inputEl.value, "email");

    if (!inputValidation.isValid && inputValidation.status == "empty") {
      this._showInputErrorMessage(this._formControlEl, this._emptyErrorMessage);
      return false;
    } else {
      this._showSuccessMessage(this._succesMessage);
      return true;
    }
  }

  _showSuccessMessage(message) {
    const markup = `
      <p class="input-success">${message}</p>
    `;

    this._formControlEl.insertAdjacentHTML("beforeend", markup);
    setTimeout(() => {
      this._removeMessageNodeHandler(this._inputEl);
    }, SUCCESS_MESSAGE_TIMEOUT);
  }
}

export default new RegisterEmailFormView();
