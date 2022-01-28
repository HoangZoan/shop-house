import {
  convertPriceStringToNumber,
  convertNumberToPriceString,
} from "../helpers.js";

export class View {
  _breadCrumbs = document.querySelector(".bread-crumbs");
  _data;
  _emptyErrorMessage = "Vui lòng nhập thông tin tại đây";
  _productIdNotFoundMessage =
    "Không tìm thấy sản phẩm này. Xin vui lòng thử lại";
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
      this._showNotFoundMessage();
      return;
    }

    this._data = data;
    const markup = this._generateMarkup();

    this._parentElement.innerHTML = "";
    this._parentElement.insertAdjacentHTML("beforeend", markup);
  }

  renderBreadCrumbs(page) {
    const data = this._data;
    let markup = `
      <a class="bread-crumbs__link" href="../index.html">Trang chủ</a>
        &nbsp;
      <span class="bread-crumbs__slash">/</span>
        &nbsp;
    `;

    if (page === "product-detail") {
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
      markup +=
        "\n" +
        `
          <a class="bread-crumbs__link" href="favorite-products.html">Sản phẩm yêu thích</a>
        `;
    }

    if (page === "products-list") {
      const linkNameArr = this._getLocationSearchValues(true, true).slice(
        0,
        -1
      );
      let linkName = [];

      linkNameArr.forEach((value) => {
        Object.values(data).forEach((dataArr) => {
          const match = dataArr.find((item) => {
            return item.value === value;
          });

          if (match) linkName.push({ name: match.name, value: match.value });
        });
      });

      markup +=
        "\n" +
        `
          ${linkName
            .map((data) => {
              return `
                <a class="bread-crumbs__link" href="product-list.html?category=${data.value}">
                  ${data.name}
                </a>
              `;
            })
            .join(
              "\n" +
                `&nbsp;
              <span class="bread-crumbs__slash">/</span>
              &nbsp;` +
                "\n"
            )}
        `;
    }

    if (page === "your-cart") {
      markup +=
        "\n" +
        `
          <a class="bread-crumbs__link" href="your-cart.html">Giỏ hàng</a>
        `;
    }

    this._breadCrumbs.innerHTML = "";
    this._breadCrumbs.insertAdjacentHTML("beforeend", markup);
  }

  addSubmitFormHandler(handler, page) {
    this._formEl.addEventListener("submit", (event) => {
      event.preventDefault();

      if (page === "home") {
        if (!this._validateInputValues(this._inputEl)) return;

        handler(Object.fromEntries([...new FormData(this._formEl)]));
      }

      if (page === "your-cart") {
        handler();
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
    this._parentElement = document.querySelector(className);
  }

  setComponentElementClass(component, className) {
    this[component] = document.querySelector(className);
  }

  setMultiComponentElementsClass(component, className) {
    this[component] = document.querySelectorAll(className);
  }

  setLocationSearch(search = null, sort = null, set = true) {
    const sortData = sort || this._data.sort;
    const defaultSortQuery = sortData
      ?.map((data) => {
        return `?${data.type}=${data.defaultValue}`;
      })
      .join("");

    if (set) window.location.search = search || defaultSortQuery;

    if (!set) return defaultSortQuery;
  }

  generateReceiptPriceDetail() {
    const netPriceEl = document.querySelector(
      ".payment-info-field__segment__form .price-net"
    );
    const promotionCodeReduceEl = document.querySelector(
      ".price-decrement .extra-count-box__amount"
    );
    const shipmentChargeEl = document.querySelector(
      ".shipment-charge .extra-count-box__amount"
    );
    const totalBillEl = document.querySelector(
      ".payment-info-field__total__amount"
    );
    const totalPriceEls =
      this._totalPriceEls || document.querySelectorAll(".total-price-origin");
    let totalPrices = [];

    totalPriceEls.forEach((el) =>
      totalPrices.push(convertPriceStringToNumber(el.innerText))
    );

    const netPrice =
      totalPrices.length === 0
        ? 0
        : totalPrices.reduce((prevNum, curNum) => {
            return prevNum + curNum;
          });
    const promotionCodeReduce = convertPriceStringToNumber(
      promotionCodeReduceEl.innerText
    );
    const shipmentCharge = convertPriceStringToNumber(
      shipmentChargeEl.innerText
    );

    netPriceEl.innerText =
      totalPrices.length === 0
        ? "0đ"
        : convertNumberToPriceString(netPrice + 1000) + "đ";
    totalBillEl.innerText =
      totalPrices.length === 0
        ? "0đ"
        : convertNumberToPriceString(
            netPrice - promotionCodeReduce + shipmentCharge + 1000
          ) + "đ";
  }

  _buttonChangeTextHandler(buttonEl, originText) {
    buttonEl.textContent = "Đã thêm";
    setTimeout(() => {
      buttonEl.textContent = `${originText}`;
    }, 1000);
  }

  _showNotFoundMessage() {
    const markup = this._generateNotFoundMarkup();

    const parentElement =
      this._productDetailSection ||
      this._yourCartOrderCards ||
      this._parentElement;

    parentElement.innerHTML = "";
    parentElement.insertAdjacentHTML("beforeend", markup);
  }

  _showInputErrorMessage(showElement, message) {
    const markup = `
      <p class="input-error">${message}</p>
    `;

    showElement.insertAdjacentHTML("beforeend", markup);
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

  _getLocationSearchValues(getValue = true, getValuesArray = false) {
    const search = window.location.search;
    const queryValues = search
      .slice(1)
      .split("?")
      .map((value) => {
        return value.split("=")[`${getValue || getValuesArray ? 1 : 0}`];
      });

    return getValue && !getValuesArray ? queryValues.join("-") : queryValues;
  }

  _generateHrefLink(currentPage, dataSort, productId) {
    let headHref;

    switch (currentPage) {
      case "home":
        headHref = "./pages/product-detail.html";
        break;
      case "in-page":
        headHref = "";
        break;
      case "side-page":
        headHref = "./product-detail.html";
        break;
    }

    return (
      headHref + this.setLocationSearch(null, dataSort, false) + "#" + productId
    );
  }

  _generateOptions(options, defaultValue = null, type = null) {
    const checkMatchValue = (value) => {
      const matchedValue = this._getLocationSearchValues(true, true).find(
        (valueData) => valueData === value
      );

      return Boolean(matchedValue);
    };

    if (!type) {
      return options
        .map((option) => {
          return `
            <select data-query=${option.type}>
              ${option.values
                .map((value) => {
                  return `
                  <option ${
                    checkMatchValue(value.value) ? "selected" : ""
                  } value="${value.value}" data-name=${value.name}>${
                    option.name
                  }: ${value.name}</option>
                `;
                })
                .join("\n")}
            </select>
          `;
        })
        .join("\n");
    } else {
      return `
        <select data-query=${type}>
          ${
            defaultValue
              ? `<option value="" class="text-gray">${defaultValue}</option>`
              : ""
          }
          ${options
            .map((option) => {
              return `
              <option ${
                checkMatchValue(option.value) ? "selected" : ""
              } value=${option.value}>${option.name}</option>
            `;
            })
            .join("\n")}
        </select>
      `;
    }
  }

  _generateNotFoundMarkup() {
    return `
        <div class="not-found-message center-content">
          <p class="not-found-message__text">${
            this._productDetailSection
              ? this._productIdNotFoundMessage
              : this._notFoundMessage
          }</p>
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
