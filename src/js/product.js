import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";
import { getParams } from "./utils.mjs"


// function addProductToCart(product) {
//   const storedProducts = getLocalStorage("so-cart");
//   const newStoredProducts = Array.isArray(storedProducts) ? storedProducts : [];
//   newStoredProducts.push(product);
//   setLocalStorage("so-cart", newStoredProducts);
// }

// add to cart button event handler
// async function addToCartHandler(e) {
//   const product = await dataSource.findProductById(e.target.dataset.id);
//   addProductToCart(product);
// }

// add listener to Add to Cart button
// document
//   .getElementById("addToCart")
//   .addEventListener("click", addToCartHandler);

const dataSource = new ProductData("tents");
const productId = getParams("product");

const product = new ProductDetails(productId, dataSource);
product.init()
