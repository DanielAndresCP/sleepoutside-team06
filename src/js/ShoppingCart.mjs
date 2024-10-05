import { getLocalStorage } from "./utils.mjs";

export default class ShoppingCart {
    constructor(key, parentSelector) {
        this.key = key;
        this.parentSelector = parentSelector;
    }
    
    renderCartContents() {
    const cartItems = getLocalStorage("so-cart");
        if (Array.isArray(cartItems)) {
        const htmlItems = cartItems.map((item) => cartItemTemplate(item));
        document.querySelector(this.parentSelector).innerHTML = htmlItems.join("");
        addEventListeners();
        }
    }
}

function cartItemTemplate(item) {
const newItem = `<li class="cart-card divider">
<a href="#" class="cart-card__image">
    <img
    src="${item.Images.PrimarySmall}"
    alt="${item.Name}"
    />
</a>
<a href="#">
    <h2 class="card__name">${item.Name}</h2>
</a>
<p class="cart-card__color">${item.Colors[0].ColorName}</p>
<div class="cart-card__quantity">Quantity: <p class="cart-card__quantity-value">${item.quantity}</p> <button class="quantity-value-increase">+</button> <button class="quantity-value-decrease">-</button></div>
<p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

return newItem;
}

function addEventListeners() {
    const increaseButtons = document.querySelectorAll(".quantity-value-increase");
    const decreaseButtons = document.querySelectorAll(".quantity-value-decrease");
  
    increaseButtons.forEach((button, index) => {
      button.addEventListener("click", () => updateQuantity(index, 1));
    });
  
    decreaseButtons.forEach((button, index) => {
      button.addEventListener("click", () => updateQuantity(index, -1));
    });
  }

function updateQuantity(index, change) {
    const cartItems = JSON.parse(localStorage.getItem("so-cart"));
    if (Array.isArray(cartItems)) {
        const item = cartItems[index];
        item.quantity += change;
        if (item.quantity < 1) item.quantity = 1;
        localStorage.setItem("so-cart", JSON.stringify(cartItems));
        
        const quantityElement = document.querySelectorAll(".cart-card__quantity-value")[index];
        quantityElement.textContent = item.quantity;
    }
}
