import PreviewProductsView from "../views/previewProductsView.js";
import ProductDetailOrderView from "../views/product-detail-view/productDetailOrderView.js";
import ProductDetailDescriptionView from "../views/product-detail-view/productDetailDescriptionView.js";
import {
  initializePageHeader,
  addProductToLocalStorage,
  getProductsByType,
  addRecentlyViewedProducts,
  getProductsFromDB,
} from "../model.js";

const productDetailDescriptionControl = async () => {
  try {
    // Get product id from hash name and render
    const hash = window.location.hash.slice(1);
    const product = await getProductsFromDB(hash);
    ProductDetailDescriptionView.renderSingleItem(product);

    // Handle product images carousel
    ProductDetailDescriptionView.addProductImagesCarouselHandler();

    // Add product as recently viewed
    addRecentlyViewedProducts(product);

    // Render bread crumbs
    ProductDetailDescriptionView.renderBreadCrumbs("product-detail");

    // Handle reload page when hash change
    ProductDetailDescriptionView.addHashChangeHandler();

    // Render product order card by break-point
    const responsive = window.matchMedia("(max-width: 50em)").matches;

    if (responsive) {
      ProductDetailOrderView.setCardTypeClass(".product-order--responsive");

      // Get product id from hash name and render
      ProductDetailOrderView.renderSingleItem(product);

      // Set favorite button and handle click event
      ProductDetailOrderView.setComponentElementClass(
        "_favoriteBtn",
        ".product-order__action .btn--sub"
      );
      ProductDetailOrderView.addFavoriteBtnClickHanlder(
        addProductToLocalStorage
      );

      // Set add to cart button and handle click event
      ProductDetailOrderView.setComponentElementClass(
        "_addToCartBtn",
        ".product-order__action .btn--primary"
      );
      ProductDetailOrderView.addAddToCartBtnClickHandler(
        addProductToLocalStorage
      );
    }
  } catch (error) {
    console.log(error);
  }
};

const productDetailOrderControl = async () => {
  try {
    // Render product order card by break-point
    const responsive = window.matchMedia("(min-width: 51em)").matches;

    if (responsive) {
      ProductDetailOrderView.setCardTypeClass(".product-order--origin");
    }

    // Get product id from hash name and render
    const hash = window.location.hash.slice(1);
    const product = await getProductsFromDB(hash);
    ProductDetailOrderView.renderSingleItem(product);

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
    ProductDetailOrderView.addAddToCartBtnClickHandler(
      addProductToLocalStorage
    );
  } catch (error) {
    console.log(error);
  }
};

const cardHeartButtonControl = async (productId) => {
  try {
    const product = await getProductsFromDB(productId);
    addProductToLocalStorage(product, "favorite-products");
  } catch (error) {
    console.log(error);
  }
};

const followingPurchaseProductsControl = async () => {
  try {
    const hash = window.location.hash.slice(1);
    const productData = await getProductsFromDB(hash);
    const products = await getProductsByType(
      "following-purchase",
      productData.category.value,
      productData.id
    );

    PreviewProductsView.setCardTypeClass(".following-purchase-preview");
    PreviewProductsView.renderItems(products, "in-page");
    PreviewProductsView.addCarouselsHandler("following-purchase-preview");

    // Set heart button and handle add favorite product click
    PreviewProductsView.setHeartButtonsElement(cardHeartButtonControl);
  } catch (error) {
    console.log(error);
  }
};

const similarProductsControl = async () => {
  try {
    const hash = window.location.hash.slice(1);
    const productData = await getProductsFromDB(hash);
    const products = await getProductsByType(
      "similar-purchase",
      productData.productType,
      productData.id
    );

    PreviewProductsView.setCardTypeClass(".similar-purchase-preview");
    PreviewProductsView.renderItems(products, "in-page");
    PreviewProductsView.addCarouselsHandler("similar-purchase-preview");

    // Set heart button and handle add favorite product click
    PreviewProductsView.setHeartButtonsElement(cardHeartButtonControl);
  } catch (error) {
    console.log(error);
  }
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
