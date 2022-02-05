import PreviewProductsView from "../views/previewProductsView.js";
import ProductsListSortBarView from "../views/productsListSortBarView.js";
import ProductsListPaginationView from "../views/productsListPaginationView.js";
import {
  addProductToLocalStorage,
  getProductById,
  initializePageHeader,
} from "../model.js";
import {
  BRANDS,
  PRODUCT_TYPES,
  CATEGORIES,
  ITEM_ARRANGEMENT,
  PRICE_RANGE,
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

function productsListControl(page = 1) {
  // Get products by location
  const products = PreviewProductsView.getProductBySearchQueries(productsData);

  // Render pagination
  ProductsListPaginationView.renderSingleItem(true);

  // Get products list by page

  // Render product items
  PreviewProductsView.setCardTypeClass(".product-list-preview");
  PreviewProductsView.renderItems(products, "side-page");

  // Set heart button and handle add favorite product click
  PreviewProductsView.setHeartButtonsElement(cardHeartButtonControl);
}

function productListPaginationControl() {}

const init = () => {
  initializePageHeader("side-page");
  ProductsListSortBarView.addRenderWhenLoadedHanlder(
    productsListSortBarControl
  );
  PreviewProductsView.addRenderWhenLoadedHanlder(productsListControl);
};
init();
