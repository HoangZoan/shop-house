import OrderCardsView from "../views/your-cart-view/orderCardsView.js";
import CheckOutFormView from "../views/your-cart-view/checkOutFormView.js";
import {
  initializePageHeader,
  getDataFromLocalStorage,
  getProductById,
  addProductToLocalStorage,
  removeProductFromLocalStorage,
} from "../model.js";

function saveButtonControl(productId, productSpecs) {
  // Save the product for later
  const savedProduct = getProductById(productId);
  addProductToLocalStorage(savedProduct, "favorite-products");

  // Remove the product from orders table
  removeProductFromLocalStorage(productSpecs, "in-cart-products");
  orderCardsControl();
}

function confirmDeleteButtonControl(productSpecs) {
  // Remove the product from orders table
  removeProductFromLocalStorage(productSpecs, "in-cart-products");
  orderCardsControl();
}

function orderCardsControl() {
  // Get in-cart products and render
  const inCartProducts = getDataFromLocalStorage("in-cart-products");
  OrderCardsView.renderItems(inCartProducts);

  // Set save product button and handle click event
  OrderCardsView.setMultiComponentElementsClass(
    "_saveButtons",
    ".order-card__text__action .btn--link.save"
  );
  OrderCardsView.addSaveButtonClickHandler();

  // Set confirm save button and handle click event
  OrderCardsView.setMultiComponentElementsClass(
    "_confirmSaveButtons",
    ".order-card__text__action .btn--link.confirm-save"
  );
  OrderCardsView.addConfirmSaveButtonClickHandler(saveButtonControl);

  // Set delete product button and handle click event
  OrderCardsView.setMultiComponentElementsClass(
    "_deleteButtons",
    ".order-card__text__action .btn--link.delete"
  );
  OrderCardsView.addDeleteButtonClickHandler();

  // Set confirm delete button and handle click event
  OrderCardsView.setMultiComponentElementsClass(
    "_confirmDeleteButtons",
    ".order-card__text__action .btn--link.confirm-delete"
  );
  OrderCardsView.addConfirmDeleteButtonClickHandler(confirmDeleteButtonControl);

  // Set cancel button and handle click event
  OrderCardsView.setMultiComponentElementsClass(
    "_cancelButtons",
    ".order-card__text__action .btn--link.cancel"
  );
  OrderCardsView.addCancelButtonClickHandler();

  // Set product counter and handle click event
  const responsive = window.matchMedia("(max-width: 60em)").matches;
  OrderCardsView.setMultiComponentElementsClass(
    "_quantityCounterControls",
    responsive ? ".quantity-control-responsive" : ".quantity-control-origin"
  );
  OrderCardsView.addQuantityCounterControlClickHandler();
}

function checkOutFormControl() {
  // CheckOutFormView.renderSingleItem(true);

  // Set product total prices and render initial receipt price detail
  CheckOutFormView.setMultiComponentElementsClass(
    "_totalPriceEls",
    ".total-price-origin"
  );
  CheckOutFormView.generateReceiptPriceDetail();
}

const init = () => {
  initializePageHeader("side-page");
  OrderCardsView.renderBreadCrumbs("your-cart");
  OrderCardsView.addRenderWhenLoadedHanlder(orderCardsControl);
  CheckOutFormView.addRenderWhenLoadedHanlder(checkOutFormControl);
};
init();
