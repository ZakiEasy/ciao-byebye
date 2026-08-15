// State management
const cart = [];
let tableSessionId = null;

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

// Add item to cart
function addToCart(name, price, category) {
    const existingItem = cart.find(item => item.name === name);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, price, category, quantity: 1 });
    }
    
    updateCartUI();
    
    // Tiny bounce effect on cart button
    cartFloatingBtn.style.transform = 'translateX(-50%) scale(1.05)';
    setTimeout(() => {
        cartFloatingBtn.style.transform = 'translateX(-50%) scale(1)';
    }, 150);
}

// Update Qty
function updateQty(name, amount) {
    const item = cart.find(item => item.name === name);
    if (!item) return;
    
    item.quantity += amount;
    
    if (item.quantity <= 0) {
        const index = cart.indexOf(item);
        cart.splice(index, 1);
    }
    
    updateCartUI();
}

// Update Cart UI
function updateCartUI() {
    // Total count
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartBadge.innerText = totalCount;
    
    // Total price
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const formattedTotal = totalPrice.toFixed(2) + ' €';
    cartBtnTotal.innerText = formattedTotal;
    summarySubtotal.innerText = formattedTotal;
    summaryTotal.innerText = formattedTotal;
    
    // Toggle cart floating button visibility
    if (totalCount > 0) {
        cartFloatingBtn.classList.add('active');
    } else {
        cartFloatingBtn.classList.remove('active');
        cartPanel.classList.remove('active');
        cartPanelOverlay.classList.remove('active');
    }
    
    // Populate cart items container
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

// Toggle Cart Overlay/Panel
function toggleCart() {
    if (cart.length === 0) return;
    cartPanel.classList.toggle('active');
    cartPanelOverlay.classList.toggle('active');
}

// Category filter
document.querySelectorAll('.category-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const targetCategory = btn.getAttribute('data-category');
        document.querySelectorAll('.menu-item').forEach(item => {
            if (targetCategory === 'all' || item.getAttribute('data-category') === targetCategory) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Proceed to payment
function proceedToPayment() {
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    paymentAmount.innerText = totalPrice.toFixed(2) + ' €';
    
    // Close cart first, then open payment modal
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

// Simulate successful payment
function simulatePaymentSuccess() {
    const confirmBtn = document.getElementById('confirm-payment-btn');
    confirmBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Traitement...';
    confirmBtn.disabled = true;

    // Simulate Stripe round-trip API call
    setTimeout(() => {
        closePayment();
        
        // Populate success screen fields
        const clientName = clientNameInput.value.trim() || 'Alex';
        successClientName.innerText = clientName;
        successTableNum.innerText = document.getElementById('table-number').innerText;
        
        // Generate random order ID
        const randomId = 'M-' + Math.floor(1000 + Math.random() * 9000);
        successOrderId.innerText = randomId;
        
        // Open success modal
        successModal.classList.add('active');
        successModalOverlay.classList.add('active');
        
        // Restore button state
        confirmBtn.innerHTML = '<i class="fa-solid fa-shield-halved"></i> Confirmer le paiement';
        confirmBtn.disabled = false;
        
        // Clear cart
        cart.length = 0;
        updateCartUI();
    }, 1500);
}

// Reset app back to initial state
function resetApp() {
    successModal.classList.remove('active');
    successModalOverlay.classList.remove('active');
}
