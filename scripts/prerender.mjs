/**
 * Pré-rend les pages publiques en HTML statique.
 *
 *   npm run build            (build Vite, puis sitemap, puis pré-rendu)
 *   npm run prerender        (pré-rendu seul, sur un dist/ déjà construit)
 *
 * Pourquoi : le site est une application React rendue côté navigateur. Sans
 * pré-rendu, toutes les URLs renvoient le même index.html avec un <div id="root">
 * vide. Google finit généralement par exécuter le JavaScript, mais Bing, les
 * assistants conversationnels (ChatGPT, Perplexity) et les générateurs d'aperçus
 * de lien ne le font pas : ils ne voient aucun contenu.
 *
 * Le script sert dist/ localement, ouvre chaque URL publique dans un navigateur
 * sans interface, attend que React ait fini son rendu, puis écrit le HTML obtenu
 * dans dist/<chemin>/index.html. Le fichier contient alors le vrai titre, la
 * vraie description, le contenu textuel et les données structurées.
 *
 * L'application reste entièrement fonctionnelle : React reprend la main
 * (hydratation) au chargement, le HTML pré-rendu n'est que le premier état.
 */
import { createServer } from 'node:http';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, resolve, extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { staticRoutes, fetchRangeRoutes } from './routes.mjs';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const distDir = resolve(projectRoot, 'dist');
const PORT = Number(process.env.PRERENDER_PORT || 4183);

const MIME = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.mjs': 'text/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.svg': 'image/svg+xml',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.ico': 'image/x-icon',
    '.pdf': 'application/pdf',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.xml': 'application/xml; charset=utf-8',
    '.txt': 'text/plain; charset=utf-8',
};

/** Serveur statique minimal sur dist/, avec repli SPA sur index.html. */
function startServer() {
    const server = createServer(async (req, res) => {
        const urlPath = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
        let filePath = join(distDir, urlPath);

        if (!extname(filePath) || !existsSync(filePath)) {
            filePath = join(distDir, 'index.html');
        }

        try {
            const body = await readFile(filePath);
            res.writeHead(200, { 'Content-Type': MIME[extname(filePath)] || 'application/octet-stream' });
            res.end(body);
        } catch {
            res.writeHead(404).end('Not found');
        }
    });

    return new Promise((resolvePromise) => {
        server.listen(PORT, '127.0.0.1', () => resolvePromise(server));
    });
}

/**
 * Attend que le rendu React soit effectivement terminé.
 *
 * Attendre « networkidle » ne suffit pas : les pages gamme chargent leurs
 * données via l'API et n'affichent qu'un écran de chargement tant que la
 * réponse n'est pas arrivée. On attend donc l'apparition d'un <h1>, qui
 * n'existe qu'une fois les données rendues.
 */
async function waitForRender(page) {
    await page.waitForFunction(
        () => {
            const root = document.getElementById('root');
            if (!root || root.children.length === 0) return false;
            if (document.querySelector('.loading')) return false;
            return Boolean(document.querySelector('h1'));
        },
        { timeout: 20000 },
    );
}

/**
 * Charge puppeteer et ouvre un navigateur, sans jamais lever d'exception.
 *
 * Le pré-rendu est un bonus : il rend le site lisible par les robots qui
 * n'exécutent pas JavaScript, mais un dist/ non pré-rendu reste parfaitement
 * fonctionnel. Sur un serveur où puppeteer n'est pas installé, où Chrome n'a
 * pas été téléchargé, où les bibliothèques système lui manquent, on préfère
 * donc prévenir et laisser le build réussir.
 */
async function launchBrowser() {
    let puppeteer;
    try {
        ({ default: puppeteer } = await import('puppeteer'));
    } catch {
        return { error: "puppeteer n'est pas installé (installation sans les devDependencies ?)" };
    }

    try {
        const browser = await puppeteer.launch({
            headless: 'new',
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });
        return { browser };
    } catch (error) {
        return { error: "Chrome n'a pas pu démarrer : " + error.message.split('\n')[0] };
    }
}

async function main() {
    if (process.env.SKIP_PRERENDER === '1') {
        console.log('Pré-rendu ignoré (SKIP_PRERENDER=1).');
        return;
    }

    if (!existsSync(join(distDir, 'index.html'))) {
        throw new Error('dist/index.html introuvable — lancez d\'abord "npm run build:app".');
    }

    // Sans l'API, on pré-rend au moins les pages statiques.
    let rangeRoutes = [];
    try {
        rangeRoutes = await fetchRangeRoutes();
    } catch (error) {
        console.warn('Gammes non récupérées (' + error.message + ') : seules les pages statiques seront pré-rendues.');
    }

    const routes = [
        ...staticRoutes.map((route) => route.path),
        ...rangeRoutes.map((route) => route.path),
    ];

    const { browser, error: browserError } = await launchBrowser();
    if (browserError) {
        console.warn('Pré-rendu ignoré : ' + browserError);
        console.warn("dist/ reste utilisable, le site fonctionne ; mais les robots qui n'exécutent pas JavaScript n'en verront pas le contenu.");
        return;
    }

    const server = await startServer();

    let rendered = 0;
    const failures = [];

    try {
        for (const route of routes) {
            const page = await browser.newPage();
            try {
                await page.goto(`http://127.0.0.1:${PORT}${route}`, {
                    waitUntil: 'networkidle0',
                    timeout: 30000,
                });
                await waitForRender(page);

                const html = await page.content();
                const outDir = route === '/' ? distDir : join(distDir, route);
                await mkdir(outDir, { recursive: true });
                await writeFile(join(outDir, 'index.html'), html, 'utf8');

                rendered += 1;
                console.log(`  ✓ ${route}`);
            } catch (error) {
                failures.push({ route, message: error.message });
                console.warn(`  ✗ ${route} — ${error.message}`);
            } finally {
                await page.close();
            }
        }
    } finally {
        await browser.close();
        server.close();
    }

    console.log(`\nPré-rendu : ${rendered}/${routes.length} pages.`);

    // Un échec laisse la page en version non pré-rendue, ce qui reste
    // fonctionnel mais invisible pour les robots : on le signale sans
    // faire échouer le build.
    if (failures.length > 0) {
        console.warn(`${failures.length} page(s) non pré-rendue(s) — elles resteront servies en rendu client.`);
    }
}

main().catch((error) => {
    console.error('Échec du pré-rendu :', error.message);
    process.exit(1);
});
