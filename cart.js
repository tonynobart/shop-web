// Cart management — uses localStorage so it persists across pages

/**
 * Get cart from localStorage
 */
function getCart() {
  try {
    return JSON.parse(localStorage.getItem('maison_cart')) || [];
  } catch {
    return [];
  }
}

/**
 * Save cart to localStorage
 */
function saveCart(cart) {
  localStorage.setItem('maison_cart', JSON.stringify(cart));
  updateCartCount();
}

/**
 * Add a product to the cart
 */
function addToCart(productId, quantity = 1) {
  const product = getProductById(productId);
  if (!product) return;

  const cart = getCart();
  const existing = cart.find(item => item.id === productId);

  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ id: productId, quantity });
  }

  saveCart(cart);
  showToast(`${product.name} imewekwa kikapuni!`);
}

/**
 * Remove an item from the cart
 */
function removeFromCart(productId) {
  const cart = getCart().filter(item => item.id !== productId);
  saveCart(cart);
}

/**
 * Update quantity of a cart item
 */
function updateCartQuantity(productId, quantity) {
  const cart = getCart();
  const item = cart.find(i => i.id === productId);
  if (item) {
    item.quantity = Math.max(1, quantity);
    saveCart(cart);
  }
}

/**
 * Clear the entire cart
 */
function clearCart() {
  saveCart([]);
}

/**
 * Get total number of items in cart
 */
function getCartItemCount() {
  return getCart().reduce((sum, item) => sum + item.quantity, 0);
}

/**
 * Get cart subtotal
 */
function getCartSubtotal() {
  return getCart().reduce((sum, item) => {
    const product = getProductById(item.id);
    return product ? sum + product.price * item.quantity : sum;
  }, 0);
}

/**
 * Update the cart count badge in the nav
 */
function updateCartCount() {
  const count = getCartItemCount();
  document.querySelectorAll('#cart-count').forEach(el => {
    el.textContent = count;
    el.classList.toggle('hidden', count === 0);
  });
}

/**
 * Show a toast notification
 */
function showToast(message) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'fixed bottom-6 right-6 bg-navy text-white px-6 py-3 rounded-xl shadow-xl text-sm font-medium opacity-0 transition-opacity duration-300 pointer-events-none z-50 border-l-4 border-gold';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.style.opacity = '1';
  setTimeout(() => { toast.style.opacity = '0'; }, 2500);
}

// Initialize cart count on every page load
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();

  // Mobile menu toggle
  const btn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  if (btn && menu) {
    btn.addEventListener('click', () => menu.classList.toggle('hidden'));
  }
});
