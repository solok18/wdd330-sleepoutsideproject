import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function normalizeCart(items) {
  if (Array.isArray(items)) return items;
  return items ? [items] : [];
}

function renderCartContents() {
  const listEl = document.querySelector(".product-list");
  let cartItems = normalizeCart(getLocalStorage("so-cart"));

  if (!cartItems.length) {
    listEl.innerHTML = `<li class="cart-empty">Your cart is empty.</li>`;
    return;
  }

  const htmlItems = cartItems.map((item, index) => cartItemTemplate(item, index));
  listEl.innerHTML = htmlItems.join("");
}

function cartItemTemplate(item, index) {
  return `
<li class="cart-card divider">
  <button class="remove-item" data-index="${index}" aria-label="Remove ${item.Name}" title="Remove">×</button>
  <a href="#" class="cart-card__image">
    <img src="${item.Image}" alt="${item.Name}" />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors?.[0]?.ColorName ?? ""}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;
}


function bindRemoveHandler() {
  const listEl = document.querySelector(".product-list");
  listEl.addEventListener("click", (e) => {
    const btn = e.target.closest(".remove-item");
    if (!btn) return;

    const index = Number(btn.dataset.index);
    let cart = normalizeCart(getLocalStorage("so-cart"));

    if (Number.isInteger(index) && index >= 0 && index < cart.length) {
      cart.splice(index, 1);
      setLocalStorage("so-cart", cart);
      renderCartContents();
    }
  });
}

bindRemoveHandler();
renderCartContents();
