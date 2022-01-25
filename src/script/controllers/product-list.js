import PreviewProductsView from "../views/previewProductsView.js";
import {
  addFavoriteProductToLocalStorageHandler,
  getProductById,
} from "../model.js";
import { productsData } from "../DUMMY_DATA/products-data.js";

const cardHeartButtonControl = (productId) => {
  addFavoriteProductToLocalStorageHandler(getProductById(productId));
};

const productsListControl = () => {
  PreviewProductsView.setCardTypeClass("product-list-preview");
  PreviewProductsView.renderItems(productsData, "side-page");

  // Set heart button and handle add favorite product click
  PreviewProductsView.setHeartButtonsElement(cardHeartButtonControl);
};

const init = () => {
  PreviewProductsView.addRenderWhenLoadedHanlder(productsListControl);
};
init();
