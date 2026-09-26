import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import API from '../../../utils/api/api';
import AppContext from '../../../context/AppContext';
import artem from '/data/artem-data';
import { rangePath } from '../../../utils/seo/slugify';

/**
 * Briques communes aux quatre propositions de page d'accueil.
 *
 * Chaque proposition compose ces éléments différemment : ce qui les distingue
 * est l'ordre, le poids donné à chaque bloc et le ton, pas un habillage.
 */

/** Jeu d'icônes maison : même grille, même épaisseur de trait partout. */
const ICON_PATHS = {
    arrow: 'M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3',
    phone: 'M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293a.75.75 0 0 1-.83.286 12.035 12.035 0 0 1-7.143-7.143.75.75 0 0 1 .286-.83l1.293-.97c.363-.271.527-.734.417-1.173L6.826 3.11A1.125 1.125 0 0 0 5.735 2.25H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z',
    mail: 'M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75',
    pin: 'M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z',
    clock: 'M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z',
    search: 'm21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z',
    tool: 'M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26',
    check: 'M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z',
    doc: 'M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z',
    factory: 'M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z',
};

export function Icon({ name, className = '' }) {
    return (
        <svg className={`hr-icon ${className}`.trim()} viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
            strokeLinejoin="round" aria-hidden="true">
            <path d={ICON_PATHS[name]} />
        </svg>
    );
}

/**
 * Charge la gamme une seule fois et la partage via le contexte,
 * pour qu'un changement de proposition ne relance pas la requête.
 */
export function useRanges() {
    const { ranges, setRanges } = useContext(AppContext);
    const [loaded, setLoaded] = useState(Boolean(ranges?.length));

    useEffect(() => {
        if (ranges?.length) {
            setLoaded(true);
            return;
        }
        API.range.getRanges()
            .then((res) => setRanges(res.data.ranges))
            .catch((err) => console.error(err))
            .finally(() => setLoaded(true));
    }, []);

    return { ranges: ranges || [], loaded };
}

/** Pièces d'usure les plus demandées, mises en avant en photo. */
export const FEATURED = [
    'Toile enfourneur',
    'Tapis de façonneuse',
    'Toile de couche',
    'Tapis de laminoir',
    'Enfourneur',
    'Elévateur colonne',
];

/** Familles du catalogue, dans l'ordre où elles sont présentées. */
export const FAMILIES = [
    { key: 'textile', label: 'Textiles et feutres', match: (r) => r.category === 'textile' },
    { key: 'bande', label: 'Bandes transporteuses', match: (r) => r.category === 'bande' },
    { key: 'meca', label: 'Élévateurs et enfourneurs', match: (r) => r.category === 'meca' },
    { key: 'inox', label: 'Produits inox', match: (r) => r.category === 'inox' },
    { key: 'indus', label: 'Boulangerie industrielle', match: (r) => r.category === 'indus' },
    { key: 'autre', label: 'Bandes tous secteurs', match: (r) => r.category === 'autre' },
    { key: 'chocolat', label: 'Chocolaterie et biscuiterie', match: (r) => r.category === 'chocolat' },
    { key: 'feutre', label: 'Feutre industriel', match: (r) => r.category === 'feutre' },
    { key: 'service', label: 'Nos interventions', match: (r) => r.category === 'service' },
];

/** Marques citées dans les descriptions de gamme, groupées par type de matériel. */
export const COMPATIBILITY = [
    {
        machine: 'Fours',
        brands: ['Abry', 'Bongard', 'Eurofours', 'Jolivet', 'Fringand', 'Guyon', 'Map', 'Pavailler', 'Polin', 'Real', 'Salva', 'Tagliavini', 'Technodif', 'Tibiletti', 'Werner'],
    },
    {
        machine: 'Façonneuses',
        brands: ['Bertrand-Puma', 'Bongard', 'Deleume', 'Gecoma', 'JAC', 'Lambert'],
    },
    {
        machine: 'Lignes industrielles',
        brands: ['Mecatherm', 'Werner', 'Kaak', 'Hein', 'Kemper', 'Benier'],
    },
];

/** Jalons de l'entreprise, repris de la page Notre entreprise. */
export const MILESTONES = [
    { year: '1995', body: "Déménagement à Torcy : les locaux de Paris ne suffisent plus, la production interne prend de l'importance." },
    { year: '2001', body: "Premier accessoire mécanique pour les boulangers, l'enfourneur, développé et fabriqué par le groupe." },
    { year: '2011', body: "Installation à Montévrain dans 1 500 m², permettant la mise en stock de nombreuses références supplémentaires." },
    { year: '2019', body: "Carine Autret prend la direction de l'entreprise, qui compte alors douze personnes." },
];

export const ACCOUNT_BENEFITS = [
    { icon: 'search', title: 'Le prix en un instant', body: 'Recherchez une référence et obtenez son tarif immédiatement, sans attendre un retour de notre part.' },
    { icon: 'tool', title: 'Des outils de définition', body: 'Déterminez vous-même la pièce dont vous avez besoin à partir des cotes relevées sur votre machine.' },
    { icon: 'check', title: 'La commande en autonomie', body: 'Transformez un devis en commande au moment où vous le décidez, sans repasser par nous.' },
    { icon: 'doc', title: 'Vos devis conservés', body: 'Retrouvez l’historique complet de vos demandes et recommandez une pièce en deux clics.' },
];

/** En-tête de section, centré, avec une variante claire sur fond sombre. */
export function SectionHead({ title, children, light = false, align = 'center' }) {
    return (
        <header className={`hr-section-head${light ? ' hr-section-head--light' : ''}${align === 'left' ? ' hr-section-head--left' : ''}`}>
            <h2>{title}</h2>
            {children && <p>{children}</p>}
        </header>
    );
}

/** Vignette photo d'une gamme. */
export function RangeCard({ range }) {
    return (
        <li>
            <Link className="hr-range-card" to={rangePath(range)}>
                <img
                    src={`/images/products/${range.image_link}`}
                    alt={`${range.name} ARTEM`}
                    loading="lazy"
                    width="420"
                    height="280"
                />
                <span className="hr-range-card-name">
                    {range.name}
                    <Icon name="arrow" />
                </span>
            </Link>
        </li>
    );
}

/** Liste dense de liens vers des gammes. */
export function RangeLinks({ ranges }) {
    return (
        <ul className="hr-range-list">
            {ranges.map((range) => (
                <li key={range.id}>
                    <Link to={rangePath(range)}>{range.name}</Link>
                </li>
            ))}
        </ul>
    );
}

/** Bandeau des marques compatibles. */
export function Compatibility({ light = true }) {
    return (
        <section className={light ? 'hr-compat' : 'hr-compat hr-compat--pale'}>
            <SectionHead title="Votre machine est dans la liste" light={light}>
                Et si elle n’y est pas, transmettez-nous les cotes de la pièce usée :
                nous fabriquons sur mesure, y compris pour des matériels modifiés.
            </SectionHead>
            <div className="hr-compat-groups">
                {COMPATIBILITY.map((group) => (
                    <div className="hr-compat-group" key={group.machine}>
                        <h3>{group.machine}</h3>
                        <p>{group.brands.join(' · ')}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

/** Bloc de contact, clôture commune aux quatre propositions. */
export function ContactBlock({ title = 'Parler à quelqu’un', lead }) {
    return (
        <section className="hr-contact">
            <h2>{title}</h2>
            <p className="hr-contact-lead">
                {lead || "Un doute sur une matière, une machine que vous ne savez pas identifier ? Appelez-nous, c’est souvent le plus rapide."}
            </p>
            <ul className="hr-contact-list">
                <li>
                    <Icon name="phone" />
                    <a href={`tel:${artem.tel.replace(/\s/g, '')}`}>{artem.tel}</a>
                </li>
                <li>
                    <Icon name="mail" />
                    <a href={`mailto:${artem.email}`}>{artem.email}</a>
                </li>
                <li>
                    <Icon name="clock" />
                    <span>Du lundi au vendredi, 9h–13h et 14h–18h</span>
                </li>
                <li>
                    <Icon name="pin" />
                    <span>{artem.adress}, {artem.postalCode} {artem.city}</span>
                </li>
            </ul>
        </section>
    );
}

export { artem, rangePath };
