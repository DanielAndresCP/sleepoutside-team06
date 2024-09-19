import { setLocalStorage, getLocalStorage } from './utils.mjs';
import ProductData from './ProductData.mjs';

const dataSource = new ProductData('tents');

function addProductToCart(product) {
  const storedCartState = getLocalStorage('so-cart');

  // If there is nothing on local storage with this key, it will return null,
  // on which case we will assign it an empty array,
  // otherwise, we return its contents
  const newCartState = storedCartState === null ? [] : storedCartState;

  // We set to local storage the previous contents plus the new product
  setLocalStorage('so-cart', [...newCartState, product]);
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById('addToCart')
  .addEventListener('click', addToCartHandler);
