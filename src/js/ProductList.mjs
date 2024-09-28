import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
    return `<li class="product-card">
    <a href="product_pages/index.html?product=${product.Id}">
    <img
      src="${product.Image}"
      alt="Image of ${product.Name}"
    />
    <h3 class="card__brand">${product.Brand.Name}</h3>
    <h2 class="card__name">${product.Name}</h2>
    <p class="product-card__price">$${product.FinalPrice}</p></a>
  </li>`;
  }

export default class ProductListing {

    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }
        
    async Init() {
        const list = await this.dataSource.getData();
        this.renderList(list);
    }

    filterAndLimitTents(list) { // provitional solution, I didn't find anything usefull in the Instructor's solution for this part of the streech excersice.
        return list.filter(product => product.Id !== "989CG" && product.Id !== "880RT").slice(0, 4);
    }

    renderList(list) {
        const filteredTents = this.filterAndLimitTents(list);
        renderListWithTemplate(productCardTemplate, this.listElement, filteredTents);
    }
}