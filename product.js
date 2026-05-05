// Product detail page
document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const product = getProductById(id);

  if (!product) {
    document.getElementById('product-detail').innerHTML = `
      <div class="text-center py-24 col-span-2">
        <div class="text-5xl mb-4">😕</div>
        <h2 class="text-2xl font-serif font-bold text-wood mb-3">Bidhaa haikupatikana</h2>
        <a href="shop.html" class="text-bark hover:underline">Rudi Dukani</a>
      </div>
    `;
    return;
  }

  // Update page title
  document.title = `${product.name} — Maison Furniture`;

  // Breadcrumb
  document.getElementById('breadcrumb-name').textContent = product.name;

  // Product illustration (no image)
  const wrap = document.getElementById('product-image-wrap');
  const bg = (typeof categoryGradients !== 'undefined' && categoryGradients[product.category])
    ? categoryGradients[product.category]
    : 'linear-gradient(135deg, #1B2A4A, #2C4A8C)';
  const icon = (typeof categoryIcons !== 'undefined' && categoryIcons[product.category])
    ? categoryIcons[product.category]
    : '';
  wrap.style.background = bg;
  wrap.innerHTML = `<div class="flex items-center justify-center w-full h-full">${icon.replace('class="h-16 w-16', 'class="h-28 w-28')}</div>`;

  // Product info
  document.getElementById('product-category').textContent = product.category;
  document.getElementById('product-name').textContent = product.name;
  document.getElementById('product-description').textContent = product.description;
  document.getElementById('product-price').textContent = formatPrice(product.price);

  const origEl = document.getElementById('product-original-price');
  if (product.originalPrice) {
    origEl.textContent = formatPrice(product.originalPrice);
  }

  // Quantity controls
  let qty = 1;
  const qtyDisplay = document.getElementById('qty-value');

  document.getElementById('qty-minus').addEventListener('click', () => {
    if (qty > 1) { qty--; qtyDisplay.textContent = qty; }
  });

  document.getElementById('qty-plus').addEventListener('click', () => {
    qty++;
    qtyDisplay.textContent = qty;
  });

  // Add to cart
  document.getElementById('add-to-cart-btn').addEventListener('click', () => {
    addToCart(product.id, qty);
  });

  // Related products (same category, exclude current)
  const related = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const relatedContainer = document.getElementById('related-products');
  if (related.length > 0) {
    relatedContainer.innerHTML = related.map(buildProductCard).join('');
  } else {
    relatedContainer.closest('div').style.display = 'none';
  }
});
