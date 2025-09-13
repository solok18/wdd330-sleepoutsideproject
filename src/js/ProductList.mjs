import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  return `
    <li class="product-card">
      <a class="product-link" href="/product_pages/index.html?product=${product.Id}">
        <img src="${product.Image}" alt="${product.Name}">
        <h3 class="product-name">${product.Name}</h3>
        <p class="product-price">$${product.FinalPrice}</p>
      </a>
      <button class="addToCart" data-id="${product.Id}">Add to Cart</button>
    </li>
  `;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
    this.products = [];
  }

  async init() {
    this.products = await this.dataSource.getData(); // to array
    this.renderList(this.products);
    this.bindAddToCart();
  }

  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list, "afterbegin", true);
  }

  // To make dynamically added buttons work
  bindAddToCart() {
    this.listElement.addEventListener("click", (e) => {
      if (!e.target.matches(".addToCart")) return;
      const id = e.target.dataset.id;
      const product = this.products.find((p) => String(p.Id) === String(id));
      if (!product) return;

      document.dispatchEvent(new CustomEvent("add-to-cart", { detail: product }));
    });
  }
}
