import Alert from "./Alert";
import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";

const alerts = new Alert();
const dataSource = new ProductData("tents");
const productList = new ProductListing(
  "Tents",
  dataSource,
  document.querySelector(".product-list"),
);

alerts.init();
productList.init();
