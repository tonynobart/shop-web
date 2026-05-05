// Cart page logic
document.addEventListener('DOMContentLoaded', () => {
  renderCartPage();

  // Checkout button
  document.getElementById('checkout-btn')?.addEventListener('click', () => {
    document.getElementById('checkout-modal').classList.remove('hidden');
  });

  // Close modal
  document.getElementById('close-modal')?.addEventListener('click', () => {
    document.getElementById('checkout-modal').classList.add('hidden');
  });

  // Close modal on backdrop click
  document.getElementById('checkout-modal')?.addEventListener('click', (e) => {
    if (e.target === e.currentTarget) {
      e.currentTarget.classList.add('hidden');
    }
  });

  // Checkout form submit
  document.getElementById('checkout-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    document.getElementById('checkout-modal').classList.add('hidden');
    document.getElementById('order-success').classList.remove('hidden');
    clearCart();
  });
});

function renderCartPage() {
  const cart = getCart();
  const empty = document.getElementById('cart-empty');
  const content = document.getElementById('cart-content');

  if (cart.length === 0) {
    empty.classList.remove('hidden');
    content.classList.add('hidden');
    return;
  }

  empty.classList.add('hidden');
  content.classList.remove('hidden');

  // Render items
  const itemsContainer = document.getElementById('cart-items');
  itemsContainer.innerHTML = cart.map(item => {
    const product = getProductById(item.id);
    if (!product) return '';
    return `
      <div class="bg-white rounded-2xl p-5 shadow-sm border border-mist flex items-center gap-5 hover:border-gold/30 transition-colors" id="cart-item-${product.id}">
        <a href="product.html?id=${product.id}" class="w-20 h-20 rounded-xl overflow-hidden shrink-0 hover:opacity-80 transition-opacity flex items-center justify-center"
          style="background: ${(typeof categoryGradients !== 'undefined' && categoryGradients[product.category]) || 'linear-gradient(135deg,#1B2A4A,#2C4A8C)'};">
          <div class="scale-50 origin-center">${(typeof categoryIcons !== 'undefined' && categoryIcons[product.category]) || ''}</div>
        </a>
        <div class="flex-1 min-w-0">
          <a href="product.html?id=${product.id}" class="font-semibold text-navy hover:text-royal transition-colors block truncate">${product.name}</a>
          <p class="text-xs text-gold font-bold capitalize mt-0.5">${product.category}</p>
          <p class="text-navy font-bold mt-1">${formatPrice(product.price)}</p>
        </div>
        <div class="flex items-center border-2 border-mist rounded-xl overflow-hidden shrink-0">
          <button onclick="changeQty(${product.id}, -1)" class="px-3 py-2 hover:bg-mist transition-colors font-bold text-navy">−</button>
          <span class="px-3 py-2 text-sm font-bold min-w-[2.5rem] text-center text-navy" id="qty-${product.id}">${item.quantity}</span>
          <button onclick="changeQty(${product.id}, 1)" class="px-3 py-2 hover:bg-mist transition-colors font-bold text-navy">+</button>
        </div>
        <div class="text-right shrink-0">
          <p class="font-bold text-navy" id="line-total-${product.id}">${formatPrice(product.price * item.quantity)}</p>
          <button onclick="removeItem(${product.id})" class="text-xs text-red-400 hover:text-red-600 mt-1 transition-colors">Ondoa</button>
        </div>
      </div>
    `;
  }).join('');

  updateSummary();
}

function changeQty(productId, delta) {
  const cart = getCart();
  const item = cart.find(i => i.id === productId);
  if (!item) return;

  const newQty = item.quantity + delta;
  if (newQty < 1) {
    removeItem(productId);
    return;
  }

  updateCartQuantity(productId, newQty);

  // Update UI without full re-render
  const qtyEl = document.getElementById(`qty-${productId}`);
  const totalEl = document.getElementById(`line-total-${productId}`);
  const product = getProductById(productId);

  if (qtyEl) qtyEl.textContent = newQty;
  if (totalEl && product) totalEl.textContent = formatPrice(product.price * newQty);

  updateSummary();
}

function removeItem(productId) {
  removeFromCart(productId);
  const el = document.getElementById(`cart-item-${productId}`);
  if (el) el.remove();

  // Check if cart is now empty
  if (getCart().length === 0) {
    document.getElementById('cart-empty').classList.remove('hidden');
    document.getElementById('cart-content').classList.add('hidden');
  }

  updateSummary();
}

function updateSummary() {
  const subtotal = getCartSubtotal();
  const tax = subtotal * 0.18; // Tanzania VAT 18%
  const shippingCost = subtotal >= 500000 ? 0 : 15000;
  const total = subtotal + tax + shippingCost;
  const shippingLabel = subtotal >= 500000 ? 'Free' : formatPrice(15000);

  document.getElementById('subtotal').textContent = formatPrice(subtotal);
  document.getElementById('tax').textContent = formatPrice(Math.round(tax));
  document.getElementById('shipping').textContent = shippingLabel;
  document.getElementById('shipping').className = subtotal >= 500000
    ? 'font-medium text-green-600'
    : 'font-medium';
  document.getElementById('total').textContent = formatPrice(Math.round(total));
}
