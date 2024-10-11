import ExternalServices from "./ExternalServices.mjs";
import { alertMessage, getLocalStorage, setLocalStorage } from "./utils.mjs"
import { getMoneyString } from "./utils.mjs";


function packageItems(items) {
    const simplifiedItems = items.map((item) => ({
        id: item.Id,
        price: item.FinalPrice,
        name: item.Name,
        quantity: item.quantity,
    }));
    return simplifiedItems;
}

function formDataToJSON(formElement) {
    const data = new FormData(formElement)

    return Object.fromEntries(data)
}

const services = new ExternalServices()

export default class CheckoutProcess {
    constructor(key, outputSelector) {
        this.key = key;
        this.outputSelector = outputSelector;
        this.list = [];
        this.itemTotal = 0;
        this.itemsQuantity = 0;
        this.shipping = 0;
        this.tax = 0;
        this.orderTotal = 0;
    }

    init() {
        this.list = getLocalStorage(this.key);
        this.calculateItemSummary();

        document.querySelector("#zip").addEventListener("blur", () => { this.calculateOrdertotal() })
        document.querySelector(".checkout form").addEventListener("submit", (e) => {
            e.preventDefault()

            this.checkout()
        })
    }

    calculateItemSummary() {
        // calculate and display the total amount of the items in the cart, and the number of items.
        const itemAmountElement = document.querySelector(`${this.outputSelector} #result-item-amount`)
        this.itemsQuantity = this.list.map((x) => x.quantity).reduce((acc, x) => acc + x)
        itemAmountElement.textContent = this.itemsQuantity

        const orderSubtotalElement = document.querySelector(`${this.outputSelector} #result-subtotal`)
        this.itemTotal = this.list.map((x) => x.FinalPrice * x.quantity).reduce((acc, x) => acc + x)
        orderSubtotalElement.textContent = getMoneyString(this.itemTotal)

        // const amounts = this.list.map((item) => item.FinalPrice);
        // this.itemTotal = amounts.reduce((sum, item) => sum + item);
        // summaryElement.innerText = "$" + this.itemTotal;
    }


    calculateOrdertotal() {
        // calculate the shipping and tax amounts. Then use them to along with the cart total to figure out the order total
        // Tax: Use 6% sales tax.
        // Shipping: Use $10 for the first item plus $2 for each additional item after that.

        const TAX_PERCENT = 0.06
        this.tax = this.itemTotal * TAX_PERCENT

        const SHIPPING_BASE = 10
        const SHIPPING_EXTRA = 2
        this.shipping = SHIPPING_BASE + ((this.itemsQuantity - 1) * SHIPPING_EXTRA)

        this.orderTotal = this.tax + this.shipping + this.itemTotal

        // display the totals.
        this.displayOrderTotals();
    }

    displayOrderTotals() {
        // once the totals are all calculated display them in the order summary page
        const taxAmountElement = document.querySelector(`${this.outputSelector} #result-tax`)
        taxAmountElement.textContent = getMoneyString(this.tax)

        const shippingAmountElement = document.querySelector(`${this.outputSelector} #result-shipping-estimate`)
        shippingAmountElement.textContent = getMoneyString(this.shipping)

        const orderTotalElement = document.querySelector(`${this.outputSelector} #result-order-total`)
        orderTotalElement.textContent = getMoneyString(this.orderTotal)
    }

    async checkout() {
        const formElement = document.forms["checkout"];


        const json = formDataToJSON(formElement);
        this.calculateOrdertotal()

        // add totals, and item details
        json.orderDate = new Date().toISOString();
        json.orderTotal = this.orderTotal.toFixed(2);
        json.tax = this.tax.toFixed(2);
        json.shipping = this.shipping;
        json.items = packageItems(this.list);
        // console.log(json);

        try {
            const res = await services.checkout(json);
            // console.log(res);
            if (res.orderId) {
                setLocalStorage("so-cart", "")
                window.location.pathname = "/checkout/success.html"
            }
        } catch (err) {
            for (const key in err.message) {
                const errorMessage = err.message[key];
                alertMessage(errorMessage)
            }
        }
    }
}