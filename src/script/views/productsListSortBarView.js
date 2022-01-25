import { View } from "./view.js";
import { PRODUCTS_LIST_SEARCH_QUERIES } from "../config.js";

class ProductsListSortBarView extends View {
  _parentElement = document.querySelector(".products-arrange-bar");
  _searchQueries = PRODUCTS_LIST_SEARCH_QUERIES;
  _sortSelects;

  _generateMarkup() {
    const { BRANDS, PRODUCT_TYPES, CATEGORIES, ITEM_ARRANGEMENT, PRICE_RANGE } =
      this._data;

    return `
      <div class="product-filter">
        <div class="arrange-title">Bộ lọc tìm kiếm</div>
        <div class="arrange-toolbox">
          ${this._generateOptions(BRANDS, "Nhãn hàng", "brand")}
          ${this._generateOptions(
            PRODUCT_TYPES,
            "Loại sản phẩm",
            "product-type"
          )}
          ${this._generateOptions(CATEGORIES, "Phòng", "category")}

          <select>
            <option value="">Giá</option>
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
