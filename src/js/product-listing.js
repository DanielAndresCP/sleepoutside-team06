import ExternalServices from "./ExternalServices.mjs";
import ProductListing from "./ProductList.mjs";
import { getParams } from "./utils.mjs";

const category = getParams("category");

const dataSource = new ExternalServices();
const productList = new ProductListing(
  category,
  dataSource,
  document.querySelector(".product-list"),
);

productList.init();
