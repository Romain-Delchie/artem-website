import artem from '/data/artem-data';

/** Domaine canonique du site, utilisé pour les balises canonical et le JSON-LD. */
export const SITE_URL = 'https://www.artem-fr.com';

export const SITE_NAME = 'ARTEM';

/** Titre de repli, volontairement court : Google n'affiche qu'une soixantaine de caractères. */
export const DEFAULT_TITLE = 'ARTEM | Textiles techniques et bandes transporteuses pour la boulangerie';

export const DEFAULT_DESCRIPTION =
    "Fabricant de textiles techniques et de bandes transporteuses pour la boulangerie : toile enfourneur, toile de couche, tapis de façonneuse et de laminoir, élévateurs enfourneurs. Adaptable toutes marques, fabrication sur mesure.";

export const DEFAULT_IMAGE = `${SITE_URL}/images/logo2hdcarre.jpg`;

/**
 * Fiche d'identité de l'entreprise, balisée en JSON-LD sur toutes les pages.
 * Permet à Google d'associer le site à l'entreprise (Knowledge Panel, SEO local).
 */
export const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: artem.name,
    legalName: artem.name,
    url: SITE_URL,
    logo: {
        '@type': 'ImageObject',
        url: DEFAULT_IMAGE,
    },
    description: DEFAULT_DESCRIPTION,
    slogan: artem.slogan,
    email: artem.email,
    telephone: artem.tel,
    faxNumber: artem.fax,
    vatID: artem.intracom,
    taxID: artem.siret,
    naics: artem.NAF,
    address: {
        '@type': 'PostalAddress',
        streetAddress: `${artem.adress}, ${artem.address2}`,
        postalCode: artem.postalCode,
        addressLocality: artem.city,
        addressCountry: 'FR',
    },
    areaServed: {
        '@type': 'Country',
        name: 'France',
    },
    contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'sales',
        telephone: artem.tel,
        email: artem.email,
        availableLanguage: ['French'],
    },
};

/**
 * Déclinaison LocalBusiness : même entreprise, mais avec les horaires
 * et la géolocalisation attendus pour le référencement local.
 */
export const localBusinessJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/#localbusiness`,
    name: artem.name,
    image: DEFAULT_IMAGE,
    url: SITE_URL,
    telephone: artem.tel,
    email: artem.email,
    priceRange: '€€',
    address: {
        '@type': 'PostalAddress',
        streetAddress: `${artem.adress}, ${artem.address2}`,
        postalCode: artem.postalCode,
        addressLocality: artem.city,
        addressRegion: 'Île-de-France',
        addressCountry: 'FR',
    },
    openingHoursSpecification: [
        {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens: '09:00',
            closes: '13:00',
        },
        {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens: '14:00',
            closes: '18:00',
        },
    ],
};

/** Construit le JSON-LD d'un fil d'Ariane à partir de [{ name, path }]. */
export function breadcrumbJsonLd(items) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: `${SITE_URL}${item.path}`,
        })),
    };
}
