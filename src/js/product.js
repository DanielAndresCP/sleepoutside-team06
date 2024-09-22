// import { setLocalStorage } from "./utils.mjs";
import { setLocalStorage, getLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  const storedProducts = getLocalStorage("so-cart");
  const newStoredProducts = Array.isArray(storedProducts) ? storedProducts : [];
  newStoredProducts.push(product);
  setLocalStorage("so-cart", newStoredProducts);
}

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
