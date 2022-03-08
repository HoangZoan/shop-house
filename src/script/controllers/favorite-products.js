import FavoriteProductsView from "../views/favoriteProductsView.js";
import PreviewProductsView from "../views/previewProductsView.js";
import {
  initializePageHeader,
  getDataFromLocalStorage,
  addProductToLocalStorage,
  getProductsFromDB,
  removeProductFromLocalStorage,
} from "../model.js";

const breadCrumbsControl = () => {
  FavoriteProductsView.renderBreadCrumbs("favorite-products");
};

const cardHeartButtonControl = async (productId) => {
  try {
    const product = await getProductsFromDB(productId);
    addProductToLocalStorage(product, "favorite-products");
    window.location.reload();
  } catch (error) {
    console.log(error);
  }
};

const FavoriteProductsControl = () => {
  // Get Favorite products list and render
  const favoriteProducts = getDataFromLocalStorage("favorite-products");
  FavoriteProductsView.renderItems(favoriteProducts, "side-page");

  // Set Delete button and handle click event
  FavoriteProductsView.setMultiComponentElementsClass(
    "_deleteButtons",
    ".card-content__action .btn--danger"
  );
  FavoriteProductsView.addDeleteClickHandler(FavoriteProductsControl);
};

const recentlyViewedProductsControl = () => {
  const products = getDataFromLocalStorage(
    "recently-viewed-products"
  )?.reverse();

  PreviewProductsView.setCardTypeClass(".recently-viewed-prodcuts");
  PreviewProductsView.renderItems(products, "side-page");
  PreviewProductsView.addCarouselsHandler("recently-viewed-prodcuts");

  // Set heart button and handle add favorite product click
  PreviewProductsView.setHeartButtonsElement(
    cardHeartButtonControl,
    removeProductFromLocalStorage
  );
};

const init = () => {
  initializePageHeader("side-page");
  FavoriteProductsView.addRenderWhenLoadedHanlder(breadCrumbsControl);
  FavoriteProductsView.addRenderWhenLoadedHanlder(FavoriteProductsControl);
  PreviewProductsView.addRenderWhenLoadedHanlder(recentlyViewedProductsControl);
};

init();
