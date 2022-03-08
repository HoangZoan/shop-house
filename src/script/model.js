import HeaderTopBarView from "./views/headerTopBarView.js";
import { deepCompareArrays, Carousel } from "./helpers.js";
import {
  CATEGORIES,
  ITEMS_PER_PAGE,
  RECENTLY_VIEWED_PRODUCTS_MAX,
} from "./config.js";

// INITALIZE PAGE HEADER
const addClickEventHandler = (callerClass, activeClass) => {
  const caller = document.querySelector("." + callerClass);
  const active = document.querySelector("." + activeClass);
  const mainEl = document.querySelector("main");

  caller.addEventListener("click", (e) => {
    const btn = e.target.closest("." + callerClass);
    if (!btn) return;

    active.classList.toggle("active");

    if (callerClass === "tool-icon--search") {
      mainEl.classList.toggle("expand-top-padding");
    }
  });
};

export const handleBillboardSlider = () => {
  const carousel = new Carousel("billboard__slider__item-container", {
    btnPrev: "slider-btn--prev",
    btnNext: "slider-btn--next",
    sliderType: "full-content",
    autoPlay: 6000,
  });
};

export const initializePageHeader = (currentPage) => {
  addClickEventHandler("tool-icon--menu", "header-category");
  addClickEventHandler("tool-icon--search", "header-bar__search-control");
  HeaderTopBarView.renderItems(CATEGORIES, currentPage);
};

// MODEL FUNCTIONALITY

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
  let itemsPerPage = ITEMS_PER_PAGE;

  const mediaMax = window.matchMedia("(max-width: 60em)").matches;
  const mediaMin = window.matchMedia("(min-width: 40em)").matches;

  if (mediaMin && mediaMax) itemsPerPage = ITEMS_PER_PAGE + 1;

  const fromIndex = itemsPerPage * (page - 1);
  const toIndex = itemsPerPage * page;

  return products.slice(fromIndex, toIndex);
};

export const getProductsFromDB = async (id = null) => {
  try {
    const response = await fetch(
      `https://shop-house-b4d1e-default-rtdb.asia-southeast1.firebasedatabase.app/products${
        id ? `/${id}` : ""
      }.json`
    );

    if (response.status !== 200) throw new Error("Products not found");

    const data = await response.json();

    let output;

    if (!id) {
      output = [];

      for (const id in data) {
        output.push({ ...data[id], id: id });
      }
    } else {
      output = { ...data, id };
    }

    return output;
  } catch (error) {
    throw error;
  }
};

export const getProductsByType = async (type, productData, productId) => {
  try {
    const products = await getProductsFromDB();

    let output;
    switch (type) {
      case "best-seller":
        output = products.filter((product) => product.tags.bestSeller);
        break;
      case "new-coming":
        output = products.filter((product) => product.tags.new);
        break;
      case "following-purchase":
        output = products.filter(
          (product) =>
            product.category.value === productData && product.id !== productId
        );
        break;
      case "similar-purchase":
        output = products.filter(
          (product) =>
            product.productType === productData && product.id !== productId
        );
        break;
    }
    return output;
  } catch (error) {
    throw error;
  }
};

export const addRecentlyViewedProducts = (product) => {
  let recentlyViewedProducts;
  addProductToLocalStorage(product, "recently-viewed-products");
  recentlyViewedProducts = getDataFromLocalStorage("recently-viewed-products");
  if (recentlyViewedProducts.length <= 1) return;

  const match = recentlyViewedProducts.find(
    (productData) => productData.id === product.id
  );

  if (match) {
    const updatedProducts = recentlyViewedProducts.filter(
      (productData) => productData.id !== product.id
    );
    recentlyViewedProducts = [...updatedProducts, product];
  }

  if (recentlyViewedProducts.length < RECENTLY_VIEWED_PRODUCTS_MAX + 1) {
    if (match) {
      window.localStorage.setItem(
        "recently-viewed-products",
        JSON.stringify(recentlyViewedProducts)
      );
    }
  } else {
    window.localStorage.setItem(
      "recently-viewed-products",
      JSON.stringify(recentlyViewedProducts.slice(1))
    );
  }
};
