import PreviewProductsView from "../views/previewProductsView.js";
import PreviewBrandsView from "../views/previewBrandsView.js";
import RegisterEmailFormView from "../views/registerEmailFormView.js";
import { BRANDS } from "../config.js";
import {
  initializePageHeader,
  addProductToLocalStorage,
  getProductsByType,
  handleBillboardSlider,
  getProductsFromDB,
  removeProductFromLocalStorage,
} from "../model.js";

const brandsPreviewControl = () => {
  PreviewBrandsView.renderItems(BRANDS);

  // Add carousels handler
  PreviewBrandsView.addCarouselsHandler();
};

const cardHeartButtonControl = async (productId) => {
  try {
    const product = await getProductsFromDB(productId);
    addProductToLocalStorage(product, "favorite-products");
  } catch (error) {
    console.log(error);
  }
};

const bestSaleProductsControl = async () => {
  try {
    const product = await getProductsByType("best-seller");

    PreviewProductsView.setCardTypeClass(".best-seller-preview");
    PreviewProductsView.renderItems(product);

    // Add carousels handler
    PreviewProductsView.addCarouselsHandler("best-seller-preview");
  } catch (error) {
    console.log(error);
  }
};

const newComingProductsControl = async () => {
  try {
    const product = await getProductsByType("new-coming");

    PreviewProductsView.setCardTypeClass(".new-coming-preview");
    PreviewProductsView.renderItems(product);

    // Add carousels handler
    PreviewProductsView.addCarouselsHandler("new-coming-preview");

    // Set heart button and handle add favorite product click (including best-seller)
    PreviewProductsView.setHeartButtonsElement(
      cardHeartButtonControl,
      removeProductFromLocalStorage
    );
  } catch (error) {
    console.log(error);
  }
};

const registerEmailFormControl = (values) => {
  console.log(values);
};

const init = () => {
  initializePageHeader();
  handleBillboardSlider();
  PreviewBrandsView.addRenderWhenLoadedHanlder(brandsPreviewControl);
  PreviewProductsView.addRenderWhenLoadedHanlder(bestSaleProductsControl);
  PreviewProductsView.addRenderWhenLoadedHanlder(newComingProductsControl);
  RegisterEmailFormView.addSubmitFormHandler(registerEmailFormControl, "home");
};
init();
