import React, { useState, useEffect, useContext, lazy, Suspense } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import API from '../../utils/api/api'
import AppContext from '../../context/AppContext'
import './Range.scss'
import Loading from '../../components/Loading/Loading'
import NotFound from '../NotFound/NotFound'
import Seo from '../../components/Seo/Seo'
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb'
import { getRangeSeo } from '/data/seo'
import { slugify } from '../../utils/seo/slugify'
import { SITE_URL, breadcrumbJsonLd } from '../../utils/seo/siteConfig'

// Le générateur PDF pèse plusieurs centaines de kilo-octets et n'est utilisé
// qu'à l'ouverture d'une fiche technique : il est chargé à la demande.
const TechSheetPdf = lazy(() => import('../../components/TechSheetPdf/TechSheetPdf'))

export default function Range() {
    const { user, ranges } = useContext(AppContext);
    const { slug } = useParams()
    const [range, setRange] = useState(null);
    const [notFound, setNotFound] = useState(false);
    const [modalOpenState, setModalOpenState] = useState({});

    // Les anciennes URLs de la forme /gamme/1/Toile%20enfourneur restent
    // valides : on identifie la gamme par son identifiant puis on redirige
    // vers l'URL canonique en slug.
    const isLegacyIdUrl = /^\d+$/.test(slug || '');

    const openModal = (techSheetId) => {
        setModalOpenState((prevState) => ({
            ...prevState,
            [techSheetId]: true,
        }));
    };

    const closeModal = (techSheetId) => {
        setModalOpenState((prevState) => ({
            ...prevState,
            [techSheetId]: false,
        }));
    };

    useEffect(() => {
        setNotFound(false);
        setRange(null);

        // L'URL contient un slug, mais la gamme se charge par identifiant.
        // On résout donc d'abord le slug en identifiant, à partir des gammes
        // déjà en mémoire si elles y sont, sinon via la liste.
        const resolveId = () => {
            if (isLegacyIdUrl) {
                return Promise.resolve(slug);
            }
            const findId = (list) => list.find((item) => slugify(item.name) === slug)?.id ?? null;
            if (ranges?.length) {
                return Promise.resolve(findId(ranges));
            }
            return API.range.getRanges().then((res) => findId(res.data.ranges));
        };

        resolveId()
            .then((id) => {
                if (!id) {
                    setNotFound(true);
                    return null;
                }
                // Toujours charger la gamme par cet endpoint : c'est le seul
                // qui renvoie les descriptions réelles des fiches techniques.
                // La liste, elle, les remplace par la chaîne « rt.name ».
                return API.range.getRange(id).then((res) => res.data.oneRange);
            })
            .then((found) => {
                if (!found) {
                    return;
                }
                setRange({ ...found, techSheets: JSON.parse(found.techSheets) });
            })
            .catch((err) => {
                console.error(err);
                setNotFound(true);
            });
    }, [slug, isLegacyIdUrl, ranges]);

    if (notFound) {
        return <NotFound />;
    }

    if (!range) {
        return <Loading />;
    }

    const canonicalSlug = slugify(range.name);

    if (isLegacyIdUrl) {
        return <Navigate to={`/gamme/${canonicalSlug}`} replace />;
    }

    // Un administrateur connecté voit aussi les textes en attente de validation,
    // ce qui permet de les faire relire sur le site réel. Le pré-rendu et les
    // robots d'indexation s'exécutent sans session : ils ne reçoivent que le
    // contenu déjà validé.
    const isAdmin = user.role === 'admin';
    const seo = getRangeSeo(canonicalSlug, { includePending: isAdmin });

    // Ce contenu attend une validation : il n'est affiché qu'à l'administrateur.
    // On le signale en rouge pour qu'il distingue d'un coup d'œil ce qui reste à
    // valider de ce qui est déjà en ligne. La classe n'est jamais rendue pour un
    // visiteur, puisque getRangeSeo ne lui renvoie alors aucun contenu.
    const pendingClass = seo.published === false ? ' range-pending' : '';
    const path = `/gamme/${canonicalSlug}`;
    const imageUrl = `/images/products/${range.image_link}`;
    const imageAlt = seo.imageAlt || `${range.name} ARTEM pour la boulangerie`;

    const breadcrumbItems = [
        { name: 'Accueil', path: '/' },
        { name: 'Notre gamme', path: '/gamme' },
        { name: range.name, path },
    ];

    const productJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: range.name,
        description: seo.description || range.description,
        image: `${SITE_URL}${imageUrl}`,
        category: range.category,
        brand: { '@type': 'Brand', name: 'ARTEM' },
        manufacturer: { '@id': `${SITE_URL}/#organization` },
        url: `${SITE_URL}${path}`,
        ...(range.minPrice
            ? {
                offers: {
                    '@type': 'AggregateOffer',
                    priceCurrency: 'EUR',
                    lowPrice: range.minPrice,
                    availability: 'https://schema.org/InStock',
                    seller: { '@id': `${SITE_URL}/#organization` },
                },
            }
            : {}),
    };

    const faqJsonLd = seo.faq?.length
        ? {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: seo.faq.map((item) => ({
                '@type': 'Question',
                name: item.question,
                acceptedAnswer: { '@type': 'Answer', text: item.answer },
            })),
        }
        : null;

    const renderTechSheet = (techSheet) => (
        <li className="range-sheet-container-item" key={techSheet.id}>
            <button className='range-sheet-container-item-link' onClick={() => openModal(techSheet.id)}>
                <img className='range-sheet-container-item-link-pdf' src={`/images/pdf.png`} alt={`Fiche technique PDF ${techSheet.name}`} loading="lazy" />
                {
                    techSheet.description.includes('lavable') &&
                    <img className='range-sheet-container-item-link-img' src={`/images/clean.png`} alt="Matière lavable, facile à nettoyer" loading="lazy" />
                }
                <div className='range-sheet-container-item-link-text'>
                    <p>{techSheet.name}</p>
                    <p>{techSheet.description}</p>
                </div>
            </button>
            {modalOpenState[techSheet.id] && (
                <div className="range-modal">
                    <Suspense fallback={<Loading />}>
                        <TechSheetPdf techSheet={techSheet} />
                    </Suspense>
                    <button className="range-modal-close" onClick={() => closeModal(techSheet.id)}>
                        X
                    </button>
                </div>
            )}
        </li>
    );

    const isFaconneuse = canonicalSlug === 'tapis-de-faconneuse';
    const faconneuseGroups = [
        { heading: 'Feutre sous tapis lourd et réception :', keyword: 'bavette' },
        { heading: 'Tapis lourd :', keyword: 'lourd' },
        { heading: 'Manchon de façonneuse artisanale :', keyword: 'manchon' },
        { heading: 'Bande pour façonneuse horizontale :', keyword: 'bande' },
    ];

    return (
        <>
            <Seo
                title={seo.title || range.name}
                description={seo.description || range.description?.slice(0, 160)}
                path={path}
                image={imageUrl}
                jsonLd={[productJsonLd, breadcrumbJsonLd(breadcrumbItems), faqJsonLd].filter(Boolean)}
            />
            <main className='range'>
                <Breadcrumb items={breadcrumbItems} />
                <h1>{range.name}</h1>
                <Link to="/gamme" className='range-return-products'>
                    <p>Retour à la gamme complète</p>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953l7.108-4.062A1.125 1.125 0 0121 8.688v8.123zM11.25 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953L9.567 7.71a1.125 1.125 0 011.683.977v8.123z" />
                    </svg>

                </Link>
                <img className='range-img' src={imageUrl} alt={imageAlt} width="600" height="400" />
                <p className='range-description'>{range.description}</p>

                {
                    seo.sections?.length > 0 &&
                    <section className={`range-content${pendingClass}`}>
                        {seo.sections.map((section) => (
                            <article className="range-content-block" key={section.heading}>
                                <h2>{section.heading}</h2>
                                {section.paragraphs.map((paragraph, index) => (
                                    <p key={index}>{paragraph}</p>
                                ))}
                            </article>
                        ))}
                    </section>
                }

                {
                    range.techSheets &&
                    <section className="range-sheet">

                        <h2>Fiche technique des différentes matières à télécharger :</h2>
                        <div className="range-sheet-legende">
                            <img className='range-sheet-img' src={`/images/clean.png`} alt="Pictogramme indiquant une matière lavable" loading="lazy" />
                            <p>: Facilité de nettoyage</p>
                        </div>
                        {
                            isFaconneuse &&
                            <div className='range-dought'>
                                {faconneuseGroups.map((group) => (
                                    <React.Fragment key={group.keyword}>
                                        <h3>{group.heading}</h3>
                                        <ul className="range-sheet-container">
                                            {range.techSheets
                                                .filter((ts) => ts.description.toLowerCase().includes(group.keyword))
                                                .map(renderTechSheet)}
                                        </ul>
                                    </React.Fragment>
                                ))}
                            </div>
                        }
                        {
                            !isFaconneuse &&
                            <ul className="range-sheet-container">
                                {range.techSheets.map(renderTechSheet)}
                            </ul>
                        }
                    </section>
                }

                {
                    seo.faq?.length > 0 &&
                    <section className={`range-faq${pendingClass}`}>
                        <h2>Questions fréquentes</h2>
                        <dl className="range-faq-list">
                            {seo.faq.map((item) => (
                                <div className="range-faq-list-item" key={item.question}>
                                    <dt>{item.question}</dt>
                                    <dd>{item.answer}</dd>
                                </div>
                            ))}
                        </dl>
                    </section>
                }

                {
                    !user.token &&
                    <div className="range-links">
                        <h2>Pour voir tous nos produits plus en détails :</h2>
                        <div className="range-link">
                            <Link className='range-link-btn' to='/connexion'>Connectez-vous</Link>
                            <p>ou</p>
                            <Link className='range-link-btn' to='/creer-un-compte'>Créez un compte</Link>
                        </div>
                    </div>
                }
            </main>
        </>
    )
}
