import PreviewProductsView from "../views/previewProductsView.js";
import ProductDetailOrderView from "../views/product-detail-view/productDetailOrderView.js";
import { toolBoxClickHandler, getProductById } from "../model.js";
import { productsData } from "../DUMMY_DATA/products-data.js";

const productDetailOrderControl = () => {
  const hash = window.location.hash.slice(1);

  ProductDetailOrderView.renderSingleItem(getProductById(hash));
};

const followingPurchaseProductsControl = () => {
  PreviewProductsView.setCardTypeClass("following-purchase-preview");
  PreviewProductsView.renderItems(productsData, "branch-page");
};

const similarProductsControl = () => {
  PreviewProductsView.setCardTypeClass("similar-purchase-preview");
  PreviewProductsView.renderItems(productsData, "branch-page");
};

const init = () => {
  toolBoxClickHandler();
  ProductDetailOrderView.addRenderByLocationHandler(productDetailOrderControl);
  PreviewProductsView.addRenderWhenLoadedHanlder(
    followingPurchaseProductsControl
  );
  PreviewProductsView.addRenderWhenLoadedHanlder(similarProductsControl);
};
init();
