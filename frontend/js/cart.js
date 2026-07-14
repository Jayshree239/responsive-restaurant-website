// ========================
// Cart Management Utility
// ========================
console.log("cart.js loaded");

const CART_KEY = "restaurant_cart";

// Get cart from localStorage
function getCart() {
  const cart = localStorage.getItem(CART_KEY);
  return cart ? JSON.parse(cart) : [];
}

// Save cart to localStorage
function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

// Add item to cart
function addToCart(menuId, name, price) {
  const cart = getCart();

  const existingItem = cart.find(item => item.menuId === menuId);

  if (existingItem) {
    existingItem.quantity += 1;   // FIXED
  } else {
    cart.push({
      menuId,
      name,
      price,
      quantity: 1   // FIXED
    });
  }

  saveCart(cart);
  showCartNotification(`✅ ${name} added to cart`);
  return cart;
}

// Remove item from cart
function removeFromCart(menuId) {
  let cart = getCart();
  cart = cart.filter(item => item.menuId !== menuId);
  saveCart(cart);
  return cart;
}

// Update item quantity
function updateCartQuantity(menuId, quantity) {
  const cart = getCart();
  const item = cart.find(item => item.menuId === menuId);
  
  if (item) {
    if (quantity <= 0) {
      return removeFromCart(menuId);
    }
    item.quantity = quantity;
    saveCart(cart);
  }
  
  return cart;
}

// Clear cart
function clearCart() {
  localStorage.removeItem(CART_KEY);
  return [];
}

// Get cart total
function getCartTotal() {
  const cart = getCart();
  return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Get cart item count
function getCartCount() {
  const cart = getCart();
  return cart.reduce((count, item) => count + item.quantity, 0);
}

// Show cart notification
function showCartNotification(message) {
  const notification = document.createElement("div");
  notification.className = "alert alert-success alert-dismissible fade show";
  notification.style.cssText = "position: fixed; top: 80px; right: 20px; z-index: 9999; min-width: 300px;";
  notification.innerHTML = `
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.remove();
  }, 3000);
}

// Validate cart before placing order
async function validateCart() {
  const cart = getCart();
  
  if (cart.length === 0) {
    throw new Error("❌ Cart is empty");
  }

  const token = getToken();
  if (!token) {
    throw new Error("❌ Please login to place order");
  }

  try {
    const response = await fetch(`${API_URL}/cart/validate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ items: cart })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Cart validation failed");
    }

    return data;
  } catch (err) {
    console.error("❌ Cart validation error:", err.message);
    throw err;
  }
}

// Place order
async function placeOrder(deliveryAddress, phoneNumber) {
  const cart = getCart();
  const token = getToken();

  if (!token) {
    throw new Error("❌ Please login to place order");
  }

  if (cart.length === 0) {
    throw new Error("❌ Cart is empty");
  }

  if (!deliveryAddress || !phoneNumber) {
    throw new Error("❌ Delivery address and phone number required");
  }

  try {
    const response = await fetch(`${API_URL}/order/place`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        items: cart,
        deliveryAddress,
        phoneNumber
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Order placement failed");
    }

    // Clear cart after successful order
    clearCart();
    return data;
  } catch (err) {
    console.error("❌ Order placement error:", err.message);
    throw err;
  }
}

// Update cart badge in navbar
function updateCartBadge() {
  const count = getCartCount();
  let badge = document.querySelector(".cart-badge");

  if (!badge) {
    // Try to find cart link in dropdown menu first
    const cartLink = document.querySelector('.dropdown-menu a[href="cart.html"]');
    if (cartLink) {
      badge = document.createElement("span");
      badge.className = "badge bg-danger cart-badge";
      badge.style.marginLeft = "5px";
      cartLink.appendChild(badge);
    } else {
      // Fallback to direct cart link
      const directCartLink = document.querySelector('a[href="cart.html"]');
      if (directCartLink) {
        badge = document.createElement("span");
        badge.className = "badge bg-danger cart-badge";
        badge.style.marginLeft = "5px";
        directCartLink.appendChild(badge);
      }
    }
  }

  if (badge) {
    badge.textContent = count > 0 ? count : "";
    badge.style.display = count > 0 ? "inline" : "none";
  }
}

// Initialize cart badge on page load
document.addEventListener("DOMContentLoaded", updateCartBadge);

window.addToCart = addToCart;
window.getCart = getCart;
window.removeFromCart = removeFromCart;
window.updateCartQuantity = updateCartQuantity;
