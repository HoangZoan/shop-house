import FavoriteProductsView from "../views/favoriteProductsView.js";
import PreviewProductsView from "../views/previewProductsView.js";
import {
  initializePageHeader,
  getDataFromLocalStorage,
  addProductToLocalStorage,
  getProductById,
} from "../model.js";

const breadCrumbsControl = () => {
  FavoriteProductsView.renderBreadCrumbs("favorite-products");
};

const cardHeartButtonControl = (productId) => {
  addProductToLocalStorage(getProductById(productId), "favorite-products");
  window.location.reload();
};

const FavoriteProductsControl = () => {
  // Get Favorite products list and render
  const favoriteProducts = getDataFromLocalStorage("favorite-products");
  FavoriteProductsView.renderItems(favoriteProducts, "side-page");

  // Set Delete button and handle click event
  FavoriteProductsView.setMultiComponentElementsClass(
    "_deleteButtons",
    ".card-content__action .btn--sub"
  );
  FavoriteProductsView.addDeleteClickHandler(FavoriteProductsControl);
};

const recentlyViewedProductsControl = () => {
  const products = getDataFromLocalStorage(
    "recently-viewed-products"
  ).reverse();

  PreviewProductsView.setCardTypeClass(".recently-viewed-prodcuts");
  PreviewProductsView.renderItems(products, "side-page");
  PreviewProductsView.addCarouselsHandler("recently-viewed-prodcuts");

  // Set heart button and handle add favorite product click
  PreviewProductsView.setHeartButtonsElement(cardHeartButtonControl);
};

const init = () => {
  initializePageHeader("side-page");
  FavoriteProductsView.addRenderWhenLoadedHanlder(breadCrumbsControl);
  FavoriteProductsView.addRenderWhenLoadedHanlder(FavoriteProductsControl);
  PreviewProductsView.addRenderWhenLoadedHanlder(recentlyViewedProductsControl);
};

init();
