import PreviewProductsView from "../views/previewProductsView.js";
import ProductsListSortBarView from "../views/productsListSortBarView.js";
import ProductsListPaginationView from "../views/productsListPaginationView.js";
import {
  addProductToLocalStorage,
  getProductById,
  initializePageHeader,
  getProductsOnPage,
} from "../model.js";
import {
  BRANDS,
  PRODUCT_TYPES,
  CATEGORIES,
  ITEM_ARRANGEMENT,
  PRICE_RANGE,
  ITEMS_PER_PAGE,
} from "../config.js";
import { productsData } from "../DUMMY_DATA/products-data.js";

const cardHeartButtonControl = (productId) => {
  addProductToLocalStorage(getProductById(productId), "favorite-products");
};

const productsListSortBarControl = () => {
  ProductsListSortBarView.renderSingleItem({
    BRANDS,
    PRODUCT_TYPES,
    CATEGORIES,
    ITEM_ARRANGEMENT,
    PRICE_RANGE,
  });

  // Set options select and handle change event
  ProductsListSortBarView.setMultiComponentElementsClass(
    "_sortSelects",
    ".products-arrange-bar select"
  );
  ProductsListSortBarView.addSortOptionsChangeHandler();

  // Set select for price range and handle change event
  ProductsListSortBarView.setComponentElementClass(
    "_sortPrice",
    ".products-arrange-bar select[data-query='price-range']"
  );
  ProductsListSortBarView.addSortPriceOptionsChangeHandler();

  // Render bread crumbs
  ProductsListSortBarView.renderBreadCrumbs("products-list");
};

function productsListControl(_, page = 1) {
  // Get products by location
  const products = PreviewProductsView.getProductBySearchQueries(productsData);

  // Render pagination
  ProductsListPaginationView.renderSingleItem({
    page,
    pageNumber: Math.ceil(products.length / ITEMS_PER_PAGE),
  });

  // Get products list by page
  const productsOnPage = getProductsOnPage(products, page);

  // Render product items
  PreviewProductsView.setCardTypeClass(".product-list-preview");
  PreviewProductsView.renderItems(productsOnPage, "side-page");

  // Set heart button and handle add favorite product click
  PreviewProductsView.setHeartButtonsElement(cardHeartButtonControl);
}

const init = () => {
  initializePageHeader("side-page");
  ProductsListSortBarView.addRenderWhenLoadedHanlder(
    productsListSortBarControl
  );
  PreviewProductsView.addRenderWhenLoadedHanlder(productsListControl);
  ProductsListPaginationView.addNumberButtonClickHandler(productsListControl);
};
init();
