/**
 * Génère public/sitemap.xml à partir des pages statiques et des gammes
 * réellement présentes en base.
 *
 *   npm run generate-sitemap
 *
 * Génère également deploy/redirects-gammes.map, la table de correspondance
 * entre les anciennes URLs /gamme/:id/:nom et les nouvelles URLs en slug,
 * consommée par nginx pour les redirections 301.
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SITE_URL, staticRoutes, fetchRangeRoutes } from './routes.mjs';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');

/** Formate une date en ISO 8601 tronquée au jour, format attendu par les sitemaps. */
function isoDate(value) {
    const date = value ? new Date(value) : new Date();
    return Number.isNaN(date.getTime())
        ? new Date().toISOString().slice(0, 10)
        : date.toISOString().slice(0, 10);
}

function urlEntry({ path, lastmod, priority, changefreq }) {
    return [
        '    <url>',
        `        <loc>${SITE_URL}${path}</loc>`,
        `        <lastmod>${isoDate(lastmod)}</lastmod>`,
        `        <changefreq>${changefreq}</changefreq>`,
        `        <priority>${priority}</priority>`,
        '    </url>',
    ].join('\n');
}

async function main() {
    const rangeRoutes = await fetchRangeRoutes();
    const buildDate = new Date().toISOString();

    const entries = [
        ...staticRoutes.map((route) => urlEntry({ ...route, lastmod: buildDate })),
        ...rangeRoutes.map((route) => urlEntry(route)),
    ];

    const sitemap = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        ...entries,
        '</urlset>',
        '',
    ].join('\n');

    // Le sitemap vit dans public/ pour être copié tel quel dans dist/ au build.
    const sitemapPath = resolve(projectRoot, 'public', 'sitemap.xml');
    writeFileSync(sitemapPath, sitemap, 'utf8');

    // Table de redirection des anciennes URLs, au format map nginx.
    const redirects = rangeRoutes
        .map((route) => `    ~^/gamme/${route.id}(/.*)?$  ${route.path};`)
        .join('\n');

    const mapFile = [
        '# Généré par npm run generate-sitemap — ne pas modifier à la main.',
        '# Redirige les anciennes URLs /gamme/:id/:nom vers les URLs en slug.',
        redirects,
        '',
    ].join('\n');

    const deployDir = resolve(projectRoot, 'deploy');
    mkdirSync(deployDir, { recursive: true });
    writeFileSync(resolve(deployDir, 'redirects-gammes.map'), mapFile, 'utf8');

    console.log(`sitemap.xml : ${entries.length} URLs (${staticRoutes.length} statiques, ${rangeRoutes.length} gammes)`);
    console.log(`redirects-gammes.map : ${rangeRoutes.length} redirections 301`);
}

main().catch((error) => {
    console.error('Échec de la génération du sitemap :', error.message);
    process.exit(1);
});
