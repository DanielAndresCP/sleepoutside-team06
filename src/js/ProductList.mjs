import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(productData) {
  return `<li class="product-card">
          <a href="/product_pages/index.html?product=${productData.Id}">
            <img src="${productData.Images.PrimaryMedium}"
              alt="Image of ${productData.Name}" />
            <h3 class="card__brand">${productData.Brand.Name}</h3>
            <h2 class="card__name">${productData.NameWithoutBrand}</h2>
            <p class="product-card__price">$${productData.FinalPrice}</p>
          </a>
        </li>`;
}

export default class ProductListing {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }
  filterProducts(productList, productIdList) {
    return productList.filter((x) => productIdList.includes(x.Id));
  }
  async init() {
    const products = await this.dataSource.getData(this.category);

    this.renderList(products);

    // This line takes the category that comes on the parameter, replaces hyphens with spaces, and makes the first letter uppercase
    const prettyCategoryName =
      this.category.replace("-", " ").slice(0, 1).toLocaleUpperCase() +
      this.category.replace("-", " ").slice(1);
    document.querySelector(".products > h2").textContent =
      `Top Products: ${prettyCategoryName}`;
  }
  renderList(products) {
    renderListWithTemplate(
      productCardTemplate,
      this.listElement,
      products,
      "afterBegin",
      true,
    );
  }
}
