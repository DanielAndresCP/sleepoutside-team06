import { getLocalStorage, setLocalStorage } from "./utils.mjs";
export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }

    init() { }

    addProductToCart(product) {
        const storedProducts = getLocalStorage("so-cart");
        const newStoredProducts = Array.isArray(storedProducts) ? storedProducts : [];
        newStoredProducts.push(product);
        setLocalStorage("so-cart", newStoredProducts);
    }

    renderProductDetails() { }
}
