import OrderCardsView from "../views/your-cart-view/orderCardsView.js";
import { initializePageHeader, getDataFromLocalStorage } from "../model.js";

const orderCardsControl = () => {
  // Get in-cart products and render
  const inCartProducts = getDataFromLocalStorage("in-cart-products");
  OrderCardsView.renderItems(inCartProducts);
};

const init = () => {
  initializePageHeader("side-page");
  OrderCardsView.renderBreadCrumbs("your-cart");
  OrderCardsView.addRenderWhenLoadedHanlder(orderCardsControl);
};
init();
