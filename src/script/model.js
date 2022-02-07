import { productsData } from "./DUMMY_DATA/products-data.js";
import HeaderTopBarView from "./views/headerTopBarView.js";
import { deepCompareArrays } from "./helpers.js";
import { CATEGORIES, ITEMS_PER_PAGE } from "./config.js";

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
  return productsData.find(
    (product) => product.id === id || product.orderId === id
  );
};

export const persistDataOnLocalStorage = (storageName, data) => {
  const dataUpload = JSON.stringify(data);
  window.localStorage.setItem(storageName, dataUpload);
};

export const getDataFromLocalStorage = (storageName) => {
  const dataReceive = window.localStorage.getItem(storageName);

  return JSON.parse(dataReceive);
};

export const addProductToLocalStorage = (productData, storageName) => {
  const existingData = getDataFromLocalStorage(storageName);

  if (existingData) {
    const match = existingData.find((product) => {
      if (storageName === "orders") return false;

      const compareSpecifications =
        storageName === "in-cart-products"
          ? deepCompareArrays(
              productData.specifications,
              product.specifications
            )
          : true;

      return productData.id === product.id && compareSpecifications;
    });

    if (!match) {
      persistDataOnLocalStorage(storageName, [...existingData, productData]);
    }
  } else {
    persistDataOnLocalStorage(storageName, [productData]);
  }
};

export const removeProductFromLocalStorage = (productData, storageName) => {
  let updatedProducts = getDataFromLocalStorage(storageName).filter(
    (product) => product.id !== productData
  );

  if (storageName === "in-cart-products") {
    updatedProducts = getDataFromLocalStorage(storageName).filter(
      (product) => product.locationSearch !== productData
    );
  }

  if (updatedProducts.length === 0) {
    window.localStorage.removeItem(storageName);
    return;
  }

  window.localStorage.setItem(storageName, JSON.stringify(updatedProducts));
};

export const clearLocalStorage = (storageName) => {
  window.localStorage.removeItem(storageName);
};

export const getProductsOnPage = (products, page) => {
  const fromIndex = ITEMS_PER_PAGE * (page - 1);
  const toIndex = ITEMS_PER_PAGE * page;

  return products.slice(fromIndex, toIndex);
};

export const getProductsByType = (type) => {
  let output;

  switch (type) {
    case "best-seller":
      output = productsData.filter((product) => product.tags.bestSeller);
      break;
    case "new-coming":
      output = productsData.filter((product) => product.tags.new);
      break;
  }

  return output;
};
