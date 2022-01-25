export class View {
  _breadCrumbs = document.querySelector(".bread-crumbs");
  _data;
  _emptyErrorMessage = "Vui lòng nhập thông tin tại đây";
  _currentPage;

  renderItems(data, currentPage = "home") {
    if (!Array.isArray(data) || data.length === 0) {
      this._showNotFoundMessage();
      return;
    }

    this._data = data;
    this._currentPage = currentPage;

    const markup = this._generateMarkup(this._currentPage);

    this._parentElement.innerHTML = "";
    this._parentElement.insertAdjacentHTML("beforeend", markup);
  }

  renderSingleItem(data) {
    if (!data) {
      this.showNotFoundMessage();
      return;
    }

    this._data = data;
    const markup = this._generateMarkup();

    this._parentElement.innerHTML = "";
    this._parentElement.insertAdjacentHTML("beforeend", markup);
  }

  renderBreadCrumbs(page) {
    let markup = `
      <a class="bread-crumbs__link" href="../index.html">Trang chủ</a>
        &nbsp;
      <span class="bread-crumbs__slash">/</span>
        &nbsp;
    `;

    if (page === "product-detail") {
      const data = this._data;
      markup +=
        "\n" +
        `
          <a class="bread-crumbs__link" href="product-list.html?category=${data.category.value}">
            ${data.category.name}
          </a>
            &nbsp;
          <span class="bread-crumbs__slash">/</span>
            &nbsp;
          <a class="bread-crumbs__link" href="#${data.id}">
            Bộ bát đĩa sứ 16 món Wickham
          </a> 
        `;
    }

    if (page === "favorite-products") {
      const data = this._data;
      markup +=
        "\n" +
        `
          <a class="bread-crumbs__link" href="#">Sản phẩm yêu thích</a>
        `;
    }

    this._breadCrumbs.innerHTML = "";
    this._breadCrumbs.insertAdjacentHTML("beforeend", markup);
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

  setComponentElementClass(component, className) {
    this[component] = document.querySelector("." + className);
  }

  setMultiComponentElementsClass(component, className) {
    this[component] = document.querySelectorAll(className);
  }

  setLocationSearch(search, sort, set = true) {
    const sortData = sort || this._data.sort;
    const defaultSortQuery = sortData
      .map((data) => {
        return `?${data.type}=${data.defaultValue}`;
      })
      .join("");

    if (set) window.location.search = search || defaultSortQuery;

    if (!set) return defaultSortQuery;
  }

  _buttonChangeTextHandler(buttonEl, originText) {
    buttonEl.textContent = "Đã thêm";
    setTimeout(() => {
      buttonEl.textContent = `${originText}`;
    }, 1000);
  }

  _showNotFoundMessage() {
    const markup = this._generateNotFoundMarkup();

    this._parentElement.innerHTML = "";
    this._parentElement.insertAdjacentHTML("beforeend", markup);
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

  _getLocationSearchValues(value = true, getValuesArray = false) {
    const search = window.location.search;
    const queryValues = search
      .slice(1)
      .split("?")
      .map((value) => {
        return value.split("=")[`${value || getValuesArray ? 1 : 0}`];
      });

    return value && !getValuesArray ? queryValues.join("-") : queryValues;
  }

  _generateNotFoundMarkup() {
    return `
        <div class="not-found-message center-content">
          <p class="not-found-message__text">${this._notFoundMessage}</p>
          <a href="../index.html" class="not-found-message__link">
            Tiếp tục mua sắm
          </a>
        </div>
      `;
  }

  _generateSliderButtons() {
    return `
      <div class="slider-btn--prev center-content">
          <svg>
            <use
              xlink:href="../resources/icons/sprite.svg#chevron-left"
            ></use>
          </svg>
        </div>
        <div class="slider-btn--next center-content">
          <svg>
            <use
              xlink:href="../resources/icons/sprite.svg#chevron-right"
            ></use>
          </svg>
        </div>
      </div>
    `;
  }
}
