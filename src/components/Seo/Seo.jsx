import { Helmet } from 'react-helmet-async';
import {
    SITE_URL,
    SITE_NAME,
    DEFAULT_TITLE,
    DEFAULT_DESCRIPTION,
    DEFAULT_IMAGE,
} from '../../utils/seo/siteConfig';

/**
 * Renseigne les balises <head> propres à chaque page : titre, description,
 * URL canonique, indexation et données structurées.
 *
 * @param {string}  title       Titre de la page (sans le suffixe « | ARTEM »).
 * @param {string}  description Description affichée dans les résultats de recherche.
 * @param {string}  path        Chemin canonique de la page, ex. "/gamme/toile-enfourneur".
 * @param {string}  image       Image de partage absolue ou relative au site.
 * @param {boolean} noindex     Retire la page de l'index des moteurs de recherche.
 * @param {object|object[]} jsonLd Données structurées schema.org.
 */
export default function Seo({
    title,
    description = DEFAULT_DESCRIPTION,
    path,
    image = DEFAULT_IMAGE,
    noindex = false,
    jsonLd,
}) {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : DEFAULT_TITLE;
    const canonical = path ? `${SITE_URL}${path}` : SITE_URL;
    const absoluteImage = image.startsWith('http') ? image : `${SITE_URL}${image}`;
    const schemas = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

    return (
        <Helmet prioritizeSeoTags>
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={canonical} />
            {noindex
                ? <meta name="robots" content="noindex, nofollow" />
                : <meta name="robots" content="index, follow, max-image-preview:large" />}

            <meta property="og:type" content="website" />
            <meta property="og:site_name" content={SITE_NAME} />
            <meta property="og:locale" content="fr_FR" />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={canonical} />
            <meta property="og:image" content={absoluteImage} />

            {schemas.map((schema, index) => (
                <script type="application/ld+json" key={index}>
                    {JSON.stringify(schema)}
                </script>
            ))}
        </Helmet>
    );
}
