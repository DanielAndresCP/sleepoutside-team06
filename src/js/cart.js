import ShoppingCart from "./ShoppingCart.mjs";
import { loadHeaderFooter } from "./utils.mjs";

const shoopingCart = new ShoppingCart("so-cart", ".product-list");

loadHeaderFooter();
shoopingCart.renderCartContents();
