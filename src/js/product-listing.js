import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { getLocalStorage, setLocalStorage, getParam } from "./utils.mjs";

const category = getParam("category") || "tents"; // default if missing

// Update page title/heading 
const titleEl = document.querySelector(".section-title");
if (titleEl) {
  const pretty = category.replace("-", " ").replace(/\b\w/g, c => c.toUpperCase());
  titleEl.textContent = `Top Products: ${pretty}`;
}

const dataSource = new ProductData();
const listElement = document.querySelector(".product-list");
const myList = new ProductList(category, dataSource, listElement);
myList.init();

// Cart append to array
function addProductToCart(product) {
  const cart = getLocalStorage("so-cart") || [];
  cart.push(product);
  setLocalStorage("so-cart", cart);
}
document.addEventListener("add-to-cart", (e) => addProductToCart(e.detail));
