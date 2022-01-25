import { View } from "../views/view.js";

class HeaderCategoryView extends View {
  _parentElement = document.querySelector(".header-category__list");

  _genarateHref(currentPage, sortValue) {
    const headHref = currentPage === "home" ? "./pages" : ".";

    return headHref + "/product-list.html?category=" + sortValue;
  }

  _generateMarkup(currentPage) {
    const _this = this;

    return this._data
      .map((data) => {
        return `
          <li class="header-category__list__item">
            <a href=${_this._genarateHref(currentPage, data.value)}>
              ${data.name}
            </a>
          </li>
      `;
      })
      .join("\n");
  }
}

export default new HeaderCategoryView();
