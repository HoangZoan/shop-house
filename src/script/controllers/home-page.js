import PreviewProductsView from "../views/previewProductsView.js";
import PreviewBrandsView from "../views/previewBrandsView.js";
import RegisterEmailFormView from "../views/registerEmailFormView.js";
import { productsData } from "../DUMMY_DATA/products-data.js";
import { brandsData } from "../DUMMY_DATA/brands-data.js";
import { toolBoxClickHandler } from "../model.js";

const brandsPreviewControl = () => {
  PreviewBrandsView.renderItems(brandsData);
};

const bestSaleProductsControl = () => {
  PreviewProductsView.setCardTypeClass("best-seller-preview");
  PreviewProductsView.renderItems(productsData);
};

const newComingProductsControl = () => {
  PreviewProductsView.setCardTypeClass("new-coming-preview");
  PreviewProductsView.renderItems(productsData);
};

const registerEmailFormControl = (values) => {
  console.log(values);
};

const init = () => {
  toolBoxClickHandler();
  PreviewBrandsView.addRenderWhenLoadedHanlder(brandsPreviewControl);
  PreviewProductsView.addRenderWhenLoadedHanlder(bestSaleProductsControl);
  PreviewProductsView.addRenderWhenLoadedHanlder(newComingProductsControl);
  RegisterEmailFormView.addSubmitFormHandler(registerEmailFormControl);
};
init();
