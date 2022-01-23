import FavoriteProductsView from "../views/favoriteProductsView.js";
import PreviewProductsView from "../views/previewProductsView.js";
import { toolBoxClickHandler } from "../model.js";
import { productsData } from "../DUMMY_DATA/products-data.js";

const breadCrumbsControl = () => {
  FavoriteProductsView.renderBreadCrumbs("favorite-products");
};

const recentlyViewedProductsControl = () => {
  PreviewProductsView.setCardTypeClass("recently-viewed-prodcuts");
  PreviewProductsView.renderItems(productsData, "branch-page");
};

const init = () => {
  FavoriteProductsView.addRenderWhenLoadedHanlder(breadCrumbsControl);
  PreviewProductsView.addRenderWhenLoadedHanlder(recentlyViewedProductsControl);
  toolBoxClickHandler();
};

init();
