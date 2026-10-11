import { useContext, useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import AppContext from '../../context/AppContext'
import fetchData from '../../utils/fetchData'
import Loading from '../Loading/Loading'
import ValidationEmail from '../../pages/ValidationEmail/ValidationEmail'
import {
    ADMIN_GROUPS, ADMIN_HOME, CLIENT_GROUPS, CLIENT_HOME, Icon,
} from './sideNav'
import './DashboardComponent.scss'

/**
 * Colonne de navigation des espaces connectés, client comme administrateur.
 *
 * Les deux colonnes étaient différentes : celle du client alignait sept
 * boutons en pilule dans une hauteur fixe de 600 px, celle de l'administrateur
 * avait été refaite en liste rangée par domaine. Elles n'en font plus qu'une,
 * nourrie par deux configurations de liens (voir sideNav.jsx) : même forme,
 * même comportement, seuls les liens et l'intitulé de l'en-tête changent.
 *
 * La colonne est fixée à la fenêtre et réserve la hauteur que l'en-tête occupe
 * réellement — il se resserre puis s'efface au défilement. Elle ne peut pas
 * être simplement collante : `#root` porte un `overflow: hidden` qui ancre
 * tout élément collant à ce conteneur, lequel ne défile pas.
 */

/** Classe d'un lien de la colonne, selon qu'il est actif ou non. */
const navLinkClass = ({ isActive }) =>
    isActive ? 'side-nav-link side-nav-link--active' : 'side-nav-link';

/**
 * Un lien de la colonne. Les liens sortants — le paiement en ligne — ne sont
 * pas des routes de l'application : ils ne peuvent pas être « actifs », et
 * s'ouvrent dans un nouvel onglet.
 */
function SideNavLink({ link, badge }) {
    const content = (
        <>
            <Icon name={link.icon} />
            <span>{link.label}</span>
            {badge > 0 && <span className="side-nav-badge">{badge}</span>}
        </>
    );

    if (link.external) {
        return (
            <Link className="side-nav-link" to={link.to} target="_blank" rel="noreferrer">
                {content}
            </Link>
        );
    }

    return (
        <NavLink className={navLinkClass} to={link.to}>
            {content}
        </NavLink>
    );
}

function SideNav({ user, eyebrow, home, groups, label, restricted, notice }) {
    const { pathname } = useLocation();

    return (
        <>
        {/* Sur téléphone, la colonne est masquée : ce lien, affiché seulement
            là, ramène au tableau de bord, qui reprend tous ses liens. Inutile
            sur le tableau de bord lui-même. */}
        {pathname !== home.to && (
            <Link className="side-nav-back" to={home.to}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M15 18l-6-6 6-6" />
                </svg>
                {home.label}
            </Link>
        )}
        <section className="dashboard-component">
            <div className="dashboard-component-container side-nav">
                <header className="side-nav-head">
                    <p className="side-nav-head-eyebrow">{eyebrow}</p>
                    <p className="side-nav-head-company">{user.company}</p>
                    <p className="side-nav-head-hello">Bonjour {user.firstname} 👋</p>
                </header>

                {notice && <p className="side-nav-notice">{notice}</p>}

                <nav className="side-nav-body" aria-label={label}>
                    <NavLink end className={navLinkClass} to={home.to}>
                        <Icon name={home.icon} />
                        <span>{home.label}</span>
                    </NavLink>

                    {groups.map((group) => {
                        // Un compte en attente de validation ne reçoit ni les
                        // tarifs ni les devis : un groupe qui n'en contiendrait
                        // plus que ceux-là disparaît entièrement.
                        const links = restricted
                            ? group.links.filter((link) => !link.restricted)
                            : group.links;
                        if (links.length === 0) return null;

                        return (
                            <div className="side-nav-group" key={group.title}>
                                <p className="side-nav-group-title">{group.title}</p>
                                <ul>
                                    {links.map((link) => (
                                        <li key={link.to + link.label}>
                                            <SideNavLink
                                                link={link}
                                                badge={link.badge === 'quotations' ? user.quotations?.length : 0}
                                            />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        );
                    })}
                </nav>
            </div>
        </section>
        </>
    )
}

export default function DashboardComponent() {
    const { user, updateUser } = useContext(AppContext);
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    useEffect(() => {
        fetchData(user, updateUser); // Appeler la fonction pour récupérer les données
        setIsDataLoaded(true);
    }, [user.token, updateUser]);

    if (!isDataLoaded) {
        return <Loading />
    }
    if (isDataLoaded && !user.verified && user.token) {
        return <ValidationEmail />
    }

    if (user.role === 'admin') {
        return (
            <SideNav
                user={user}
                eyebrow="Back-office"
                home={ADMIN_HOME}
                groups={ADMIN_GROUPS}
                label="Administration du site"
            />
        )
    }

    return (
        <SideNav
            user={user}
            eyebrow="Espace client"
            home={CLIENT_HOME}
            groups={CLIENT_GROUPS}
            label="Votre espace client"
            restricted={user.profile_id === 3}
            notice={user.profile_id === 3
                ? 'Votre compte vient d’être créé : l’accès aux tarifs et aux devis s’ouvre sous un jour ouvré.'
                : null}
        />
    )
}
