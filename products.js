// Data ya bidhaa — bila picha, tunatumia gradient na icons
const products = [
  {
    id: 1,
    name: 'Sofa ya Oslo',
    category: 'sofas',
    price: 249000,
    originalPrice: 299000,
    description: 'Sofa ya viti vitatu yenye mto mzuri na miguu ya mti wa mwaloni. Inapatikana katika rangi ya kitani na kijivu.',
    featured: true,
  },
  {
    id: 2,
    name: 'Meza ya Walnut',
    category: 'tables',
    price: 189000,
    originalPrice: null,
    description: 'Meza ya chakula ya mti wa walnut na ukingo wa asili. Inakaa watu 6 kwa urahisi. Kila kipande ni cha kipekee.',
    featured: true,
  },
  {
    id: 3,
    name: 'Kiti cha Kitani',
    category: 'chairs',
    price: 99000,
    originalPrice: 149000,
    description: 'Kiti cha starehe kilichofunikwa kwa kitani cha hali ya juu. Kinafaa kwa pembe za kusomea na vyumba vya kuishi.',
    featured: true,
  },
  {
    id: 4,
    name: 'Kitanda cha Platform',
    category: 'beds',
    price: 279000,
    originalPrice: null,
    description: 'Kitanda cha chini cha mti wa mwaloni. Mistari safi, hakuna haja ya sanduku la spring. Kinapatikana kwa ukubwa wa Queen na King.',
    featured: true,
  },
  {
    id: 5,
    name: 'Rafu ya Vitabu',
    category: 'storage',
    price: 79000,
    originalPrice: null,
    description: 'Rafu ya vitabu ya moduli ya mbao ya birch. Panga na weka kwa nafasi yoyote.',
    featured: false,
  },
  {
    id: 6,
    name: 'Meza ya Marmar',
    category: 'tables',
    price: 149000,
    originalPrice: 199000,
    description: 'Uso wa marmar mweupe na miguu ya shaba iliyosafishwa. Kipande cha kuvutia kwa chumba chochote cha kuishi.',
    featured: false,
  },
  {
    id: 7,
    name: 'Kiti cha Velvet',
    category: 'chairs',
    price: 89000,
    originalPrice: null,
    description: 'Kiti cha velvet ya kijani kibichi na miguu ya dhahabu. Kizuri na cha kuvutia.',
    featured: false,
  },
  {
    id: 8,
    name: 'Sofa ya Sehemu',
    category: 'sofas',
    price: 289000,
    originalPrice: 299000,
    description: 'Sofa ya umbo la L katika kitambaa cha nguvu. Muundo wa moduli hukuruhusu kuipanga unavyotaka.',
    featured: false,
  },
  {
    id: 9,
    name: 'Meza ya Pembeni ya Kitanda',
    category: 'storage',
    price: 229000,
    originalPrice: null,
    description: 'Meza ya pembeni ya kitanda ya mti wa mwaloni yenye droo moja na rafu wazi. Rahisi na ya manufaa.',
    featured: false,
  },
  {
    id: 10,
    name: 'Kitanda cha Ghorofa Mbili',
    category: 'beds',
    price: 259000,
    originalPrice: 299000,
    description: 'Kitanda cha ghorofa mbili cha mti wa pine chenye ngazi na vizuizi vya usalama. Kizuri kwa vyumba vya watoto.',
    featured: false,
  },
  {
    id: 11,
    name: 'Viti vya Bar (Seti ya 2)',
    category: 'chairs',
    price: 119000,
    originalPrice: null,
    description: 'Seti ya viti 2 vya bar vya mti wa ash wa asili. Urefu unaoweza kurekebishwa.',
    featured: false,
  },
  {
    id: 12,
    name: 'Kabati la TV',
    category: 'storage',
    price: 179000,
    originalPrice: 229000,
    description: 'Kabati la TV la chini la mti wa oak wenye moshi na milango inayosogea. Inafaa TV hadi inchi 75.',
    featured: false,
  },
];

/** Pata bidhaa kwa ID */
function getProductById(id) {
  return products.find(p => p.id === parseInt(id));
}

/** Pata bidhaa maarufu */
function getFeaturedProducts() {
  return products.filter(p => p.featured);
}

/** Pata bidhaa kwa aina */
function getProductsByCategory(category) {
  if (category === 'all') return products;
  return products.filter(p => p.category === category);
}

/** Fomati bei kwa Shilingi za Tanzania */
function formatPrice(amount) {
  return 'TSh ' + amount.toLocaleString('en-TZ');
}

/** Rangi za gradient kwa kila aina ya bidhaa */
const categoryGradients = {
  sofas:   'linear-gradient(135deg, #1B2A4A, #2C4A8C)',
  tables:  'linear-gradient(135deg, #2C4A8C, #1B3550)',
  chairs:  'linear-gradient(135deg, #1B2A4A, #3a1f5c)',
  beds:    'linear-gradient(135deg, #1a3a2a, #1B2A4A)',
  storage: 'linear-gradient(135deg, #2C4A8C, #1B3a2a)',
};

/** SVG icons kwa kila aina */
const categoryIcons = {
  sofas: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="currentColor" class="h-16 w-16 text-gold/50">
    <rect x="8" y="28" width="48" height="16" rx="4"/>
    <rect x="4" y="24" width="8" height="20" rx="3"/>
    <rect x="52" y="24" width="8" height="20" rx="3"/>
    <rect x="12" y="44" width="6" height="8" rx="2"/>
    <rect x="46" y="44" width="6" height="8" rx="2"/>
    <rect x="10" y="18" width="44" height="12" rx="4"/>
  </svg>`,
  tables: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="currentColor" class="h-16 w-16 text-gold/50">
    <rect x="4" y="20" width="56" height="8" rx="3"/>
    <rect x="10" y="28" width="6" height="22" rx="2"/>
    <rect x="48" y="28" width="6" height="22" rx="2"/>
  </svg>`,
  chairs: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="currentColor" class="h-16 w-16 text-gold/50">
    <rect x="16" y="8" width="32" height="22" rx="4"/>
    <rect x="12" y="28" width="40" height="10" rx="3"/>
    <rect x="14" y="38" width="8" height="18" rx="2"/>
    <rect x="42" y="38" width="8" height="18" rx="2"/>
    <rect x="8" y="8" width="8" height="30" rx="3"/>
  </svg>`,
  beds: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="currentColor" class="h-16 w-16 text-gold/50">
    <rect x="4" y="36" width="56" height="10" rx="3"/>
    <rect x="4" y="46" width="8" height="10" rx="2"/>
    <rect x="52" y="46" width="8" height="10" rx="2"/>
    <rect x="4" y="20" width="56" height="18" rx="4"/>
    <rect x="8" y="16" width="20" height="6" rx="3"/>
    <rect x="36" y="16" width="20" height="6" rx="3"/>
  </svg>`,
  storage: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="currentColor" class="h-16 w-16 text-gold/50">
    <rect x="8" y="8" width="48" height="48" rx="4"/>
    <rect x="8" y="28" width="48" height="4" fill="#1B2A4A"/>
    <rect x="28" y="8" width="4" height="20" fill="#1B2A4A"/>
    <rect x="28" y="32" width="4" height="24" fill="#1B2A4A"/>
    <circle cx="22" cy="20" r="2.5" fill="#C9A84C"/>
    <circle cx="42" cy="44" r="2.5" fill="#C9A84C"/>
  </svg>`,
};

/** Jenga placeholder ya bidhaa bila picha */
function productIllustration(category) {
  const bg = categoryGradients[category] || categoryGradients.storage;
  const icon = categoryIcons[category] || categoryIcons.storage;
  return `
    <div class="absolute inset-0 flex items-center justify-center" style="background: ${bg};">
      ${icon}
    </div>
  `;
}

/** Jenga kadi ya bidhaa */
function buildProductCard(product) {
  const badge = product.originalPrice
    ? `<span class="absolute top-3 left-3 badge-sale text-xs px-2 py-1 rounded-full z-10">Punguzo</span>`
    : '';

  return `
    <div class="product-card bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-mist border-t-2 group">
      <a href="product.html?id=${product.id}" class="block">
        <div class="relative aspect-square overflow-hidden">
          ${badge}
          ${productIllustration(product.category)}
        </div>
      </a>
      <div class="p-5">
        <p class="text-xs text-gold font-bold uppercase tracking-wider mb-1">${product.category}</p>
        <a href="product.html?id=${product.id}">
          <h3 class="font-semibold text-navy hover:text-royal transition-colors mb-3 text-base">${product.name}</h3>
        </a>
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="font-bold text-navy text-lg">${formatPrice(product.price)}</span>
            ${product.originalPrice
              ? `<span class="text-xs text-gray-400 line-through">${formatPrice(product.originalPrice)}</span>`
              : ''}
          </div>
          <button
            onclick="addToCart(${product.id})"
            class="btn-primary text-xs px-4 py-2 rounded-full font-semibold"
          >
            + Kikapu
          </button>
        </div>
      </div>
    </div>
  `;
}
