const { test, describe, before, after } = require('node:test');
const assert = require('node:assert');

const BASE_URL = 'http://localhost:5000';

describe('Ciao Byebye - API & Backend Functional Test Suite', () => {
    let testOrderId = null;
    let testProductId = null;

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
});
