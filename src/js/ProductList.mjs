import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(productData) {
    return `<li class="product-card">
          <a href="product_pages/index.html?product=${productData.Id}">
            <img src="${productData.Image}"
              alt="Image of ${productData.Name}" />
            <h3 class="card__brand">${productData.Brand.Name}</h3>
            <h2 class="card__name">${productData.NameWithoutBrand}</h2>
            <p class="product-card__price">$${productData.FinalPrice}</p>
          </a>
        </li>`
}

export default class ProductListing {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource
        this.listElement = listElement
    }
    filterProducts(productList, productIdList) {
        return productList.filter((x) => productIdList.includes(x.Id))
    }
    async init() {
        const selectedIds = ["880RR", "985RF", "985PR", "344YJ"]
        const products = await this.dataSource.getData()

        this.renderList(this.filterProducts(products, selectedIds))
    }
    renderList(products) {
        renderListWithTemplate(productCardTemplate, this.listElement, products, "afterBegin", true)
    }
}