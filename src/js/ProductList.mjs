import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  const images = product.Images || {};
  const small = images.PrimarySmall || product.Image || "/images/fallback.png";
  const medium = images.PrimaryMedium || product.Image || "/images/fallback.png";
  const large = images.PrimaryLarge || product.Image || "/images/fallback.png";

  return `
    <li class="product-card">
      <a class="product-link" href="/product_pages/index.html?product=${product.Id}">
        <img 
          src="${medium}" 
          srcset="
            ${small} 400w,
            ${medium} 800w,
            ${large} 1200w
          "
          sizes="(max-width: 600px) 400px, (max-width: 1024px) 800px, 1200px"
          alt="${product.Name}">
        <h3 class="product-name">${product.Name}</h3>
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
    const list = await this.dataSource.getData(this.category);
    this.products = list;
    this.renderList(list);
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
