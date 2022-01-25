import { productsData } from "./DUMMY_DATA/products-data.js";
import HeaderTopBarView from "./views/headerTopBarView.js";
import { CATEGORIES } from "./config.js";

// INITALIZE PAGE HEADER
const addClickEventHandler = (callerClass, activeClass) => {
  const caller = document.querySelector("." + callerClass);
  const active = document.querySelector("." + activeClass);

  caller.addEventListener("click", (e) => {
    const btn = e.target.closest("." + callerClass);
    if (!btn) return;

    active.classList.toggle("active");
  });
};

export const initializePageHeader = (currentPage) => {
  addClickEventHandler("tool-icon--menu", "header-category");
  addClickEventHandler("tool-icon--search", "header-bar__search-control");
  HeaderTopBarView.renderItems(CATEGORIES, currentPage);
};

// MODEL FUNCTIONALITY
export const getProductById = (id) => {
  return productsData.find((product) => product.id === id);
};

export const persistDataOnLocalStorage = (storageName, data) => {
  const dataUpload = JSON.stringify(data);
  window.localStorage.setItem(storageName, dataUpload);
};

export const getDataFromLocalStorage = (storageName) => {
  const dataReceive = window.localStorage.getItem(storageName);

  return JSON.parse(dataReceive);
};

export const addFavoriteProductToLocalStorageHandler = (productData) => {
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
