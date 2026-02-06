const productList = document.getElementById("product-list");
const searchInput = document.getElementById("search-input");

// Display all products initially
function displayProducts(productsToDisplay) {
  productList.innerHTML = '';
  
  if (productsToDisplay.length === 0) {
    productList.innerHTML = '<div class="no-results">No products found. Try a different search.</div>';
    return;
  }
  
  productsToDisplay.forEach(product => {
    productList.innerHTML += `
      <div class="product-card">
          <img src="${product.image}" alt="${product.name}">
          <h3>${product.name}</h3>
          <p>₹${product.price}</p>
          <button class="btn" onclick="addToCart(${product.id})">
              Add to Cart
          </button>
      </div>
    `;
  });
}

// Initial display
displayProducts(products);

// Search functionality
searchInput.addEventListener('input', function(e) {
  const searchTerm = e.target.value.toLowerCase().trim();
  
  if (searchTerm === '') {
    displayProducts(products);
    return;
  }
  
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm)
  );
  
  displayProducts(filteredProducts);
});

function addToCart(id) {
  const product = products.find(p => p.id === id);
  
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
  const existingItem = cart.find(item => item.id === id);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });
  }
  
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Product added to cart!");
}
