import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";

const dataSource = new ProductData("tents");
const productList = new ProductListing(
  "Tents",
  dataSource,
  document.querySelector(".product-list"),
);

productList.init();
