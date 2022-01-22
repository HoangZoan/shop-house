export class View {
  _data;
  _emptyErrorMessage = "Vui lòng nhập thông tin tại đây";

  renderItems(data) {
    if (!Array.isArray(data) || data.length === 0) return;
    this._data = data;
    const markup = this._generateMarkup();

    this._parentElement.innerHTML = "";
    this._parentElement.insertAdjacentHTML("beforeend", markup);
  }

  renderSingleItem(data) {
    if (!data) return;
    this._data = data;
    const markup = this._generateMarkup();

    this._parentElement.innerHTML = "";
    this._parentElement.insertAdjacentHTML("beforeend", markup);
  }

  addSubmitFormHandler(handler) {
    this._formEl.addEventListener("submit", (event) => {
      event.preventDefault();

      if (this._validateInputValues()) {
        handler(Object.fromEntries([...new FormData(this._formEl)]));
      }
    });
  }

  addRenderWhenLoadedHanlder(handler) {
    window.addEventListener("load", handler);
  }

  _showErrorMessage(message) {
    const markup = `
      <p class="input-error">${message}</p>
    `;

    this._formControlEl.insertAdjacentHTML("beforeend", markup);
  }

  _removeMessageNodeHandler(inputEl) {
    const messageEl = inputEl.parentElement.querySelector("p");

    if (messageEl) {
      messageEl.remove();
    }
  }

  _clearMessageWhenTyping(inputEl) {
    const _this = this;
    inputEl.addEventListener("keydown", () => {
      _this._removeMessageNodeHandler(inputEl);
    });
  }
}
