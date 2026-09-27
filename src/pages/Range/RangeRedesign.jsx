import React, { useState, lazy, Suspense } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb'
import Loading from '../../components/Loading/Loading'
import './RangeRedesign.scss'

// Le générateur PDF pèse plusieurs centaines de kilo-octets et n'est utilisé
// qu'à l'ouverture d'une fiche technique : il est chargé à la demande.
const TechSheetPdf = lazy(() => import('../../components/TechSheetPdf/TechSheetPdf'))

/**
 * Proposition de refonte d'une page gamme, affichée aux seuls administrateurs
 * (voir Range.jsx, qui garde le chargement de la gamme et les balises SEO).
 *
 * La page actuelle empile le titre, une image, la description sur un aplat vert
 * pleine largeur, puis le contenu éditorial et les fiches techniques, le tout
 * en colonne centrée de 800 px. Le bouton « Retour à la gamme complète » est
 * fixé à `top: 210px`, valeur calée sur la hauteur de l'ancien en-tête : avec
 * l'en-tête refondu, il flotte au milieu du contenu.
 *
 * Cette proposition suit la charte des autres pages refondues — fond gris
 * clair, surfaces blanches bordées, encre bleue, vert en accent :
 *  - une ouverture en deux colonnes, l'image à sa vraie taille et la
 *    description à côté, plutôt qu'un aplat vert sur toute la largeur ;
 *  - le retour à la gamme redevient un lien dans le fil du contenu, sous le
 *    fil d'Ariane, au lieu d'un bouton flottant mal calé ;
 *  - le contenu éditorial en colonne de lecture, les fiches techniques en
 *    grille de cartes, les questions fréquentes en accordéon ;
 *  - les textes en attente de validation restent en rouge, à l'identique :
 *    c'est ce qui permet de distinguer d'un coup d'œil ce qui reste à relire.
 */

/** Groupes de fiches techniques propres au tapis de façonneuse. */
const FACONNEUSE_GROUPS = [
    { heading: 'Feutre sous tapis lourd et réception', keyword: 'bavette' },
    { heading: 'Tapis lourd', keyword: 'lourd' },
    { heading: 'Manchon de façonneuse artisanale', keyword: 'manchon' },
    { heading: 'Bande pour façonneuse horizontale', keyword: 'bande' },
]

export default function RangeRedesign({
    range,
    seo,
    slug,
    imageUrl,
    imageAlt,
    breadcrumbItems,
    pending,
    isLogged,
}) {
    const [openSheets, setOpenSheets] = useState({})

    const openModal = (id) => setOpenSheets((prev) => ({ ...prev, [id]: true }))
    const closeModal = (id) => setOpenSheets((prev) => ({ ...prev, [id]: false }))

    // Classe des blocs en attente de validation. Elle n'est jamais rendue pour
    // un visiteur : getRangeSeo ne lui renvoie alors aucun contenu en attente.
    const pendingClass = pending ? ' rg-pending' : ''

    const isFaconneuse = slug === 'tapis-de-faconneuse'

    const renderSheet = (techSheet) => (
        <li className="rg-sheet" key={techSheet.id}>
            <button type="button" className="rg-sheet-btn" onClick={() => openModal(techSheet.id)}>
                <img
                    className="rg-sheet-icon"
                    src="/images/pdf.png"
                    alt={`Fiche technique PDF ${techSheet.name}`}
                    loading="lazy"
                />
                <span className="rg-sheet-text">
                    <span className="rg-sheet-name">{techSheet.name}</span>
                    <span className="rg-sheet-desc">{techSheet.description}</span>
                </span>
                {techSheet.description.includes('lavable') && (
                    <img
                        className="rg-sheet-clean"
                        src="/images/clean.png"
                        alt="Matière lavable, facile à nettoyer"
                        loading="lazy"
                    />
                )}
            </button>

            {openSheets[techSheet.id] && (
                <div className="rg-modal">
                    <Suspense fallback={<Loading />}>
                        <TechSheetPdf techSheet={techSheet} />
                    </Suspense>
                    <button
                        type="button"
                        className="rg-modal-close"
                        onClick={() => closeModal(techSheet.id)}
                        aria-label="Fermer la fiche technique"
                    >
                        ✕
                    </button>
                </div>
            )}
        </li>
    )

    return (
        <main className="rg">
            <div className="rg-shell">
                <Breadcrumb items={breadcrumbItems} />

                <Link className="rg-back" to="/gamme">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
                        strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M19 12H5m6-6-6 6 6 6" />
                    </svg>
                    Retour à la gamme complète
                </Link>

                <header className="rg-hero">
                    <figure className="rg-hero-media">
                        <img src={imageUrl} alt={imageAlt} width="600" height="400" />
                    </figure>
                    <div className="rg-hero-text">
                        <p className="rg-hero-eyebrow">Notre gamme</p>
                        <h1>{range.name}</h1>
                        <p className="rg-hero-desc">{range.description}</p>
                    </div>
                </header>

                {seo.sections?.length > 0 && (
                    <section className={`rg-panel rg-content${pendingClass}`}>
                        {pending && <p className="rg-pending-flag">Texte en attente de validation</p>}
                        {seo.sections.map((section) => (
                            <article className="rg-content-block" key={section.heading}>
                                <h2>{section.heading}</h2>
                                {section.paragraphs.map((paragraph, index) => (
                                    <p key={index}>{paragraph}</p>
                                ))}
                            </article>
                        ))}
                    </section>
                )}

                {range.techSheets && (
                    <section className="rg-panel rg-sheets" aria-labelledby="rg-sheets-title">
                        <h2 id="rg-sheets-title">Fiches techniques des matières</h2>
                        <p className="rg-sheets-legend">
                            <img src="/images/clean.png" alt="Pictogramme indiquant une matière lavable" loading="lazy" />
                            Facilité de nettoyage
                        </p>

                        {isFaconneuse
                            ? FACONNEUSE_GROUPS.map((group) => {
                                const sheets = range.techSheets.filter((sheet) =>
                                    sheet.description.toLowerCase().includes(group.keyword))
                                if (sheets.length === 0) return null
                                return (
                                    <React.Fragment key={group.keyword}>
                                        <h3>{group.heading}</h3>
                                        <ul className="rg-sheets-list">{sheets.map(renderSheet)}</ul>
                                    </React.Fragment>
                                )
                            })
                            : <ul className="rg-sheets-list">{range.techSheets.map(renderSheet)}</ul>}
                    </section>
                )}

                {seo.faq?.length > 0 && (
                    <section className={`rg-panel rg-faq${pendingClass}`} aria-labelledby="rg-faq-title">
                        <h2 id="rg-faq-title">Questions fréquentes</h2>
                        {pending && <p className="rg-pending-flag">Texte en attente de validation</p>}
                        <dl className="rg-faq-list">
                            {seo.faq.map((item) => (
                                <div className="rg-faq-item" key={item.question}>
                                    <dt>{item.question}</dt>
                                    <dd>{item.answer}</dd>
                                </div>
                            ))}
                        </dl>
                    </section>
                )}

                {!isLogged && (
                    <section className="rg-panel rg-cta">
                        <h2>Voir les prix et commander</h2>
                        <p>
                            Les tarifs de la gamme standard et l’édition de devis sont
                            accessibles depuis un compte professionnel.
                        </p>
                        <div className="rg-cta-actions">
                            <Link className="rg-btn" to="/creer-un-compte">Créer un compte</Link>
                            <Link className="rg-btn rg-btn--ghost" to="/connexion">Se connecter</Link>
                        </div>
                    </section>
                )}
            </div>
        </main>
    )
}
