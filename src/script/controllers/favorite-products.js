import FavoriteProductsView from "../views/favoriteProductsView.js";
import PreviewProductsView from "../views/previewProductsView.js";
import { initializePageHeader, getDataFromLocalStorage } from "../model.js";
import { productsData } from "../DUMMY_DATA/products-data.js";

const breadCrumbsControl = () => {
  FavoriteProductsView.renderBreadCrumbs("favorite-products");
};

const FavoriteProductsControl = () => {
  // Get Favorite products list and render
  const favoriteProducts = getDataFromLocalStorage("favorite-products");
  FavoriteProductsView.renderItems(favoriteProducts);

  // Set Delete button and handle click event
  FavoriteProductsView.setMultiComponentElementsClass(
    "_deleteButtons",
    ".card-content__action .btn--sub"
  );
  FavoriteProductsView.addDeleteClickHandler(FavoriteProductsControl);
};

const recentlyViewedProductsControl = () => {
  PreviewProductsView.setCardTypeClass(".recently-viewed-prodcuts");
  PreviewProductsView.renderItems(productsData, "in-page");
};

const init = () => {
  FavoriteProductsView.addRenderWhenLoadedHanlder(breadCrumbsControl);
  FavoriteProductsView.addRenderWhenLoadedHanlder(FavoriteProductsControl);
  PreviewProductsView.addRenderWhenLoadedHanlder(recentlyViewedProductsControl);
  initializePageHeader("side-page");
};

init();
