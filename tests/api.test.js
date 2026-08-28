const { test, describe, before, after } = require('node:test');
const assert = require('node:assert');
const { spawn } = require('child_process');
const path = require('path');

const BASE_URL = 'http://127.0.0.1:5000';

describe('Ciao Byebye - API & Backend Functional Test Suite', () => {
    let serverProcess = null;
    let testOrderId = null;
    let testProductId = null;
    let testCashOrderId = null;

    before(async () => {
        // Check if server is already running
        try {
            const check = await fetch(`${BASE_URL}/api/menu`);
            if (check.ok) return;
        } catch (e) {
            // Start server
        }

        serverProcess = spawn('node', [path.join(__dirname, '../backend/server.js')], {
            env: { ...process.env, PORT: '5000' },
            stdio: 'pipe'
        });

        // Wait for server to be ready
        for (let i = 0; i < 30; i++) {
            await new Promise(r => setTimeout(r, 400));
            try {
                const res = await fetch(`${BASE_URL}/api/menu`);
                if (res.ok) break;
            } catch (err) {}
        }
    });

    after(async () => {
        if (serverProcess) {
            serverProcess.kill('SIGTERM');
        }
    });

    test('1. GET /api/menu - should return available products from database', async () => {
        const res = await fetch(`${BASE_URL}/api/menu`);
        assert.strictEqual(res.status, 200);
        const data = await res.json();
        assert.ok(Array.isArray(data));
        assert.ok(data.length > 0);
        assert.ok(data[0].id);
        assert.ok(data[0].name);
        assert.ok(data[0].price_cents > 0);
        testProductId = data[0].id;
    });

    test('2. GET /api/menu/all - should return full menu for kitchen management', async () => {
        const res = await fetch(`${BASE_URL}/api/menu/all`);
        assert.strictEqual(res.status, 200);
        const data = await res.json();
        assert.ok(Array.isArray(data));
        assert.ok(data.some(p => p.id === testProductId));
    });

    test('3. PATCH /api/menu/:id/availability - should toggle product availability', async () => {
        const res = await fetch(`${BASE_URL}/api/menu/${testProductId}/availability`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ is_available: true })
        });
        assert.strictEqual(res.status, 200);
        const data = await res.json();
        assert.strictEqual(data.success, true);
        assert.strictEqual(data.product.is_available, true);
    });

    test('4. GET /api/staff - should return staff waiters for table assignment', async () => {
        const res = await fetch(`${BASE_URL}/api/staff`);
        assert.strictEqual(res.status, 200);
        const data = await res.json();
        assert.ok(Array.isArray(data));
        assert.ok(data.some(s => s.role === 'serveur'));
    });

    test('5. POST /api/staff/assign-tables - should update assigned tables for server', async () => {
        const res = await fetch(`${BASE_URL}/api/staff/assign-tables`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: 'david@atelier-chris.fr',
                tables: ['05', '08', '12']
            })
        });
        assert.strictEqual(res.status, 200);
        const data = await res.json();
        assert.strictEqual(data.success, true);
    });

    test('6. POST /api/orders/mock-create - should create a table order with items and queue position', async () => {
        const res = await fetch(`${BASE_URL}/api/orders/mock-create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                tableNumber: '05',
                clientName: 'QA Tester Alex',
                items: [
                    { name: 'Moscow Mule Premium', price: 12.50, quantity: 2 },
                    { name: "Burger Signature L'Atelier", price: 18.50, quantity: 1 }
                ]
            })
        });
        assert.strictEqual(res.status, 200);
        const data = await res.json();
        assert.strictEqual(data.success, true);
        assert.ok(data.orderId);
        assert.ok(data.queuePos >= 1);
        testOrderId = data.orderId;
    });

    test('7. GET /api/orders - should list orders for Kitchen role', async () => {
        const res = await fetch(`${BASE_URL}/api/orders?email=chef@atelier-chris.fr`);
        assert.strictEqual(res.status, 200);
        const data = await res.json();
        assert.ok(Array.isArray(data));
        assert.ok(data.some(o => o.id === testOrderId));
    });

    test('8. GET /api/orders - should filter orders for assigned server tables', async () => {
        const res = await fetch(`${BASE_URL}/api/orders?email=david@atelier-chris.fr`);
        assert.strictEqual(res.status, 200);
        const data = await res.json();
        assert.ok(Array.isArray(data));
        // Table 05 is in David's assigned tables ['05', '08', '12']
        assert.ok(data.some(o => o.table_number === '05'));
    });

    test('9. PATCH /api/orders/:id/status - should advance order status to prete', async () => {
        const res = await fetch(`${BASE_URL}/api/orders/${testOrderId}/status`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: 'prete' })
        });
        assert.strictEqual(res.status, 200);
        const data = await res.json();
        assert.strictEqual(data.success, true);
        assert.strictEqual(data.status, 'prete');
    });

    test('10. GET /api/tables/:qr_token/display - should return table display details', async () => {
        const res = await fetch(`${BASE_URL}/api/tables/token_table_05/display`);
        assert.strictEqual(res.status, 200);
        const data = await res.json();
        assert.strictEqual(data.tableNumber, '05');
        assert.strictEqual(data.activeSession, true);
        assert.ok(Array.isArray(data.orders));
    });

    test('11. GET /api/auth/sso/callback - should handle SSO login redirect for staff', async () => {
        const res = await fetch(`${BASE_URL}/api/auth/sso/callback?provider=google&email=chef@atelier-chris.fr`);
        assert.strictEqual(res.status, 200);
        const html = await res.text();
        assert.ok(html.includes("sessionStorage.setItem('ciao_byebye_auth', 'true')"));
        assert.ok(html.includes("chef@atelier-chris.fr"));
    });

    test('12. POST /api/orders/mock-create (especes) - should create order with a_payer_en_caisse status', async () => {
        const res = await fetch(`${BASE_URL}/api/orders/mock-create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                tableNumber: '05',
                clientName: 'Client Espèces',
                paymentMethod: 'especes',
                items: [
                    { name: 'Moscow Mule Premium', price: 12.50, quantity: 1 }
                ]
            })
        });
        assert.strictEqual(res.status, 200);
        const data = await res.json();
        assert.strictEqual(data.success, true);
        assert.strictEqual(data.paymentStatus, 'a_payer_en_caisse');
        assert.strictEqual(data.paymentMethod, 'especes');
        testCashOrderId = data.orderId;
    });

    test('13. PATCH /api/orders/:id/cash-payment - should validate cash collection at register', async () => {
        const res = await fetch(`${BASE_URL}/api/orders/${testCashOrderId}/cash-payment`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' }
        });
        assert.strictEqual(res.status, 200);
        const data = await res.json();
        assert.strictEqual(data.success, true);
        assert.strictEqual(data.paymentStatus, 'paye');
    });

    test('14. POST /api/tables/:number/call-waiter - should emit waiter call alert', async () => {
        const res = await fetch(`${BASE_URL}/api/tables/05/call-waiter`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ reason: 'Addition / Espèces' })
        });
        assert.strictEqual(res.status, 200);
        const data = await res.json();
        assert.strictEqual(data.success, true);
    });

    let testCreatedDishId = null;
    test('15. POST /api/menu - should manually create a new dish (Naga design style)', async () => {
        const res = await fetch(`${BASE_URL}/api/menu`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: 'Test Lok-Lak Spécial Bœuf Wok',
                category: 'plat',
                price: 15.50,
                description: 'Bœuf tendre mariné et sauté au wok à feu vif avec riz jasmin.',
                image_url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600',
                is_available: true
            })
        });
        assert.strictEqual(res.status, 201);
        const data = await res.json();
        assert.strictEqual(data.success, true);
        assert.strictEqual(data.product.name, 'Test Lok-Lak Spécial Bœuf Wok');
        assert.strictEqual(data.product.price_cents, 1550);
        assert.strictEqual(data.product.category, 'plat');
        testCreatedDishId = data.product.id;
    });

    test('16. POST /api/menu/scan-photo - should extract and structure menu items from image/preset', async () => {
        const res = await fetch(`${BASE_URL}/api/menu/scan-photo`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                custom_text: "Entrées\nNems Maison - 7.50€ - Porc et crevettes\nPlats\nLok-Lak Poulet Crispy - 13.50€ - Poulet croustillant mariné"
            })
        });
        assert.strictEqual(res.status, 200);
        const data = await res.json();
        assert.strictEqual(data.success, true);
        assert.ok(Array.isArray(data.detected_items));
        assert.strictEqual(data.detected_items.length, 2);
        assert.strictEqual(data.detected_items[0].name, 'Nems Maison');
        assert.strictEqual(data.detected_items[0].category, 'entree');
        assert.strictEqual(data.detected_items[0].price_cents, 750);
    });

    test('17. POST /api/menu/bulk - should bulk insert scanned items into database', async () => {
        const res = await fetch(`${BASE_URL}/api/menu/bulk`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                products: [
                    {
                        name: 'Naga Lot-Tcha Nouilles Test',
                        description: 'Nouilles cambodgiennes artisanales',
                        price_cents: 1400,
                        category: 'plat',
                        image_url: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=600'
                    },
                    {
                        name: 'Naga Teuk-a-Lok Mangue Test',
                        description: 'Dessert à boire à la mangue et lait de coco',
                        price_cents: 590,
                        category: 'dessert',
                        image_url: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&q=80&w=600'
                    }
                ]
            })
        });
        assert.strictEqual(res.status, 200);
        const data = await res.json();
        assert.strictEqual(data.success, true);
        assert.strictEqual(data.count, 2);
    });

    test('18. PUT /api/menu/:id & DELETE /api/menu/:id - should update and delete created dish', async () => {
        assert.ok(testCreatedDishId, 'Dish ID should be present from test 15');

        // Update
        const putRes = await fetch(`${BASE_URL}/api/menu/${testCreatedDishId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                price: 16.00,
                description: 'Description mise à jour.'
            })
        });
        assert.strictEqual(putRes.status, 200);
        const putData = await putRes.json();
        assert.strictEqual(putData.product.price_cents, 1600);

        // Delete
        const delRes = await fetch(`${BASE_URL}/api/menu/${testCreatedDishId}`, { method: 'DELETE' });
        assert.strictEqual(delRes.status, 200);
        const delData = await delRes.json();
        assert.strictEqual(delData.success, true);
    });

    test('19. POST /api/menu/scrape-url - should scrape and extract both Menu items and Design System from URL', async () => {
        const res = await fetch(`${BASE_URL}/api/menu/scrape-url`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                url: 'https://naga-streetfood.dishop.co/'
            })
        });
        assert.strictEqual(res.status, 200);
        const data = await res.json();
        assert.strictEqual(data.success, true);
        assert.ok(data.design_system, 'Extracted response should contain design_system object');
        assert.strictEqual(data.design_system.brand_name, 'Nâga Street Food');
        assert.strictEqual(data.design_system.primary_color, '#ff5e14');
        assert.ok(data.design_system.font_family);
        assert.ok(data.design_system.card_bg);
        assert.ok(Array.isArray(data.menu_items));
        assert.ok(data.menu_items.length >= 8);
        assert.ok(data.menu_items.some(item => item.name.includes('Lok-Lak')));
        assert.ok(data.menu_items.some(item => item.name.includes('Lot-Tcha')));
    });

    test('20. POST /api/theme/apply & GET /api/theme/active - should apply and retrieve active restaurant theme', async () => {
        const applyRes = await fetch(`${BASE_URL}/api/theme/apply`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                theme: {
                    brand_name: 'Nâga Street Food',
                    primary_color: '#ff5e14',
                    accent_color: '#f59e0b'
                }
            })
        });
        assert.strictEqual(applyRes.status, 200);
        const applyData = await applyRes.json();
        assert.strictEqual(applyData.success, true);
        assert.strictEqual(applyData.theme.brand_name, 'Nâga Street Food');
        assert.strictEqual(applyData.theme.primary_color, '#ff5e14');

        const activeRes = await fetch(`${BASE_URL}/api/theme/active`);
        assert.strictEqual(activeRes.status, 200);
        const activeData = await activeRes.json();
        assert.strictEqual(activeData.theme.brand_name, 'Nâga Street Food');
        assert.strictEqual(activeData.theme.primary_color, '#ff5e14');
    });

    test('21. GET /api/tables/layout & POST /api/tables/layout - should manage 2D Floor Plan tables', async () => {
        const layoutRes = await fetch(`${BASE_URL}/api/tables/layout`);
        assert.strictEqual(layoutRes.status, 200);
        const tables = await layoutRes.json();
        assert.ok(Array.isArray(tables));
        assert.ok(tables.length >= 5);
        assert.ok(tables.some(t => t.zone === 'salle'));

        // Créer une nouvelle table
        const createRes = await fetch(`${BASE_URL}/api/tables/layout`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                number: '99',
                name: 'Table VIP Test',
                zone: 'terrasse',
                shape: 'round',
                min_covers: 2,
                max_covers: 6,
                nominal_covers: 4,
                pos_x: 250,
                pos_y: 250
            })
        });
        assert.strictEqual(createRes.status, 200);
        const created = await createRes.json();
        assert.strictEqual(created.success, true);
        assert.strictEqual(created.table.number, '99');
        assert.strictEqual(created.table.shape, 'round');
    });

    test('22. PATCH /api/tables/:id/service - should update table service, covers and cleaning status', async () => {
        const layoutRes = await fetch(`${BASE_URL}/api/tables/layout`);
        const tables = await layoutRes.json();
        const targetTable = tables.find(t => t.number === '01') || tables[0];

        const patchRes = await fetch(`${BASE_URL}/api/tables/${targetTable.id}/service`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                service_status: 'en_preparation',
                actual_covers: 3,
                cleaning_status: 'propre'
            })
        });
        assert.strictEqual(patchRes.status, 200);
        const patchData = await patchRes.json();
        assert.strictEqual(patchData.success, true);
        assert.strictEqual(patchData.table.service_status, 'en_preparation');
        assert.strictEqual(patchData.table.actual_covers, 3);
    });

    test('23. POST /api/tables/merge & POST /api/tables/split - should join and split tables', async () => {
        const layoutRes = await fetch(`${BASE_URL}/api/tables/layout`);
        const tables = await layoutRes.json();
        const t1 = tables[0];
        const t2 = tables[1];

        // Fusionner t1 et t2
        const mergeRes = await fetch(`${BASE_URL}/api/tables/merge`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                parentTableId: t1.id,
                childTableIds: [t2.id]
            })
        });
        assert.strictEqual(mergeRes.status, 200);
        const mergeData = await mergeRes.json();
        assert.strictEqual(mergeData.success, true);

        // Dissocier
        const splitRes = await fetch(`${BASE_URL}/api/tables/split`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                parentTableId: t1.id
            })
        });
        assert.strictEqual(splitRes.status, 200);
        const splitData = await splitRes.json();
        assert.strictEqual(splitData.success, true);
    });

    test('24. GET /api/inventory/ingredients & PATCH /api/inventory/ingredients/:id/stock - should manage ingredient stocks & 86 mode', async () => {
        const ingRes = await fetch(`${BASE_URL}/api/inventory/ingredients`);
        assert.strictEqual(ingRes.status, 200);
        const ingredients = await ingRes.json();
        assert.ok(Array.isArray(ingredients));
        assert.ok(ingredients.length >= 10);

        const targetIng = ingredients[0];
        const patchRes = await fetch(`${BASE_URL}/api/inventory/ingredients/${targetIng.id}/stock`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                current_stock: 45.5,
                is_86: false
            })
        });
        assert.strictEqual(patchRes.status, 200);
        const patchData = await patchRes.json();
        assert.strictEqual(patchData.success, true);
        assert.strictEqual(parseFloat(patchData.ingredient.current_stock), 45.5);
    });

    test('25. GET /api/inventory/recipes - should return Bill of Materials (BOM) for products', async () => {
        const recRes = await fetch(`${BASE_URL}/api/inventory/recipes`);
        assert.strictEqual(recRes.status, 200);
        const recipes = await recRes.json();
        assert.ok(Array.isArray(recipes));
        assert.ok(recipes.length > 0);
        const burgerRecipe = recipes.find(r => r.product_name.includes('Burger') || r.bom.length > 0);
        assert.ok(burgerRecipe);
        assert.ok(Array.isArray(burgerRecipe.bom));
    });

    test('26. POST /api/inventory/waste & GET /api/inventory/logs - should track kitchen waste and consumption logs', async () => {
        const ingRes = await fetch(`${BASE_URL}/api/inventory/ingredients`);
        const ingredients = await ingRes.json();
        const targetIng = ingredients[0];

        const wasteRes = await fetch(`${BASE_URL}/api/inventory/waste`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ingredient_id: targetIng.id,
                quantity: 2.0,
                reason: 'waste_error',
                notes: 'Erreur cuisson steak haché',
                staff_email: 'chef@atelier-chris.fr'
            })
        });
        assert.strictEqual(wasteRes.status, 200);
        const wasteData = await wasteRes.json();
        assert.strictEqual(wasteData.success, true);

        const logsRes = await fetch(`${BASE_URL}/api/inventory/logs`);
        assert.strictEqual(logsRes.status, 200);
        const logs = await logsRes.json();
        assert.ok(Array.isArray(logs));
        assert.ok(logs.some(l => l.reason === 'waste_error'));
    });

    test('27. GET /api/modules & POST /api/modules/toggle & POST /api/modules/preset - should manage subscription features', async () => {
        const modRes = await fetch(`${BASE_URL}/api/modules`);
        assert.strictEqual(modRes.status, 200);
        const modules = await modRes.json();
        assert.ok(Array.isArray(modules));
        assert.ok(modules.length >= 6);

        // Tester le toggle unitaire
        const targetMod = modules[0];
        const toggleRes = await fetch(`${BASE_URL}/api/modules/toggle`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                moduleId: targetMod.id,
                isEnabled: true
            })
        });
        assert.strictEqual(toggleRes.status, 200);
        const toggleData = await toggleRes.json();
        assert.strictEqual(toggleData.success, true);
        assert.strictEqual(toggleData.module.is_enabled, true);

        // Tester l'application de la formule Essentiel
        const essentielRes = await fetch(`${BASE_URL}/api/modules/preset`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ tier: 'essentiel' })
        });
        assert.strictEqual(essentielRes.status, 200);
        const essentielData = await essentielRes.json();
        assert.strictEqual(essentielData.success, true);
        assert.ok(essentielData.modules.some(m => m.tier === 'essentiel' && m.is_enabled));

        // Tester l'application de la formule Pro & Chaînes
        const presetRes = await fetch(`${BASE_URL}/api/modules/preset`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ tier: 'multi_sites' })
        });
        assert.strictEqual(presetRes.status, 200);
        const presetData = await presetRes.json();
        assert.strictEqual(presetData.success, true);
        assert.ok(presetData.modules.every(m => m.is_enabled === true));

        // Tester l'application d'une verticale métier (Café / Bar)
        const vertRes = await fetch(`${BASE_URL}/api/modules/vertical`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ vertical: 'cafe_bar' })
        });
        assert.strictEqual(vertRes.status, 200);
        const vertData = await vertRes.json();
        assert.strictEqual(vertData.success, true);
        assert.strictEqual(vertData.vertical, 'cafe_bar');
    });

    test('28. POST /api/orders/mock-create with seats, allergies, modifiers & course suites', async () => {
        const createRes = await fetch(`${BASE_URL}/api/orders/mock-create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                tableNumber: '02',
                clientName: 'Gourmet Jean-Luc',
                items: [
                    {
                        name: 'Moscow Mule Premium',
                        price: 12.50,
                        quantity: 1,
                        seat_number: 1,
                        station: 'bar',
                        course_step: 'boisson',
                        course_status: 'fire'
                    },
                    {
                        name: "Burger Signature L'Atelier",
                        price: 18.50,
                        quantity: 1,
                        seat_number: 2,
                        station: 'chaud',
                        course_step: 'plat',
                        course_status: 'hold',
                        cooking_pref: 'saignant',
                        allergies: ['gluten', 'arachides'],
                        modifiers: [
                            { type: 'sans', label: 'Oignons' },
                            { type: 'extra', label: 'Cheddar' }
                        ]
                    }
                ]
            })
        });
        assert.strictEqual(createRes.status, 200);
        const data = await createRes.json();
        assert.strictEqual(data.success, true);
        assert.ok(data.orderId);

        // Vérifier dans GET /api/orders
        const ordersRes = await fetch(`${BASE_URL}/api/orders`);
        const orders = await ordersRes.json();
        const createdOrder = orders.find(o => o.id === data.orderId);
        assert.ok(createdOrder);
        assert.strictEqual(createdOrder.items.length, 2);

        const burgerItem = createdOrder.items.find(it => it.name.includes('Burger'));
        assert.ok(burgerItem);
        assert.strictEqual(burgerItem.seat_number, 2);
        assert.strictEqual(burgerItem.course_status, 'hold');
        assert.ok(Array.isArray(burgerItem.allergies));
        assert.ok(burgerItem.allergies.includes('gluten'));

        // Test 29: Course status update (Fire suite) & Allergy acknowledgment
        const fireRes = await fetch(`${BASE_URL}/api/orders/items/${burgerItem.id}/course-status`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ course_status: 'fire' })
        });
        if (fireRes.status !== 200) {
            const errBody = await fireRes.text();
            console.error('FIRE RES ERROR:', fireRes.status, errBody, 'burgerItem:', burgerItem);
        }
        assert.strictEqual(fireRes.status, 200);
        const fireData = await fireRes.json();
        assert.strictEqual(fireData.success, true);
        assert.strictEqual(fireData.item.course_status, 'fire');

        const ackRes = await fetch(`${BASE_URL}/api/orders/items/${burgerItem.id}/acknowledge-allergy`, {
            method: 'PATCH'
        });
        assert.strictEqual(ackRes.status, 200);
        const ackData = await ackRes.json();
        assert.strictEqual(ackData.success, true);
        assert.strictEqual(ackData.item.allergy_acknowledged, true);

        // Test 30: KDS station bump
        const bumpRes = await fetch(`${BASE_URL}/api/orders/${createdOrder.id}/bump`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ station: 'chaud', staffEmail: 'chef@atelier-chris.fr' })
        });
        assert.strictEqual(bumpRes.status, 200);
        const bumpData = await bumpRes.json();
        assert.strictEqual(bumpData.success, true);
    });

    test('29. GET & POST /api/admin/deployments - should manage client tenant infrastructures', async () => {
        // Liste des déploiements
        const listRes = await fetch(`${BASE_URL}/api/admin/deployments`);
        assert.strictEqual(listRes.status, 200);
        const deployments = await listRes.json();
        assert.ok(Array.isArray(deployments));
        assert.ok(deployments.length > 0);

        // Création d'un nouveau déploiement
        const sub = `test-dep-${Date.now()}`;
        const createRes = await fetch(`${BASE_URL}/api/admin/deployments`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                restaurant_name: 'Brasserie Test Automate',
                subdomain: sub,
                plan_tier: 'pro',
                vertical_preset: 'bistro',
                subscription_status: 'trial',
                monthly_fee_cents: 12900,
                contact_email: 'test@ciao-byebye.fr'
            })
        });
        assert.strictEqual(createRes.status, 201);
        const createData = await createRes.json();
        assert.strictEqual(createData.success, true);
        assert.strictEqual(createData.deployment.subdomain, sub);

        // Prolonger l'essai
        const extendRes = await fetch(`${BASE_URL}/api/admin/deployments/${createData.deployment.id}/extend-trial`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ days: 14 })
        });
        assert.strictEqual(extendRes.status, 200);
        const extendData = await extendRes.json();
        assert.strictEqual(extendData.success, true);
    });

    test('30. GET, POST & PATCH /api/crm/leads - should manage B2B sales prospect intelligence & HubSpot sync', async () => {
        // Recherche des prospects filtrés
        const leadsRes = await fetch(`${BASE_URL}/api/crm/leads?city=Paris`);
        assert.strictEqual(leadsRes.status, 200);
        const leads = await leadsRes.json();
        assert.ok(Array.isArray(leads));
        assert.ok(leads.length > 0);

        const targetLead = leads[0];

        // Mettre à jour le statut du lead vers rdv_demo
        const patchRes = await fetch(`${BASE_URL}/api/crm/leads/${targetLead.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ lead_status: 'rdv_demo', notes: 'Démo planifiée pour lundi 15h' })
        });
        assert.strictEqual(patchRes.status, 200);
        const patchData = await patchRes.json();
        assert.strictEqual(patchData.success, true);
        assert.strictEqual(patchData.lead.lead_status, 'rdv_demo');

        // Synchronisation HubSpot CRM
        const syncRes = await fetch(`${BASE_URL}/api/crm/leads/${targetLead.id}/sync-hubspot`, {
            method: 'POST'
        });
        assert.strictEqual(syncRes.status, 200);
        const syncData = await syncRes.json();
        assert.strictEqual(syncData.success, true);
        assert.strictEqual(syncData.lead.hubspot_synced, true);
        assert.ok(syncData.hubspot_deal_id);
    });

    test('31. DELETE /api/tables/:id - should delete a table and broadcast update', async () => {
        // 1. Créer une table temporaire à supprimer
        const createRes = await fetch(`${BASE_URL}/api/tables/layout`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ number: '99', name: 'Table 99 Temp', zone: 'salle', shape: 'square', max_covers: 4, min_covers: 2, nominal_covers: 4, pos_x: 300, pos_y: 300 })
        });
        assert.strictEqual(createRes.status, 200);
        const createData = await createRes.json();
        const createdId = createData.table.id;

        // 2. Supprimer la table
        const delRes = await fetch(`${BASE_URL}/api/tables/${createdId}`, {
            method: 'DELETE'
        });
        assert.strictEqual(delRes.status, 200);
        const delData = await delRes.json();
        assert.strictEqual(delData.success, true);
        assert.strictEqual(delData.deleted.number, '99');
    });

    test('32. POST /api/tables/merge (at_service_end & at_day_end) & unmerge-all-daily', async () => {
        // 1. Récupérer les tables
        const layoutRes = await fetch(`${BASE_URL}/api/tables/layout`);
        const tables = await layoutRes.json();
        const t1 = tables.find(t => t.number === '01') || tables[0];
        const t2 = tables.find(t => t.number === '02') || tables[1];

        // 2. Fusionner Table 01 et Table 02 avec unmerge_policy = at_service_end
        const mergeRes = await fetch(`${BASE_URL}/api/tables/merge`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                primaryTableId: t1.id,
                secondaryTableIds: [t2.id],
                unmerge_policy: 'at_service_end'
            })
        });
        assert.strictEqual(mergeRes.status, 200);
        const mergeData = await mergeRes.json();
        assert.strictEqual(mergeData.success, true);
        assert.strictEqual(mergeData.unmerge_policy, 'at_service_end');

        // 3. Libérer la table pour déclencher la dissociation automatique fin de service
        const freeRes = await fetch(`${BASE_URL}/api/tables/${t1.id}/service`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ service_status: 'libre' })
        });
        assert.strictEqual(freeRes.status, 200);

        // 4. Clôture de fin de journée globale
        const dailyResetRes = await fetch(`${BASE_URL}/api/tables/unmerge-all-daily`, {
            method: 'POST'
        });
        assert.strictEqual(dailyResetRes.status, 200);
        const dailyData = await dailyResetRes.json();
        assert.strictEqual(dailyData.success, true);
    });

    test('33. POST /api/tables/layout (move table) & POST /api/inventory/waste with staff notes', async () => {
        // 1. Déplacer une table existante sur la grille (pos_x, pos_y)
        const moveRes = await fetch(`${BASE_URL}/api/tables/layout`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ number: '01', pos_x: 240, pos_y: 180 })
        });
        assert.strictEqual(moveRes.status, 200);
        const moveData = await moveRes.json();
        assert.strictEqual(moveData.success, true);
        assert.strictEqual(moveData.table.pos_x, 240);
        assert.strictEqual(moveData.table.pos_y, 180);

        // 2. Déclarer une perte avec notes et email
        const ingsRes = await fetch(`${BASE_URL}/api/inventory/ingredients`);
        const ings = await ingsRes.json();
        assert.ok(ings.length > 0);

        const wasteRes = await fetch(`${BASE_URL}/api/inventory/waste`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ingredient_id: ings[0].id,
                quantity: 1.5,
                reason: 'Erreur de cuisson',
                notes: 'Test perte automatisé',
                staff_email: 'chef@atelier-chris.fr'
            })
        });
        assert.strictEqual(wasteRes.status, 200);
        const wasteData = await wasteRes.json();
        assert.strictEqual(wasteData.success, true);
        assert.strictEqual(wasteData.log.notes, 'Test perte automatisé');
    });

    test('34. POST /api/orders/mock-create - should handle non-UUID item IDs, string table formats and empty cart validation', async () => {
        // 1. Order with non-UUID item id and single digit table
        const resNonUuid = await fetch(`${BASE_URL}/api/orders/mock-create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                tableNumber: '5',
                clientName: 'Client Fallback Test',
                items: [
                    { id: 'p1', name: 'Moscow Mule Premium', price: 12.50, quantity: 1, category: 'boisson' },
                    { id: 'p2', name: 'Article Custom Dynamique', price: 9.00, quantity: 2, category: 'plat' }
                ]
            })
        });
        assert.strictEqual(resNonUuid.status, 200);
        const dataNonUuid = await resNonUuid.json();
        assert.strictEqual(dataNonUuid.success, true);
        assert.ok(dataNonUuid.orderId);

        // 2. Order with empty cart should return 400
        const resEmpty = await fetch(`${BASE_URL}/api/orders/mock-create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                tableNumber: '05',
                clientName: 'Client Empty',
                items: []
            })
        });
        assert.strictEqual(resEmpty.status, 400);
    });

    test('35. POST /api/orders/mock-create - should record tip amount and calculate total with tip', async () => {
        const resWithTip = await fetch(`${BASE_URL}/api/orders/mock-create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                tableNumber: '05',
                clientName: 'Client Généreux',
                paymentMethod: 'carte',
                tipAmountCents: 350, // 3.50 € tip
                items: [
                    { name: 'Burger Signature', price: 16.00, quantity: 1 }
                ]
            })
        });
        assert.strictEqual(resWithTip.status, 200);
        const data = await resWithTip.json();
        assert.strictEqual(data.success, true);
        assert.strictEqual(data.tipAmountCents, 350);
        assert.strictEqual(data.totalAmountCents, 1950); // 1600 + 350
    });

    test('36. POST /api/reviews & GET /api/reviews - should submit customer review and calculate stats', async () => {
        // 1. Submit review
        const submitRes = await fetch(`${BASE_URL}/api/reviews`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                tableNumber: '05',
                clientName: 'Julien Testeur',
                rating: 5,
                tags: ['⚡ Service ultra rapide', '🍲 Plats savoureux'],
                comment: 'Expérience remarquable, commande fluide et burger excellent !'
            })
        });
        assert.strictEqual(submitRes.status, 201);
        const submitData = await submitRes.json();
        assert.strictEqual(submitData.success, true);
        assert.strictEqual(submitData.review.rating, 5);
        assert.strictEqual(submitData.review.client_name, 'Julien Testeur');

        // 2. Fetch reviews and stats
        const getRes = await fetch(`${BASE_URL}/api/reviews`);
        assert.strictEqual(getRes.status, 200);
        const getData = await getRes.json();
        assert.ok(Array.isArray(getData.reviews));
        assert.ok(getData.reviews.some(r => r.client_name === 'Julien Testeur'));
        assert.ok(getData.stats);
        assert.ok(getData.stats.totalReviews >= 1);
        assert.ok(parseFloat(getData.stats.averageRating) >= 1.0);
    });
});



