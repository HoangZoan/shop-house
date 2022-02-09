import { View } from "./view.js";
import { ITEMS_PER_PAGE } from "../config.js";

class ProductsListPaginationView extends View {
  _parentElement = document.querySelector(".pagination");
  _pageNumber = 1;

  addUpdateProductListWhenResizeHandler(handler) {
    window.addEventListener("resize", () => {
      const mediaMax = window.matchMedia("(max-width: 60em)").matches;
      const mediaMin = window.matchMedia("(min-width: 40em)").matches;

      if (mediaMin && mediaMax) {
        handler(null, this._pageNumber, ITEMS_PER_PAGE + 1);
      } else {
        handler(null, this._pageNumber, ITEMS_PER_PAGE);
      }
    });
  }

  addNumberButtonClickHandler(handler) {
    this._parentElement.addEventListener("click", (event) => {
      const sortBarEl = document.querySelector(".products-arrange-bar");
      const numberBtn = event.target.closest(".pagination__btn--number");
      const nextBtn = event.target.closest(".pagination__btn--next");
      const prevBtn = event.target.closest(".pagination__btn--prev");
      const { page, pageNum } = this._data;

      if (numberBtn) {
        const btnNumber = Number(numberBtn.innerText);
        handler(null, btnNumber);
        this._pageNumber = btnNumber;
      }

      if (nextBtn && page !== pageNum) {
        handler(null, page + 1);
        this._pageNumber = page + 1;
      }

      if (prevBtn && page !== 1) {
        handler(null, page - 1);
        this._pageNumber = page - 1;
      }

      sortBarEl.scrollIntoView({ behavior: "smooth" });
    });
  }

  _generatePaginationNumberButtons(page, pageNumber) {
    let markupArr = [];

    if (pageNumber <= 5) {
      for (let i = 1; i <= pageNumber; i++) {
        markupArr.push(
          `<button class="pagination__btn pagination__btn--number ${
            i === page ? "active" : ""
          }">${i}</button>`
        );
      }
    } else {
      for (let i = page - 2; i <= page + 2; i++) {
        markupArr.push(
          `<button class="pagination__btn pagination__btn--number ${
            i === page ? "active" : ""
          }">${i}</button>`
        );
      }
    }

    return markupArr.join("\n");
  }

  _generateMarkup() {
    const { page, pageNumber } = this._data;

    if (pageNumber < 2) return "";

    return `
        <button class="pagination__btn pagination__btn--prev">Trước</button>
        ${this._generatePaginationNumberButtons(page, pageNumber)}
        <button class="pagination__btn pagination__btn--next">Tiếp</button>
    `;
  }
}

export default new ProductsListPaginationView();
