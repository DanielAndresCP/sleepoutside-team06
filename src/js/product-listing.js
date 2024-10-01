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

// This line takes the category that comes on the parameter, replaces hyphens with spaces, and makes the first letter uppercase
const prettyCategoryName =
  category.replace("-", " ").slice(0, 1).toLocaleUpperCase() +
  category.replace("-", " ").slice(1);
document.querySelector(".products > h2").textContent =
  `Top Products: ${prettyCategoryName}`;
