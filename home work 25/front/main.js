import { SERVER, GET_PRODUCTS, PRODUCT_ID } from './apiConfig.js';

const productsContainer = document.querySelector(".products-container");
const productDetailsContainer = document.querySelector(".product-details");

function displayProducts() {
  fetch(SERVER + GET_PRODUCTS)
    .then(response => response.json())
    .then(({ data: products }) => {
      const firstTenProducts = products.slice(0, 10);
      productsContainer.innerHTML = firstTenProducts
        .map(
          (product) => `
        <div class="product-card" data-id="${product.id}">
          <img class="product-image" src="${product.images}">
          <div class="product-wrapper-name">
            <p class="product-name">${product.title}</p>
          </div>
          <div class="product-wrapper-price">
            <p class="product-price">$${product.price}</p>
          </div>
          <div class="product-wrapper-button">
            <button class="product-delete-button ">Delete</button>
          </div>
        </div>
      `
        )
        .join("");
    })
    .catch(error => {
      console.error(error);
      productsContainer.innerHTML = "<p>An error occurred while fetching the products. Please try again later.</p>";
    });
}

function displayProductInfo(product) {
  const ProductInfo = `
    <div class="ProductInfo">
      <img class="ProductInfo-image" src="${product.images}">
      <h2 class="ProductInfo-name">${product.title}</h2>
      <p class="ProductInfo-category">Category: ${product.category.name}</p>
      <p class="ProductInfo-price details-price">Price: $${product.price}</p>
      <p class="ProductInfo-description">${product.description}</p>
    </div>
  `;
  productDetailsContainer.innerHTML = ProductInfo;
}

function handleDeleteProduct(productId) {
  fetch(
    `${SERVER}${PRODUCT_ID(productId)}`,
    { method: "DELETE" }
  )
    .then(response => {
      if (response.ok) {
        const productCard = document.querySelector(`.product-card[data-id="${productId}"]`);
        productCard.remove();
        if (productDetailsContainer.dataset.productId === productId) {
          productDetailsContainer.innerHTML = '';
          productDetailsContainer.dataset.productId = '';
        }
      } else {
        throw new Error("Failed to delete product");
      }
    })
    .catch(error => {
      console.error(error);
      alert("An error occurred while deleting the product. Please try again later.");
    });
}

async function handleProductClick(event) {
  const productCard = event.target.closest(".product-card");
  if (!productCard) return;
  const productId = productCard.dataset.id;
  if (event.target.classList.contains("product-delete-button")) {
    await handleDeleteProduct(productId);
  } else {
    fetch(`${SERVER}${PRODUCT_ID(productId)}`)
      .then(response => response.json())
      .then(({ data: product }) => {
        displayProductInfo(product);
        productDetailsContainer.dataset.productId = productId;
      })
      .catch(error => {
        console.error(error);
        alert("An error occurred while fetching the product details. Please try again later.");
      });
  }
}

function init() {
  displayProducts();
  const container = document.querySelector(".container");
  container.addEventListener("click", handleProductClick);
}

init();

