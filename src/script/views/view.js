export class View {
  _data;
  _emptyErrorMessage = "Vui lòng nhập thông tin tại đây";
  _homepage = true;

  renderItems(data, homepage) {
    if (!Array.isArray(data) || data.length === 0) return;
    this._data = data;

    if (homepage == "branch-page") {
      this._homepage = false;
    }
    const markup = this._generateMarkup(this._homepage);

    this._parentElement.innerHTML = "";
    this._parentElement.insertAdjacentHTML("beforeend", markup);
  }

  renderSingleItem(data) {
    if (!data) {
      console.log("Product not found!");
      return;
    }
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

  addRenderByLocationHandler(handler) {
    ["load", "hashchange"].forEach((event) => {
      window.addEventListener(event, () => {
        handler(window.location.hash);
      });
    });
  }

  setCardTypeClass(className) {
    this._parentElement = document.querySelector("." + className);
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
