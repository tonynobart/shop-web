// Home page — render featured products
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('featured-products');
  if (!container) return;

  const featured = getFeaturedProducts();
  container.innerHTML = featured.map(buildProductCard).join('');
});
