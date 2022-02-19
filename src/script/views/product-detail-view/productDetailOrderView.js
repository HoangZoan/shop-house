import { View } from "../view.js";
import { calcSalesPrice, convertNumberToPriceString } from "../../helpers.js";
import { PRODUCT_DETAIL_SEARCH_QUERIES } from "../../config.js";

class ProductDetailOrderView extends View {
  _parentElement;
  _iconsHref = "../resources/images/policy/";
  _searchQueries = PRODUCT_DETAIL_SEARCH_QUERIES;
  _sortSelects;
  _favoriteBtn;
  _addToCartBtn;

  _getInCartProductData() {
    const _this = this;
    const data = this._data;
    let specifications = [];
    this._searchQueries.forEach((search) => {
      const hasValueSelect = [...this._sortSelects].find(
        (select) => select.dataset.query === search.query
      );

      if (hasValueSelect)
        specifications.push({
          name: search.name,
          value: hasValueSelect.querySelector("option[selected]").dataset.name,
        });
    });

    const deliveryDate = data.policy.find(
      (pol) => pol.deliveryDate
    ).deliveryDate;

    const thmbImage = data.images.find(
      (imageData) =>
        imageData.type === _this._getLocationSearchValues() ||
        _this._getLocationSearchValues() === "_blank"
    ).imageUrls[0];

    return {
      distributor: data.distributor,
      initialPrice: data.initialPrice,
      discount: data.tags.discount,
      locationSearch: window.location.search,
      id: data.id,
      title: data.title,
      specifications,
      deliveryDate,
      thmbImage,
    };
  }

  addAddToCartBtnClickHandler(handler) {
    const _this = this;
    this._addToCartBtn.addEventListener("click", () => {
      handler(_this._getInCartProductData(), "in-cart-products");
      console.log(_this._getInCartProductData());

      _this._buttonChangeTextHandler(_this._addToCartBtn, "Thêm vào giỏ");
    });
  }

  addFavoriteBtnClickHanlder(handler) {
    const _this = this;
    this._favoriteBtn.addEventListener("click", () => {
      handler(_this._data, "favorite-products");

      _this._buttonChangeTextHandler(_this._favoriteBtn, "Yêu thích");
    });
  }

  addSortOptionsChangeHandler() {
    const _this = this;
    let initialQueries = [];

    this._searchQueries.forEach(({ query }) => {
      if (!_this._data.sort) return;
      const queryMatch = _this._data.sort.find((srt) => srt.type === query);

      if (queryMatch) {
        const defaultValue = queryMatch.values.find((srt) => srt.default).value;
        initialQueries.push({ query, value: defaultValue });
      }
    });

    this._sortSelects.forEach((select) => {
      select.addEventListener("change", (event) => {
        if (event.target.vale === "") return;

        const index = initialQueries.findIndex(
          ({ query }) => query === event.target.dataset.query
        );
        initialQueries[index].value = event.target.value;
        const queriesStr = initialQueries
          .map(({ query, value }) => {
            return `?${query}=${value}`;
          })
          .join("");

        _this.setLocationSearch(queriesStr);
      });
    });
  }

  _generatePromotionList(list) {
    return list
      .map((item) => {
        if (item.type == "freeShip-on-total") {
          return `
          <li>
            Áp dụng mã <strong>${item.promotionCode}</strong> để miễn phí giao
            hàng với đơn hàng có giá trị
            <strong>từ ${item.totalRate} đồng</strong>
          </li>
        `;
        }

        if (item.message) {
          return `
            <li>${item.message}</li>
          `;
        }

        if (item.gifts) {
          return `
            <li>Quà tặng kèm: <strong>${item.gifts.join(", ")}</strong></li>
          `;
        }

        if (item.freeShipCode) {
          return `
            <li>Nhập mã <strong>${item.freeShipCode}</strong> để được vận chuyển miễn phí</li>
          `;
        }
      })
      .join("\n");
  }

  _generatePrice(price, discount) {
    if (!discount) {
      return `
        <div class="product-order__price-container">
          <div class="product-order__price-tag">${convertNumberToPriceString(
            price - 1
          )}đ</div>
        </div>
      `;
    } else {
      return `
        <div class="product-order__price-container">
          <div class="product-order__price-tag">${convertNumberToPriceString(
            calcSalesPrice(price, discount) - 1
          )}đ</div>
          <div class="product-order__price-tag--old">
            <del>${convertNumberToPriceString(price - 1)}đ</del>
          </div>
        </div>
      `;
    }
  }

  _generatePolicy(policies) {
    const _this = this;
    return policies
      .map((policy) => {
        let text;

        if (policy.warranty) {
          text = `Bảo hành <strong>${policy.warranty.time} ${policy.warranty.unit}</strong>`;
        } else if (policy.deliveryDate) {
          text = `Vận chuyển tận nơi <strong>từ ${policy.deliveryDate.from} đến ${policy.deliveryDate.to} ngày</strong>`;
        } else if (policy.gift) {
          text = "Có quà tặng kèm sản phẩm";
        } else {
          return "";
        }

        return `
          <li>
            <div class="policy-icon">
              <img
                src="${_this._iconsHref}${policy.icon}.svg"
                alt="Some icon"
              />
            </div>
            <p class="policy-description">
              ${text}
            </p>
          </li>
        `;
      })
      .join("\n");
  }

  _generateMarkup() {
    const data = this._data;

    return `
      <div class="product-order__title-info">
        <h3 class="heading--3">${data.title}</h3>
        <div class="product-order__title-info__distributor">
          <span>Phân phối bởi: <a href="./product-list.html?distr=${
            data.distributor.search
          }">${data.distributor.name}</a></span>
        </div>
      </div>

      ${
        data.promotion && data.promotion.length > 0
          ? `
        <ul class="product-order__promotion-list">
          ${this._generatePromotionList(data.promotion)}
        </ul>
      `
          : ""
      }
      

      ${this._generatePrice(data.initialPrice, data.tags.discount)}

      <div class="product-order__product-filter">
        ${this._generateOptions(data.sort || [])}
      </div>

      <div class="product-order__action">
        <button class="btn--sub">Yêu thích</button>
        <button class="btn--primary">Thêm vào giỏ</button>
      </div>

      <div class="divider"></div>

      <div class="product-order__policy-title">Chính sách sản phẩm</div>

      <ul class="product-order__policy-list">
        ${this._generatePolicy(data.policy)}
      </ul>
    `;
  }
}

export default new ProductDetailOrderView();
