import { View } from "./view.js";
import PreviewProductsView from "./previewProductsView.js";

class ProductsListSortBarView extends View {
  _parentElement = document.querySelector(".products-arrange-bar");
  _sortSelects;
  _sortPrice;

  _getDataFromSortPrice(dataStr) {
    if (dataStr === "") return null;

    const [min, max] = dataStr.split("-");

    return {
      from: min === "0" ? 0 : Number(min) * 1000000,
      to: max === "max" ? Infinity : Number(max) * 1000000,
    };
  }

  addSortPriceOptionsChangeHandler(productsData) {
    const _this = this;

    this._sortPrice.addEventListener("change", (event) => {
      const products = _this.getProductBySearchQueries(
        productsData,
        this._getDataFromSortPrice(event.target.value)
      );

      PreviewProductsView.renderItems(products, "side-page");
    });
  }

  addSortOptionsChangeHandler() {
    const _this = this;

    this._sortSelects.forEach((select) => {
      if (select.dataset.query === "price-range") return;

      select.addEventListener("change", () => {
        let queriesArr = [];
        _this._sortSelects.forEach((select) => {
          if (select.value !== "") {
            queriesArr.push({
              query: select.dataset.query,
              value: select.value,
            });
          }
        });

        if (select.dataset.query === "category") {
          const queriesIncludeProductType = _this
            ._getLocationSearchValues(false)
            .includes("product-type");

          if (queriesIncludeProductType) {
            queriesArr = queriesArr.filter(
              (queryData) => queryData.query !== "product-type"
            );
          }
        }

        const queriesStr = queriesArr
          .map(({ query, value }) => {
            return `?${query}=${value}`;
          })
          .join("");

        _this.setLocationSearch(queriesStr);
      });
    });
  }

  _generatePriceRangeOptions(priceRange) {
    return priceRange
      .map((price, i) => {
        if (i === 0) {
          return `
            <option value="0-${price}"}>Từ ${price} triệu</option>
          `;
        }

        if (i === priceRange.length - 1) {
          return `
            <option value="${price}-max"}>Trên ${price} triệu</option>
          `;
        }

        return `
          <option value="${price}-${priceRange[i + 1]}"}>
            Từ ${price} - ${priceRange[i + 1]} triệu
          </option>
        `;
      })
      .join("\n");
  }

  _generateMarkup() {
    const { BRANDS, PRODUCT_TYPES, CATEGORIES, ITEM_ARRANGEMENT, PRICE_RANGE } =
      this._data;

    return `
      <div class="product-filter">
        <div class="arrange-title">Bộ lọc tìm kiếm</div>
        <div class="arrange-toolbox">
          ${this._generateOptions(BRANDS, "Nhãn hàng", "brand")}
          ${this._generateOptions(CATEGORIES, "Phòng", "category")}
          ${this._generateOptions(
            PRODUCT_TYPES,
            "Loại sản phẩm",
            "product-type"
          )}

          <select data-query="price-range">
            <option value="">Giá</option>
            ${this._generatePriceRangeOptions(PRICE_RANGE)}
          </select>
        </div>
      </div>
      <div class="product-sort">
        <div class="arrange-title">Sắp xếp</div>
        <div class="arrange-toolbox">
          ${this._generateOptions(ITEM_ARRANGEMENT, null, "arrange")}
        </div>
      </div>
    `;
  }
}

export default new ProductsListSortBarView();
