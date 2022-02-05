import { View } from "./view.js";

class ProductsListPaginationView extends View {
  _parentElement = document.querySelector(".pagination");

  _generateMarkup() {
    return `
        <button class="pagination__btn pagination__btn--next">Trước</button>
        <button class="pagination__btn pagination__btn--number active">
        1
        </button>
        <button class="pagination__btn pagination__btn--number">2</button>
        <button class="pagination__btn pagination__btn--number">3</button>
        <button class="pagination__btn pagination__btn--number last-number">
        4
        </button>
        <button class="pagination__btn pagination__btn--number last-number">
        5
        </button>
        <button class="pagination__btn pagination__btn--prev">Tiếp</button>
    `;
  }
}

export default new ProductsListPaginationView();
