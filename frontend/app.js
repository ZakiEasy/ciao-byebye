// Translations dictionary (i18n)
const translations = {
    fr: {
        splash_title: "Bienvenue sur Ciao Byebye",
        splash_desc: "Pour lier votre commande et retrouver vos reçus, connectez-vous ou continuez en tant qu'invité.",
        btn_login_google: "Se connecter avec Google",
        btn_login_apple: "Se connecter avec Apple",
        btn_continue_guest: "Continuer en tant qu'invité",
        table_prefix: "Table",
        welcome_prefix: "Bienvenue chez",
        welcome_subtitle: "Passez votre commande en direct et payez en toute liberté.",
        name_label: "Votre Prénom pour la commande :",
        cat_all: "Tout",
        cat_boisson: "Boissons",
        cat_entree: "Entrées",
        cat_plat: "Plats",
        cat_dessert: "Desserts",
        btn_add: "Ajouter",
        cart_title: "Votre Panier",
        cart_empty: "Votre panier est vide.",
        cart_subtotal: "Sous-total",
        cart_total: "Total",
        btn_proceed_pay: "Payer et Envoyer en Cuisine",
        pay_modal_title: "Paiement & Envoi en Cuisine",
        amount_to_pay: "Montant à régler :",
        tab_card: "Carte / Apple Pay",
        tab_cash: "Espèces en Caisse",
        cash_info_title: "Règlement en Espèces en Caisse",
        cash_info_desc: "Votre commande est transmise immédiatement en cuisine. Vous règlerez en espèces au comptoir ou auprès de votre serveur.",
        card_number: "Numéro de carte",
        card_exp: "Expiration",
        card_cvc: "CVC",
        btn_confirm_payment: "Confirmer le paiement",
        btn_confirm_cash: "Valider la commande (Espèces en Caisse)",
        btn_processing: "Traitement...",
        security_badge: "Paiement 100% sécurisé et direct pour L'Atelier de Chris.",
        success_title: "Suivi de Commande en Direct",
        success_thanks: "Merci",
        success_validated: "votre commande est en cours de préparation.",
        order_prefix: "Commande",
        queue_prefix: "Position File d'Attente",
        payment_status_label: "Règlement",
        payment_status_paid: "✅ Payé Stripe",
        payment_status_cash_pending: "💵 À régler en espèces en caisse",
        payment_status_cash_paid: "✅ Réglé en espèces",
        pickup_toast: "Vous recevrez une alerte sur votre écran dès qu'elle sera prête au comptoir de retrait !",
        step_paid: "Payée",
        step_kitchen: "En cuisine",
        step_ready: "Prête",
        btn_back_menu: "Retour au Menu",
        btn_minimize_tracker: "Réduire & Continuer à Parcourir",
        notif_ready_title: "Ciao Byebye - Commande Prête !",
        notif_ready_body: "votre commande est prête au comptoir. Ciao byebye !",
        account_title: "Mon Espace Client",
        order_in_progress: "Commande en cours",
        btn_track: "Suivre",
        btn_link_account: "Se connecter / Lier un compte",
        btn_logout: "Réinitialiser / Se déconnecter",
        drawer_active_order_title: "Commande en cours de préparation",
        btn_view_live_tracker: "Voir le suivi en direct",
        status_cooking_bar: "🔥 En cuisine (Table {table}) - File #{queue}",
        status_ready_bar: "🎉 Prête au comptoir de retrait !",
        notif_cash_paid_title: "Paiement Encaissé !",
        notif_cash_paid_body: "Votre règlement en espèces a été validé en caisse. Bon appétit !"
    },
    en: {
        splash_title: "Welcome to Ciao Byebye",
        splash_desc: "To link your order and view receipts, sign in or continue as a guest.",
        btn_login_google: "Sign in with Google",
        btn_login_apple: "Sign in with Apple",
        btn_continue_guest: "Continue as Guest",
        table_prefix: "Table",
        welcome_prefix: "Welcome to",
        welcome_subtitle: "Order directly and pay with complete freedom.",
        name_label: "Your First Name for the order:",
        cat_all: "All",
        cat_boisson: "Drinks",
        cat_entree: "Starters",
        cat_plat: "Mains",
        cat_dessert: "Desserts",
        btn_add: "Add",
        cart_title: "Your Cart",
        cart_empty: "Your cart is empty.",
        cart_subtotal: "Subtotal",
        cart_total: "Total",
        btn_proceed_pay: "Pay & Send to Kitchen",
        pay_modal_title: "Payment & Send to Kitchen",
        amount_to_pay: "Amount to pay:",
        tab_card: "Card / Apple Pay",
        tab_cash: "Cash at Register",
        cash_info_title: "Pay with Cash at Counter",
        cash_info_desc: "Your order is immediately sent to the kitchen. You can pay cash at the register or with your waiter.",
        card_number: "Card number",
        card_exp: "Expiration",
        card_cvc: "CVC",
        btn_confirm_payment: "Confirm Payment",
        btn_confirm_cash: "Submit Order (Pay Cash at Register)",
        btn_processing: "Processing...",
        security_badge: "100% direct & secure payment for L'Atelier de Chris.",
        success_title: "Live Order Tracker",
        success_thanks: "Thank you",
        success_validated: "your order is being prepared in the kitchen.",
        order_prefix: "Order",
        queue_prefix: "Queue Position",
        payment_status_label: "Payment",
        payment_status_paid: "✅ Paid Stripe",
        payment_status_cash_pending: "💵 Pending Cash at Register",
        payment_status_cash_paid: "✅ Paid in Cash",
        pickup_toast: "You will receive an alert as soon as it's ready at the pickup counter!",
        step_paid: "Paid",
        step_kitchen: "Cooking",
        step_ready: "Ready",
        btn_back_menu: "Back to Menu",
        btn_minimize_tracker: "Minimize & Continue Browsing",
        notif_ready_title: "Ciao Byebye - Order Ready!",
        notif_ready_body: "your order is ready at the counter. Ciao byebye!",
        account_title: "My Client Space",
        order_in_progress: "Active Order",
        btn_track: "Track",
        btn_link_account: "Sign in / Link Account",
        btn_logout: "Reset / Sign Out",
        drawer_active_order_title: "Active Order Preparation",
        btn_view_live_tracker: "View live tracking",
        status_cooking_bar: "🔥 Cooking (Table {table}) - Queue #{queue}",
        status_ready_bar: "🎉 Ready for pickup at the counter!",
        notif_cash_paid_title: "Payment Confirmed!",
        notif_cash_paid_body: "Your cash payment has been verified at the cashier. Enjoy your meal!"
    },
    ar: {
        splash_title: "مرحباً بكم في تشاو باي باي",
        splash_desc: "لربط طلبك والحصول على الإيصال، يمكنك تسجيل الدخول أو المتابعة كضيف.",
        btn_login_google: "تسجيل الدخول عبر Google",
        btn_login_apple: "تسجيل الدخول عبر Apple",
        btn_continue_guest: "المتابعة كضيف",
        table_prefix: "طاولة",
        welcome_prefix: "مرحباً بكم في",
        welcome_subtitle: "اطلب مباشرة وادفع بكل حرية وسهولة.",
        name_label: "اسمك الكريم للطلب :",
        cat_all: "الكل",
        cat_boisson: "مشروبات",
        cat_entree: "مقبلات",
        cat_plat: "أطباق رئيسية",
        cat_dessert: "حلويات",
        btn_add: "إضافة",
        cart_title: "سلة الطلبات",
        cart_empty: "سلتك فارغة حالياً.",
        cart_subtotal: "المجموع الفرعي",
        cart_total: "الإجمالي",
        btn_proceed_pay: "الدفع وإرسال للطهي",
        pay_modal_title: "الدفع والإرسال إلى المطبخ",
        amount_to_pay: "المبلغ المطلوب :",
        tab_card: "بطاقة / Apple Pay",
        tab_cash: "نقداً عند الصندوق",
        cash_info_title: "الدفع نقداً عند الصندوق",
        cash_info_desc: "سيتم إرسال طلبك فوراً إلى المطبخ للتحضير. يمكنك الدفع نقداً عند الصندوق أو للنادل.",
        card_number: "رقم البطاقة",
        card_exp: "تاريخ الانتهاء",
        card_cvc: "رمز الأمان",
        btn_confirm_payment: "تأكيد الدفع",
        btn_confirm_cash: "تأكيد الطلب (الدفع نقداً)",
        btn_processing: "جاري المعالجة...",
        security_badge: "دفع آمن ومباشر 100% لمطعم ورشة كريس.",
        success_title: "تتبع الطلب مباشرة",
        success_thanks: "شكراً لك",
        success_validated: "طلبك قيد التحضير في المطبخ حالياً.",
        order_prefix: "رقم الطلب",
        queue_prefix: "الترتيب في قائمة الانتظار",
        payment_status_label: "حالة الدفع",
        payment_status_paid: "✅ مدفوع إلكترونياً",
        payment_status_cash_pending: "💵 مطلوب الدفع نقداً عند الصندوق",
        payment_status_cash_paid: "✅ تم الدفع نقداً",
        pickup_toast: "ستتلقى إشعاراً فور أن يصبح طلبك جاهزاً للاستلام عند المنصة !",
        step_paid: "مدفوع",
        step_kitchen: "في المطبخ",
        step_ready: "جاهز",
        btn_back_menu: "العودة للقائمة",
        btn_minimize_tracker: "تصغير ومتابعة التصفح",
        notif_ready_title: "تشاو باي باي - طلبك جاهز !",
        notif_ready_body: "طلبك جاهز الآن للاستلام عند المنصة. تشاو باي باي !",
        account_title: "حسابي والطلبات",
        order_in_progress: "طلب جاري التحضير",
        btn_track: "متابعة",
        btn_link_account: "تسجيل الدخول / ربط الحساب",
        btn_logout: "تسجيل الخروج",
        drawer_active_order_title: "طلب قيد الإعداد في المطبخ",
        btn_view_live_tracker: "عرض التتبع المباشر",
        status_cooking_bar: "🔥 في المطبخ (طاولة {table}) - الدور #{queue}",
        status_ready_bar: "🎉 طلبك جاهز للاستلام عند المنصة !",
        notif_cash_paid_title: "تم تأكيد الدفع !",
        notif_cash_paid_body: "تم تسجيل استلام المبلغ نقداً في الصندوق بنجاح. شهية طيبة !"
    },
    es: {
        splash_title: "Bienvenido a Ciao Byebye",
        splash_desc: "Para vincular su pedido y guardar recibos, inicie sesión o continúe como invitado.",
        btn_login_google: "Iniciar sesión con Google",
        btn_login_apple: "Iniciar sesión con Apple",
        btn_continue_guest: "Continuar como invitado",
        table_prefix: "Mesa",
        welcome_prefix: "Bienvenido a",
        welcome_subtitle: "Pida directamente desde su mesa y pague con total libertad.",
        name_label: "Su nombre para el pedido:",
        cat_all: "Todo",
        cat_boisson: "Bebidas",
        cat_entree: "Entrantes",
        cat_plat: "Platos",
        cat_dessert: "Postres",
        btn_add: "Añadir",
        cart_title: "Su Cesta",
        cart_empty: "Su cesta está vacía.",
        cart_subtotal: "Subtotal",
        cart_total: "Total",
        btn_proceed_pay: "Pagar y Enviar a Cocina",
        pay_modal_title: "Pago y Envío a Cocina",
        amount_to_pay: "Importe a pagar:",
        tab_card: "Tarjeta / Apple Pay",
        tab_cash: "Efectivo en Caja",
        cash_info_title: "Pago en Efectivo en Caja",
        cash_info_desc: "Su pedido se envía directamente a cocina. Podrá abonar el importe en efectivo en caja o a su camarero.",
        card_number: "Número de tarjeta",
        card_exp: "Expiración",
        card_cvc: "CVC",
        btn_confirm_payment: "Confirmar Pago",
        btn_confirm_cash: "Validar Pedido (Pagar en Caja)",
        btn_processing: "Procesando...",
        security_badge: "Pago 100% seguro y directo para L'Atelier de Chris.",
        success_title: "Seguimiento en Directo",
        success_thanks: "Gracias",
        success_validated: "su pedido está en preparación en cocina.",
        order_prefix: "Pedido",
        queue_prefix: "Posición en Cola",
        payment_status_label: "Pago",
        payment_status_paid: "✅ Pagado Stripe",
        payment_status_cash_pending: "💵 Pendiente de pago en caja",
        payment_status_cash_paid: "✅ Pagado en Efectivo",
        pickup_toast: "¡Recibirá una notificación cuando esté listo en el mostrador!",
        step_paid: "Pagado",
        step_kitchen: "En cocina",
        step_ready: "Listo",
        btn_back_menu: "Volver al Menú",
        btn_minimize_tracker: "Minimizar y Seguir Navegando",
        notif_ready_title: "¡Ciao Byebye - Pedido Listo!",
        notif_ready_body: "su pedido está listo en el mostrador. ¡Ciao byebye!",
        account_title: "Mi Cuenta",
        order_in_progress: "Pedido Activo",
        btn_track: "Seguir",
        btn_link_account: "Iniciar Sesión / Vincular",
        btn_logout: "Cerrar Sesión / Reset",
        drawer_active_order_title: "Pedido en Preparación",
        btn_view_live_tracker: "Ver seguimiento en vivo",
        status_cooking_bar: "🔥 En cocina (Mesa {table}) - Cola #{queue}",
        status_ready_bar: "🎉 ¡Listo para recoger en mostrador!",
        notif_cash_paid_title: "¡Pago Confirmado!",
        notif_cash_paid_body: "Su pago en efectivo ha sido validado en caja. ¡Buen provecho!"
    }
};

// Currencies definitions & conversion rates (base EUR)
const currencies = {
    EUR: { symbol: '€', rate: 1.0, position: 'after' },
    USD: { symbol: '$', rate: 1.08, position: 'before' },
    GBP: { symbol: '£', rate: 0.85, position: 'before' },
    MAD: { symbol: 'DH', rate: 10.80, position: 'after' },
    SAR: { symbol: '﷼', rate: 4.05, position: 'after' },
    AED: { symbol: 'د.إ', rate: 3.97, position: 'after' }
};

// State management
let currentLang = localStorage.getItem('ciao_lang') || 'fr';
let currentCurrency = localStorage.getItem('ciao_currency') || 'EUR';
const cart = [];
let currentCategory = 'all';
let products = [];
let activeOrder = null;
let selectedPaymentMethod = 'carte'; // 'carte' | 'especes'

// Multilingual product content overrides
const productTranslations = {
    "Moscow Mule Premium": {
        en: { name: "Premium Moscow Mule", desc: "Craft vodka, organic ginger beer, fresh lime juice, fresh mint." },
        ar: { name: "موسكو مول بريميوم", desc: "فودكا فاخرة، زنجبيل عضوي، عصير ليمون طازج، نعناع طازج." },
        es: { name: "Moscow Mule Premium", desc: "Vodka artesanal, cerveza de jengibre orgánica, lima fresca, menta fresca." }
    },
    "IPA Locale \"La Barbaque\"": {
        en: { name: "Local IPA \"La Barbaque\"", desc: "Local craft blonde IPA beer, intense citrus notes and refreshing bitterness." },
        ar: { name: "بيرة إيبا المحلية \"لا بارباك\"", desc: "بيرة شقراء يدوية الصنع، نكهات حمضيات منعشة ومرارة لطيفة." },
        es: { name: "IPA Local \"La Barbaque\"", desc: "Cerveza rubia artesanal local, notas cítricas y amargor fresco." }
    },
    "Planche de Charcuteries fines": {
        en: { name: "Fine Charcuterie Platter", desc: "Selection of Iberian cold cuts, pickles, sourdough bread and salted butter." },
        ar: { name: "طبق لحوم باردة ومقبلات فاخرة", desc: "تشكيلة لحوم باردة ومخللات فاخرة، خبز مخمر وزبدة مملحة." },
        es: { name: "Tabla de Embutidos Ibéricos", desc: "Selección de embutidos ibéricos, pepinillos, pan de masa madre y mantequilla." }
    },
    "Burger Signature L'Atelier": {
        en: { name: "L'Atelier Signature Burger", desc: "Charolais beef, 18-month aged cheddar, caramelized onions, secret sauce, fresh fries." },
        ar: { name: "برغر لاتيلييه الخاص", desc: "لحم بقري شاروليه، جبن شيدر معتق 18 شهراً، بصل مكرمل، صلصة سرية، بطاطس طازجة." },
        es: { name: "Hamburguesa Signature L'Atelier", desc: "Carne de vacuno Charolais, cheddar curado 18 meses, cebolla caramelizada, salsa secreta, patatas fritas." }
    }
};

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

// Success / Tracker Modal DOM
const successModal = document.getElementById('success-modal');
const successModalOverlay = document.getElementById('success-modal-overlay');
const successClientName = document.getElementById('success-client-name');
const successTableNum = document.getElementById('success-table-num');
const successOrderId = document.getElementById('success-order-id');

// Formatting price based on current currency
function formatPrice(euroAmount) {
    const curr = currencies[currentCurrency] || currencies.EUR;
    const converted = euroAmount * curr.rate;
    const formattedNum = converted.toFixed(2);
    return curr.position === 'before' ? `${curr.symbol} ${formattedNum}` : `${formattedNum} ${curr.symbol}`;
}

// Payment method switcher
function setPaymentMethod(method) {
    selectedPaymentMethod = method;
    const tabCard = document.getElementById('tab-pay-card');
    const tabCash = document.getElementById('tab-pay-cash');
    const cardView = document.getElementById('card-payment-view');
    const cashView = document.getElementById('cash-payment-view');
    const btnText = document.getElementById('confirm-payment-btn-text');
    const t = translations[currentLang] || translations.fr;

    if (method === 'especes') {
        if (tabCash) tabCash.classList.add('active');
        if (tabCard) tabCard.classList.remove('active');
        if (cashView) cashView.style.display = 'block';
        if (cardView) cardView.style.display = 'none';
        if (btnText) btnText.innerText = t.btn_confirm_cash;
    } else {
        if (tabCard) tabCard.classList.add('active');
        if (tabCash) tabCash.classList.remove('active');
        if (cardView) cardView.style.display = 'block';
        if (cashView) cashView.style.display = 'none';
        if (btnText) btnText.innerText = t.btn_confirm_payment;
    }
}

// Change Language
function changeLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('ciao_lang', lang);
    const langSelect = document.getElementById('lang-select');
    if (langSelect) langSelect.value = lang;

    if (lang === 'ar') {
        document.documentElement.setAttribute('dir', 'rtl');
        document.documentElement.setAttribute('lang', 'ar');
    } else {
        document.documentElement.setAttribute('dir', 'ltr');
        document.documentElement.setAttribute('lang', lang);
    }

    applyTranslations();
    renderMenu();
    updateCartUI();
    updateActiveOrderFloatingBar();
    setPaymentMethod(selectedPaymentMethod);
}

// Change Currency
function changeCurrency(curr) {
    currentCurrency = curr;
    localStorage.setItem('ciao_currency', curr);
    const currSelect = document.getElementById('currency-select');
    if (currSelect) currSelect.value = curr;

    renderMenu();
    updateCartUI();
}

// Apply static text translations
function applyTranslations() {
    const t = translations[currentLang] || translations.fr;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key]) {
            el.innerText = t[key];
        }
    });
}

// ==========================================
// CLIENT SESSION & 3-HOUR GUEST PERSISTENCE
// ==========================================

const GUEST_TTL_MS = 3 * 3600 * 1000; // 3 hours in milliseconds

function initClientSession() {
    const isAuth = sessionStorage.getItem('ciao_byebye_client_auth') === 'true';
    const authName = sessionStorage.getItem('ciao_byebye_client_name');
    
    if (isAuth && authName) {
        setClientIdentity(authName, true);
        dismissClientAuth();
    } else {
        const guestExpiresAt = parseInt(localStorage.getItem('ciao_guest_expires_at'), 10);
        const now = Date.now();

        if (guestExpiresAt && now < guestExpiresAt) {
            const savedGuestName = localStorage.getItem('ciao_guest_name') || 'Alex';
            setClientIdentity(savedGuestName, false, guestExpiresAt);
            dismissClientAuth();
        } else {
            if (guestExpiresAt && now >= guestExpiresAt) {
                localStorage.removeItem('ciao_guest_id');
                localStorage.removeItem('ciao_guest_name');
                localStorage.removeItem('ciao_guest_expires_at');
                localStorage.removeItem('ciao_active_order');
            }
            const newExpiry = now + GUEST_TTL_MS;
            const guestId = 'guest_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('ciao_guest_id', guestId);
            localStorage.setItem('ciao_guest_expires_at', newExpiry.toString());
            setClientIdentity('Alex', false, newExpiry);
        }
    }

    restoreActiveOrder();
}

function setClientIdentity(name, isAuthenticated, expiresAt) {
    if (clientNameInput) clientNameInput.value = name;
    
    const headerName = document.getElementById('header-user-name');
    if (headerName) headerName.innerText = name;

    const drawerName = document.getElementById('drawer-user-name');
    if (drawerName) drawerName.innerText = name;

    const statusBadge = document.getElementById('drawer-session-status');
    const timerLabel = document.getElementById('drawer-session-timer');
    const authBtn = document.getElementById('drawer-auth-btn');
    const logoutBtn = document.getElementById('drawer-logout-btn');

    if (isAuthenticated) {
        if (statusBadge) {
            statusBadge.innerText = 'Compte SSO Vérifié';
            statusBadge.className = 'session-badge-auth';
        }
        if (timerLabel) timerLabel.innerText = 'Session Permanente';
        if (authBtn) authBtn.style.display = 'none';
        if (logoutBtn) logoutBtn.style.display = 'block';
    } else {
        if (statusBadge) {
            statusBadge.innerText = 'Session Invité (3h)';
            statusBadge.className = 'session-badge-guest';
        }
        if (timerLabel && expiresAt) {
            const remainingMin = Math.max(0, Math.floor((expiresAt - Date.now()) / 60000));
            const hours = Math.floor(remainingMin / 60);
            const mins = remainingMin % 60;
            timerLabel.innerText = `Valide encore ${hours}h ${mins}min`;
        }
        if (authBtn) authBtn.style.display = 'block';
        if (logoutBtn) logoutBtn.style.display = 'none';
    }
}

// Drawer Toggle
function toggleAccountDrawer() {
    const drawer = document.getElementById('account-drawer');
    const overlay = document.getElementById('account-drawer-overlay');
    if (drawer && overlay) {
        drawer.classList.toggle('active');
        overlay.classList.toggle('active');
    }
}

function openClientAuthModal() {
    toggleAccountDrawer();
    const modal = document.getElementById('client-auth-overlay');
    if (modal) modal.classList.add('active');
}

function clearClientSession() {
    sessionStorage.removeItem('ciao_byebye_client_auth');
    sessionStorage.removeItem('ciao_byebye_client_name');
    localStorage.removeItem('ciao_guest_id');
    localStorage.removeItem('ciao_guest_name');
    localStorage.removeItem('ciao_guest_expires_at');
    localStorage.removeItem('ciao_active_order');
    activeOrder = null;
    updateActiveOrderFloatingBar();
    location.reload();
}

// ==========================================
// ACTIVE ORDER TRACKING & FLOATING WIDGET
// ==========================================

function saveActiveOrder(orderData) {
    activeOrder = {
        ...orderData,
        expiresAt: Date.now() + GUEST_TTL_MS
    };
    localStorage.setItem('ciao_active_order', JSON.stringify(activeOrder));
    updateActiveOrderFloatingBar();
}

function restoreActiveOrder() {
    const saved = localStorage.getItem('ciao_active_order');
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            if (parsed && Date.now() < (parsed.expiresAt || (Date.now() + 1000))) {
                activeOrder = parsed;
                updateActiveOrderFloatingBar();
                updateTrackerSteps(activeOrder.status);
            } else {
                localStorage.removeItem('ciao_active_order');
                activeOrder = null;
            }
        } catch (e) {
            console.error('Error restoring active order:', e);
        }
    }
}

function updateActiveOrderFloatingBar() {
    const bar = document.getElementById('active-order-floating-bar');
    const drawerOrderSection = document.getElementById('drawer-active-order-section');
    if (!bar) return;

    const t = translations[currentLang] || translations.fr;

    if (!activeOrder) {
        bar.classList.remove('active');
        if (drawerOrderSection) drawerOrderSection.style.display = 'none';
        return;
    }

    bar.classList.add('active');
    const orderIdShort = (activeOrder.orderId || '').substring(0, 8).toUpperCase();
    
    const barId = document.getElementById('tracker-bar-order-id');
    if (barId) barId.innerText = orderIdShort;

    const statusTextEl = document.getElementById('tracker-bar-status-text');
    const iconEl = document.getElementById('tracker-bar-icon');

    if (activeOrder.status === 'prete') {
        if (statusTextEl) statusTextEl.innerText = t.status_ready_bar;
        if (iconEl) {
            iconEl.innerHTML = '<i class="fa-solid fa-mug-hot"></i>';
            iconEl.className = 'tracker-live-pulse ready';
        }
    } else {
        const rawStatus = t.status_cooking_bar || "🔥 En cuisine (Table {table}) - File #{queue}";
        const formatted = rawStatus
            .replace('{table}', activeOrder.tableNumber || '05')
            .replace('{queue}', activeOrder.queuePos || 1);
        if (statusTextEl) statusTextEl.innerText = formatted;
        if (iconEl) {
            iconEl.innerHTML = '<i class="fa-solid fa-fire-burner"></i>';
            iconEl.className = 'tracker-live-pulse';
        }
    }

    // Update Drawer Active Order section
    if (drawerOrderSection) {
        drawerOrderSection.style.display = 'block';
        const dOrderId = document.getElementById('drawer-order-id');
        const dOrderTable = document.getElementById('drawer-order-table');
        const dOrderQueue = document.getElementById('drawer-order-queue');
        const dOrderStatus = document.getElementById('drawer-order-status');

        if (dOrderId) dOrderId.innerText = '#' + orderIdShort;
        if (dOrderTable) dOrderTable.innerText = activeOrder.tableNumber || '05';
        if (dOrderQueue) dOrderQueue.innerText = `#Q-${activeOrder.queuePos || 1}`;
        if (dOrderStatus) {
            if (activeOrder.status === 'prete') {
                dOrderStatus.innerText = t.step_ready;
                dOrderStatus.className = 'status-pill-ready';
            } else {
                dOrderStatus.innerText = t.step_kitchen;
                dOrderStatus.className = 'status-pill-cooking';
            }
        }
    }
}

function openActiveOrderModal() {
    if (!activeOrder) return;
    const t = translations[currentLang] || translations.fr;
    
    const drawer = document.getElementById('account-drawer');
    const drawerOverlay = document.getElementById('account-drawer-overlay');
    if (drawer) drawer.classList.remove('active');
    if (drawerOverlay) drawerOverlay.classList.remove('active');

    // Populate modal fields
    successClientName.innerText = activeOrder.clientName || 'Alex';
    successTableNum.innerText = activeOrder.tableNumber || '05';
    successOrderId.innerText = (activeOrder.orderId || '').substring(0, 8).toUpperCase();
    successOrderId.dataset.dbId = activeOrder.orderId;

    const queuePosEl = document.getElementById('success-queue-pos');
    if (queuePosEl) {
        queuePosEl.innerText = `#Q-${activeOrder.queuePos || 1}`;
    }

    // Payment Status Badge
    const payBadge = document.getElementById('success-payment-status-badge');
    if (payBadge) {
        if (activeOrder.paymentStatus === 'a_payer_en_caisse') {
            payBadge.innerText = t.payment_status_cash_pending;
            payBadge.className = 'cash-pending-tag';
        } else if (activeOrder.paymentStatus === 'paye' && activeOrder.paymentMethod === 'especes') {
            payBadge.innerText = t.payment_status_cash_paid;
            payBadge.className = 'paid-tag';
        } else {
            payBadge.innerText = t.payment_status_paid;
            payBadge.className = 'paid-tag';
        }
    }

    updateTrackerSteps(activeOrder.status);

    successModal.classList.add('active');
    successModalOverlay.classList.add('active');
}

function closeSuccessModal() {
    successModal.classList.remove('active');
    successModalOverlay.classList.remove('active');
    updateActiveOrderFloatingBar();
}

function updateTrackerSteps(status) {
    const stepPaid = document.getElementById('step-tracker-paid');
    const stepCooking = document.getElementById('step-tracker-cooking');
    const stepReady = document.getElementById('step-tracker-ready');

    if (stepPaid) stepPaid.classList.add('active');

    if (status === 'prete') {
        if (stepCooking) {
            stepCooking.classList.add('active');
            const bullet = stepCooking.querySelector('.step-bullet');
            if (bullet) bullet.classList.remove('progress-pulse');
        }
        if (stepReady) {
            stepReady.classList.add('active');
            const bullet = stepReady.querySelector('.step-bullet');
            if (bullet) bullet.classList.add('progress-pulse');
        }
    } else {
        if (stepCooking) {
            stepCooking.classList.add('active');
            const bullet = stepCooking.querySelector('.step-bullet');
            if (bullet) bullet.classList.add('progress-pulse');
        }
        if (stepReady) {
            stepReady.classList.remove('active');
            const bullet = stepReady.querySelector('.step-bullet');
            if (bullet) bullet.classList.remove('progress-pulse');
        }
    }
}

// ==========================================
// APPLICATION LIFECYCLE & MENU LOGIC
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    const langSelect = document.getElementById('lang-select');
    if (langSelect) langSelect.value = currentLang;
    const currSelect = document.getElementById('currency-select');
    if (currSelect) currSelect.value = currentCurrency;

    changeLanguage(currentLang);
    requestNotificationPermission();
    loadMenu();
    initClientSession();
});

async function loadMenu() {
    try {
        const response = await fetch('/api/menu');
        if (!response.ok) throw new Error('Erreur de chargement du menu');
        const data = await response.json();
        
        products = data.map(item => ({
            id: item.id,
            rawName: item.name,
            name: item.name,
            price: item.price_cents / 100,
            category: item.category,
            description: item.description,
            image: item.image_url || 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=400'
        }));
        
        renderMenu();
    } catch (error) {
        console.error('Erreur chargement menu depuis l\'API:', error);
        products = [
            { id: "p1", rawName: "Moscow Mule Premium", name: "Moscow Mule Premium", price: 12.50, category: "boisson", description: "Vodka artisanale, bière de gingembre bio, jus de citron vert frais, menthe fraîche.", image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=400" },
            { id: "p2", rawName: "IPA Locale \"La Barbaque\"", name: "IPA Locale \"La Barbaque\"", price: 7.50, category: "boisson", description: "Bière blonde IPA artisanale locale, notes intenses d'agrumes et amertume fraîche.", image: "https://images.unsplash.com/photo-1600718374662-0483d2b9da44?auto=format&fit=crop&q=80&w=400" },
            { id: "p3", rawName: "Planche de Charcuteries fines", name: "Planche de Charcuteries fines", price: 16.00, category: "entree", description: "Sélection de charcuteries ibériques, cornichons, pain au levain et beurre demi-sel.", image: "https://images.unsplash.com/photo-1541532713592-79a0317b6b77?auto=format&fit=crop&q=80&w=400" },
            { id: "p4", rawName: "Burger Signature L'Atelier", name: "Burger Signature L'Atelier", price: 18.50, category: "plat", description: "Bœuf charolais, cheddar affiné de 18 mois, oignons caramélisés, sauce secrète, frites fraîches.", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=400" }
        ];
        renderMenu();
    }
}

function getLocalizedProduct(product) {
    const raw = product.rawName || product.name;
    const trans = productTranslations[raw];
    if (trans && trans[currentLang]) {
        return {
            name: trans[currentLang].name,
            description: trans[currentLang].desc
        };
    }
    return {
        name: product.name,
        description: product.description
    };
}

function getCategoryLabel(category) {
    const t = translations[currentLang] || translations.fr;
    switch (category) {
        case 'boisson': return t.cat_boisson;
        case 'entree': return t.cat_entree;
        case 'plat': return t.cat_plat;
        case 'dessert': return t.cat_dessert;
        default: return category.charAt(0).toUpperCase() + category.slice(1);
    }
}

function requestNotificationPermission() {
    if ('Notification' in window) {
        if (Notification.permission === 'default') {
            Notification.requestPermission().catch(() => {});
        }
    }
}

function renderMenu() {
    const t = translations[currentLang] || translations.fr;
    const filteredProducts = products.filter(product => {
        return currentCategory === 'all' || product.category === currentCategory;
    });

    menuGrid.innerHTML = filteredProducts.map(product => {
        const cartItem = cart.find(item => item.id === product.id);
        const quantity = cartItem ? cartItem.quantity : 0;
        const localized = getLocalizedProduct(product);

        return `
            <div class="product-card glass" data-category="${product.category}">
                <div class="product-img-wrapper">
                    <img src="${product.image}" alt="${localized.name}" loading="lazy">
                    <span class="product-badge">${getCategoryLabel(product.category)}</span>
                </div>
                <div class="product-info">
                    <div class="product-title-row">
                        <h3>${localized.name}</h3>
                        <span class="product-price">${formatPrice(product.price)}</span>
                    </div>
                    <p class="product-description">${localized.description}</p>
                    <div class="product-footer">
                        ${quantity === 0 ? `
                            <button class="add-to-cart-btn" onclick="addToCart('${product.id}')">
                                <i class="fa-solid fa-plus"></i> ${t.btn_add}
                            </button>
                        ` : `
                            <div class="item-stepper">
                                <button class="stepper-btn" onclick="updateItemQuantity('${product.id}', -1)"><i class="fa-solid fa-minus"></i></button>
                                <span class="stepper-val">${quantity}</span>
                                <button class="stepper-btn" onclick="updateItemQuantity('${product.id}', 1)"><i class="fa-solid fa-plus"></i></button>
                            </div>
                        `}
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

document.querySelectorAll('.category-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
        const targetBtn = e.target.closest('.category-btn');
        targetBtn.classList.add('active');
        currentCategory = targetBtn.getAttribute('data-category');
        renderMenu();
    });
});

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.rawName || product.name,
            price: product.price,
            quantity: 1
        });
    }

    updateCartUI();
    renderMenu();
}

function updateItemQuantity(productId, delta) {
    const itemIndex = cart.findIndex(item => item.id === productId);
    if (itemIndex === -1) return;

    cart[itemIndex].quantity += delta;
    if (cart[itemIndex].quantity <= 0) {
        cart.splice(itemIndex, 1);
    }

    updateCartUI();
    renderMenu();
}

function updateCartUI() {
    const t = translations[currentLang] || translations.fr;
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    cartBadge.innerText = totalItems;
    cartBtnTotal.innerText = formatPrice(totalPrice);

    if (totalItems > 0) {
        cartFloatingBtn.classList.add('active');
    } else {
        cartFloatingBtn.classList.remove('active');
    }

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `<div class="empty-cart-message">${t.cart_empty}</div>`;
    } else {
        cartItemsContainer.innerHTML = cart.map(item => {
            const product = products.find(p => p.id === item.id) || item;
            const localized = getLocalizedProduct(product);
            return `
                <div class="cart-item">
                    <div class="cart-item-info">
                        <div class="cart-item-title">${localized.name}</div>
                        <div class="cart-item-unit-price">${formatPrice(item.price)} / u</div>
                    </div>
                    <div class="item-stepper">
                        <button class="stepper-btn" onclick="updateItemQuantity('${item.id}', -1)"><i class="fa-solid fa-minus"></i></button>
                        <span class="stepper-val">${item.quantity}</span>
                        <button class="stepper-btn" onclick="updateItemQuantity('${item.id}', 1)"><i class="fa-solid fa-plus"></i></button>
                    </div>
                    <div class="cart-item-total">${formatPrice(item.price * item.quantity)}</div>
                </div>
            `;
        }).join('');
    }

    summarySubtotal.innerText = formatPrice(totalPrice);
    summaryTotal.innerText = formatPrice(totalPrice);
}

function toggleCart() {
    cartPanel.classList.toggle('active');
    cartPanelOverlay.classList.toggle('active');
}

function proceedToPayment() {
    if (cart.length === 0) return;
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    paymentAmount.innerText = formatPrice(totalPrice);
    
    cartPanel.classList.remove('active');
    cartPanelOverlay.classList.remove('active');
    
    setTimeout(() => {
        paymentModal.classList.add('active');
        paymentModalOverlay.classList.add('active');
    }, 200);
}

function closePayment() {
    paymentModal.classList.remove('active');
    paymentModalOverlay.classList.remove('active');
}

async function simulatePaymentSuccess() {
    const t = translations[currentLang] || translations.fr;
    const confirmBtn = document.getElementById('confirm-payment-btn');
    confirmBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> ${t.btn_processing}`;
    confirmBtn.disabled = true;

    const clientName = clientNameInput.value.trim() || 'Alex';
    const tableNumber = document.getElementById('table-number').innerText;

    try {
        const response = await fetch('/api/orders/mock-create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                tableNumber,
                clientName,
                paymentMethod: selectedPaymentMethod,
                items: cart.map(item => ({
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity
                }))
            })
        });

        if (!response.ok) throw new Error('Erreur de création de la commande');
        const data = await response.json();
        
        closePayment();
        
        // Save active order with 3-hour persistence
        saveActiveOrder({
            orderId: data.orderId,
            tableNumber: tableNumber,
            clientName: clientName,
            queuePos: data.queuePos || 1,
            status: 'en_cuisine',
            paymentStatus: data.paymentStatus || (selectedPaymentMethod === 'especes' ? 'a_payer_en_caisse' : 'complete'),
            paymentMethod: selectedPaymentMethod,
            createdAt: Date.now()
        });

        openActiveOrderModal();
        
        cart.length = 0;
        updateCartUI();
        renderMenu();

    } catch (error) {
        console.error('Erreur lors de la création de la commande :', error);
        alert('Erreur lors de l\'envoi de la commande. Veuillez réessayer.');
    } finally {
        confirmBtn.innerHTML = `<i class="fa-solid fa-shield-halved"></i> <span id="confirm-payment-btn-text">${selectedPaymentMethod === 'especes' ? t.btn_confirm_cash : t.btn_confirm_payment}</span>`;
        confirmBtn.disabled = false;
    }
}

// WebSockets listener for real-time order status tracking
const socket = typeof io !== 'undefined' ? io() : null;

if (socket) {
    socket.on('order_status_updated', (data) => {
        if (activeOrder && (data.orderId === activeOrder.orderId)) {
            activeOrder.status = data.status;
            if (data.paymentStatus) activeOrder.paymentStatus = data.paymentStatus;
            saveActiveOrder(activeOrder);
            updateTrackerSteps(data.status);
            updateActiveOrderFloatingBar();

            const t = translations[currentLang] || translations.fr;
            if (data.status === 'prete') {
                if ('Notification' in window && Notification.permission === 'granted') {
                    new Notification(t.notif_ready_title, {
                        body: `${activeOrder.clientName}, ${t.notif_ready_body}`,
                        icon: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=100'
                    });
                }
            }
        }
    });

    socket.on('order_payment_confirmed', (data) => {
        if (activeOrder && (data.orderId === activeOrder.orderId)) {
            activeOrder.paymentStatus = 'paye';
            saveActiveOrder(activeOrder);
            const payBadge = document.getElementById('success-payment-status-badge');
            const t = translations[currentLang] || translations.fr;
            if (payBadge) {
                payBadge.innerText = t.payment_status_cash_paid;
                payBadge.className = 'paid-tag';
            }
            if ('Notification' in window && Notification.permission === 'granted') {
                new Notification(t.notif_cash_paid_title, {
                    body: t.notif_cash_paid_body,
                    icon: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=100'
                });
            }
        }
    });
}

// Client SSO simulation
function clientSSO(provider) {
    console.log(`Client authentifié via SSO ${provider}`);
    const mockNames = {
        'Google': 'Thomas',
        'Apple': 'Sarah'
    };
    const chosenName = mockNames[provider] || 'Alex';
    
    sessionStorage.setItem('ciao_byebye_client_auth', 'true');
    sessionStorage.setItem('ciao_byebye_client_name', chosenName);
    
    setClientIdentity(chosenName, true);
    dismissClientAuth();
}

function dismissClientAuth() {
    const authOverlay = document.getElementById('client-auth-overlay');
    if (authOverlay) {
        authOverlay.classList.remove('active');
    }
}
