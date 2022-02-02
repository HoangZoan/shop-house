import OrderDetailView from "../views/orderDetailView.js";
import { getDataFromLocalStorage, initializePageHeader } from "../model.js";

const orderDetailControl = () => {
  const hash = window.location.hash.slice(1);
  const orderData = getDataFromLocalStorage("orders").find(
    (order) => order.orderId === hash
  );

  OrderDetailView.renderSingleItem(orderData);
};

const init = () => {
  initializePageHeader("nested-page");
  OrderDetailView.addRenderByLocationHandler(orderDetailControl);
};
init();
