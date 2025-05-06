// Search data structure
const searchData = {
    products: [
        {
            title: 'Industrial Gases',
            description: 'High-purity industrial gases for manufacturing, welding, and processing applications.',
            url: 'products.html#industrial',
            keywords: ['industrial', 'manufacturing', 'welding', 'processing']
        },
        {
            title: 'Medical Gases',
            description: 'Pure medical gases and equipment for healthcare facilities and emergency services.',
            url: 'products.html#medical',
            keywords: ['medical', 'healthcare', 'hospital', 'emergency']
        },
        {
            title: 'Specialty Gases',
            description: 'Custom gas mixtures and specialty gases for research and specialized applications.',
            url: 'products.html#specialty',
            keywords: ['specialty', 'custom', 'research', 'mixtures']
        }
    ],
    industries: [
        {
            title: 'Healthcare',
            description: 'Supporting medical facilities with life-saving gases and equipment.',
            url: 'industries.html#healthcare',
            keywords: ['healthcare', 'medical', 'hospital', 'clinical']
        },
        {
            title: 'Manufacturing',
            description: 'Powering industrial processes with reliable gas solutions.',
            url: 'industries.html#manufacturing',
            keywords: ['manufacturing', 'industrial', 'production', 'factory']
        },
        {
            title: 'Food & Beverage',
            description: 'Ensuring food safety and quality with specialized gas solutions.',
            url: 'industries.html#food-beverage',
            keywords: ['food', 'beverage', 'packaging', 'preservation']
        }
    ],
    news: [
        {
            title: 'New Medical Gas Facility',
            description: 'Allibiya Gases expands medical gas production capabilities.',
            url: 'news.html#medical-facility',
            keywords: ['medical', 'facility', 'expansion', 'production']
        },
        {
            title: 'Safety Certification',
            description: 'Achieved ISO 9001:2015 certification for quality management.',
            url: 'news.html#safety-certification',
            keywords: ['safety', 'certification', 'ISO', 'quality']
        }
    ]
};

// Initialize Fuse.js for each category
const fuseOptions = {
    keys: ['title', 'description', 'keywords'],
    threshold: 0.3,
    includeScore: true
};

const fuseProducts = new Fuse(searchData.products, fuseOptions);
const fuseIndustries = new Fuse(searchData.industries, fuseOptions);
const fuseNews = new Fuse(searchData.news, fuseOptions);

// Search functionality
function initializeSearch(inputId, resultsId, resultsContentId) {
    const searchInput = document.getElementById(inputId);
    const searchResults = document.getElementById(resultsId);
    const searchResultsContent = document.getElementById(resultsContentId);
    let searchTimeout;

    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            const query = e.target.value.trim();
            if (query.length < 2) {
                searchResults.classList.add('hidden');
                return;
            }

            const results = {
                products: fuseProducts.search(query),
                industries: fuseIndustries.search(query),
                news: fuseNews.search(query)
            };

            displayResults(results, searchResultsContent);
            searchResults.classList.remove('hidden');
        }, 300);
    });

    // Close search results when clicking outside
    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.classList.add('hidden');
        }
    });
}

function displayResults(results, container) {
    let html = '';
    let hasResults = false;

    // Helper function to create result item HTML
    const createResultItem = (item, category) => {
        const url = item.item.url;
        const title = item.item.title;
        const description = item.item.description;
        
        return `
            <div class="p-2 hover:bg-gray-100 cursor-pointer rounded" 
                 onclick="window.location.href='${url}'">
                <div class="font-semibold text-blue-600">${title}</div>
                <div class="text-sm text-gray-600">${description}</div>
                <div class="text-xs text-gray-500">${category}</div>
            </div>
        `;
    };

    // Display results for each category
    ['products', 'industries', 'news'].forEach(category => {
        const categoryResults = results[category];
        if (categoryResults.length > 0) {
            hasResults = true;
            html += `<div class="mb-4">
                <h3 class="font-semibold text-gray-700 mb-2">${category.charAt(0).toUpperCase() + category.slice(1)}</h3>
                ${categoryResults.slice(0, 3).map(item => createResultItem(item, category)).join('')}
            </div>`;
        }
    });

    if (!hasResults) {
        html = '<div class="p-4 text-gray-500">No results found</div>';
    }

    container.innerHTML = html;
}

// Initialize search for both desktop and mobile
document.addEventListener('DOMContentLoaded', () => {
    initializeSearch('search-input', 'search-results', 'search-results-content');
    initializeSearch('mobile-search-input', 'mobile-search-results', 'mobile-search-results-content');
}); 