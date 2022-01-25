import PreviewProductsView from "../views/previewProductsView.js";
import ProductsListSortBarView from "../views/productsListSortBarView.js";
import {
  addFavoriteProductToLocalStorageHandler,
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
  addFavoriteProductToLocalStorageHandler(getProductById(productId));
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
};

const productsListControl = () => {
  PreviewProductsView.setCardTypeClass(".product-list-preview");
  PreviewProductsView.renderItems(productsData, "side-page");

  // Set heart button and handle add favorite product click
  PreviewProductsView.setHeartButtonsElement(cardHeartButtonControl);
};

const init = () => {
  initializePageHeader("side-page");
  ProductsListSortBarView.addRenderWhenLoadedHanlder(
    productsListSortBarControl
  );
  PreviewProductsView.addRenderWhenLoadedHanlder(productsListControl);
};
init();
