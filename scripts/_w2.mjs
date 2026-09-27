import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, extname } from 'node:path';
import puppeteer from 'puppeteer';

const dist = process.argv[2];
const PORT = 4174;
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.jpg': 'image/jpeg', '.png': 'image/png', '.svg': 'image/svg+xml', '.ico': 'image/x-icon' };

const server = createServer(async (req, res) => {
    const p = decodeURIComponent(new URL(req.url, 'http://l').pathname);
    let f = join(dist, p);
    if (!extname(f) || !existsSync(f)) f = join(dist, 'index.html');
    try {
        const b = await readFile(f);
        res.writeHead(200, { 'Content-Type': MIME[extname(f)] || 'application/octet-stream' });
        res.end(b);
    } catch { res.writeHead(404).end(); }
});
await new Promise(r => server.listen(PORT, '127.0.0.1', r));

const products = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    reference: `MP_${1200 + i * 17}_X_${700 + i * 9}`,
    description: 'Toile enfourneur coton Arcot 500',
    brand: i % 2 ? 'Bongard' : 'ARTEM',
    image_link: ['te.jpg', 'tdl.jpg', 'mp.jpg', 'bdeLam.jpg'][i % 4],
    delivery_time: i % 3 === 0 ? '0 jour' : '3 semaines',
    range_id: (i % 6) + 1, active: 1, price: 120 + i * 7.4, coeff: 1, minPrice: 80, t1: null,
}));
const ranges = Array.from({ length: 6 }, (_, i) => ({ id: i + 1, name: 'Gamme ' + (i + 1), searchFilter: 1 }));

const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });

for (const route of ['/search-products', '/update-product', '/delete-product']) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 1000 });
    await page.setRequestInterception(true);
    page.on('request', (req) => {
        const u = req.url();
        const cors = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': '*' };
        const json = (b) => req.respond({ status: 200, contentType: 'application/json', headers: cors, body: JSON.stringify(b) });
        if (req.method() === 'OPTIONS') return req.respond({ status: 204, headers: cors, body: '' });
        if (u.includes('/api/product')) return json(products);
        if (u.includes('/api/range')) return json({ ranges });
        if (u.includes('/api/account')) return json({ company: 'Demo', firstname: 'R', lastname: 'D', verified: 1, profile_id: 1, role: 'admin', billing_address: '{}', deliveries: '[]', delivery_standard: '{}' });
        if (u.includes('/api/quotation')) return json({ quotations: [] });
        if (u.includes('/api/')) return json({});
        if (/googletagmanager|google-analytics/.test(u)) return req.respond({ status: 200, contentType: 'text/javascript', body: '' });
        req.continue();
    });
    await page.evaluateOnNewDocument(() => {
        localStorage.setItem('user', JSON.stringify({ token: 'demo', email: 'a@b.c', firstname: 'R', lastname: 'D', role: 'admin', profile_id: 1 }));
    });
    await page.goto(`http://127.0.0.1:${PORT}${route}`, { waitUntil: 'load', timeout: 25000 });
    let ok = true;
    try { await page.waitForSelector('.pcr', { timeout: 15000 }); } catch { ok = false; }
    if (!ok) { console.log(route.padEnd(18), 'pas de carte'); await page.close(); continue; }
    await new Promise(r => setTimeout(r, 500));
    const r = await page.evaluate(() => {
        const ws = [...document.querySelectorAll('.pcr')].map(e => Math.round(e.getBoundingClientRect().width));
        return { largeurs: [...new Set(ws)], n: ws.length };
    });
    console.log(`${route.padEnd(18)} ${r.n} cartes  largeur(s): ${JSON.stringify(r.largeurs)}`);
    await page.close();
}

await browser.close();
server.close();
