const jewelryData = [
    { id: 1, name: 'Minimalist Labret Stud', material: 'titanium', style: 'stud', type: 'lip', gauges: ['18g', '16g'], price: 25, img: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600' },
    { id: 2, name: 'Gold Clicker Hoop', material: 'gold', style: 'hoop', type: 'ear', gauges: ['18g', '16g'], price: 120, img: 'https://images.unsplash.com/photo-1611955167811-4711904bb9f8?w=600' },
    { id: 3, name: 'Opal Trinity Stud', material: 'titanium', style: 'stud', type: 'ear', gauges: ['16g'], price: 45, img: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=800' },
    { id: 4, name: 'Curved Barbell', material: 'steel', style: 'barbell', type: 'navel', gauges: ['14g'], price: 30, img: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800' },
    { id: 5, name: 'Diamond Nostril Screw', material: 'gold', style: 'stud', type: 'nose', gauges: ['20g', '18g'], price: 85, img: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600' },
    { id: 6, name: 'Simple Seamless Hoop', material: 'titanium', style: 'hoop', type: 'nose', gauges: ['20g', '18g'], price: 35, img: 'https://images.unsplash.com/photo-1611955167811-4711904bb9f8?w=600' },
];

document.addEventListener('DOMContentLoaded', () => {
    initFilters();
    initMobileFilters(); // New function
    renderGrid(jewelryData);
});

function initMobileFilters() {
    const filterToggle = document.getElementById('mobile-filter-toggle');
    const filterContainer = document.getElementById('filter-container');

    if (filterToggle && filterContainer) {
        filterToggle.addEventListener('click', () => {
            const isHidden = filterContainer.classList.contains('hidden');
            if (isHidden) {
                filterContainer.classList.remove('hidden');
                filterContainer.classList.add('animate-fadeIn');
            } else {
                filterContainer.classList.add('hidden');
            }
        });
    }
}

function initFilters() {
    const searchInput = document.getElementById('jewelry-search');
    const checkboxes = document.querySelectorAll('.filter-checkbox');
    const clearBtn = document.getElementById('clear-filters');

    const updateFilters = () => {
        const searchTerm = searchInput.value.toLowerCase();
        const activeMaterials = Array.from(checkboxes)
            .filter(cb => cb.checked && ['titanium', 'gold', 'steel'].includes(cb.value))
            .map(cb => cb.value);
        const activeStyles = Array.from(checkboxes)
            .filter(cb => cb.checked && ['stud', 'hoop', 'barbell'].includes(cb.value))
            .map(cb => cb.value);

        const filtered = jewelryData.filter(item => {
            const matchesSearch = item.name.toLowerCase().includes(searchTerm);
            const matchesMaterial = activeMaterials.length === 0 || activeMaterials.includes(item.material);
            const matchesStyle = activeStyles.length === 0 || activeStyles.includes(item.style);
            return matchesSearch && matchesMaterial && matchesStyle;
        });

        renderGrid(filtered);
    };

    searchInput.addEventListener('input', updateFilters);
    checkboxes.forEach(cb => {
        cb.addEventListener('change', (e) => {
            const checkmark = e.target.nextElementSibling.querySelector('i');
            checkmark.classList.toggle('hidden', !e.target.checked);
            updateFilters();
        });
    });

    clearBtn.addEventListener('click', () => {
        searchInput.value = '';
        checkboxes.forEach(cb => {
            cb.checked = false;
            cb.nextElementSibling.querySelector('i').classList.add('hidden');
        });
        updateFilters();
    });
}

function renderGrid(items) {
    const grid = document.getElementById('jewelry-grid');
    const count = document.getElementById('results-count');
    grid.innerHTML = '';
    count.textContent = `${items.length} Items Found`;

    items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'group bg-white/5 rounded-3xl overflow-hidden border border-white/5 hover:border-primary/50 transition-all cursor-pointer';
        card.innerHTML = `
            <div class="h-80 overflow-hidden relative">
                <img src="${item.img}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
                <div class="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-white border border-white/10">
                    ${item.material}
                </div>
            </div>
            <div class="p-6">
                <h3 class="text-xl font-bold mb-2 group-hover:text-primary transition-colors">${item.name}</h3>
                <p class="text-2xl font-black text-white">$${item.price}</p>
                <div class="flex items-center justify-between mt-6 pt-6 border-t border-white/5">
                    <span class="text-xs uppercase font-black text-gray-500">${item.style} / ${item.gauges[0]}</span>
                    <button onclick="openQuickView(${item.id})" class="text-xs font-bold text-primary hover:underline">Quick View</button>
                </div>
            </div>
        `;
        card.onclick = () => openQuickView(item.id);
        grid.appendChild(card);
    });
}

function openQuickView(id) {
    const item = jewelryData.find(i => i.id === id);
    const modal = document.getElementById('quick-view');

    document.getElementById('modal-img').src = item.img;
    document.getElementById('modal-name').textContent = item.name;
    document.getElementById('modal-material').textContent = item.material;
    document.getElementById('modal-price').textContent = `$${item.price}`;

    const gaugeContainer = document.getElementById('modal-gauges');
    gaugeContainer.innerHTML = item.gauges.map(g => `<span class="px-3 py-2 bg-white/10 rounded-lg text-xs font-black uppercase text-white">${g}</span>`).join('');

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

// Modal Close logic
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('quick-view');
    const closeBtn = document.getElementById('close-modal');
    const overlay = document.getElementById('modal-overlay');

    const closeModal = () => {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    };

    closeBtn.onclick = closeModal;
    overlay.onclick = closeModal;
});
