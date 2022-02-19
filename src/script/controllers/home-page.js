import PreviewProductsView from "../views/previewProductsView.js";
import PreviewBrandsView from "../views/previewBrandsView.js";
import RegisterEmailFormView from "../views/registerEmailFormView.js";
import { BRANDS } from "../config.js";
import {
  initializePageHeader,
  getProductById,
  addProductToLocalStorage,
  getProductsByType,
  handleBillboardSlider,
} from "../model.js";
import { productsData as oldProductsData } from "../DUMMY_DATA/products-data.js";
import { productsData } from "../DUMMY_DATA/products-data-with-img-url.js";

const brandsPreviewControl = () => {
  PreviewBrandsView.renderItems(BRANDS);

  // Add carousels handler
  PreviewBrandsView.addCarouselsHandler();
};

const cardHeartButtonControl = (productId) => {
  addProductToLocalStorage(getProductById(productId), "favorite-products");
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
    PreviewProductsView.setHeartButtonsElement(cardHeartButtonControl);
  } catch (error) {
    console.log(error);
  }
};

const registerEmailFormControl = (values) => {
  console.log(values);
};

const test = () => {
  let promises = [];

  productsData.forEach((product) => {
    promises.push(
      fetch(
        "https://shop-house-b4d1e-default-rtdb.asia-southeast1.firebasedatabase.app/products.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(product),
        }
      )
    );
  });

  Promise.all(promises).catch((error) => console.log(error));
};

const init = () => {
  initializePageHeader();
  handleBillboardSlider();
  PreviewBrandsView.addRenderWhenLoadedHanlder(brandsPreviewControl);
  PreviewProductsView.addRenderWhenLoadedHanlder(bestSaleProductsControl);
  PreviewProductsView.addRenderWhenLoadedHanlder(newComingProductsControl);
  RegisterEmailFormView.addSubmitFormHandler(registerEmailFormControl, "home");
  // test();
};
init();
