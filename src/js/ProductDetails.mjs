import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function productDetailsTemplate(product) {
  const isDiscounted = product.FinalPrice < product.SuggestedRetailPrice;

  if (isDiscounted) {
    const priceDiff = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(product.SuggestedRetailPrice - product.FinalPrice);
    var discountBadgeHTML = `<span class="product-discount-badge">${priceDiff} OFF</span>`;
  }

  return `
    <section class="product-detail">
        <h3>${product.Brand.Name}</h3>
        <h2 class="divider">${product.NameWithoutBrand} ${isDiscounted ? discountBadgeHTML : ""}</h2>
        <img
            class="divider"
            src="${product.Images.PrimaryLarge}"
            alt="${product.NameWithoutBrand}"
        />
        <p class="product-card__price">$${product.FinalPrice}</p>
        <p class="product__color">${product.Colors[0].ColorName}</p>
        <p class="product__description">${product.DescriptionHtmlSimple}</p>
        <div class="product-detail__add">
            <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
        </div>
    </section>`;
}

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }
  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails("main");
    document
      .getElementById("addToCart")
      .addEventListener("click", this.addProductToCart.bind(this));
  }
  addProductToCart() {
    const storedProducts = getLocalStorage("so-cart");
    const newStoredProducts = Array.isArray(storedProducts)
      ? storedProducts
      : [];
    const quantity = 1;
    const productToAdd = { ...this.product, quantity };
    newStoredProducts.push(productToAdd);
    setLocalStorage("so-cart", newStoredProducts);
  }
  renderProductDetails(selector) {
    const element = document.querySelector(selector);
    element.insertAdjacentHTML(
      "afterBegin",
      productDetailsTemplate(this.product),
    );
  }
}
