import OrderCardsView from "../views/your-cart-view/orderCardsView.js";
import {
  initializePageHeader,
  getDataFromLocalStorage,
  getProductById,
  addProductToLocalStorage,
  removeProductFromLocalStorage,
} from "../model.js";

function saveButtonControl(productId) {
  // Save the product for later
  const savedProduct = getProductById(productId);
  addProductToLocalStorage(savedProduct, "favorite-products");

  // Remove the product from orders table
  removeProductFromLocalStorage(productId, "in-cart-products");
  orderCardsControl();
}

function orderCardsControl() {
  // Get in-cart products and render
  const inCartProducts = getDataFromLocalStorage("in-cart-products");
  OrderCardsView.renderItems(inCartProducts);

  // Set save product button and handle click event
  OrderCardsView.setComponentElementClass(
    "_saveButton",
    ".order-card__text__action .btn--link.save"
  );
  OrderCardsView.addSaveButtonClickHandler(saveButtonControl);
}

const init = () => {
  initializePageHeader("side-page");
  OrderCardsView.renderBreadCrumbs("your-cart");
  OrderCardsView.addRenderWhenLoadedHanlder(orderCardsControl);
};
init();
