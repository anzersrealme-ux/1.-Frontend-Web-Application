let cart = JSON.parse(localStorage.getItem("cart")) || [];

const summary = document.getElementById("order-summary");
const form = document.getElementById("checkout-form");

function renderSummary() {
  if (cart.length === 0) {
    summary.innerHTML = "<p>Your cart is empty.</p>";
    form.style.display = "none";
    return;
  }

  let total = 0;
  summary.innerHTML = "<h2>Order Summary</h2>";

  cart.forEach(item => {
    total += item.price * item.quantity;

    summary.innerHTML += `
      <p>${item.name} (x${item.quantity}) - ₹${item.price * item.quantity}</p>
    `;
  });

  summary.innerHTML += `<h3>Total: ₹${total}</h3>`;
}

form.addEventListener("submit", function(e) {
  e.preventDefault();

  const email = form.querySelector('input[type="email"]').value;
  const phone = form.querySelector('input[placeholder="Phone Number"]').value;

  // Email validation - must be @gmail
  if (!email.endsWith("@gmail.com")) {
    alert("Please use a valid Gmail address (@gmail.com)");
    return;
  }

  // Phone validation - must be exactly 10 digits
  if (!/^\d{10}$/.test(phone)) {
    alert("Phone number must be exactly 10 digits");
    return;
  }

  alert("Order placed successfully!");

  localStorage.removeItem("cart");

  window.location.href = "success.html";
});

renderSummary();
