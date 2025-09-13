import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

function getProductIdFromQuery() {
  const params = new URLSearchParams(location.search);
  return params.get("product") || params.get("id");
}

function addProductToCart(product) {
  const cart = getLocalStorage("so-cart") || [];
  cart.push(product);
  setLocalStorage("so-cart", cart);
}

function renderProduct(product) {
  const img = document.getElementById("productImage");
  img.src = product.Image;
  img.alt = product.Name;

  document.getElementById("productName").textContent = product.Name;
  document.getElementById("productColor").textContent =
    product.Colors?.[0]?.ColorName || "";
  document.getElementById("productPrice").textContent = `$${product.FinalPrice}`;

  const btn = document.getElementById("addToCart");
  btn.dataset.id = product.Id;
  btn.addEventListener("click", () => addProductToCart(product));
}

async function init() {
  const id = getProductIdFromQuery();
  if (!id) {
    document.getElementById("productName").textContent = "Product not found";
    return;
  }
  const product = await dataSource.findProductById(id);
  if (!product) {
    document.getElementById("productName").textContent = "Product not found";
    return;
  }
  renderProduct(product);
}

init();
