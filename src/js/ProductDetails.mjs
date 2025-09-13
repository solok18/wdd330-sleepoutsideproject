// import { getLocalStorage, setLocalStorage } from './utils.mjs';
 
// export default class ProductDetails {
//   constructor(productId, dataSource) {
//     this.productId = productId;
//     this.product = null;        // will hold the loaded product
//     this.dataSource = dataSource;
//   }
 
//   async init() {
//     try {
//       // Load the product by id
//       this.product = await this.dataSource.findProductById(this.productId);
 
//       if (!this.product) {
//         this.renderNotFound();
//         return;
//       }

//       this.renderProductDetails();

//       const addBtn = document.getElementById('addToCart');
//       if (addBtn) {
//         addBtn.addEventListener('click', this.addProductToCart.bind(this));
//       }
//     } catch (err) {
//       console.error('Error initializing ProductDetails:', err);
//       this.renderError();
//     }
//   }
 
//   renderProductDetails() {
//     const container = document.getElementById('productDetails') || document.querySelector('.product-details');
//     if (!container) return;
 
//     const p = this.product;

//     const name = p.Name || p.Title || p.name || 'Product';
//     const image = p.Image || p.image || p.imageUrl;
//     const imageAlt = p.ImageAlt || p.imageAlt || name;
//     const description = p.Description || p.description || '';
//     const colors = Array.isArray(p.Colors) ? p.Colors.map(c => c.ColorName || c.name).filter(Boolean) : [];
//     const price =
//       p.FinalPrice ?? p.Price ?? p.ListPrice ?? p.MSRP ?? null;
 
//     const priceMarkup = price !== null
//       ? `<p class="product__price">$${Number(price).toFixed(2)}</p>`
//       : '';
 
//     const colorsMarkup = colors.length
//       ? `<p class="product__colors"><strong>Available colors:</strong> ${colors.join(', ')}</p>`
//       : '';
 
//     container.innerHTML = `
// <article class="product">
// <figure class="product__media">
//           ${image ? `<img src="${image}" alt="${imageAlt}">` : ''}
// <figcaption class="sr-only">${name}</figcaption>
// </figure>
 
//         <div class="product__info">
// <h1 class="product__name">${name}</h1>
//           ${priceMarkup}
//           ${colorsMarkup}
//           ${description ? `<p class="product__description">${description}</p>` : ''}
 
//           <button id="addToCart" class="btn btn-primary">Add to Cart</button>
// </div>
// </article>
//     `;
//   }
 
//   addProductToCart() {
//     if (!this.product) return;
 
//     // Ensure it’s an array 
//     let cart = getLocalStorage('so-cart');
//     if (!Array.isArray(cart)) {
//       cart = cart ? [cart] : [];
//     }

//     cart.push(this.product);
 
//     setLocalStorage('so-cart', cart);

//     alert('Added to cart!');
//   }
 
//   renderNotFound() {
//     const container = document.getElementById('productDetails') || document.querySelector('.product-details');
//     if (!container) return;
//     container.innerHTML = `
// <p class="notice">Sorry, we couldn’t find that product.</p>
//     `;
//   }
 
//   renderError() {
//     const container = document.getElementById('productDetails') || document.querySelector('.product-details');
//     if (!container) return;
//     container.innerHTML = `
// <p class="notice error">Something went wrong loading this product. Please try again.</p>
//     `;
//   }
// }




import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {

  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    // use the datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
    this.product = await this.dataSource.findProductById(this.productId);
    // the product details are needed before rendering the HTML
    this.renderProductDetails();
    // once the HTML is rendered, add a listener to the Add to Cart button
    // Notice the .bind(this). This callback will not work if the bind(this) is missing. Review the readings from this week on 'this' to understand why.
    document
      .getElementById('addToCart')
      .addEventListener('click', this.addProductToCart.bind(this));
  }

  addProductToCart() {
    const cartItems = getLocalStorage("so-cart") || [];
    cartItems.push(this.product);
    setLocalStorage("so-cart", cartItems);
  }

  renderProductDetails() {
    productDetailsTemplate(this.product);
  }
}

function productDetailsTemplate(product) {
  document.querySelector('h2').textContent = product.Brand.Name;
  document.querySelector('h3').textContent = product.NameWithoutBrand;

  const productImage = document.getElementById('productImage');
  productImage.src = product.Image;
  productImage.alt = product.NameWithoutBrand;

  document.getElementById('productPrice').textContent = product.FinalPrice;
  document.getElementById('productColor').textContent = product.Colors[0].ColorName;
  document.getElementById('productDesc').innerHTML = product.DescriptionHtmlSimple;

  document.getElementById('addToCart').dataset.id = product.Id;
}
