import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";

const dataSource = new ProductData("tents");
const productList = new ProductListing(
  "",
  dataSource,
  document.querySelector(".product-list"),
);

productList.init();
