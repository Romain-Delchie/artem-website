import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../../context/AppContext';
import { PAYMENT_URL, Icon } from '../../components/Dashboard/sideNav';
import './Board.scss';

/**
 * Tableau de bord du client.
 *
 * Quatre cartes de même largeur, deux par ligne sur un écran d'ordinateur :
 *
 *  - « Produits » : où chercher une pièce, et de quoi lancer un devis ;
 *  - « Mes devis » : les trois chiffres qui disent où en sont les demandes ;
 *  - « Mes devis en cours » : les derniers devis, et l'historique complet ;
 *  - « Mon compte » : les coordonnées, leur modification, et le paiement.
 *
 * Les versions précédentes séparaient les actions du compte de ses
 * informations, et les chiffres des devis de leur liste : chaque notion est
 * désormais dans une carte et une seule.
 *
 * La feuille de style est partagée avec le tableau de bord de
 * l'administration, pour que les deux espaces se ressemblent.
 */

/** Un devis est passé en commande quand `ordered` vaut 1. */
const isOrdered = (quotation) => Number(quotation.ordered) === 1;

/** Ligne d'action d'une carte : une icône, un libellé, une flèche au survol. */
function Action({ to, icon, label, external = false }) {
    return (
        <li>
            <Link
                to={to}
                className="board-action"
                {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
            >
                <Icon name={icon} />
                <span>{label}</span>
                <span className="board-action-arrow"><Icon name="arrow" /></span>
            </Link>
        </li>
    );
}

export default function ClientBoard() {
    const { user } = useContext(AppContext);

    // Un compte qui attend sa validation n'a accès ni aux tarifs ni aux devis.
    const isPendingAccount = user.profile_id === 3;
    const quotations = Array.isArray(user.quotations) ? user.quotations : [];
    const orderedCount = quotations.filter(isOrdered).length;
    const pendingCount = quotations.length - orderedCount;
    const address = user.billing_address || {};

    return (
        <section className="board" aria-labelledby="board-title">
            <header className="board-head">
                <p className="board-head-eyebrow">Espace client</p>
                <h2 id="board-title">Tableau de bord</h2>
                <p className="board-head-lede">
                    Bonjour {user.firstname}, voici vos produits, vos devis et votre compte.
                </p>
            </header>

            {isPendingAccount && (
                <p className="board-notice">
                    Votre compte vient d’être créé : l’accès aux tarifs et à l’outil de
                    devis en ligne s’ouvre sous un jour ouvré.
                </p>
            )}

            <div className="board-grid board-grid--duo">

                <article className="board-group">
                    <h3>
                        <Icon name="box" />
                        Produits
                    </h3>
                    <ul>
                        <Action to="/search-products" icon="search" label="Les produits Artem" />
                        <Action to="/tools" icon="tool" label="Mes outils" />
                        {!isPendingAccount && (
                            <Action to="/new-quote" icon="plus" label="Nouveau devis" />
                        )}
                    </ul>
                </article>

                {/* Les chiffres n'ont de sens qu'une fois le compte ouvert aux devis. */}
                {!isPendingAccount && (
                    <article className="board-group">
                        <h3>
                            <Icon name="gauge" />
                            Mes devis en chiffres
                        </h3>
                        {/* Chaque chiffre a sa couleur, reprise des étiquettes de la
                            liste voisine : le bleu de la marque pour le total, le vert
                            pour ce qui est allé jusqu'à la commande, l'ambre pour ce
                            qui attend encore. */}
                        <dl className="board-figures">
                            <div className="board-figure board-figure--total">
                                <dt>Devis au total</dt>
                                <dd>{quotations.length}</dd>
                            </div>
                            <div className="board-figure board-figure--done">
                                <dt>Passés en commande</dt>
                                <dd>{orderedCount}</dd>
                            </div>
                            <div className="board-figure board-figure--wait">
                                <dt>En attente</dt>
                                <dd>{pendingCount}</dd>
                            </div>
                        </dl>
                    </article>
                )}

                {!isPendingAccount && (
                    <article className="board-group">
                        <h3>
                            <Icon name="doc" />
                            Mes devis en cours
                        </h3>
                        {quotations.length === 0 ? (
                            <p className="board-empty">Vous n’avez pas encore de devis.</p>
                        ) : (
                            <ul className="board-feed">
                                {quotations.slice(0, 4).map((quotation) => (
                                    <li key={quotation.reference}>
                                        <Link to="/quote-history">
                                            <span className="board-feed-main">
                                                <strong>Réf. {quotation.reference}</strong>
                                                <span className="board-feed-company">
                                                    Créé le {quotation.creation_date}
                                                </span>
                                            </span>
                                            <span className="board-feed-meta">
                                                <span
                                                    className={isOrdered(quotation)
                                                        ? 'board-tag board-tag--done'
                                                        : 'board-tag'}
                                                >
                                                    {isOrdered(quotation) ? 'Commandé' : 'En attente'}
                                                </span>
                                            </span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                        <Link to="/quote-history" className="board-panel-more">
                            Historique des devis <Icon name="arrow" />
                        </Link>
                    </article>
                )}

                <article className="board-group">
                    <h3>
                        <Icon name="user" />
                        Mon compte
                    </h3>
                    <dl className="board-facts">
                        <div>
                            <dt>Société</dt>
                            <dd>{user.company}</dd>
                        </div>
                        <div>
                            <dt>Contact</dt>
                            <dd>{user.firstname} {user.lastname}</dd>
                        </div>
                        <div>
                            <dt>Courriel</dt>
                            <dd>{user.email}</dd>
                        </div>
                        <div>
                            <dt>Téléphone</dt>
                            <dd>{user.phone_number}</dd>
                        </div>
                        <div>
                            <dt>Facturation</dt>
                            <dd>
                                {address.street_address}
                                {address.street_address && <br />}
                                {address.zip_code} {address.city}
                            </dd>
                        </div>
                    </dl>
                    <ul className="board-card-actions">
                        <Action to="/user-informations" icon="pencil" label="Mes informations" />
                        <Action to={PAYMENT_URL} icon="card" label="Régler une facture en CB" external />
                    </ul>
                </article>
            </div>
        </section>
    );
}
