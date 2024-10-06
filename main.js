const productContainer = document.getElementById('product-container');
let products = [];
let filteredProducts = [];
let currentIndex = 0; // To track how many products have been displayed
const itemsPerLoad = 10; // Number of items to load at a time// Assume this array contains the fetched product data

// Fetch and display products (initial call)
fetchProducts();

// Fetch data from the API
function fetchProducts() {
  fetch('https://fakestoreapi.com/products')
    .then((response) => response.json())
    .then((data) => {
      products = data;
      displayProducts(products);
    })
    .catch((error) => console.error('Error fetching data:', error));
}
// Function to display the products
function displayProducts(products) {
  products.forEach((product) => {
    // Create a product card
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');

    // Add product image
    const productImage = document.createElement('img');
    productImage.src = product.image;
    productImage.alt = product.title;
    productCard.appendChild(productImage);

    // Add product title
    const productTitle = document.createElement('h3');
    productTitle.textContent = product.title;
    productCard.appendChild(productTitle);

    // Add product description
    const productDescription = document.createElement('p');
    productDescription.textContent =
      product.description.substring(0, 100) + '...'; // Shorten description
    productCard.appendChild(productDescription);

    // Add product price
    const productPrice = document.createElement('p');
    productPrice.classList.add('price');
    productPrice.textContent = `$${product.price}`;
    productCard.appendChild(productPrice);

    // Add to cart button
    const addButton = document.createElement('button');
    addButton.innerHTML = '<i class="fa fa-heart-o" aria-hidden="true"></i>';
    addButton.classList.add('backgroung-botton');
    productCard.appendChild(addButton);

    // Append the product card to the container
    productContainer.appendChild(productCard);
  });
}

function sortedProducts() {
  const sortOption = document.getElementById('sort').value;

  if (sortOption === 'asc') {
    products.sort((a, b) => a.price - b.price);
  } else if (sortOption === 'desc') {
    products.sort((a, b) => b.price - a.price);
  }

  displayProducts(products); // Re-display the sorted products
}

function filterProducts() {
  // Get the selected category filters
  const selectedCategories = Array.from(
    document.querySelectorAll('input[type="checkbox"]:checked')
  ).map((cb) => cb.value);

  // Filter products based on category, price range, and availability
  filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category);
    return matchesCategory;
  });

  displayProducts(filteredProducts);
  sortAndDisplayProducts(); // Display filtered products
}

function sortAndDisplayProducts() {
  sortedProducts(); // Apply the sorting logic
  displayProducts(filteredProducts); // Display the sorted, filtered products
}

function loadMoreProducts() {
  const loadMoreBtn = document.getElementById('loadMoreBtn');

  // Calculate the number of products to be loaded in this iteration
  const productsToLoad = products.slice(
    currentIndex,
    currentIndex + itemsPerLoad
  );
  productsToLoad.forEach((product) => {
    // Create a product card
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');

    // Add product image
    const productImage = document.createElement('img');
    productImage.src = product.image;
    productImage.alt = product.title;
    productCard.appendChild(productImage);

    // Add product title
    const productTitle = document.createElement('h3');
    productTitle.textContent = product.title;
    productCard.appendChild(productTitle);

    // Add product description
    const productDescription = document.createElement('p');
    productDescription.textContent =
      product.description.substring(0, 100) + '...'; // Shorten description
    productCard.appendChild(productDescription);

    // Add product price
    const productPrice = document.createElement('p');
    productPrice.classList.add('price');
    productPrice.textContent = `$${product.price}`;
    productCard.appendChild(productPrice);

    // Add to cart button
    const addButton = document.createElement('button');
    addButton.innerHTML = '<i class="fa fa-heart-o" aria-hidden="true"></i>';
    addButton.classList.add('backgroung-botton');
    productCard.appendChild(addButton);

    // Append the product card to the container
    productContainer.appendChild(productCard);
  });
  // Update the current index to reflect the number of loaded products
  currentIndex += itemsPerLoad;

  // If all products are loaded, hide the "Load More" button
  if (currentIndex >= allProducts.length) {
    loadMoreBtn.style.display = 'none';
  }
}
