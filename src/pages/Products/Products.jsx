import './Products.scss'
import { useState, useEffect, useContext } from 'react'
import AppContext from '../../context/AppContext'
import Loading from '../../components/Loading/Loading'
import API from '../../utils/api/api'
import RangeCard from '../../components/RangeCard'
import Seo from '../../components/Seo/Seo'
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb'
import ProductsRedesign from './ProductsRedesign'
import { breadcrumbJsonLd } from '../../utils/seo/siteConfig'

/**
 * Arborescence de la gamme.
 *
 * Les listes de produits restent systématiquement présentes dans le HTML :
 * elles sont masquées en CSS quand l'accordéon est replié, et non démontées.
 * C'est indispensable au référencement — auparavant, les accordéons étant
 * fermés au chargement, aucun lien vers les pages gamme n'existait dans le
 * document et les moteurs de recherche ne pouvaient pas les découvrir.
 */

/** Chevron double, utilisé pour les grandes familles de la gamme. */
function DoubleChevron({ open }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
            stroke="currentColor" className="w-6 h-6" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round"
                d={open
                    ? "M4.5 12.75l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5"
                    : "M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5"} />
        </svg>
    );
}

/** Chevron simple, utilisé pour les sous-familles. */
function SingleChevron({ open }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
            stroke="currentColor" className="w-6 h-6" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round"
                d={open ? "M4.5 15.75l7.5-7.5 7.5 7.5" : "M19.5 8.25l-7.5 7.5-7.5-7.5"} />
        </svg>
    );
}

/** Liste de gammes, toujours rendue, masquée en CSS lorsqu'elle est repliée. */
function RangeList({ ranges, open }) {
    return (
        <ul className={`products-section-list${open ? '' : ' products-section-list--collapsed'}`}>
            {ranges.map((range) => (
                <RangeCard key={range.id} range={range} />
            ))}
        </ul>
    );
}

/** Sous-famille de la gamme boulangerie artisanale, titrée en h3. */
function SubSection({ id, label, modifier, ranges, open, onToggle }) {
    return (
        <section className={`products-section products-section-${modifier}`}>
            <button
                type="button"
                className="products-section-title"
                onClick={() => onToggle(id)}
                aria-expanded={open}
                aria-controls={`section-${id}`}
            >
                <SingleChevron open={open} />
                <h3>{label}</h3>
            </button>
            <div id={`section-${id}`}>
                <RangeList ranges={ranges} open={open} />
            </div>
        </section>
    );
}

export default function Products() {
    const { ranges, setRanges, user } = useContext(AppContext)
    // Les grandes familles sont dépliées au chargement : le visiteur voit
    // immédiatement l'étendue de la gamme plutôt qu'une liste de titres.
    const [isOpen, setIsOpen] = useState({
        artisanal: true, industriel: true, autre: true, feutre: true,
        chocolat: true, service: true, textile: true, bande: true,
        inox: true, meca: true,
    })
    const [isDataLoaded, setIsDataLoaded] = useState(false)

    const toggle = (key) => setIsOpen((prev) => ({ ...prev, [key]: !prev[key] }))

    useEffect(() => {
        API.range.getRanges()
            .then(res => setRanges(res.data.ranges))
            .catch(err => console.error(err))
            .finally(() => setIsDataLoaded(true))
    }, [])

    if (!isDataLoaded) {
        return <Loading />
    }

    // Proposition de refonte soumise à validation : seul un administrateur
    // connecté la voit. Le visiteur, le client et le commercial reçoivent la
    // page actuelle, inchangée. Le branchement est placé après les hooks pour
    // que leur ordre d'appel reste identique dans les deux cas.
    if (user.role === 'admin') {
        return <ProductsRedesign ranges={ranges} />
    }

    const byCategory = (category) => ranges.filter((range) => range.category === category)

    // La gamme industrielle regroupe la catégorie « indus » et deux produits
    // rattachés à d'autres catégories mais commercialisés en industriel.
    const industrialRanges = ranges.filter(
        (range) =>
            range.category === 'indus' ||
            range.name === 'Tapis de laminoir' ||
            range.name === 'Bande Façonnage',
    )

    const breadcrumbItems = [
        { name: 'Accueil', path: '/' },
        { name: 'Notre gamme', path: '/gamme' },
    ]

    const familyGroups = [
        {
            id: 'industriel',
            label: 'Notre gamme boulangerie industrielle',
            modifier: 'meca',
            ranges: industrialRanges,
        },
        {
            id: 'autre',
            label: 'Notre gamme bande transporteuse tout secteur',
            modifier: 'textile',
            ranges: byCategory('autre'),
        },
        {
            id: 'feutre',
            label: 'Notre gamme feutre industriel',
            modifier: 'textile',
            ranges: byCategory('feutre'),
        },
        {
            id: 'chocolat',
            label: 'Notre gamme bande de Chocolaterie/Biscuiterie',
            modifier: 'textile',
            ranges: byCategory('chocolat'),
        },
        {
            id: 'service',
            label: 'Nos services',
            modifier: 'textile',
            ranges: byCategory('service'),
        },
    ]

    const artisanalSubSections = [
        { id: 'textile', label: 'TEXTILES ET FEUTRES', modifier: 'textile', ranges: byCategory('textile') },
        { id: 'bande', label: 'BANDES TRANSPORTEUSES', modifier: 'bande', ranges: byCategory('bande') },
        { id: 'inox', label: 'AUTRES PRODUITS INOX', modifier: 'inox', ranges: byCategory('inox') },
        { id: 'meca', label: 'ELEVATEUR - ENFOURNEUR', modifier: 'meca', ranges: byCategory('meca') },
    ]

    return (
        <>
            <Seo
                title="Notre gamme : textiles et bandes transporteuses"
                description="Toute la gamme ARTEM : toiles enfourneur et de couche, tapis de façonneuse et de laminoir, bandes transporteuses, élévateurs enfourneurs et produits inox."
                path="/gamme"
                jsonLd={breadcrumbJsonLd(breadcrumbItems)}
            />
            <main className="products">
                <Breadcrumb items={breadcrumbItems} />
                <h1>LA GAMME ARTEM</h1>

                <button
                    type="button"
                    className="products-range-title"
                    onClick={() => toggle('artisanal')}
                    aria-expanded={isOpen.artisanal}
                    aria-controls="family-artisanal"
                >
                    <DoubleChevron open={isOpen.artisanal} />
                    <h2>Notre gamme boulangerie artisanale</h2>
                </button>
                <div
                    id="family-artisanal"
                    className={isOpen.artisanal ? '' : 'products-family--collapsed'}
                >
                    {artisanalSubSections.map((section) => (
                        <SubSection
                            key={section.id}
                            {...section}
                            open={isOpen[section.id]}
                            onToggle={toggle}
                        />
                    ))}
                </div>

                {familyGroups.map((family) => (
                    <div key={family.id}>
                        <button
                            type="button"
                            className="products-range-title"
                            onClick={() => toggle(family.id)}
                            aria-expanded={isOpen[family.id]}
                            aria-controls={`family-${family.id}`}
                        >
                            <DoubleChevron open={isOpen[family.id]} />
                            <h2>{family.label}</h2>
                        </button>
                        <section
                            id={`family-${family.id}`}
                            className={`products-section products-section-${family.modifier}`}
                        >
                            <RangeList ranges={family.ranges} open={isOpen[family.id]} />
                        </section>
                    </div>
                ))}
            </main>
        </>
    );
}
