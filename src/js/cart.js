import ShoppingCart from "./ShoppingCart.mjs";
import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";

const shoopingCart = new ShoppingCart("so-cart", ".product-list");

loadHeaderFooter();
shoopingCart.renderCartContents();
