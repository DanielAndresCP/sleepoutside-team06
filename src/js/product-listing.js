import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";
import { getParams } from "./utils.mjs";

const category = getParams("category");

const dataSource = new ProductData();
const productList = new ProductListing(
  category,
  dataSource,
  document.querySelector(".product-list"),
);

productList.init();
