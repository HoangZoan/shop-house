import PreviewProductsView from "../views/previewProductsView.js";
import PreviewBrandsView from "../views/previewBrandsView.js";
import RegisterEmailFormView from "../views/registerEmailFormView.js";
import { productsData } from "../DUMMY_DATA/products-data.js";
import { BRANDS } from "../config.js";
import {
  initializePageHeader,
  getProductById,
  addProductToLocalStorage,
} from "../model.js";

const brandsPreviewControl = () => {
  PreviewBrandsView.renderItems(BRANDS);
};

const cardHeartButtonControl = (productId) => {
  addProductToLocalStorage(getProductById(productId), "favorite-products");
};

const bestSaleProductsControl = () => {
  PreviewProductsView.setCardTypeClass(".best-seller-preview");
  // PreviewProductsView.renderItems(productsData);
};

const newComingProductsControl = () => {
  PreviewProductsView.setCardTypeClass(".new-coming-preview");
  // PreviewProductsView.renderItems(productsData);

  // Set heart button and handle add favorite product click
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
