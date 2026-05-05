// Shop page — filtering, sorting, search
document.addEventListener('DOMContentLoaded', () => {
  let activeCategory = 'all';
  let sortOrder = 'default';
  let searchQuery = '';

  // Read category from URL param (e.g. shop.html?category=sofas)
  const params = new URLSearchParams(window.location.search);
  if (params.get('category')) {
    activeCategory = params.get('category');
  }

  function renderProducts() {
    let list = getProductsByCategory(activeCategory);

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    }

    // Sort
    if (sortOrder === 'price-asc') {
      list = [...list].sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'price-desc') {
      list = [...list].sort((a, b) => b.price - a.price);
    } else if (sortOrder === 'name-asc') {
      list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    }

    const grid = document.getElementById('product-grid');
    const noResults = document.getElementById('no-results');
    const count = document.getElementById('results-count');

    if (list.length === 0) {
      grid.innerHTML = '';
      noResults.classList.remove('hidden');
    } else {
      noResults.classList.add('hidden');
      grid.innerHTML = list.map(buildProductCard).join('');
    }

    if (count) {
      count.textContent = `${list.length} bidhaa`;
    }
  }

  function setActiveFilter(category) {
    activeCategory = category;
    document.querySelectorAll('.filter-btn').forEach(btn => {
      const isActive = btn.dataset.category === category;
      btn.classList.toggle('bg-navy', isActive);
      btn.classList.toggle('text-white', isActive);
      btn.classList.toggle('font-semibold', isActive);
      btn.classList.remove('hover:bg-mist');
      if (!isActive) btn.classList.add('hover:bg-mist');
    });
    renderProducts();
  }

  // Category filter buttons
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => setActiveFilter(btn.dataset.category));
  });

  // Sort select
  const sortSelect = document.getElementById('sort-select');
  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      sortOrder = sortSelect.value;
      renderProducts();
    });
  }

  // Search input
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      searchQuery = searchInput.value;
      renderProducts();
    });
  }

  // Apply initial state
  setActiveFilter(activeCategory);
});
