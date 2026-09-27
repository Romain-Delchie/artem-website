import { useState } from 'react'
import { Link } from 'react-router-dom'
import Seo from '../../components/Seo/Seo'
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb'
import { breadcrumbJsonLd } from '../../utils/seo/siteConfig'
import { rangePath, slugify } from '../../utils/seo/slugify'
import { getRangeSeo } from '/data/seo'
import './ProductsRedesign.scss'

/**
 * Proposition de refonte de la page « Notre gamme », affichée aux seuls
 * administrateurs (voir Products.jsx).
 *
 * La page actuelle empile six bandeaux en dégradé de 80 à 100 px de haut, puis
 * des cartes dont l'image occupe la moitié de la largeur sur un aplat de
 * couleur pleine, différent selon la catégorie. Le résultat se lit mal : les
 * titres pèsent plus que les produits, quatre aplats saturés se disputent
 * l'attention, et le survol agrandit les cartes de 10 %, ce qui les fait se
 * chevaucher.
 *
 * Quatre partis pris pour cette proposition :
 *  - la couleur de catégorie est conservée, mais réduite à un filet d'accent :
 *    le code couleur reste lisible sans envahir la page ;
 *  - la hiérarchie vient de la typographie et non de la hauteur des bandeaux :
 *    le nom de la famille, celui de la sous-famille, puis celui de la gamme se
 *    distinguent par la taille et la couleur du texte ;
 *  - tout ce qui se répétait à l'identique d'un bloc à l'autre est retiré — le
 *    surtitre « Notre gamme » sur chacune des six familles, l'appel à l'action
 *    « Voir la gamme » sur chacune des gammes, et les deux compteurs de
 *    l'en-tête — parce qu'à la trentième répétition ils ne renseignent plus
 *    personne et brouillent la lecture des noms de produits ;
 *  - un sommaire collant permet d'atteindre une famille sans parcourir la page
 *    entière, qui fait plusieurs écrans ;
 *  - les cartes sont des surfaces claires bordées, avec une image en 4/3 et un
 *    survol qui soulève de 2 px au lieu de redimensionner.
 *
 * Le regroupement des gammes est repris tel quel de Products.jsx, y compris la
 * règle métier qui rattache « Tapis de laminoir » et « Bande Façonnage » à la
 * boulangerie industrielle. Comme dans la version actuelle, les listes restent
 * présentes dans le document quand une famille est repliée : elles sont
 * masquées en CSS, jamais démontées, pour que les liens vers les pages gamme
 * demeurent explorables.
 */

/** Chevron simple, orienté selon l'état de l'accordéon. */
function Chevron({ open }) {
    return (
        <svg className={`pg-chevron${open ? ' pg-chevron--open' : ''}`} viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
        </svg>
    );
}

/** Carte d'une gamme : une image et un nom, la carte entière étant le lien. */
function RangeTile({ range }) {
    // L'administrateur voit aussi les textes en attente de validation, comme
    // partout ailleurs sur le site.
    const seo = getRangeSeo(slugify(range.name), { includePending: true });
    const alt = seo.imageAlt || `${range.name} ARTEM pour la boulangerie`;

    return (
        <li className="pg-card">
            <Link className="pg-card-link" to={rangePath(range)}>
                <span className="pg-card-media">
                    <img
                        src={`/images/products/${range.image_link}`}
                        alt={alt}
                        width="320"
                        height="240"
                        loading="lazy"
                    />
                </span>
                <span className="pg-card-body">
                    <span className="pg-card-name">{range.name}</span>
                </span>
            </Link>
        </li>
    );
}

/** Grille de gammes, toujours rendue, masquée en CSS lorsqu'elle est repliée. */
function RangeGrid({ ranges, open }) {
    return (
        <ul className={`pg-grid${open ? '' : ' pg-hidden'}`}>
            {ranges.map((range) => (
                <RangeTile key={range.id} range={range} />
            ))}
        </ul>
    );
}

/** Sous-famille de la boulangerie artisanale, titrée en h3. */
function SubGroup({ id, label, accent, ranges, open, onToggle }) {
    return (
        <section className={`pg-sub pg-accent--${accent}`}>
            <button
                type="button"
                className="pg-sub-head"
                onClick={() => onToggle(id)}
                aria-expanded={open}
                aria-controls={`sous-famille-${id}`}
            >
                <span className="pg-sub-rule" aria-hidden="true" />
                <h3>{label}</h3>
                <span className="pg-count">{ranges.length}</span>
                <Chevron open={open} />
            </button>
            <div id={`sous-famille-${id}`}>
                <RangeGrid ranges={ranges} open={open} />
            </div>
        </section>
    );
}

export default function ProductsRedesign({ ranges }) {
    const byCategory = (category) => ranges.filter((range) => range.category === category)

    // La gamme industrielle regroupe la catégorie « indus » et deux produits
    // rattachés à d'autres catégories mais commercialisés en industriel.
    const industrialRanges = ranges.filter(
        (range) =>
            range.category === 'indus' ||
            range.name === 'Tapis de laminoir' ||
            range.name === 'Bande Façonnage',
    )

    const subGroups = [
        { id: 'textile', label: 'Textiles et feutres', accent: 'green', ranges: byCategory('textile') },
        { id: 'bande', label: 'Bandes transporteuses', accent: 'amber', ranges: byCategory('bande') },
        { id: 'inox', label: 'Autres produits inox', accent: 'steel', ranges: byCategory('inox') },
        { id: 'meca', label: 'Élévateur et enfourneur', accent: 'navy', ranges: byCategory('meca') },
    ]

    const families = [
        {
            id: 'artisanal',
            label: 'Boulangerie artisanale',
            short: 'Artisanale',
            accent: 'green',
            subGroups,
            ranges: subGroups.flatMap((group) => group.ranges),
        },
        {
            id: 'industriel',
            label: 'Boulangerie industrielle',
            short: 'Industrielle',
            accent: 'navy',
            ranges: industrialRanges,
        },
        {
            id: 'autre',
            label: 'Bandes transporteuses tout secteur',
            short: 'Tout secteur',
            accent: 'amber',
            ranges: byCategory('autre'),
        },
        {
            id: 'feutre',
            label: 'Feutre industriel',
            short: 'Feutre',
            accent: 'green',
            ranges: byCategory('feutre'),
        },
        {
            id: 'chocolat',
            label: 'Bandes de chocolaterie et biscuiterie',
            short: 'Chocolaterie',
            accent: 'steel',
            ranges: byCategory('chocolat'),
        },
        {
            id: 'service',
            label: 'Nos services',
            short: 'Services',
            accent: 'navy',
            ranges: byCategory('service'),
        },
    ]

    // Tout est déplié au chargement : le visiteur voit l'étendue de la gamme
    // plutôt qu'une liste de titres fermés.
    const allOpen = () => {
        const state = {};
        families.forEach((family) => { state[family.id] = true });
        subGroups.forEach((group) => { state[group.id] = true });
        return state;
    };
    const [isOpen, setIsOpen] = useState(allOpen)

    const toggle = (key) => setIsOpen((prev) => ({ ...prev, [key]: !prev[key] }))

    const everythingOpen = families.every((family) => isOpen[family.id])

    // Le bouton unique bascule dans les deux sens : il replie tout si tout est
    // ouvert, et déplie tout sinon.
    const toggleAll = () => {
        const next = {};
        Object.keys(isOpen).forEach((key) => { next[key] = !everythingOpen });
        setIsOpen(next);
    };

    /** Un lien du sommaire déplie sa famille avant que l'ancre n'y conduise. */
    const openFamily = (id) => setIsOpen((prev) => ({ ...prev, [id]: true }))

    const breadcrumbItems = [
        { name: 'Accueil', path: '/' },
        { name: 'Notre gamme', path: '/gamme' },
    ]

    return (
        <>
            <Seo
                title="Notre gamme : textiles et bandes transporteuses"
                description="Toute la gamme ARTEM : toiles enfourneur et de couche, tapis de façonneuse et de laminoir, bandes transporteuses, élévateurs enfourneurs et produits inox."
                path="/gamme"
                jsonLd={breadcrumbJsonLd(breadcrumbItems)}
            />
            <main className="pg">
                <div className="pg-shell">
                    <Breadcrumb items={breadcrumbItems} />

                    <header className="pg-hero">
                        <p className="pg-hero-eyebrow">Catalogue</p>
                        <h1>La gamme ARTEM</h1>
                        <p className="pg-hero-lead">
                            Toiles enfourneur et de couche, tapis de façonneuse et de laminoir,
                            bandes transporteuses, élévateurs enfourneurs et produits inox.
                        </p>
                    </header>

                    <nav className="pg-toc" aria-label="Familles de produits">
                        <ul className="pg-toc-list">
                            {families.map((family) => (
                                <li key={family.id}>
                                    <a href={`#famille-${family.id}`} onClick={() => openFamily(family.id)}>
                                        {family.short}
                                        <span className="pg-count">{family.ranges.length}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                        <button type="button" className="pg-toc-toggle" onClick={toggleAll}>
                            {everythingOpen ? 'Tout replier' : 'Tout déplier'}
                        </button>
                    </nav>

                    {families.map((family) => (
                        <section
                            key={family.id}
                            id={`famille-${family.id}`}
                            className={`pg-family pg-accent--${family.accent}`}
                        >
                            <button
                                type="button"
                                className="pg-family-head"
                                onClick={() => toggle(family.id)}
                                aria-expanded={isOpen[family.id]}
                                aria-controls={`contenu-${family.id}`}
                            >
                                <h2>{family.label}</h2>
                                <span className="pg-family-head-meta">
                                    <span className="pg-count pg-count--solid">{family.ranges.length}</span>
                                    <Chevron open={isOpen[family.id]} />
                                </span>
                            </button>

                            <div
                                id={`contenu-${family.id}`}
                                className={isOpen[family.id] ? '' : 'pg-hidden'}
                            >
                                {family.subGroups
                                    ? family.subGroups.map((group) => (
                                        <SubGroup
                                            key={group.id}
                                            {...group}
                                            open={isOpen[group.id]}
                                            onToggle={toggle}
                                        />
                                    ))
                                    : <RangeGrid ranges={family.ranges} open={isOpen[family.id]} />}
                            </div>
                        </section>
                    ))}
                </div>
            </main>
        </>
    );
}
