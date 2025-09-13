import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { getLocalStorage, setLocalStorage } from "./utils.mjs";

// Data source for tents
const dataSource = new ProductData("tents");

// UL/div where cards go 
const listElement = document.querySelector(".product-list");

// Render list
const productList = new ProductList("tents", dataSource, listElement);
productList.init();

// Cart handler 
function addProductToCart(product) {
  const cart = getLocalStorage("so-cart") || [];
  cart.push(product);
  setLocalStorage("so-cart", cart);
}

document.addEventListener("add-to-cart", (e) => addProductToCart(e.detail));
