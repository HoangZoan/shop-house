import PreviewProductsView from "../views/previewProductsView.js";
import ProductDetailOrderView from "../views/product-detail-view/productDetailOrderView.js";
import ProductDetailDescriptionView from "../views/product-detail-view/productDetailDescriptionView.js";
import {
  toolBoxClickHandler,
  getProductById,
  persistDataOnLocalStorage,
  getDataFromLocalStorage,
} from "../model.js";
import { productsData } from "../DUMMY_DATA/products-data.js";

const ProductDetailDescriptionControl = () => {
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
    `${responsive ? "product-order--responsive" : "product-order--origin"}`
  );

  // Get product id from hash name and render
  const hash = window.location.hash.slice(1);
  ProductDetailOrderView.renderSingleItem(getProductById(hash));

  // Set select input value to the location search
  ProductDetailOrderView.setLocationSearch();

  // Set click event on favorite button after render order card
  ProductDetailOrderView.setComponentElementClass(
    "_favoriteBtn",
    "product-order__action .btn--sub"
  );
  ProductDetailOrderView.addFavoriteBtnClickHanlder(favoriteBtnClickControl);
};

const favoriteBtnClickControl = (productData) => {
  const favoriteProducts = getDataFromLocalStorage("favorite-products");

  if (favoriteProducts) {
    const match = favoriteProducts.find(
      (product) => productData.id === product.id
    );

    if (!match) {
      persistDataOnLocalStorage("favorite-products", [
        ...favoriteProducts,
        productData,
      ]);
    }
  } else {
    persistDataOnLocalStorage("favorite-products", [productData]);
  }
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
  ProductDetailDescriptionView.addRenderByLocationHandler(
    ProductDetailDescriptionControl
  );
  ProductDetailOrderView.addRenderByLocationHandler(productDetailOrderControl);
  PreviewProductsView.addRenderWhenLoadedHanlder(
    followingPurchaseProductsControl
  );
  PreviewProductsView.addRenderWhenLoadedHanlder(similarProductsControl);
};
init();
