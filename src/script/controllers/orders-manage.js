import { initializePageHeader, getDataFromLocalStorage } from "../model.js";
import OrdersManageView from "../views/ordersManageView.js";

const ordersManageControl = (_, orderStatus = null) => {
  const ordersData = getDataFromLocalStorage("orders");
  let renderData;

  if (!orderStatus || orderStatus === "all") {
    renderData = ordersData;
  } else {
    renderData = ordersData.filter((data) => data.orderStatus === orderStatus);
  }

  OrdersManageView.renderItems(renderData);
};

const init = () => {
  initializePageHeader("nested-page");
  OrdersManageView.addOrderTabsClickHandler(ordersManageControl);
  OrdersManageView.addRenderWhenLoadedHanlder(ordersManageControl);
};
init();
