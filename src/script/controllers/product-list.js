import PreviewProductsView from "../views/previewProductsView.js";
import ProductsListSortBarView from "../views/productsListSortBarView.js";
import ProductsListPaginationView from "../views/productsListPaginationView.js";
import {
  addProductToLocalStorage,
  initializePageHeader,
  getProductsOnPage,
  getProductsFromDB,
  removeProductFromLocalStorage,
  renderBadgesNumber,
} from "../model.js";
import {
  BRANDS,
  PRODUCT_TYPES,
  CATEGORIES,
  ITEM_ARRANGEMENT,
  PRICE_RANGE,
  ITEMS_PER_PAGE,
} from "../config.js";
// import { productsData } from "../DUMMY_DATA/products-data.js";

const cardHeartButtonControl = async (productId) => {
  try {
    const product = await getProductsFromDB(productId);
    addProductToLocalStorage(product, "favorite-products");
    renderBadgesNumber();
  } catch (error) {
    console.log(error);
  }
};

const productsListSortBarControl = async () => {
  try {
    ProductsListSortBarView.renderSingleItem({
      BRANDS,
      PRODUCT_TYPES,
      CATEGORIES,
      ITEM_ARRANGEMENT,
      PRICE_RANGE,
    });

    // Set options select and handle change event
    ProductsListSortBarView.setMultiComponentElementsClass(
      "_sortSelects",
      ".products-arrange-bar select"
    );
    ProductsListSortBarView.addSortOptionsChangeHandler();

    // Set select for price range and handle change event
    const productsData = await getProductsFromDB();

    ProductsListSortBarView.setComponentElementClass(
      "_sortPrice",
      ".products-arrange-bar select[data-query='price-range']"
    );
    ProductsListSortBarView.addSortPriceOptionsChangeHandler(productsData);

    // Render bread crumbs
    ProductsListSortBarView.renderBreadCrumbs("products-list");
  } catch (error) {
    console.log(error);
  }
};

async function productsListControl(_, page = 1, itemsPerPage = ITEMS_PER_PAGE) {
  // Get products by location
  const productsData = await getProductsFromDB();
  const products = PreviewProductsView.getProductBySearchQueries(productsData);

  // Render pagination
  ProductsListPaginationView.renderSingleItem({
    page,
    pageNumber: Math.ceil(products.length / itemsPerPage),
  });

  // Get products list by page
  const productsOnPage = getProductsOnPage(products, page);

  // Render product items
  PreviewProductsView.setCardTypeClass(".product-list-preview");
  PreviewProductsView.renderItems(productsOnPage, "side-page");

  // Set heart button and handle add favorite product click
  PreviewProductsView.setHeartButtonsElement(
    cardHeartButtonControl,
    removeProductFromLocalStorage
  );
}

const init = () => {
  initializePageHeader("side-page");
  ProductsListSortBarView.addRenderWhenLoadedHanlder(
    productsListSortBarControl
  );
  PreviewProductsView.addRenderWhenLoadedHanlder(productsListControl);
  ProductsListPaginationView.addNumberButtonClickHandler(productsListControl);
  ProductsListPaginationView.addUpdateProductListWhenResizeHandler(
    productsListControl
  );
};
init();
