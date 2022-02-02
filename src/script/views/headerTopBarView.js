import { View } from "../views/view.js";

class HeaderCategoryView extends View {
  _parentElement = document.querySelector(".header-category__list");

  _genarateHref(currentPage, sortValue) {
    let headHref;

    switch (currentPage) {
      case "home":
        headHref = "./pages";
        break;
      case "side-page":
        headHref = ".";
        break;
      case "nested-page":
        headHref = "..";
        break;
    }

    return (
      headHref +
      "/product-list.html?category=" +
      sortValue +
      "?arrange=most-purchased"
    );
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
