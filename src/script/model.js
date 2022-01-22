import { productsData } from "./DUMMY_DATA/products-data.js";

// HEADER TOOLBOX CLICK HANDLER (RESPONSIVE)
const addClickEventHandler = (callerClass, activeClass) => {
  const caller = document.querySelector("." + callerClass);
  const active = document.querySelector("." + activeClass);

  caller.addEventListener("click", (e) => {
    const btn = e.target.closest("." + callerClass);
    if (!btn) return;

    active.classList.toggle("active");
  });
};

export const toolBoxClickHandler = () => {
  addClickEventHandler("tool-icon--menu", "header-category");
  addClickEventHandler("tool-icon--search", "header-bar__search-control");
};

// MODEL FUNCTIONALITY
export const getProductById = (id) => {
  return productsData.find((product) => product.id === id);
};
