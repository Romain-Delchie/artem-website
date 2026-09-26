import { useState, useEffect } from 'react';
import HomeCurrent from './HomeCurrent';
import Variant1Devis from './variants/Variant1Devis';
import Variant2Gamme from './variants/Variant2Gamme';
import Variant3Credibilite from './variants/Variant3Credibilite';
import Variant4Compte from './variants/Variant4Compte';
import './variants/variants.scss';
import './variants/variants-alt.scss';
import './HomeVariants.scss';

/**
 * Sélecteur des propositions de page d'accueil, réservé aux administrateurs.
 *
 * Les quatre propositions correspondent aux quatre rôles possibles de la page
 * d'accueil ; elles ne se distinguent pas par un habillage mais par ce qu'elles
 * mettent en premier et ce qu'elles reléguent. La position 0 affiche la page
 * actuellement en production, pour pouvoir comparer.
 *
 * Les positions 1 et 4 ont échangé leur axe en cours de revue : la 1 pousse
 * désormais la création de compte, la 4 la demande de devis. Les numéros sont
 * restés stables pour ne pas perdre le fil des échanges ; seuls les noms de
 * fichiers des composants gardent la trace de l'ancien découpage.
 *
 * Aucune de ces propositions n'est visible d'un visiteur ni d'un moteur de
 * recherche : Home.jsx n'instancie ce composant que pour un administrateur
 * connecté, et le pré-rendu s'exécute sans session.
 */

const VARIANTS = [
    {
        id: 0,
        short: 'Actuelle',
        label: 'Page actuellement en ligne',
        note: 'Ce que voient les visiteurs aujourd’hui.',
        Component: HomeCurrent,
    },
    {
        id: 1,
        short: 'Compte',
        label: 'Pousser la création de compte',
        note: 'Photographie de fournil. L’accroche met en avant l’accès direct aux tarifs ; le devis reste en second appel.',
        Component: Variant1Devis,
    },
    {
        id: 2,
        short: 'Gamme',
        label: 'Faire entrer dans la gamme',
        note: 'L’accueil est le catalogue : recherche immédiate et familles de produits dès le premier écran.',
        Component: Variant2Gamme,
    },
    {
        id: 3,
        short: 'Maison',
        label: 'Asseoir la crédibilité',
        note: 'L’atelier et les quarante ans d’histoire d’abord, la gamme seulement ensuite.',
        Component: Variant3Credibilite,
    },
    {
        id: 4,
        short: 'Devis',
        label: 'Déclencher une demande de devis',
        note: 'Aplat vert et studio en haute lumière. L’accroche demande une seule chose : décrivez votre pièce.',
        Component: Variant4Compte,
    },
];

const STORAGE_KEY = 'artem.home-variant';

export default function HomeVariants({ presentations }) {
    // Le choix est mémorisé pour que la navigation dans le site ne ramène pas
    // systématiquement à la première proposition. Le stockage local peut être
    // indisponible (navigation privée), d'où le try/catch.
    const [current, setCurrent] = useState(() => {
        try {
            const stored = Number(localStorage.getItem(STORAGE_KEY));
            return VARIANTS.some((variant) => variant.id === stored) ? stored : 1;
        } catch {
            return 1;
        }
    });
    const [open, setOpen] = useState(false);

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, String(current));
        } catch {
            // Sans stockage local, le choix vaut simplement pour cette page.
        }
    }, [current]);

    const active = VARIANTS.find((variant) => variant.id === current) || VARIANTS[1];
    const { Component } = active;

    return (
        <>
            <Component presentations={presentations} />

            <nav className={`hv${open ? ' hv--open' : ''}`} aria-label="Propositions de page d’accueil">
                <button
                    type="button"
                    className="hv-toggle"
                    onClick={() => setOpen((value) => !value)}
                    aria-expanded={open}
                >
                    <span className="hv-toggle-index">{active.id}</span>
                    <span className="hv-toggle-label">{active.short}</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
                        strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d={open ? 'm6 15 6-6 6 6' : 'm6 9 6 6 6-6'} />
                    </svg>
                </button>

                <div className="hv-panel" hidden={!open}>
                    <p className="hv-panel-intro">
                        Propositions de page d’accueil. Visibles uniquement par un
                        administrateur connecté.
                    </p>
                    <ul className="hv-list">
                        {VARIANTS.map((variant) => (
                            <li key={variant.id}>
                                <button
                                    type="button"
                                    className={`hv-item${variant.id === current ? ' hv-item--active' : ''}`}
                                    onClick={() => { setCurrent(variant.id); setOpen(false); }}
                                    aria-current={variant.id === current ? 'true' : undefined}
                                >
                                    <span className="hv-item-index">{variant.id}</span>
                                    <span className="hv-item-text">
                                        <strong>{variant.label}</strong>
                                        <em>{variant.note}</em>
                                    </span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>
        </>
    );
}
