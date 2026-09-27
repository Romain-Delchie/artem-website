import { useContext, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment/moment';
import AppContext from '../../context/AppContext';
import API from '../../utils/api/api';
import { ADMIN_GROUPS, Icon } from '../../components/Dashboard/adminNav';
import './AdminBoard.scss';

/**
 * Accueil du back-office.
 *
 * La page `/dashboard` affichait à l'administrateur les mêmes six cartes qu'au
 * client — « Mes informations », « Devis en cours », « Régler une facture » —
 * qui ne correspondent à aucune de ses tâches, pendant que ses douze outils
 * n'existaient que sous forme de liste à plat dans la colonne de gauche.
 *
 * Ce panneau remplace ces cartes pour les seuls administrateurs : d'abord des
 * chiffres qui disent où en est le site, puis les outils regroupés par domaine
 * (catalogue, vitrine, clients et devis), puis les derniers mouvements. La vue
 * du client, elle, reste strictement inchangée.
 */

const numberFormat = new Intl.NumberFormat('fr-FR');
const parseDate = (date) => moment(date, 'DD/MM/YYYY');
const isOrdered = (quotation) => Number(quotation.ordered) === 1;

/**
 * Met en forme un compteur. `undefined` signifie que la requête tourne encore,
 * `null` qu'elle a échoué : la tuile reste alors en place, sans chiffre faux.
 */
const formatCount = (value) => {
    if (value === null) return '—';
    if (value === undefined) return '…';
    return numberFormat.format(value);
};

/**
 * Renvoie la liste portée par une promesse tenue, `null` si elle a échoué.
 *
 * Les routes de l'API ne répondent pas toutes de la même façon : `/account/all`
 * et `/product` renvoient directement un tableau, tandis que `/quotation/all`
 * l'enveloppe dans `{ quotations: [...] }`. Le champ à extraire est donc donné
 * par l'appelant, et tout ce qui n'est pas un tableau est traité comme une
 * absence de donnée — sans quoi la mise en forme affichait « NaN ».
 */
const settledList = (result, key) => {
    if (result.status !== 'fulfilled') return null;
    const payload = key ? result.value.data?.[key] : result.value.data;
    return Array.isArray(payload) ? payload : null;
};

/** Longueur d'une liste, en laissant passer `null` et `undefined`. */
const countOf = (collection) => (Array.isArray(collection) ? collection.length : collection);

export default function AdminBoard() {
    const { user } = useContext(AppContext);
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!user.token) return undefined;
        let stillMounted = true;

        // Chacune des quatre sources alimente une tuile différente : une erreur
        // sur l'une d'elles ne doit pas vider tout le tableau de bord, d'où le
        // `allSettled` et le repli sur « — » tuile par tuile.
        Promise.allSettled([
            API.user.getAccounts(user.token),
            API.user.accountToValidate(user.token),
            API.quotation.getAllQuotations(user.token),
            API.product.getProducts(user.token),
        ]).then(([accounts, toValidate, quotations, products]) => {
            if (!stillMounted) return;
            setData({
                accounts: settledList(accounts),
                toValidate: settledList(toValidate),
                quotations: settledList(quotations, 'quotations'),
                products: settledList(products),
            });
            setIsLoading(false);
        });

        return () => {
            stillMounted = false;
        };
    }, [user.token]);

    const { accounts, toValidate, quotations, products } = data;

    const pendingQuotations = useMemo(() => {
        if (!Array.isArray(quotations)) return quotations;
        return quotations.filter((quotation) => !isOrdered(quotation)).length;
    }, [quotations]);

    const latestQuotations = useMemo(() => {
        if (!Array.isArray(quotations)) return [];
        return [...quotations]
            .sort((a, b) => parseDate(b.creation_date) - parseDate(a.creation_date))
            .slice(0, 5);
    }, [quotations]);

    const pendingAccounts = Array.isArray(toValidate) ? toValidate.slice(0, 4) : [];

    const stats = [
        { key: 'accounts', label: 'Comptes clients', value: countOf(accounts), icon: 'users', to: '/user-list' },
        {
            key: 'toValidate',
            label: 'Rôles à valider',
            value: countOf(toValidate),
            icon: 'clock',
            to: '/role-validation',
            alert: Array.isArray(toValidate) && toValidate.length > 0,
        },
        { key: 'quotations', label: 'Devis clients au total', value: countOf(quotations), icon: 'doc', to: '/quotation-list' },
        { key: 'pending', label: 'Devis non commandés', value: pendingQuotations, icon: 'cart', to: '/quotation-list' },
        { key: 'products', label: 'Produits au catalogue', value: countOf(products), icon: 'box', to: '/update-product' },
    ];

    return (
        <section className="admin-board" aria-labelledby="admin-board-title">
            <header className="admin-board-head">
                <p className="admin-board-head-eyebrow">Back-office Artem</p>
                <h2 id="admin-board-title">Tableau de bord</h2>
                <p className="admin-board-head-lede">
                    Bonjour {user.firstname}, voici l&apos;état du site et vos outils d&apos;administration.
                </p>
            </header>

            <ul className="admin-board-stats" aria-busy={isLoading}>
                {stats.map((stat) => (
                    <li key={stat.key}>
                        <Link
                            to={stat.to}
                            className={stat.alert ? 'admin-board-stat admin-board-stat--alert' : 'admin-board-stat'}
                        >
                            <span className="admin-board-stat-icon"><Icon name={stat.icon} /></span>
                            <span className="admin-board-stat-value">{formatCount(stat.value)}</span>
                            <span className="admin-board-stat-label">{stat.label}</span>
                        </Link>
                    </li>
                ))}
            </ul>

            <div className="admin-board-columns">
                <div className="admin-board-groups">
                    {ADMIN_GROUPS.map((group) => (
                        <article key={group.title} className="admin-board-group">
                            <h3>
                                <Icon name={group.icon} />
                                {group.title}
                            </h3>
                            <ul>
                                {group.links.map((link) => (
                                    <li key={link.to + link.label}>
                                        <Link to={link.to} className="admin-board-action">
                                            <Icon name={link.icon} />
                                            <span>{link.label}</span>
                                            <span className="admin-board-action-arrow"><Icon name="arrow" /></span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </article>
                    ))}
                </div>

                <aside className="admin-board-activity">
                    <article className="admin-board-panel">
                        <h3>Derniers devis</h3>
                        {isLoading && <p className="admin-board-empty">Chargement…</p>}
                        {!isLoading && latestQuotations.length === 0 && (
                            <p className="admin-board-empty">Aucun devis à afficher.</p>
                        )}
                        {latestQuotations.length > 0 && (
                            <ul className="admin-board-feed">
                                {latestQuotations.map((quotation) => (
                                    <li key={quotation.quotation_id}>
                                        {/* La liste des devis ouvre le détail dans sa propre fenêtre :
                                            on y renvoie plutôt que vers /quotation-list/:id, dont le
                                            composant attend un devis en propriété. */}
                                        <Link to="/quotation-list">
                                            <span className="admin-board-feed-main">
                                                <strong>N° {quotation.quotation_id}</strong>
                                                <span className="admin-board-feed-company">{quotation.account_company}</span>
                                            </span>
                                            <span className="admin-board-feed-meta">
                                                <span>{quotation.creation_date}</span>
                                                <span
                                                    className={
                                                        isOrdered(quotation)
                                                            ? 'admin-board-tag admin-board-tag--done'
                                                            : 'admin-board-tag'
                                                    }
                                                >
                                                    {isOrdered(quotation) ? 'Commandé' : 'En attente'}
                                                </span>
                                            </span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                        <Link to="/quotation-list" className="admin-board-panel-more">
                            Voir tous les devis <Icon name="arrow" />
                        </Link>
                    </article>

                    <article className="admin-board-panel">
                        <h3>Comptes en attente de rôle</h3>
                        {isLoading && <p className="admin-board-empty">Chargement…</p>}
                        {!isLoading && pendingAccounts.length === 0 && (
                            <p className="admin-board-empty">Aucun compte en attente.</p>
                        )}
                        {pendingAccounts.length > 0 && (
                            <ul className="admin-board-feed">
                                {pendingAccounts.map((account) => (
                                    <li key={account.id}>
                                        <Link to="/role-validation">
                                            <span className="admin-board-feed-main">
                                                <strong>{account.company}</strong>
                                                <span className="admin-board-feed-company">
                                                    {account.firstname} {account.lastname}
                                                </span>
                                            </span>
                                            <span className="admin-board-feed-meta">
                                                <span className="admin-board-tag admin-board-tag--todo">À valider</span>
                                            </span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                        <Link to="/role-validation" className="admin-board-panel-more">
                            Gérer les rôles <Icon name="arrow" />
                        </Link>
                    </article>
                </aside>
            </div>
        </section>
    );
}
