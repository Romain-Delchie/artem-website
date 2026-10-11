import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import AppContext from '../../context/AppContext'
import API from '../../utils/api/api'
import Loading from '../../components/Loading/Loading'
import Seo from '../../components/Seo/Seo'
import {
    Icon, useRanges, featuredRanges, SectionHead, RangeCard, RangeLinks,
    Compatibility, ContactBlock, ACCOUNT_BENEFITS,
} from './HomeSections'
import { SITE_URL, organizationJsonLd, localBusinessJsonLd } from '../../utils/seo/siteConfig'
import './Home.scss'

/**
 * Page d'accueil.
 *
 * Le visiteur arrive le plus souvent parce qu'une pièce a lâché, et la page le
 * reconnaît : photographie de fournil, gamme en vignettes, preuve de
 * compatibilité avec les matériels du marché. Ce qu'elle met en premier, c'est
 * l'accès direct aux tarifs par un compte professionnel ; la demande de devis
 * vient en second appel.
 *
 * Cette mise en page a été comparée à quatre autres sur le site même, puis
 * validée par la direction. Les propositions écartées et la page qu'elles
 * remplaçaient ont été supprimées ; l'historique git les conserve.
 *
 * Les briques employées par plusieurs sections — icônes, en-tête de section,
 * vignette de gamme, tableau de compatibilité, bloc de contact — sont dans
 * `HomeSections.jsx`, et toute la feuille de style de la page dans `Home.scss`.
 */

// Déclare le site lui-même, ce qui permet à Google d'afficher un champ de
// recherche interne dans ses résultats et de rattacher toutes les pages
// à l'entreprise décrite par organizationJsonLd.
const webSiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: 'ARTEM',
    inLanguage: 'fr-FR',
    publisher: { '@id': `${SITE_URL}/#organization` },
};

/** Les trois temps d'une demande de devis, du plus simple au plus précis. */
const QUOTE_STEPS = [
    {
        title: 'Dites-nous votre machine',
        body: "La marque et le modèle de votre four, de votre façonneuse ou de votre laminoir suffisent le plus souvent : nous disposons des cotes de la plupart des matériels du marché.",
    },
    {
        title: 'Relevez les cotes, ou photographiez',
        body: "Largeur utile, développé total, type de fixation. Si vous avez un doute, une photo de la pièce usée en place nous permet presque toujours de l'identifier.",
    },
    {
        title: 'Nous confectionnons à vos dimensions',
        body: "La pièce est fabriquée dans notre atelier de Montévrain, aux cotes relevées. Pour les convoyeurs qui ne se démontent pas, nos techniciens se déplacent pour la jonction sur site.",
    },
];

export default function Home() {
    const [isLoaded, setIsLoaded] = useState(false)
    const [presentations, setPresentations] = useState()
    const { ranges, loaded } = useRanges()
    const { user } = useContext(AppContext)

    useEffect(() => {
        API.presentation.getPresentations()
            .then((res) => {
                setPresentations(res.data)
                setIsLoaded(true)
            })
            .catch((err) => console.log(err))
    }, [])

    if (!isLoaded) {
        return <Loading />
    }

    const featured = featuredRanges(ranges);
    const featuredIds = new Set(featured.map((range) => range.id));
    const others = ranges
        .filter((range) => !featuredIds.has(range.id) && range.category !== 'service')
        .sort((a, b) => a.name.localeCompare(b.name, 'fr'));
    const services = ranges.filter((range) => range.category === 'service');
    const intro = presentations?.[0];

    /*
     * Les appels à l'action de la page dépendent de la session.
     *
     * Un visiteur se voit proposer de créer un compte ; un client déjà
     * connecté n'a que faire de cette proposition et reçoit à la place les
     * chemins de son espace. Deux restrictions s'y ajoutent :
     *
     *  - `hasWorkspace` : seuls les rôles `user` et `admin` disposent des
     *    routes « nouveau devis », « historique » et « outils ». Les proposer
     *    à un autre rôle mènerait sur une page introuvable ;
     *  - `isPendingAccount` : un compte tout juste créé (`profile_id` 3)
     *    attend un jour ouvré avant d'accéder aux tarifs et aux devis. On ne
     *    lui montre donc ni l'un ni l'autre.
     */
    const isLogged = Boolean(user.token);
    const hasWorkspace = user.role === 'user' || user.role === 'admin';
    const isPendingAccount = user.profile_id === 3;

    const shortcuts = [];
    if (isLogged) {
        if (isPendingAccount) {
            shortcuts.push({
                to: '/dashboard',
                title: 'Mon espace',
                body: 'Vos informations et l’avancement de votre compte.',
            });
        }
        shortcuts.push({
            to: '/search-products',
            title: 'Les produits ARTEM',
            body: isPendingAccount
                ? 'Parcourez le catalogue ; les tarifs s’afficheront à l’activation de votre compte.'
                : 'Retrouvez une référence et son tarif en quelques secondes.',
        });
        if (hasWorkspace && !isPendingAccount) {
            shortcuts.push(
                {
                    to: '/new-quote',
                    title: 'Nouveau devis',
                    body: 'Composez un devis et transformez-le en commande quand vous le décidez.',
                },
                {
                    to: '/quote-history',
                    title: 'Mes devis en cours',
                    body: 'Reprenez une demande ou recommandez une pièce déjà chiffrée.',
                },
            );
        }
        if (hasWorkspace) {
            shortcuts.push({
                to: '/tools',
                title: 'Mes outils',
                body: 'Plans de prise de cotes et aide à la définition d’une toile enfourneur.',
            });
        }
    }

    return (
        <>
            <Seo
                path="/"
                jsonLd={[organizationJsonLd, localBusinessJsonLd, webSiteJsonLd]}
            />
            <main className="hr">

                <section className="hr-hero">
                    <div className="hr-hero-media" aria-hidden="true" />
                    <div className="hr-hero-inner">
                        <h1 className="hr-hero-title">
                            Le fabricant de vos toiles,<br />
                            <em>tapis et bandes de fournil</em>
                        </h1>
                        <p className="hr-hero-lead">
                            Depuis plus de quarante ans, nous confectionnons dans notre atelier
                            de Montévrain les pièces d’usure des boulangeries françaises, aux
                            cotes de votre matériel et pour toutes les marques.
                            {isLogged
                                ? ' Vos tarifs et vos devis sont dans votre espace.'
                                : ' Avec un compte professionnel, vous accédez directement aux tarifs et éditez vos devis vous-même.'}
                        </p>
                        <div className="hr-hero-actions">
                            {!isLogged && (
                                <>
                                    <Link className="hr-btn hr-btn--primary" to="/creer-un-compte">
                                        Créer mon compte
                                        <Icon name="arrow" />
                                    </Link>
                                    <Link className="hr-btn hr-btn--ghost" to="/connexion">
                                        J’ai déjà un compte
                                    </Link>
                                </>
                            )}
                            {isLogged && isPendingAccount && (
                                <>
                                    <Link className="hr-btn hr-btn--primary" to="/dashboard">
                                        Mon espace
                                        <Icon name="arrow" />
                                    </Link>
                                    {hasWorkspace && (
                                        <Link className="hr-btn hr-btn--ghost" to="/tools">
                                            Mes outils
                                        </Link>
                                    )}
                                </>
                            )}
                            {isLogged && !isPendingAccount && (
                                <>
                                    <Link className="hr-btn hr-btn--primary" to="/search-products">
                                        Rechercher un produit
                                        <Icon name="arrow" />
                                    </Link>
                                    <Link className="hr-btn hr-btn--ghost" to="/dashboard">
                                        Mon espace
                                    </Link>
                                </>
                            )}
                        </div>
                        <dl className="hr-hero-proof">
                            <div>
                                <dt>Plus de 40 ans</dt>
                                <dd>sur le marché des textiles techniques</dd>
                            </div>
                            <div>
                                <dt>Production interne</dt>
                                <dd>la majorité de nos produits, contrôlés par nos soins</dd>
                            </div>
                            <div>
                                <dt>Toutes marques</dt>
                                <dd>et confection sur mesure pour le reste</dd>
                            </div>
                        </dl>
                    </div>
                </section>

                <section className="hr-range">
                    <SectionHead title="Quelle pièce cherchez-vous ?">
                        Les pièces que l’on nous demande le plus souvent, en photo. Le
                        catalogue complet compte {ranges.length || 36} gammes, du textile de
                        fournil à la bande transporteuse et aux machines d’enfournement.
                    </SectionHead>

                    {!loaded && <p className="hr-range-loading">Chargement de la gamme…</p>}

                    {featured.length > 0 && (
                        <ul className="hr-range-grid">
                            {featured.map((range) => <RangeCard key={range.id} range={range} />)}
                        </ul>
                    )}

                    {others.length > 0 && (
                        <div className="hr-range-rest">
                            <h3>Le reste du catalogue</h3>
                            <RangeLinks ranges={others} />
                        </div>
                    )}

                    {services.length > 0 && (
                        <div className="hr-range-rest">
                            <h3>Nos interventions</h3>
                            <RangeLinks ranges={services} />
                        </div>
                    )}
                </section>

                <Compatibility />

                <section className="hr-steps">
                    <SectionHead title="Obtenir un devis">
                        Ce qu’il nous faut pour vous répondre précisément, du plus simple au plus précis.
                    </SectionHead>
                    <ol className="hr-steps-list">
                        {QUOTE_STEPS.map((step, index) => (
                            <li key={step.title}>
                                <span className="hr-steps-rank">{index + 1}</span>
                                <h3>{step.title}</h3>
                                <p>{step.body}</p>
                            </li>
                        ))}
                    </ol>
                    <Link className="hr-btn hr-btn--primary" to="/contact">
                        Envoyer ma demande
                        <Icon name="arrow" />
                    </Link>
                </section>

                {/* L'espace client est posé juste après le chemin vers le devis :
                    les deux appels à l'action se répondent, demander un devis ou
                    obtenir les prix soi-même. Pour un client déjà connecté, le
                    même bandeau devient la liste des chemins de son espace. */}
                <section className="hr-account">
                    {isLogged ? (
                        <>
                            <SectionHead title="Votre espace, en un clic" light>
                                {isPendingAccount
                                    ? 'Votre compte vient d’être créé : l’accès aux tarifs et aux devis s’ouvre sous un jour ouvré.'
                                    : 'Vos tarifs, vos devis et vos outils, sans attendre notre retour.'}
                            </SectionHead>
                            <ul className="hr-account-list hr-account-list--links">
                                {shortcuts.map((shortcut) => (
                                    <li key={shortcut.to}>
                                        <Link className="hr-account-link" to={shortcut.to}>
                                            <h3>
                                                {shortcut.title}
                                                <Icon name="arrow" className="hr-account-arrow" />
                                            </h3>
                                            <p>{shortcut.body}</p>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </>
                    ) : (
                        <>
                            <SectionHead title="Ou obtenez vos prix vous-même" light>
                                Un compte professionnel vous donne la main sur les tarifs, les devis
                                et les commandes, sans attendre notre retour.
                            </SectionHead>
                            <ul className="hr-account-list">
                                {ACCOUNT_BENEFITS.map((benefit) => (
                                    <li key={benefit.title}>
                                        <h3>{benefit.title}</h3>
                                        <p>{benefit.body}</p>
                                    </li>
                                ))}
                            </ul>
                            <Link className="hr-btn hr-btn--primary" to="/creer-un-compte">
                                Créer mon compte
                                <Icon name="arrow" />
                            </Link>
                        </>
                    )}
                </section>

                {intro && (
                    <section className="hr-about">
                        <div className="hr-about-text">
                            <h2>{intro.title}</h2>
                            {intro.paragraph.split('\n').filter(Boolean).slice(0, 2).map((para, i) => (
                                <p key={i}>{para}</p>
                            ))}
                            <Link className="hr-link" to="/entreprise">
                                Notre histoire et notre atelier
                                <Icon name="arrow" />
                            </Link>
                        </div>
                        <figure className="hr-about-media">
                            <img
                                src="/images/couture.jpg"
                                alt="Atelier de confection ARTEM : couture des toiles techniques"
                                loading="lazy"
                                width="520"
                                height="400"
                            />
                            <figcaption>Notre atelier de confection, à Montévrain.</figcaption>
                        </figure>
                    </section>
                )}

                <ContactBlock />
            </main>
        </>
    )
}
