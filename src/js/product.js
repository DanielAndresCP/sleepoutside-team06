import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";
import { getParams } from "./utils.mjs";

const dataSource = new ProductData();
const productId = getParams("product");
const product = new ProductDetails(productId, dataSource);

product.init();
