/**
 * Source unique des URLs publiques du site.
 *
 * Utilisée à la fois par la génération du sitemap et par le pré-rendu, afin
 * que les deux ne puissent pas diverger : une page pré-rendue est forcément
 * dans le sitemap, et inversement.
 */
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadEnv } from 'vite';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');

// Node ne lit pas les fichiers .env de lui-meme : on utilise le chargeur de
// Vite pour que ces scripts voient exactement les memes variables que
// l'application, en respectant la priorite .env.local > .env.<mode> > .env.
const env = loadEnv(process.env.NODE_ENV || 'production', projectRoot, 'VITE_');

export const SITE_URL = 'https://www.artem-fr.com';

/**
 * URL de l'API interrogée au moment du build pour lister les gammes.
 *
 * On lit la même variable que l'application (VITE_API_URL, définie dans .env)
 * afin que le sitemap, le pré-rendu et le site lui-même ne puissent pas viser
 * des API différentes. ARTEM_API_URL reste prioritaire pour surcharger
 * ponctuellement, par exemple viser l'instance locale depuis le serveur.
 */
export const API_URL = (
    process.env.ARTEM_API_URL ||
    env.VITE_API_URL ||
    'https://www.artem-fr.com/api'
).replace(/\/+$/, '');

/** Reproduit src/utils/seo/slugify.js — gardez les deux fonctions identiques. */
export function slugify(text) {
    return String(text)
        .normalize('NFD')
        .replace(/[̀-ͯ]/g, '')
        .toLowerCase()
        .replace(/['’]/g, ' ')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

/**
 * Pages statiques indexables.
 *
 * Les pages de l'espace client (tableau de bord, devis, outils) et du
 * back-office en sont volontairement absentes : elles sont sans intérêt pour
 * un moteur de recherche et exposeraient inutilement la structure de l'admin.
 * La page de connexion en est également retirée, elle est en noindex.
 */
export const staticRoutes = [
    { path: '/', priority: '1.0', changefreq: 'monthly' },
    { path: '/entreprise', priority: '0.8', changefreq: 'yearly' },
    { path: '/gamme', priority: '0.9', changefreq: 'monthly' },
    { path: '/contact', priority: '0.8', changefreq: 'yearly' },
    { path: '/creer-un-compte', priority: '0.5', changefreq: 'yearly' },
    { path: '/mentions-legales', priority: '0.2', changefreq: 'yearly' },
    { path: '/politique-confidentialite', priority: '0.2', changefreq: 'yearly' },
    { path: '/cgv', priority: '0.2', changefreq: 'yearly' },
];

/** Récupère les gammes depuis l'API et en déduit leurs URLs canoniques. */
export async function fetchRangeRoutes() {
    const response = await fetch(`${API_URL}/range`);
    if (!response.ok) {
        throw new Error(`API injoignable (${response.status}) sur ${API_URL}/range`);
    }
    const { ranges } = await response.json();

    return ranges.map((range) => ({
        id: range.id,
        name: range.name,
        path: `/gamme/${slugify(range.name)}`,
        lastmod: range.updated_at || range.created_at,
        priority: '0.8',
        changefreq: 'monthly',
    }));
}
