const productsApiUrl = "https://api.escuelajs.co/api/v1/products/?offset=0&limit=10";
const productsContainer = document.querySelector(".products-container");
const productDetails = document.querySelector(".product-details");

function fetchProducts() {
  fetch(productsApiUrl)
    .then((response) => response.json())
    .then((data) => {
      productsContainer.innerHTML = "";
      data.forEach((product) => {
        const productCard = createProductCard(product);
        productsContainer.appendChild(productCard);
      });
    })
    .catch((error) => console.error(error));
}

function createProductCard(product) {
  const productCard = document.createElement("div");
  productCard.classList.add("product-card");
  productCard.dataset.product = JSON.stringify(product);
  productCard.innerHTML = `
    <img class=".product-img" src="${product.images[0]}" alt="${product.title}">
    <div class="product-name">${product.title}</div>
    <div class="product-price">$${product.price.toFixed(2)}</div>
    <button class="add-to-cart">Add to Cart</button>
  `;

  return productCard;
}

function renderProductDetails(product) {
  productDetails.innerHTML = `
    <h2>${product.title}</h2>
    <img src="${product.images[0]}" alt="${product.title}">
    <div class="details-price">$${product.price.toFixed(2)}</div>
    <p>${product.description}</p>
    <p>Category: ${product.category.name}</p>
  `;
}

function initialize() {
  fetchProducts();

  productsContainer.addEventListener("click", (event) => {
    const productCard = event.target.closest(".product-card");
    if (productCard) {
      const product = JSON.parse(productCard.dataset.product);
      renderProductDetails(product);
    }
  });
}

initialize();

