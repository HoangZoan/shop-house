import PreviewProductsView from "../views/previewProductsView.js";
import PreviewBrandsView from "../views/previewBrandsView.js";
import RegisterEmailFormView from "../views/registerEmailFormView.js";
import { BRANDS } from "../config.js";
import {
  initializePageHeader,
  getProductById,
  addProductToLocalStorage,
  getProductsByType,
} from "../model.js";

const brandsPreviewControl = () => {
  PreviewBrandsView.renderItems(BRANDS);

  // Add carousels handler
  PreviewBrandsView.addCarouselsHandler();
};

const cardHeartButtonControl = (productId) => {
  addProductToLocalStorage(getProductById(productId), "favorite-products");
};

const bestSaleProductsControl = () => {
  PreviewProductsView.setCardTypeClass(".best-seller-preview");
  PreviewProductsView.renderItems(getProductsByType("best-seller"));

  // Add carousels handler
  PreviewProductsView.addCarouselsHandler("best-seller-preview");
};

const newComingProductsControl = () => {
  PreviewProductsView.setCardTypeClass(".new-coming-preview");
  PreviewProductsView.renderItems(getProductsByType("new-coming"));

  // Add carousels handler
  PreviewProductsView.addCarouselsHandler("new-coming-preview");

  // Set heart button and handle add favorite product click (including best-seller)
  PreviewProductsView.setHeartButtonsElement(cardHeartButtonControl);
};

const registerEmailFormControl = (values) => {
  console.log(values);
};

const init = () => {
  initializePageHeader();
  PreviewBrandsView.addRenderWhenLoadedHanlder(brandsPreviewControl);
  PreviewProductsView.addRenderWhenLoadedHanlder(bestSaleProductsControl);
  PreviewProductsView.addRenderWhenLoadedHanlder(newComingProductsControl);
  RegisterEmailFormView.addSubmitFormHandler(registerEmailFormControl, "home");
};
init();
