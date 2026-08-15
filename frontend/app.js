// State management & dynamic products data
const cart = [];
let currentCategory = 'all';
let products = []; // Chargés dynamiquement depuis l'API

// DOM Elements
const menuGrid = document.getElementById('menu-grid');
const cartFloatingBtn = document.getElementById('cart-floating-btn');
const cartBadge = document.getElementById('cart-badge');
const cartBtnTotal = document.getElementById('cart-btn-total');
const cartPanel = document.getElementById('cart-panel');
const cartPanelOverlay = document.getElementById('cart-panel-overlay');
const cartItemsContainer = document.getElementById('cart-items-container');
const summarySubtotal = document.getElementById('summary-subtotal');
const summaryTotal = document.getElementById('summary-total');
const clientNameInput = document.getElementById('client-name');

// Payment Modal DOM
const paymentModal = document.getElementById('payment-modal');
const paymentModalOverlay = document.getElementById('payment-modal-overlay');
const paymentAmount = document.getElementById('payment-amount');

// Success Modal DOM
const successModal = document.getElementById('success-modal');
const successModalOverlay = document.getElementById('success-modal-overlay');
const successClientName = document.getElementById('success-client-name');
const successTableNum = document.getElementById('success-table-num');
const successOrderId = document.getElementById('success-order-id');

// Ask notification permission and fetch menu on startup
document.addEventListener('DOMContentLoaded', () => {
    requestNotificationPermission();
    loadMenu();
});

// Fetch menu dynamically from Backend database API
async function loadMenu() {
    try {
        const response = await fetch('/api/menu');
        if (!response.ok) throw new Error('Erreur de chargement du menu');
        const data = await response.json();
        
        // Map database schema to frontend properties
        products = data.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price_cents / 100, // Conversion centimes -> euros
            category: item.category,
            categoryLabel: getCategoryLabel(item.category),
            description: item.description,
            image: item.image_url || 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=400'
        }));
        
        renderMenu();
    } catch (error) {
        console.error('Erreur chargement menu depuis l\'API:', error);
        // Fallback locale pour prévisualisation locale pure
        products = [
            { id: "p1", name: "Moscow Mule Premium", price: 12.50, category: "boisson", categoryLabel: "Cocktails", description: "Vodka artisanale, bière de gingembre bio, jus de citron vert frais, menthe fraîche.", image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=400" },
            { id: "p2", name: "IPA Locale \"La Barbaque\"", price: 7.50, category: "boisson", categoryLabel: "Bières", description: "Bière blonde IPA artisanale locale, notes intenses d'agrumes et amertume fraîche.", image: "https://images.unsplash.com/photo-1600718374662-0483d2b9da44?auto=format&fit=crop&q=80&w=400" },
            { id: "p3", name: "Planche de Charcuteries fines", price: 16.00, category: "entree", categoryLabel: "À partager", description: "Sélection de charcuteries ibériques, cornichons, pain au levain et beurre demi-sel.", image: "https://images.unsplash.com/photo-1541532713592-79a0317b6b77?auto=format&fit=crop&q=80&w=400" },
            { id: "p4", name: "Burger Signature L'Atelier", price: 18.50, category: "plat", categoryLabel: "Plats", description: "Bœuf charolais, cheddar affiné de 18 mois, oignons caramélisés, sauce secrète, frites fraîches.", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=400" }
        ];
        renderMenu();
    }
}

function getCategoryLabel(category) {
    switch (category) {
        case 'boisson': return 'Boissons';
        case 'entree': return 'À partager';
        case 'plat': return 'Plats';
        case 'dessert': return 'Desserts';
        default: return category.charAt(0).toUpperCase() + category.slice(1);
    }
}

function requestNotificationPermission() {
    if ('Notification' in window) {
        if (Notification.permission === 'default') {
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    console.log('Autorisation de notification accordée.');
                }
            });
        }
    }
}

// Render Menu Cards dynamically
function renderMenu() {
    const filteredProducts = products.filter(product => {
        return currentCategory === 'all' || product.category === currentCategory;
    });

    menuGrid.innerHTML = filteredProducts.map(product => {
        const cartItem = cart.find(item => item.name === product.name);
        const quantity = cartItem ? cartItem.quantity : 0;

        // Dynamic quantity selection button / stepper
        const actionHtml = quantity > 0 ? `
            <div class="item-stepper">
                <button class="stepper-btn" onclick="updateQty('${product.name.replace(/'/g, "\\'")}', -1)">
                    <i class="fa-solid fa-minus"></i>
                </button>
                <span class="stepper-val">${quantity}</span>
                <button class="stepper-btn" onclick="updateQty('${product.name.replace(/'/g, "\\'")}', 1)">
                    <i class="fa-solid fa-plus"></i>
                </button>
            </div>
        ` : `
            <button class="add-to-cart-btn" onclick="addToCart('${product.name.replace(/'/g, "\\'")}', ${product.price}, '${product.category}')">
                <i class="fa-solid fa-plus"></i> Ajouter
            </button>
        `;

        return `
            <div class="menu-item glass" data-category="${product.category}">
                <div class="item-img" style="background-image: url('${product.image}');"></div>
                <div class="item-details">
                    <span class="item-category">${product.categoryLabel}</span>
                    <h3>${product.name}</h3>
                    <p class="item-desc">${product.description}</p>
                    <div class="item-footer">
                        <span class="item-price">${product.price.toFixed(2)} €</span>
                        ${actionHtml}
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Add item to cart
function addToCart(name, price, category) {
    const existingItem = cart.find(item => item.name === name);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, price, category, quantity: 1 });
    }
    
    updateCartUI();
    renderMenu();
    
    // Bounce effect on cart floating button
    cartFloatingBtn.style.transform = 'translateX(-50%) scale(1.05)';
    setTimeout(() => {
        cartFloatingBtn.style.transform = 'translateX(-50%) scale(1)';
    }, 150);
}

// Update Qty from both cart slider and main menu card stepper
function updateQty(name, amount) {
    const item = cart.find(item => item.name === name);
    if (!item) return;
    
    item.quantity += amount;
    
    if (item.quantity <= 0) {
        const index = cart.indexOf(item);
        cart.splice(index, 1);
    }
    
    updateCartUI();
    renderMenu();
}

// Update Cart UI totals and badges
function updateCartUI() {
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartBadge.innerText = totalCount;
    
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const formattedTotal = totalPrice.toFixed(2) + ' €';
    cartBtnTotal.innerText = formattedTotal;
    summarySubtotal.innerText = formattedTotal;
    summaryTotal.innerText = formattedTotal;
    
    if (totalCount > 0) {
        cartFloatingBtn.classList.add('active');
    } else {
        cartFloatingBtn.classList.remove('active');
        cartPanel.classList.remove('active');
        cartPanelOverlay.classList.remove('active');
    }
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<div class="empty-cart-message">Votre panier est vide.</div>';
        return;
    }
    
    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <span>${(item.price * item.quantity).toFixed(2)} €</span>
            </div>
            <div class="cart-item-qty">
                <button class="qty-btn" onclick="updateQty('${item.name.replace(/'/g, "\\'")}', -1)"><i class="fa-solid fa-minus"></i></button>
                <span class="qty-val">${item.quantity}</span>
                <button class="qty-btn" onclick="updateQty('${item.name.replace(/'/g, "\\'")}', 1)"><i class="fa-solid fa-plus"></i></button>
            </div>
        </div>
    `).join('');
}

// Toggle Cart overlay and panel
function toggleCart() {
    if (cart.length === 0) return;
    cartPanel.classList.toggle('active');
    cartPanelOverlay.classList.toggle('active');
}

// Category filter event listeners
document.querySelectorAll('.category-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        currentCategory = btn.getAttribute('data-category');
        renderMenu();
    });
});

// Proceed to payment modal
function proceedToPayment() {
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    paymentAmount.innerText = totalPrice.toFixed(2) + ' €';
    
    cartPanel.classList.remove('active');
    cartPanelOverlay.classList.remove('active');
    
    setTimeout(() => {
        paymentModal.classList.add('active');
        paymentModalOverlay.classList.add('active');
    }, 200);
}

// Close payment modal
function closePayment() {
    paymentModal.classList.remove('active');
    paymentModalOverlay.classList.remove('active');
}

// Simulate successful payment and trigger simulated preparation workflow
function simulatePaymentSuccess() {
    const confirmBtn = document.getElementById('confirm-payment-btn');
    confirmBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Traitement...';
    confirmBtn.disabled = true;

    // Simulate Stripe round-trip
    setTimeout(() => {
        closePayment();
        
        const clientName = clientNameInput.value.trim() || 'Alex';
        successClientName.innerText = clientName;
        successTableNum.innerText = document.getElementById('table-number').innerText;
        
        const randomId = 'M-' + Math.floor(1000 + Math.random() * 9000);
        successOrderId.innerText = randomId;
        
        // Reset status steps back to "En cuisine" (Preparation)
        const steps = document.querySelectorAll('.order-status-tracker .status-step');
        steps[0].classList.add('active'); // Payé
        steps[1].classList.add('active'); // En cuisine
        steps[1].querySelector('.step-bullet').classList.add('progress-pulse');
        steps[2].classList.remove('active'); // Prête
        steps[2].querySelector('.step-bullet').classList.remove('progress-pulse');

        successModal.classList.add('active');
        successModalOverlay.classList.add('active');
        
        confirmBtn.innerHTML = '<i class="fa-solid fa-shield-halved"></i> Confirmer le paiement';
        confirmBtn.disabled = false;
        
        cart.length = 0;
        updateCartUI();
        renderMenu();

        // Simulate preparation time and notify client when ready
        setTimeout(() => {
            // Update UI tracker to "Prête"
            steps[1].querySelector('.step-bullet').classList.remove('progress-pulse');
            steps[2].classList.add('active');
            
            // Push actual native browser notification
            if ('Notification' in window && Notification.permission === 'granted') {
                new Notification("Ciao Byebye - Commande Prête !", {
                    body: `${clientName}, votre commande est prête au comptoir. Ciao byebye !`,
                    icon: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=100'
                });
            }
        }, 5000);

    }, 1500);
}

// Reset success modal
function resetApp() {
    successModal.classList.remove('active');
    successModalOverlay.classList.remove('active');
}
