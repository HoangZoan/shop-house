import { View } from "../view.js";
import { calcSalesPrice, convertPriceNumber } from "../../helpers.js";
import { PRODUCT_DETAIL_SEARCH_QUERIES } from "../../config.js";

class ProductDetailOrderView extends View {
  _parentElement;
  _iconsHref = "../resources/images/policy/";
  _searchQueries = PRODUCT_DETAIL_SEARCH_QUERIES;
  _sortSelects;
  _favoriteBtn;
  _addToCartBtn;

  addAddToCartBtnClickHandler(handler) {
    const _this = this;
    this._addToCartBtn.addEventListener("click", () => {
      handler(_this._data, "in-cart-products");

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
      })
      .join("\n");
  }

  _generatePrice(price, discount) {
    if (!discount) {
      return `
        <div class="product-order__price-tag">${convertPriceNumber(
          price
        )}đ</div>
      `;
    } else {
      return `
        <div class="product-order__price-container">
          <div class="product-order__price-tag">${convertPriceNumber(
            calcSalesPrice(price, discount)
          )}đ</div>
          <div class="product-order__price-tag--old">
            <del>${convertPriceNumber(price)}đ</del>
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

      <ul class="product-order__promotion-list">
        ${this._generatePromotionList(data.promotion)}
      </ul>

      ${this._generatePrice(data.initialPrice, data.tags.discount)}

      <div class="product-order__product-filter">
        ${this._generateOptions(data.sort)}
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
