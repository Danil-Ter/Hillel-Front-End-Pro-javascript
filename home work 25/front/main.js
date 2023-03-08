const productsContainer = document.querySelector(".products-container");
const productDetailsContainer = document.querySelector(".product-details");

async function displayProducts() {
  const response = await fetch("http://localhost:3000/api/products");
  const { data: products } = await response.json();
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
        <button class="product-button">Delete</button>
      </div>
    </div>
  `
    )
    .join("");
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

async function handleProductClick(event) {
  const productCard = event.target.closest(".product-card");
  if (!productCard) return;
  if (event.target.classList.contains("product-button")) {
    await fetch(
      `http://localhost:3000/api/products/${productCard.dataset.id}`,
      { method: "DELETE" }
    );
    productCard.remove();
  } else {
    const response = await fetch(
      `http://localhost:3000/api/products/${productCard.dataset.id}`
    );
    const { data: product } = await response.json();
    displayProductInfo(product);
  }
}

async function init() {
  try {
    await displayProducts();
    const container = document.querySelector(".container");
    container.addEventListener("click", handleProductClick);
  } catch (error) {
    console.error(error);
    productsContainer.innerHTML =
      "<p>An error occurred while fetching the products. Please try again later.</p>";
  }
}

init();
