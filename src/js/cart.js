import { getLocalStorage, setLocalStorage, loadHeaderFooter } from "./utils.mjs";
loadHeaderFooter();

function normalizeCart(items) {
  if (Array.isArray(items)) return items;
  return items ? [items] : [];
}

function renderCartContents() {
  let cartItems = getLocalStorage("so-cart") || [];
  cartItems = normalizeCart(cartItems);

  const listEl = document.querySelector(".product-list");

  if (!cartItems.length) {
    listEl.innerHTML = `<li class="cart-empty">Your cart is empty.</li>`;
    document.querySelector(".cart-footer").classList.add("hide");
    return;
  }

  const htmlItems = cartItems.map((item, index) => cartItemTemplate(item, index));
  listEl.innerHTML = htmlItems.join("");

  const footer = document.querySelector(".cart-footer");
  footer.classList.remove("hide");

  const total = cartItems.reduce(
  (sum, item) => sum + item.FinalPrice * (item.quantity || 1), 0);

  footer.querySelector(".cart-total").textContent = `Total: $${total.toFixed(2)}`;
}

function cartItemTemplate(item, index) {
  const img =
    item.Images?.PrimarySmall ||
    item.Images?.PrimaryMedium ||
    item.Images?.PrimaryLarge ||
    item.PrimaryMedium ||
    item.Image ||
    "/images/fallback.png";

  return `
<li class="cart-card divider">
  <button class="remove-item" data-index="${index}" aria-label="Remove ${item.Name}" title="Remove">×</button>
  <a href="#" class="cart-card__image">
    <img src="${img}" alt="${item.Name}" />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors?.[0]?.ColorName ?? ""}</p>
  <label>
    qty:
    <input type="number" class="cart-qty" data-index="${index}" value="${item.quantity || 1}" min="1">
  </label>
  <p class="cart-card__price">$${(item.FinalPrice * (item.quantity || 1)).toFixed(2)}</p>
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

function bindQuantityHandler() {
  const listEl = document.querySelector(".product-list");
  listEl.addEventListener("change", (e) => {
    if (e.target.classList.contains("cart-qty")) {
      const index = Number(e.target.dataset.index);
      let cart = normalizeCart(getLocalStorage("so-cart"));

      if (Number.isInteger(index) && index >= 0 && index < cart.length) {
        let newQty = parseInt(e.target.value, 10);
        if (isNaN(newQty) || newQty < 1) newQty = 1;
        cart[index].quantity = newQty;
        setLocalStorage("so-cart", cart);
        renderCartContents();
      }
    }
  });
}

bindRemoveHandler();
bindQuantityHandler();
renderCartContents();
