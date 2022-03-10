import {
  convertPriceStringToNumber,
  convertNumberToPriceString,
  validateInput,
  calcSalesPrice,
  convertViToEn,
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
          <a 
            class="bread-crumbs__link" 
            href="product-list.html?category=${data.category.value}?arrange=most-purchased"
          >
            ${data.category.name}
          </a>
            &nbsp;
          <span class="bread-crumbs__slash">/</span>
            &nbsp;
          <a class="bread-crumbs__link fw-700" href="#${data.id}">
            ${data.title}
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
                <a 
                  class="bread-crumbs__link" 
                  href="product-list.html?category=${data.value}?arrange=most-purchased"
                >
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

        this._inputEl.value = "";
        handler(Object.fromEntries([...new FormData(this._formEl)]));
      }

      if (page === "your-cart") {
        if (!this._validateInputValues()) return;

        handler({
          ...Object.fromEntries([...new FormData(this._formEl)]),
          ...this._getReceiptDetail(),
          orderId: String(Date.now()).slice(String(Date.now()).length - 6),
          orderDate: new Date().toISOString(),
          products: this._ordersData.products,
          deliveryDateStandard: this._ordersData.deliveryDateStandard,
          orderStatus: "on-delivery",
        });
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
    if (sort && sort.length === 0) return "?sort=_blank";

    const sortData = sort || this._data.sort;
    const defaultSortQuery = sortData
      ?.map((data) => {
        return `?${data.type}=${data.defaultValue}`;
      })
      .join("");

    if (set) window.location.search = search || defaultSortQuery;

    if (!set) return defaultSortQuery;
  }

  getLocationSearchQueries() {
    return window.location.search
      .slice(1)
      .split("?")
      .map((item) => item.split("="))
      .reduce((obj, data) => {
        obj[data[0]] = data[1];

        return obj;
      }, {});
  }

  getProductBySearchQueries(products, sortPrice = null) {
    const queries = this.getLocationSearchQueries();
    let bestSeller = [],
      newComing = [],
      regular = [],
      output;

    const getProductsArrangedByPrice = (products, asc = true) => {
      const productsData = products.slice(0);

      for (let i = 0; i < productsData.length; i++) {
        for (let j = 0; j < productsData.length; j++) {
          const isSmaller =
            calcSalesPrice(
              productsData[i].initialPrice,
              productsData[i].tags.discount
            ) <
            calcSalesPrice(
              productsData[j].initialPrice,
              productsData[j].tags.discount
            );

          if (asc ? isSmaller : !isSmaller) {
            let middle;
            middle = productsData[i];
            productsData[i] = productsData[j];
            productsData[j] = middle;
          }
        }
      }

      return productsData;
    };

    for (const product of products) {
      if (product.tags.new) {
        newComing.push(product);
        continue;
      }
      if (product.tags.bestSeller) {
        bestSeller.push(product);
        continue;
      }
      regular.push(product);
    }

    if (queries.arrange === "most-purchased")
      output = [...bestSeller, ...newComing, ...regular];

    if (queries.arrange === "new-release")
      output = [...newComing, ...bestSeller, ...regular];

    if (queries.arrange === "price-asc") {
      output = getProductsArrangedByPrice(products.slice(0));
    }

    if (queries.arrange === "price-des") {
      output = getProductsArrangedByPrice(products.slice(0), false);
    }

    if (queries.brand) {
      output = output.filter(
        (product) => product.distributor.search === queries.brand
      );
    }

    if (queries.category) {
      output = output.filter((product) => {
        if (queries.category === "sale") {
          return product.tags.discount;
        }

        return product.category.value === queries.category;
      });
    }

    if (queries["product-type"]) {
      output = output.filter(
        (product) => product.productType === queries["product-type"]
      );
    }

    if (sortPrice) {
      output = output.filter((product) => {
        const price = calcSalesPrice(
          product.initialPrice,
          product.tags.discount
        );

        return price > sortPrice.from && price <= sortPrice.to;
      });
    }

    if (queries.keywords) {
      output = output.filter((product) => {
        const productName = convertViToEn(product.title.toLowerCase());
        const searchKeywords = queries.keywords.replace("%20", " ");

        return productName.indexOf(searchKeywords) !== -1;
      });
    }

    return output;
  }

  getData() {
    if (!this._data) return null;

    return this._data;
  }

  generateReceiptPriceDetail(shipmentChargeText = null) {
    const footerNetPrice = document.querySelector(
      ".order-table-footer .footer-net-price"
    );
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

    const promotionCodeReduce = convertPriceStringToNumber(
      promotionCodeReduceEl.innerText
    );
    const shipmentCharge = shipmentChargeText
      ? convertPriceStringToNumber(shipmentChargeText)
      : 50000;
    netPriceEl.innerText =
      totalPrices.length === 0 ? "0đ" : footerNetPrice.innerText;

    promotionCodeReduceEl.innerText =
      convertNumberToPriceString(promotionCodeReduce, false) + "đ";
    shipmentChargeEl.innerText =
      shipmentChargeText || convertNumberToPriceString(shipmentCharge) + "đ";
    totalBillEl.innerText =
      totalPrices.length === 0
        ? "0đ"
        : convertNumberToPriceString(
            convertPriceStringToNumber(netPriceEl.innerText) -
              promotionCodeReduce +
              shipmentCharge,
            false
          ) + "đ";
  }

  _handleEmptyTextFieldError(input) {
    const inputIsValid = validateInput(input.value);

    if (!inputIsValid.isValid && inputIsValid.status === "empty") {
      this._showInputErrorMessage(input.parentElement, this._emptyErrorMessage);

      return false;
    }

    return true;
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
    const errorMessageEl = showElement.querySelector(".input-error");
    if (errorMessageEl) return;

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

  _clearErrorMessageWhenTyping(inputEl) {
    const _this = this;
    ["click", "keydown"].forEach((event) => {
      inputEl.addEventListener(event, () => {
        _this._removeMessageNodeHandler(inputEl);
      });
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

  _calcDeliveryFastEstimatedDate({ from, to }) {
    let inDay = false;
    let fromFast = from - 5;
    let toFast = to - 5;

    if (fromFast <= 0) fromFast = 1;
    if (toFast <= 0) toFast = 1;
    if (fromFast === 1 && toFast === 1) inDay = true;

    return { inDay, from: fromFast, to: toFast };
  }

  _checkFavoriteProduct(id) {
    const favoriteProducts = JSON.parse(
      window.localStorage.getItem("favorite-products")
    );

    if (!favoriteProducts) {
      return false;
    }

    return favoriteProducts.some((product) => product.id === id);
  }

  _generateDeliveryDate({ from, to, inDay = false }) {
    let fromDate, toDate;

    if (inDay) {
      return new Intl.DateTimeFormat("en-GB").format(Date.now());
    }

    fromDate = new Date(Date.now() + from * 24 * 60 * 60 * 1000);
    toDate = new Date(Date.now() + to * 24 * 60 * 60 * 1000);

    if (fromDate.getFullYear() === toDate.getFullYear()) {
      return `${new Intl.DateTimeFormat("en-GB")
        .format(fromDate)
        .slice(0, -5)} - ${new Intl.DateTimeFormat("en-GB").format(toDate)}`;
    } else {
      return `${new Intl.DateTimeFormat("en-GB").format(
        fromDate
      )} - ${new Intl.DateTimeFormat("en-GB").format(toDate)}`;
    }
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
                  } value="${value.value}" data-name=${value.name
                    .split(" ")
                    .join("_")}>${option.name}: ${value.name}</option>
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
    const getKeywords = () => {
      const locationQueries = window.location.search;
      const queryNameIndex = locationQueries.indexOf("keywords");

      if (queryNameIndex === -1) return false;

      const headCuttedQueryString = locationQueries.slice(queryNameIndex + 9);
      const questionMarkIndex = headCuttedQueryString.indexOf("?");

      return headCuttedQueryString.slice(0, questionMarkIndex);
    };

    const nestedPage = this._parentElement.classList.contains(
      "order-manage-cards-container"
    );
    const searchKeywords = getKeywords();

    let message = this._productDetailSection
      ? this._productIdNotFoundMessage
      : this._notFoundMessage;

    if (searchKeywords) {
      message = `Không tìm thấy kết quả của "${searchKeywords}"`;
    }

    return `
        <div class="not-found-message center-content">
          <p class="not-found-message__text">${message}</p>
          <a href="${
            nestedPage ? "../" : ""
          }../index.html" class="not-found-message__link">
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
