import textile from './textile';
import bandes from './bandes';
import mecanique from './mecanique';
import industriel from './industriel';

/**
 * Contenu éditorial destiné au référencement des pages gamme.
 *
 * Chaque entrée est indexée par le slug de la gamme (voir src/utils/seo/slugify.js)
 * et complète la description stockée en base : elle n'écrase rien, elle ajoute le
 * volume de texte et les questions fréquentes dont les moteurs de recherche ont
 * besoin pour positionner la page.
 *
 *  - title       : balise <title>, 60 caractères maximum hors suffixe « | ARTEM ».
 *  - description : meta description, 150 à 160 caractères.
 *  - imageAlt    : texte alternatif descriptif de la photo principale.
 *  - sections    : blocs rédactionnels { heading, paragraphs[] } affichés sur la page.
 *  - faq         : questions fréquentes { question, answer }, affichées et balisées
 *                  en JSON-LD FAQPage.
 *  - published   : `false` met le contenu en attente de validation. Il reste
 *                  versionné et déployable, mais le site public l'ignore.
 *                  Seul un administrateur connecté le voit, en aperçu, ce qui
 *                  permet de faire relire un texte sur le site réel avant sa
 *                  mise en ligne. Absent ou `true`, le contenu est publié.
 *
 * Une gamme absente de ce fichier reste parfaitement fonctionnelle : la page
 * retombe alors sur son nom et sa description issus de l'API.
 */
const seoContent = {
    ...textile,
    ...bandes,
    ...mecanique,
    ...industriel,
};

/**
 * Retourne le contenu SEO d'une gamme.
 *
 * Renvoie un objet vide si la gamme n'est pas couverte, ou si son contenu
 * attend une validation. La page fonctionne alors normalement : elle retombe
 * sur le nom et la description stockés en base, sans contenu enrichi ni
 * questions fréquentes.
 *
 * `includePending` lève cette mise en attente. Cet aperçu est réservé aux
 * administrateurs connectés : le pré-rendu et les robots d'indexation
 * s'exécutent sans session et ne reçoivent donc jamais ce contenu.
 *
 * @param {string}  slug
 * @param {{ includePending?: boolean }} [options]
 */
export function getRangeSeo(slug, { includePending = false } = {}) {
    const entry = seoContent[slug];
    if (!entry) {
        return {};
    }
    if (entry.published === false && !includePending) {
        return {};
    }
    return entry;
}

/** Liste les slugs dont le contenu attend une validation. */
export function getPendingSlugs() {
    return Object.keys(seoContent).filter((slug) => seoContent[slug].published === false);
}

export default seoContent;
