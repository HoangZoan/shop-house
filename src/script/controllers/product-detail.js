import PreviewProductsView from "../views/previewProductsView.js";
import ProductDetailOrderView from "../views/product-detail-view/productDetailOrderView.js";
import ProductDetailDescriptionView from "../views/product-detail-view/productDetailDescriptionView.js";
import {
  initializePageHeader,
  getProductById,
  addProductToLocalStorage,
} from "../model.js";
import { productsData } from "../DUMMY_DATA/products-data.js";

const productDetailDescriptionControl = () => {
  // Get product id from hash name and render
  const hash = window.location.hash.slice(1);
  ProductDetailDescriptionView.renderSingleItem(getProductById(hash));

  // Render bread crumbs
  ProductDetailDescriptionView.renderBreadCrumbs("product-detail");
};

const productDetailOrderControl = () => {
  // Render product order card by break-point
  const responsive = window.matchMedia("(max-width: 50em)").matches;
  ProductDetailOrderView.setCardTypeClass(
    `${responsive ? ".product-order--responsive" : ".product-order--origin"}`
  );

  // Get product id from hash name and render
  const hash = window.location.hash.slice(1);
  ProductDetailOrderView.renderSingleItem(getProductById(hash));

  // Set options select and handle change event
  ProductDetailOrderView.setMultiComponentElementsClass(
    "_sortSelects",
    ".product-order__product-filter select"
  );
  ProductDetailOrderView.addSortOptionsChangeHandler();

  // Set favorite button and handle click event
  ProductDetailOrderView.setComponentElementClass(
    "_favoriteBtn",
    ".product-order__action .btn--sub"
  );
  ProductDetailOrderView.addFavoriteBtnClickHanlder(addProductToLocalStorage);

  // Set add to cart button and handle click event
  ProductDetailOrderView.setComponentElementClass(
    "_addToCartBtn",
    ".product-order__action .btn--primary"
  );
  ProductDetailOrderView.addAddToCartBtnClickHandler(addProductToLocalStorage);
};

const cardHeartButtonControl = (productId) => {
  addProductToLocalStorage(getProductById(productId), "favorite-products");
};

const followingPurchaseProductsControl = () => {
  PreviewProductsView.setCardTypeClass(".following-purchase-preview");
  // PreviewProductsView.renderItems(productsData, "in-page");
};

const similarProductsControl = () => {
  PreviewProductsView.setCardTypeClass(".similar-purchase-preview");
  // PreviewProductsView.renderItems(productsData, "in-page");

  // Set heart button and handle add favorite product click
  PreviewProductsView.setHeartButtonsElement(cardHeartButtonControl);
};

const init = () => {
  initializePageHeader("side-page");
  ProductDetailDescriptionView.addRenderByLocationHandler(
    productDetailDescriptionControl
  );
  ProductDetailOrderView.addRenderByLocationHandler(productDetailOrderControl);
  PreviewProductsView.addRenderWhenLoadedHanlder(
    followingPurchaseProductsControl
  );
  PreviewProductsView.addRenderWhenLoadedHanlder(similarProductsControl);
};
init();
