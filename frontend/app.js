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
        notif_cash_paid_body: "Votre règlement en espèces a été validé en caisse. Bon appétit !",
        btn_customize: "Personnaliser",
        custom_modal_title: "Personnalisation du Plat",
        custom_ingredients_title: "Ingrédients de la Recette",
        custom_ingredients_subtitle: "Décochez pour retirer un ingrédient",
        custom_extras_title: "Suppléments & Extras",
        custom_extras_subtitle: "Ajoutez des suppléments gourmands",
        custom_cooking_title: "Cuisson de la Viande",
        custom_allergies_title: "Allergies & Intolérances",
        custom_seat_title: "Pour quel convive ? (Siège)",
        custom_notes_title: "Instructions Spéciales pour le Chef",
        btn_add_to_cart_custom: "Ajouter au Panier",
        btn_update_cart_custom: "Mettre à Jour l'Article",
        mod_sans: "Sans",
        mod_extra: "Extra",
        btn_edit: "Personnaliser / Modifier"
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
        notif_cash_paid_body: "Your cash payment has been verified at the cashier. Enjoy your meal!",
        btn_customize: "Customize",
        custom_modal_title: "Dish Customization",
        custom_ingredients_title: "Recipe Ingredients",
        custom_ingredients_subtitle: "Uncheck to remove an ingredient",
        custom_extras_title: "Extras & Add-ons",
        custom_extras_subtitle: "Add delicious extra toppings",
        custom_cooking_title: "Meat Cooking Preference",
        custom_allergies_title: "Allergies & Dietary Needs",
        custom_seat_title: "For which guest? (Seat)",
        custom_notes_title: "Special Kitchen Notes",
        btn_add_to_cart_custom: "Add to Cart",
        btn_update_cart_custom: "Update Item",
        mod_sans: "No",
        mod_extra: "Extra",
        btn_edit: "Customize / Edit"
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
        notif_cash_paid_body: "تم تسجيل استلام المبلغ نقداً في الصندوق بنجاح. شهية طيبة !",
        btn_customize: "تخصيص",
        custom_modal_title: "تخصيص الطبق",
        custom_ingredients_title: "مكونات الوصفة",
        custom_ingredients_subtitle: "قم بإلغاء التحديد لإزالة مكون",
        custom_extras_title: "إضافات ومكملات",
        custom_extras_subtitle: "أضف مكونات إضافية شهية",
        custom_cooking_title: "درجة استواء اللحم",
        custom_allergies_title: "الحساسية والملاحظات الغذائية",
        custom_seat_title: "رقم المقعد / الضيف",
        custom_notes_title: "تعليمات خاصة للمطبخ",
        btn_add_to_cart_custom: "إضافة إلى السلة",
        btn_update_cart_custom: "تحديث العنصر",
        mod_sans: "بدون",
        mod_extra: "إضافي",
        btn_edit: "تعديل التخصيص"
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
        notif_cash_paid_body: "Su pago en efectivo ha sido validado en caja. ¡Buen provecho!",
        btn_customize: "Personalizar",
        custom_modal_title: "Personalización del Plato",
        custom_ingredients_title: "Ingredientes de la Receta",
        custom_ingredients_subtitle: "Desmarque para quitar un ingrediente",
        custom_extras_title: "Suplementos y Extras",
        custom_extras_subtitle: "Añada extras deliciosos",
        custom_cooking_title: "Punto de Cocción de la Carne",
        custom_allergies_title: "Alergias e Intolerancias",
        custom_seat_title: "¿Para qué comensal? (Asiento)",
        custom_notes_title: "Instrucciones Especiales para Cocina",
        btn_add_to_cart_custom: "Añadir a la Cesta",
        btn_update_cart_custom: "Actualizar Artículo",
        mod_sans: "Sin",
        mod_extra: "Extra",
        btn_edit: "Personalizar / Modificar"
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
    localStorage.setItem('ciao_kds_lang', lang);
    
    const langSelect = document.getElementById('lang-select');
    if (langSelect) langSelect.value = lang;

    const modalLangSelect = document.getElementById('modal-lang-select');
    if (modalLangSelect) modalLangSelect.value = lang;

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

    if (status === 'servie') {
        if (stepCooking) {
            stepCooking.classList.add('active');
            const bullet = stepCooking.querySelector('.step-bullet');
            if (bullet) bullet.classList.remove('progress-pulse');
        }
        if (stepReady) {
            stepReady.classList.add('active');
            const bullet = stepReady.querySelector('.step-bullet');
            if (bullet) bullet.classList.remove('progress-pulse');
            const titleEl = stepReady.querySelector('.step-title');
            if (titleEl) titleEl.innerText = "✅ Commande Livrée";
            const subEl = stepReady.querySelector('.step-subtitle');
            if (subEl) subEl.innerText = "Bon appétit ! 🎉";
        }
    } else if (status === 'prete') {
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
// DYNAMIC THEME SYSTEM (DESIGN SYSTEM ENGINE)
// ==========================================
function applyActiveTheme(theme) {
    if (!theme) return;
    const root = document.documentElement;
    if (theme.primary_color) {
        root.style.setProperty('--primary', theme.primary_color);
        root.style.setProperty('--primary-color', theme.primary_color);
    }
    if (theme.primary_glow) {
        root.style.setProperty('--primary-glow', theme.primary_glow);
    }
    if (theme.accent_color) {
        root.style.setProperty('--accent', theme.accent_color);
    }
    if (theme.bg_dark) {
        root.style.setProperty('--bg-dark', theme.bg_dark);
    }
    if (theme.card_bg) {
        root.style.setProperty('--card-bg', theme.card_bg);
    }
    if (theme.font_family) {
        root.style.setProperty('--font-main', theme.font_family);
    }
    if (theme.brand_name) {
        const brandHeaders = document.querySelectorAll('.hero-title, .restaurant-info h1, #header-brand-title');
        brandHeaders.forEach(el => {
            if (el) el.innerText = theme.brand_name;
        });
    }
}

async function loadActiveTheme() {
    try {
        const res = await fetch('/api/theme/active');
        if (res.ok) {
            const data = await res.json();
            if (data.theme) applyActiveTheme(data.theme);
        }
    } catch (e) {}
}

// ==========================================
// APPLICATION LIFECYCLE & MENU LOGIC
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    const langSelect = document.getElementById('lang-select');
    if (langSelect) langSelect.value = currentLang;
    const currSelect = document.getElementById('currency-select');
    if (currSelect) currSelect.value = currentCurrency;

    // Détecter le numéro de table ou token QR depuis les paramètres URL (?table=05, ?t=5, ?token=token_table_05)
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const tableParam = urlParams.get('table') || urlParams.get('t');
        const tokenParam = urlParams.get('token');
        const tableNumEl = document.getElementById('table-number');

        if (tableParam && tableNumEl) {
            const cleanDigits = tableParam.replace(/[^0-9]/g, '');
            tableNumEl.innerText = cleanDigits ? (cleanDigits.length === 1 ? '0' + cleanDigits : cleanDigits) : tableParam;
        } else if (tokenParam && tableNumEl) {
            const tokenMatch = tokenParam.match(/token_table_(\w+)/);
            if (tokenMatch && tokenMatch[1]) {
                const tNum = tokenMatch[1];
                tableNumEl.innerText = tNum.length === 1 ? '0' + tNum : tNum;
            }
        }
    } catch (e) {
        console.error('Erreur lecture paramètres URL:', e);
    }

    changeLanguage(currentLang);
    loadActiveTheme();
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
            ingredients: item.ingredients || [],
            image: item.image_url || 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=400'
        }));
        
        renderMenu();
    } catch (error) {
        console.error('Erreur chargement menu depuis l\'API:', error);
        products = [
            { id: "p1", rawName: "Moscow Mule Premium", name: "Moscow Mule Premium", price: 12.50, category: "boisson", description: "Vodka artisanale, bière de gingembre bio, jus de citron vert frais, menthe fraîche.", image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=400", ingredients: [{ name: "Menthe fraîche", is_removable: true }, { name: "Jus de citron vert", is_removable: true }, { name: "Glaçons", is_removable: true }] },
            { id: "p2", rawName: "IPA Locale \"La Barbaque\"", name: "IPA Locale \"La Barbaque\"", price: 7.50, category: "boisson", description: "Bière blonde IPA artisanale locale, notes intenses d'agrumes et amertume fraîche.", image: "https://images.unsplash.com/photo-1600718374662-0483d2b9da44?auto=format&fit=crop&q=80&w=400", ingredients: [] },
            { id: "p3", rawName: "Planche de Charcuteries fines", name: "Planche de Charcuteries fines", price: 16.00, category: "entree", description: "Sélection de charcuteries ibériques, cornichons, pain au levain et beurre demi-sel.", image: "https://images.unsplash.com/photo-1541532713592-79a0317b6b77?auto=format&fit=crop&q=80&w=400", ingredients: [{ name: "Beurre demi-sel", is_removable: true }, { name: "Cornichons", is_removable: true }, { name: "Pain au levain", is_removable: true }] },
            { id: "p4", rawName: "Burger Signature L'Atelier", name: "Burger Signature L'Atelier", price: 18.50, category: "plat", description: "Bœuf charolais, cheddar affiné de 18 mois, oignons caramélisés, sauce secrète, frites fraîches.", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=400", ingredients: [{ name: "Oignons caramélisés", is_removable: true }, { name: "Cheddar affiné", is_removable: true }, { name: "Sauce secrète", is_removable: true }, { name: "Frites fraîches", is_removable: true }] }
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

// ========================================================
// DISH CUSTOMIZATION MODAL & MODIFIERS SYSTEM (CLIENT PWA)
// ========================================================

let activeCustomProduct = null;
let editingCartItemId = null;
let customRemovedIngredients = new Set();
let customSelectedExtras = [];
let customCookingPref = 'Saignant';
let customSelectedAllergies = new Set();
let customSeatNumber = 1;

const ALLERGENS_LIST = [
    'Gluten', 'Lactose', 'Arachides', 'Fruits à coque', 'Crustacés', 'Œufs', 'Soja', 'Moutarde', 'Sésame'
];

function getProductIngredients(product) {
    if (product.ingredients && Array.isArray(product.ingredients) && product.ingredients.length > 0) {
        return product.ingredients.map(ing => ({
            id: ing.id,
            name: ing.name,
            is_removable: ing.is_removable !== false,
            is_86: ing.is_86 === true
        }));
    }
    
    const pName = (product.rawName || product.name || '').toLowerCase();
    if (pName.includes('burger')) {
        return [
            { name: 'Oignons caramélisés', is_removable: true },
            { name: 'Cheddar affiné', is_removable: true },
            { name: 'Sauce secrète', is_removable: true },
            { name: 'Frites fraîches', is_removable: true },
            { name: 'Cornichons pickles', is_removable: true }
        ];
    } else if (pName.includes('mule') || pName.includes('cocktail')) {
        return [
            { name: 'Menthe fraîche', is_removable: true },
            { name: 'Jus de citron vert', is_removable: true },
            { name: 'Glaçons', is_removable: true }
        ];
    } else if (pName.includes('planche') || pName.includes('charcuterie')) {
        return [
            { name: 'Beurre demi-sel', is_removable: true },
            { name: 'Cornichons', is_removable: true },
            { name: 'Pain au levain', is_removable: true }
        ];
    } else if (product.category === 'plat') {
        return [
            { name: 'Sauce du chef', is_removable: true },
            { name: 'Garniture', is_removable: true }
        ];
    }
    return [];
}

function getProductAvailableExtras(product) {
    const pName = (product.rawName || product.name || '').toLowerCase();
    const cat = product.category;

    if (pName.includes('burger') || cat === 'plat') {
        return [
            { id: 'extra_cheddar', label: 'Cheddar Affiné 18 Mois', price: 1.50, icon: 'fa-cheese' },
            { id: 'extra_bacon', label: 'Bacon Grillé Croustillant', price: 2.00, icon: 'fa-bacon' },
            { id: 'extra_steak', label: 'Double Steak Charolais', price: 3.50, icon: 'fa-drumstick-bite' },
            { id: 'extra_sauce', label: 'Extra Sauce Maison', price: 0.80, icon: 'fa-bottle-droplet' },
            { id: 'extra_frites', label: 'Portion Frites Fraîches', price: 2.50, icon: 'fa-bowl-food' },
            { id: 'extra_avocat', label: 'Tranches d\'Avocat Frais', price: 1.80, icon: 'fa-leaf' }
        ];
    } else if (cat === 'boisson') {
        return [
            { id: 'extra_shot', label: 'Supplément Double Dose', price: 3.00, icon: 'fa-glass-whiskey' },
            { id: 'extra_citron', label: 'Extra Rondelle Citron Vert', price: 0.50, icon: 'fa-lemon' },
            { id: 'extra_menthe', label: 'Extra Menthe Fraîche', price: 0.50, icon: 'fa-seedling' },
            { id: 'extra_sirop', label: 'Trait de Sirop Gourmet', price: 0.80, icon: 'fa-cubes-stacked' }
        ];
    } else if (cat === 'entree') {
        return [
            { id: 'extra_pain', label: 'Corbeille Pain au Levain', price: 1.50, icon: 'fa-bread-slice' },
            { id: 'extra_beurre', label: 'Beurre Truffé Maison', price: 2.00, icon: 'fa-cube' },
            { id: 'extra_fromage', label: 'Portion Fromage Affiné', price: 3.00, icon: 'fa-cheese' }
        ];
    } else if (cat === 'dessert') {
        return [
            { id: 'extra_chantilly', label: 'Chantilly Maison Vanillée', price: 1.00, icon: 'fa-cloud' },
            { id: 'extra_coulis', label: 'Coulis Caramel Beurre Salé', price: 1.00, icon: 'fa-droplet' },
            { id: 'extra_glace', label: 'Boule de Glace Artisanale', price: 2.00, icon: 'fa-ice-cream' }
        ];
    }
    return [
        { id: 'extra_sauce', label: 'Sauce Supplémentaire', price: 0.80, icon: 'fa-bottle-droplet' },
        { id: 'extra_garniture', label: 'Extra Garniture', price: 2.00, icon: 'fa-utensils' }
    ];
}

function openCustomModal(productId, existingCartItemId = null) {
    const product = products.find(p => p.id === productId);
    if (!product || product.is_available === false) return;

    activeCustomProduct = product;
    editingCartItemId = existingCartItemId;
    customRemovedIngredients = new Set();
    customSelectedExtras = [];
    customSelectedAllergies = new Set();
    customCookingPref = (product.name.toLowerCase().includes('burger') || product.category === 'plat') ? 'Saignant' : null;
    customSeatNumber = 1;
    let specialNotes = '';

    if (existingCartItemId) {
        const existing = cart.find(c => c.cartItemId === existingCartItemId);
        if (existing) {
            customRemovedIngredients = new Set(existing.removedIngredients || []);
            customSelectedExtras = [...(existing.selectedExtras || [])];
            customCookingPref = existing.cooking_pref || customCookingPref;
            customSelectedAllergies = new Set(existing.allergies || []);
            customSeatNumber = existing.seat_number || 1;
            specialNotes = existing.specialNotes || '';
        }
    }

    const t = translations[currentLang] || translations.fr;
    const localized = getLocalizedProduct(product);

    const titleEl = document.getElementById('custom-dish-title');
    if (titleEl) titleEl.innerText = localized.name;
    const basePriceEl = document.getElementById('custom-dish-base-price');
    if (basePriceEl) basePriceEl.innerText = formatPrice(product.price);
    
    const confirmBtnText = document.getElementById('confirm-custom-btn-text');
    if (confirmBtnText) {
        confirmBtnText.innerText = existingCartItemId ? (t.btn_update_cart_custom || 'Mettre à Jour') : (t.btn_add_to_cart_custom || 'Ajouter au Panier');
    }

    // Ingrédients
    const ings = getProductIngredients(product);
    const ingsSec = document.getElementById('section-ingredients');
    const ingsList = document.getElementById('custom-ingredients-list');
    if (ingsSec && ingsList) {
        if (ings.length > 0) {
            ingsSec.style.display = 'block';
            ingsList.innerHTML = ings.map(ing => {
                const isRemoved = customRemovedIngredients.has(ing.name);
                return `
                    <div class="ingredient-toggle-item ${isRemoved ? 'removed' : ''}" onclick="toggleCustomIngredient('${ing.name.replace(/'/g, "\\'")}')">
                        <span class="ingredient-name">${ing.name}</span>
                        <span class="ingredient-status-tag ${isRemoved ? 'removed-tag' : 'included'}">
                            <i class="fa-solid ${isRemoved ? 'fa-xmark' : 'fa-check'}"></i> ${isRemoved ? (t.mod_sans || 'Sans') : 'Inclus'}
                        </span>
                    </div>
                `;
            }).join('');
        } else {
            ingsSec.style.display = 'none';
        }
    }

    // Extras
    const extras = getProductAvailableExtras(product);
    const extrasSec = document.getElementById('section-extras');
    const extrasList = document.getElementById('custom-extras-list');
    if (extrasSec && extrasList) {
        if (extras.length > 0) {
            extrasSec.style.display = 'block';
            extrasList.innerHTML = extras.map(ext => {
                const isSelected = customSelectedExtras.some(e => e.id === ext.id);
                return `
                    <div class="extra-option-item ${isSelected ? 'selected' : ''}" onclick="toggleCustomExtra('${ext.id}')">
                        <div class="extra-left">
                            <div class="extra-checkbox"><i class="fa-solid fa-check"></i></div>
                            <span class="extra-label"><i class="fa-solid ${ext.icon || 'fa-plus'}"></i> ${ext.label}</span>
                        </div>
                        <span class="extra-price-tag">+${formatPrice(ext.price)}</span>
                    </div>
                `;
            }).join('');
        } else {
            extrasSec.style.display = 'none';
        }
    }

    // Cuisson
    const cookingSec = document.getElementById('section-cooking');
    const isMeatOrBurger = product.name.toLowerCase().includes('burger') || (product.category === 'plat' && !product.name.toLowerCase().includes('poisson') && !product.name.toLowerCase().includes('salade'));
    if (cookingSec) {
        if (isMeatOrBurger) {
            cookingSec.style.display = 'block';
            updateCookingPillsUI();
        } else {
            cookingSec.style.display = 'none';
            customCookingPref = null;
        }
    }

    // Allergies
    const allergiesList = document.getElementById('custom-allergies-list');
    if (allergiesList) {
        allergiesList.innerHTML = ALLERGENS_LIST.map(alg => {
            const isActive = customSelectedAllergies.has(alg);
            return `
                <div class="allergy-chip ${isActive ? 'active' : ''}" onclick="toggleCustomAllergy('${alg}')">
                    <i class="fa-solid fa-triangle-exclamation"></i> ${alg}
                </div>
            `;
        }).join('');
    }

    updateSeatPillsUI();

    const notesInput = document.getElementById('custom-special-notes');
    if (notesInput) notesInput.value = specialNotes;

    updateCustomModalPrice();

    const modal = document.getElementById('custom-modal');
    const overlay = document.getElementById('custom-modal-overlay');
    if (modal && overlay) {
        modal.classList.add('active');
        overlay.classList.add('active');
    }
}

function closeCustomModal() {
    const modal = document.getElementById('custom-modal');
    const overlay = document.getElementById('custom-modal-overlay');
    if (modal && overlay) {
        modal.classList.remove('active');
        overlay.classList.remove('active');
    }
    activeCustomProduct = null;
    editingCartItemId = null;
}

function toggleCustomIngredient(name) {
    if (customRemovedIngredients.has(name)) {
        customRemovedIngredients.delete(name);
    } else {
        customRemovedIngredients.add(name);
    }
    if (activeCustomProduct) {
        const t = translations[currentLang] || translations.fr;
        const ings = getProductIngredients(activeCustomProduct);
        const ingsList = document.getElementById('custom-ingredients-list');
        if (ingsList) {
            ingsList.innerHTML = ings.map(ing => {
                const isRemoved = customRemovedIngredients.has(ing.name);
                return `
                    <div class="ingredient-toggle-item ${isRemoved ? 'removed' : ''}" onclick="toggleCustomIngredient('${ing.name.replace(/'/g, "\\'")}')">
                        <span class="ingredient-name">${ing.name}</span>
                        <span class="ingredient-status-tag ${isRemoved ? 'removed-tag' : 'included'}">
                            <i class="fa-solid ${isRemoved ? 'fa-xmark' : 'fa-check'}"></i> ${isRemoved ? (t.mod_sans || 'Sans') : 'Inclus'}
                        </span>
                    </div>
                `;
            }).join('');
        }
    }
    updateCustomModalPrice();
}

function toggleCustomExtra(extraId) {
    if (!activeCustomProduct) return;
    const available = getProductAvailableExtras(activeCustomProduct);
    const target = available.find(e => e.id === extraId);
    if (!target) return;

    const idx = customSelectedExtras.findIndex(e => e.id === extraId);
    if (idx !== -1) {
        customSelectedExtras.splice(idx, 1);
    } else {
        customSelectedExtras.push(target);
    }

    const extrasList = document.getElementById('custom-extras-list');
    if (extrasList) {
        extrasList.innerHTML = available.map(ext => {
            const isSelected = customSelectedExtras.some(e => e.id === ext.id);
            return `
                <div class="extra-option-item ${isSelected ? 'selected' : ''}" onclick="toggleCustomExtra('${ext.id}')">
                    <div class="extra-left">
                        <div class="extra-checkbox"><i class="fa-solid fa-check"></i></div>
                        <span class="extra-label"><i class="fa-solid ${ext.icon || 'fa-plus'}"></i> ${ext.label}</span>
                    </div>
                    <span class="extra-price-tag">+${formatPrice(ext.price)}</span>
                </div>
            `;
        }).join('');
    }
    updateCustomModalPrice();
}

function selectCooking(cooking) {
    customCookingPref = cooking;
    updateCookingPillsUI();
}

function updateCookingPillsUI() {
    document.querySelectorAll('#custom-cooking-options .cooking-btn').forEach(btn => {
        const c = btn.getAttribute('data-cook');
        if (c && c.toLowerCase() === (customCookingPref || '').toLowerCase()) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

function toggleCustomAllergy(allergy) {
    if (customSelectedAllergies.has(allergy)) {
        customSelectedAllergies.delete(allergy);
    } else {
        customSelectedAllergies.add(allergy);
    }
    const allergiesList = document.getElementById('custom-allergies-list');
    if (allergiesList) {
        allergiesList.innerHTML = ALLERGENS_LIST.map(alg => {
            const isActive = customSelectedAllergies.has(alg);
            return `
                <div class="allergy-chip ${isActive ? 'active' : ''}" onclick="toggleCustomAllergy('${alg}')">
                    <i class="fa-solid fa-triangle-exclamation"></i> ${alg}
                </div>
            `;
        }).join('');
    }
}

function selectCustomSeat(seatNum) {
    customSeatNumber = seatNum;
    updateSeatPillsUI();
}

function updateSeatPillsUI() {
    document.querySelectorAll('#custom-seat-selector .seat-pill').forEach((pill, idx) => {
        if (idx + 1 === customSeatNumber) {
            pill.classList.add('active');
        } else {
            pill.classList.remove('active');
        }
    });
}

function updateCustomModalPrice() {
    if (!activeCustomProduct) return;
    const basePrice = activeCustomProduct.price;
    const extrasTotal = customSelectedExtras.reduce((sum, e) => sum + e.price, 0);
    const unitPrice = basePrice + extrasTotal;
    const priceEl = document.getElementById('custom-modal-total-price');
    if (priceEl) priceEl.innerText = formatPrice(unitPrice);
}

function saveCustomizationToCart() {
    if (!activeCustomProduct) return;

    const basePrice = activeCustomProduct.price;
    const extrasTotal = customSelectedExtras.reduce((sum, e) => sum + e.price, 0);
    const unitPrice = basePrice + extrasTotal;

    const notesInput = document.getElementById('custom-special-notes');
    const specialNotes = notesInput ? notesInput.value.trim() : '';

    const modifiers = [];
    customRemovedIngredients.forEach(ing => {
        modifiers.push({ type: 'sans', label: ing });
    });
    customSelectedExtras.forEach(ext => {
        modifiers.push({ type: 'extra', label: ext.label, price: ext.price });
    });

    const allergies = Array.from(customSelectedAllergies);
    const removedIngredients = Array.from(customRemovedIngredients);
    const selectedExtras = [...customSelectedExtras];

    if (editingCartItemId) {
        const itemIdx = cart.findIndex(c => c.cartItemId === editingCartItemId);
        if (itemIdx !== -1) {
            cart[itemIdx] = {
                ...cart[itemIdx],
                price: unitPrice,
                modifiers,
                allergies,
                removedIngredients,
                selectedExtras,
                cooking_pref: customCookingPref,
                seat_number: customSeatNumber,
                specialNotes
            };
        }
    } else {
        const cartItemId = 'citem_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6);
        cart.push({
            cartItemId,
            id: activeCustomProduct.id,
            name: activeCustomProduct.rawName || activeCustomProduct.name,
            basePrice: activeCustomProduct.price,
            price: unitPrice,
            category: activeCustomProduct.category,
            quantity: 1,
            seat_number: customSeatNumber,
            cooking_pref: customCookingPref,
            modifiers,
            allergies,
            removedIngredients,
            selectedExtras,
            specialNotes
        });
    }

    closeCustomModal();
    updateCartUI();
    renderMenu();
}

function openEditCustomModal(cartItemId) {
    const item = cart.find(c => c.cartItemId === cartItemId);
    if (!item) return;
    openCustomModal(item.id, cartItemId);
}

function renderMenu() {
    const t = translations[currentLang] || translations.fr;
    const filteredProducts = products.filter(product => {
        return currentCategory === 'all' || product.category === currentCategory;
    });

    menuGrid.innerHTML = filteredProducts.map(product => {
        const cartItemsForProd = cart.filter(item => item.id === product.id);
        const quantity = cartItemsForProd.reduce((sum, item) => sum + item.quantity, 0);
        const localized = getLocalizedProduct(product);
        const isAvailable = product.is_available !== false;

        return `
            <div class="product-card glass ${!isAvailable ? 'out-of-stock' : ''}" data-category="${product.category}">
                <div class="product-img-wrapper" onclick="openCustomModal('${product.id}')" style="cursor:pointer;">
                    <img src="${product.image}" alt="${localized.name}" loading="lazy">
                    <span class="product-badge">${getCategoryLabel(product.category)}</span>
                    ${!isAvailable ? '<span style="position:absolute; top:10px; right:10px; background:#ef4444; color:#fff; font-size:10px; font-weight:800; padding:3px 8px; border-radius:4px;">ÉPUISÉ (86)</span>' : ''}
                </div>
                <div class="product-info">
                    <div class="product-title-row" onclick="openCustomModal('${product.id}')" style="cursor:pointer;">
                        <h3>${localized.name}</h3>
                        <span class="product-price">${formatPrice(product.price)}</span>
                    </div>
                    <p class="product-description">${localized.description}</p>
                    <div class="product-footer">
                        ${!isAvailable ? `
                            <button class="add-to-cart-btn" disabled style="background:rgba(255,255,255,0.1); color:var(--text-muted); cursor:not-allowed;">
                                <i class="fa-solid fa-ban"></i> Indisponible
                            </button>
                        ` : `
                            <div style="display:flex; gap:6px; width:100%; align-items:center;">
                                <button class="btn-customize-item" onclick="openCustomModal('${product.id}')" title="Personnaliser les ingrédients et options">
                                    <i class="fa-solid fa-sliders"></i> <span data-i18n="btn_customize">${t.btn_customize || 'Personnaliser'}</span>
                                </button>
                                <button class="add-to-cart-btn" onclick="addToCart('${product.id}')" style="flex:1;">
                                    <i class="fa-solid fa-plus"></i> ${quantity > 0 ? `Ajouter (${quantity})` : t.btn_add}
                                </button>
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
    if (!product || product.is_available === false) return;

    const ings = getProductIngredients(product);
    const isBurgerOrMeat = product.name.toLowerCase().includes('burger') || (product.category === 'plat' && !product.name.toLowerCase().includes('poisson'));
    
    // If dish has rich customizable options, open modal for full user experience
    if (ings.length > 0 || isBurgerOrMeat) {
        openCustomModal(productId);
        return;
    }

    const cartItemId = 'citem_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6);
    const existingItem = cart.find(item => item.id === productId && (!item.modifiers || item.modifiers.length === 0));
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            cartItemId,
            id: product.id,
            name: product.rawName || product.name,
            basePrice: product.price,
            price: product.price,
            category: product.category,
            seat_number: 1,
            cooking_pref: null,
            modifiers: [],
            allergies: [],
            quantity: 1
        });
    }

    updateCartUI();
    renderMenu();
}

function updateCartItemQty(cartItemId, delta) {
    const itemIndex = cart.findIndex(item => item.cartItemId === cartItemId || item.id === cartItemId);
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
            const hasMods = (item.modifiers && item.modifiers.length > 0) || item.cooking_pref || (item.allergies && item.allergies.length > 0) || item.specialNotes;

            return `
                <div class="cart-item">
                    <div class="cart-item-info" style="flex:1; padding-right:12px;">
                        <div style="display:flex; align-items:center; flex-wrap:wrap; gap:4px;">
                            <strong class="cart-item-title">${localized.name}</strong>
                            <span class="cart-seat-badge">🪑 S${item.seat_number || 1}</span>
                        </div>
                        <div class="cart-item-unit-price">${formatPrice(item.price)} / u</div>
                        
                        ${hasMods ? `
                            <div class="cart-item-mods">
                                ${item.cooking_pref ? `<span class="cart-mod-badge cook"><i class="fa-solid fa-fire"></i> ${item.cooking_pref}</span>` : ''}
                                ${(item.modifiers || []).map(m => {
                                    if (m.type === 'sans') return `<span class="cart-mod-badge sans">❌ Sans ${m.label}</span>`;
                                    if (m.type === 'extra') return `<span class="cart-mod-badge extra">➕ Extra ${m.label} (+${formatPrice(m.price || 0)})</span>`;
                                    return `<span class="cart-mod-badge">${m.label}</span>`;
                                }).join('')}
                                ${(item.allergies || []).map(a => `<span class="cart-mod-badge allergy">⚠️ ${a}</span>`).join('')}
                                ${item.specialNotes ? `<span class="cart-mod-badge note">📝 ${item.specialNotes}</span>` : ''}
                            </div>
                        ` : ''}

                        <button class="cart-edit-btn" onclick="openEditCustomModal('${item.cartItemId || item.id}')">
                            <i class="fa-solid fa-sliders"></i> ${t.btn_edit || 'Personnaliser / Modifier'}
                        </button>
                    </div>
                    <div class="item-stepper">
                        <button class="stepper-btn" onclick="updateCartItemQty('${item.cartItemId || item.id}', -1)"><i class="fa-solid fa-minus"></i></button>
                        <span class="stepper-val">${item.quantity}</span>
                        <button class="stepper-btn" onclick="updateCartItemQty('${item.cartItemId || item.id}', 1)"><i class="fa-solid fa-plus"></i></button>
                    </div>
                    <div class="cart-item-total" style="min-width:65px; text-align:right;">${formatPrice(item.price * item.quantity)}</div>
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
    if (confirmBtn) {
        confirmBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> ${t.btn_processing || 'Traitement...'}`;
        confirmBtn.disabled = true;
    }

    if (!cart || cart.length === 0) {
        alert(t.cart_empty || 'Votre panier est vide.');
        if (confirmBtn) {
            confirmBtn.innerHTML = `<i class="fa-solid fa-shield-halved"></i> <span id="confirm-payment-btn-text">${selectedPaymentMethod === 'especes' ? t.btn_confirm_cash : t.btn_confirm_payment}</span>`;
            confirmBtn.disabled = false;
        }
        return;
    }

    const clientName = (clientNameInput && clientNameInput.value ? clientNameInput.value.trim() : '') || 'Alex';
    const tableNumEl = document.getElementById('table-number');
    const tableNumber = tableNumEl ? tableNumEl.innerText.trim() : '05';

    try {
        const response = await fetch('/api/orders/mock-create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                tableNumber,
                clientName,
                paymentMethod: selectedPaymentMethod,
                items: cart.map(item => ({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                    category: item.category,
                    seat_number: item.seat_number || 1,
                    modifiers: item.modifiers || [],
                    allergies: item.allergies || [],
                    cooking_pref: item.cooking_pref || null,
                    customization_notes: item.specialNotes || null
                }))
            })
        });

        if (!response.ok) {
            const errData = await response.json().catch(() => ({}));
            throw new Error(errData.error || `Erreur serveur (${response.status})`);
        }
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
        alert(error.message && error.message !== 'Failed to fetch' ? error.message : 'Erreur lors de l\'envoi de la commande. Veuillez réessayer.');
    } finally {
        if (confirmBtn) {
            confirmBtn.innerHTML = `<i class="fa-solid fa-shield-halved"></i> <span id="confirm-payment-btn-text">${selectedPaymentMethod === 'especes' ? t.btn_confirm_cash : t.btn_confirm_payment}</span>`;
            confirmBtn.disabled = false;
        }
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

    socket.on('theme_updated', (theme) => {
        applyActiveTheme(theme);
    });

    socket.on('menu_updated', () => {
        loadMenu();
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
