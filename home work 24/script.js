const productsApiUrl = "https://fakestoreapi.com/products";
const productsContainer = document.querySelector(".products-container");
const productDetails = document.querySelector(".product-details");

function fetchProducts() {
  fetch(productsApiUrl)
    .then((response) => response.json())
    .then((data) => {
      productsContainer.innerHTML = ""; 
      const shuffledData = shuffle(data);
      shuffledData.slice(0, 10).forEach((product) => {
        const productCard = createProductCard(product);
        productsContainer.appendChild(productCard);
      });
    })
    .catch((error) => console.error(error));
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function createProductCard(product) {
  const productCard = document.createElement("div");
  productCard.classList.add("product-card");
  productCard.innerHTML = `
    <img class=".product-img" src="${product.image}" alt="${product.title}">
    <div class="product-name">${product.title}</div>
    <div class="product-price">$${product.price.toFixed(2)}</div>
    <button class="add-to-cart">Add to Cart</button>
  `;
  productCard.addEventListener("click", () => {
    renderProductDetails(product);
  });
  return productCard;
}

function renderProductDetails(product) {
  productDetails.innerHTML = `
    <h2>${product.title}</h2>
    <img src="${product.image}" alt="${product.title}">
    <div class="details-price">$${product.price.toFixed(2)}</div>
    <p>${product.description}</p>
    <p>Category: ${product.category}</p>
  `;
}

function initialize() {
  fetchProducts();
}

initialize();
