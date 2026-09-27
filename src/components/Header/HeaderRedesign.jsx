import { useState, useEffect, useRef, useContext } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import AppContext from '../../context/AppContext';
import artem from '/data/artem-data';
import './HeaderRedesign.scss';

/**
 * Proposition d'en-tête, affichée aux seuls administrateurs (voir Layout.jsx).
 *
 * L'en-tête actuel superpose deux systèmes de navigation : un menu burger, qui
 * reste burger même sur grand écran, et une rangée de boutons de compte. Le
 * visiteur doit donc ouvrir un menu pour accéder à la gamme, alors que la
 * place ne manque pas.
 *
 * Cette proposition les fusionne : une barre utilitaire fine pour le
 * téléphone et le paiement de facture, puis une barre principale avec la
 * navigation visible en grand écran et repliée en panneau sur mobile. Les
 * actions de compte sont regroupées à droite.
 */

/** Liens de navigation principaux, dans l'ordre du parcours attendu. */
const NAV_LINKS = [
    { to: '/', label: 'Accueil', end: true },
    { to: '/gamme', label: 'Notre gamme' },
    { to: '/entreprise', label: 'Notre entreprise' },
    { to: '/contact', label: 'Contact' },
];

const PAYMENT_URL = 'https://pay-pro.monetico.fr/artem/paiementenligne';

function Icon({ name }) {
    const paths = {
        phone: 'M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293a.75.75 0 0 1-.83.286 12.035 12.035 0 0 1-7.143-7.143.75.75 0 0 1 .286-.83l1.293-.97c.363-.271.527-.734.417-1.173L6.826 3.11A1.125 1.125 0 0 0 5.735 2.25H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z',
        card: 'M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z',
        login: 'M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25',
        logout: 'M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15',
        account: 'M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z',
    };
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
            strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d={paths[name]} />
        </svg>
    );
}

export default function HeaderRedesign() {
    const { user, logout } = useContext(AppContext);
    const location = useLocation();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const [compact, setCompact] = useState(false);
    const [hidden, setHidden] = useState(false);
    const headerRef = useRef(null);
    const lastY = useRef(0);
    const [height, setHeight] = useState(0);

    const isLogged = Boolean(user.token);

    // La barre ne s'efface pas tant que le panneau mobile est ouvert : le menu
    // deroulant disparaitrait avec elle.
    const isHidden = hidden && !menuOpen;

    /**
     * La barre est en position fixe et non collante : `#root` porte un
     * `overflow: hidden` dans la feuille globale, ce qui ancre tout élément
     * collant à ce conteneur plutôt qu'à la fenêtre. La barre disparaissait
     * donc au premier défilement sans jamais revenir.
     *
     * Elle s'efface quand on descend et réapparaît dès qu'on remonte, même au
     * milieu de la page : le visiteur retrouve la navigation sans avoir à
     * remonter jusqu'en haut.
     */
    useEffect(() => {
        const onScroll = () => {
            const y = window.scrollY;
            setCompact(y > 60);

            if (y < 90) {
                setHidden(false);
            } else if (y > lastY.current + 6) {
                setHidden(true);
            } else if (y < lastY.current - 6) {
                setHidden(false);
            }
            lastY.current = y;
        };
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    /**
     * Mesure la hauteur réelle de la barre et la publie en variable CSS.
     * Les pages s'en servent pour caler leur premier écran sur la hauteur
     * réellement disponible, et le cache ci-dessous réserve la place.
     */
    useEffect(() => {
        const node = headerRef.current;
        if (!node) return undefined;

        const measure = () => {
            const h = node.offsetHeight;
            setHeight(h);
            document.documentElement.style.setProperty('--hd-height', `${h}px`);
        };
        measure();

        const observer = new ResizeObserver(measure);
        observer.observe(node);
        return () => {
            observer.disconnect();
            document.documentElement.style.removeProperty('--hd-height');
        };
    }, []);

    /**
     * Publie la hauteur que la barre occupe *a l'ecran*, et non seulement sa
     * hauteur mesuree.
     *
     * `--hd-height` vaut la hauteur de la barre meme quand celle-ci s'est
     * effacee vers le haut : elle sert aux pages qui reservent sa place dans
     * le flux. La barre laterale de l'administrateur, elle, est fixee au haut
     * de la fenetre et doit se recaler sur ce qui est visible, sinon elle
     * garde en permanence une bande vide de la hauteur d'une barre absente.
     */
    useEffect(() => {
        document.documentElement.style.setProperty(
            '--hd-offset', isHidden ? '0px' : `${height}px`,
        );
        return () => document.documentElement.style.removeProperty('--hd-offset');
    }, [isHidden, height]);

    // Le menu se referme au changement de page.
    useEffect(() => { setMenuOpen(false); }, [location.pathname]);

    // Échap referme le panneau, comme attendu de tout menu déroulant.
    useEffect(() => {
        if (!menuOpen) return undefined;
        const onKey = (event) => { if (event.key === 'Escape') setMenuOpen(false); };
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, [menuOpen]);

    /**
     * Déconnexion volontaire.
     *
     * Le passage par une fonction intermédiaire n'est pas cosmétique : branché
     * directement sur le bouton, `logout` recevrait l'événement de clic comme
     * premier argument, que le contexte interprète comme `showAlert`. L'alerte
     * « votre session a expiré » se déclenchait donc à chaque déconnexion.
     *
     * La redirection vers l'accueil est nécessaire parce que les routes de
     * l'espace client disparaissent avec la session : rester sur place
     * renverrait vers une page introuvable.
     */
    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <>
        <header
            ref={headerRef}
            className={`hd${compact ? ' hd--compact' : ''}${isHidden ? ' hd--hidden' : ''}`}
        >

            {/* Barre utilitaire : ce qu'un client cherche sans vouloir naviguer. */}
            <div className="hd-utility">
                <div className="hd-utility-inner">
                    <a className="hd-utility-link" href={`tel:${artem.tel.replace(/\s/g, '')}`}>
                        <Icon name="phone" />
                        {artem.tel}
                    </a>
                    <span className="hd-utility-sep" aria-hidden="true" />
                    <span className="hd-utility-hours">Lundi au vendredi, 9h–13h et 14h–18h</span>
                    <a
                        className="hd-utility-link hd-utility-link--end"
                        href={PAYMENT_URL}
                        target="_blank"
                        rel="noreferrer"
                    >
                        <Icon name="card" />
                        Payer une facture
                    </a>
                </div>
            </div>

            <div className="hd-main">
                <div className="hd-main-inner">

                    <Link className="hd-brand" to="/">
                        <img
                            src="/images/logo2hdcarre.jpg"
                            alt=""
                            width="654"
                            height="654"
                        />
                        <span className="hd-brand-text">
                            <strong>ARTEM</strong>
                            <em>Textiles techniques et machines d’enfournement</em>
                        </span>
                    </Link>

                    <nav className="hd-nav" aria-label="Navigation principale">
                        <ul>
                            {NAV_LINKS.map((link) => (
                                <li key={link.to}>
                                    <NavLink
                                        to={link.to}
                                        end={link.end}
                                        className={({ isActive }) => `hd-nav-link${isActive ? ' hd-nav-link--active' : ''}`}
                                    >
                                        {link.label}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div className="hd-actions">
                        {!isLogged && (
                            <>
                                <Link className="hd-btn hd-btn--quiet" to="/connexion">
                                    <Icon name="login" />
                                    Se connecter
                                </Link>
                                <Link className="hd-btn hd-btn--primary" to="/creer-un-compte">
                                    Créer un compte
                                </Link>
                            </>
                        )}
                        {isLogged && (
                            <>
                                <Link className="hd-btn hd-btn--primary" to="/dashboard">
                                    <Icon name="account" />
                                    Mon espace
                                </Link>
                                <button type="button" className="hd-btn hd-btn--quiet" onClick={handleLogout}>
                                    <Icon name="logout" />
                                    Déconnexion
                                </button>
                            </>
                        )}
                    </div>

                    <button
                        type="button"
                        className={`hd-burger${menuOpen ? ' hd-burger--open' : ''}`}
                        onClick={() => setMenuOpen((value) => !value)}
                        aria-expanded={menuOpen}
                        aria-controls="hd-panel"
                        aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
                    >
                        <span /><span /><span />
                    </button>
                </div>
            </div>

            {/* Panneau mobile. Il reprend la navigation et les actions, pour
                qu'aucun lien ne soit accessible uniquement en grand écran. */}
            <div
                id="hd-panel"
                className={`hd-panel${menuOpen ? ' hd-panel--open' : ''}`}
                hidden={!menuOpen}
            >
                <nav aria-label="Navigation mobile">
                    <ul className="hd-panel-list">
                        {NAV_LINKS.map((link) => (
                            <li key={link.to}>
                                <NavLink
                                    to={link.to}
                                    end={link.end}
                                    className={({ isActive }) => `hd-panel-link${isActive ? ' hd-panel-link--active' : ''}`}
                                >
                                    {link.label}
                                </NavLink>
                            </li>
                        ))}
                        <li>
                            <a className="hd-panel-link" href={PAYMENT_URL} target="_blank" rel="noreferrer">
                                Payer une facture
                            </a>
                        </li>
                    </ul>
                </nav>

                <div className="hd-panel-actions">
                    {!isLogged && (
                        <>
                            <Link className="hd-btn hd-btn--primary" to="/creer-un-compte">Créer un compte</Link>
                            <Link className="hd-btn hd-btn--outline" to="/connexion">Se connecter</Link>
                        </>
                    )}
                    {isLogged && (
                        <>
                            <Link className="hd-btn hd-btn--primary" to="/dashboard">Mon espace</Link>
                            <button type="button" className="hd-btn hd-btn--outline" onClick={handleLogout}>
                                Déconnexion
                            </button>
                        </>
                    )}
                </div>

                <a className="hd-panel-phone" href={`tel:${artem.tel.replace(/\s/g, '')}`}>
                    <Icon name="phone" />
                    {artem.tel}
                </a>
            </div>
        </header>
        {/* Réserve la hauteur de la barre, qui n'occupe plus le flux. */}
        <div className="hd-spacer" style={{ height }} aria-hidden="true" />
        </>
    );
}
