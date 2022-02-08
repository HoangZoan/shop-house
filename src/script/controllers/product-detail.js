import PreviewProductsView from "../views/previewProductsView.js";
import ProductDetailOrderView from "../views/product-detail-view/productDetailOrderView.js";
import ProductDetailDescriptionView from "../views/product-detail-view/productDetailDescriptionView.js";
import {
  initializePageHeader,
  getProductById,
  addProductToLocalStorage,
  getProductsByType,
  addRecentlyViewedProducts,
} from "../model.js";

const productDetailDescriptionControl = () => {
  // Get product id from hash name and render
  const hash = window.location.hash.slice(1);
  const product = getProductById(hash);
  ProductDetailDescriptionView.renderSingleItem(product);

  // Add product as recently viewed
  addRecentlyViewedProducts(product);

  // Render bread crumbs
  ProductDetailDescriptionView.renderBreadCrumbs("product-detail");

  // Handle reload page when hash change
  ProductDetailDescriptionView.addHashChangeHandler();
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
  const productData = ProductDetailOrderView.getData();
  const products = getProductsByType(
    "following-purchase",
    productData.category.value,
    productData.id
  );

  PreviewProductsView.setCardTypeClass(".following-purchase-preview");
  PreviewProductsView.renderItems(products, "in-page");
  PreviewProductsView.addCarouselsHandler("following-purchase-preview");
};

const similarProductsControl = () => {
  const productData = ProductDetailOrderView.getData();
  const products = getProductsByType(
    "similar-purchase",
    productData.productType,
    productData.id
  );

  PreviewProductsView.setCardTypeClass(".similar-purchase-preview");
  PreviewProductsView.renderItems(products, "in-page");
  PreviewProductsView.addCarouselsHandler("similar-purchase-preview");

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
