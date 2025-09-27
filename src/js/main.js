import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import { loadHeaderFooter } from "./utils.mjs";
loadHeaderFooter();

// Data source for tents
const dataSource = new ProductData("tents");

// UL/div where cards go 
const listElement = document.querySelector(".product-list");

// Render list
const productList = new ProductList("tents", dataSource, listElement);
productList.init();

// Cart handler 
function addProductToCart(product) {
  let cart = getLocalStorage("so-cart") || [];
  cart = Array.isArray(cart) ? cart : [cart];

  const existing = cart.find(item => item.Id === product.Id);
  if (existing) {
    existing.quantity = (existing.quantity || 1) + 1;
  } else {
    product.quantity = 1;
    cart.push(product);
  }

  setLocalStorage("so-cart", cart);
}

// For custom add-to-cart events
document.addEventListener("add-to-cart", (e) => {
  addProductToCart(e.detail);
});

