import { View } from "./view.js";

class ProductsListSortBarView extends View {
  _parentElement = document.querySelector(".products-arrange-bar");
  _sortSelects;

  addSortOptionsChangeHandler() {
    this._sortSelects.forEach((select) => {
      if (select.dataset.query === "price-range") return;

      select.addEventListener("change", () => {
        let queriesArr = [];
        this._sortSelects.forEach((select) => {
          if (select.value !== "") {
            queriesArr.push({
              query: select.dataset.query,
              value: select.value,
            });
          }
        });

        const queriesStr = queriesArr
          .map(({ query, value }) => {
            return `?${query}=${value}`;
          })
          .join("");

        this.setLocationSearch(queriesStr);
      });
    });
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
            <option value="">1</option>
            <option value="">2</option>
            <option value="">3</option>
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
