import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";
import { getParams } from "./utils.mjs";

const dataSource = new ProductData();
const productList = new ProductListing(
  getParams("category"),
  dataSource,
  document.querySelector(".product-list"),
);

productList.init();
