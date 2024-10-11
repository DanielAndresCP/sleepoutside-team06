import ExternalServices from "./ExternalServices.mjs";
import ProductDetails from "./ProductDetails.mjs";
import { getParams } from "./utils.mjs";
import { loadHeaderFooter } from "./utils.mjs";

const dataSource = new ExternalServices();
const productId = getParams("product");
const product = new ProductDetails(productId, dataSource);

loadHeaderFooter();

product.init();
