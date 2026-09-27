import { Link } from 'react-router-dom'
import Seo from '../../components/Seo/Seo'
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb'
import { breadcrumbJsonLd } from '../../utils/seo/siteConfig'
import './CompanyRedesign.scss'

/**
 * Proposition de refonte de la page « Notre entreprise », affichée aux seuls
 * administrateurs (voir Company.jsx).
 *
 * La page actuelle présente trois paragraphes justifiés autour d'une vignette
 * ronde de 100 px flottée à gauche ou à droite, séparés par des filets verts,
 * puis l'historique sous forme de liste à puces. Les photographies de l'atelier
 * y sont trop petites pour montrer quoi que ce soit, le texte justifié creuse
 * des lézardes sur les lignes courtes, et l'histoire de la maison — qui est
 * l'argument le plus fort de la page — se lit comme un pense-bête.
 *
 * Cette proposition garde le texte tel quel, à quelques coquilles près, et
 * revoit la forme :
 *  - trois sections en deux colonnes qui alternent, avec la photographie à sa
 *    vraie taille : on voit enfin l'atelier de couture et la façade ;
 *  - le texte en drapeau sur une largeur de lecture limitée, plutôt que
 *    justifié sur toute la page ;
 *  - l'histoire devient une frise verticale, chaque date lisible d'un coup
 *    d'œil, ce qui donne à voir la continuité de la maison depuis 1982 ;
 *  - un titre de niveau 1 visible, là où la page actuelle le masque pour les
 *    seuls moteurs de recherche.
 */

const breadcrumbItems = [
    { name: 'Accueil', path: '/' },
    { name: 'Notre entreprise', path: '/entreprise' },
]

/** Les trois volets de la présentation, dans l'ordre de la page actuelle. */
const SECTIONS = [
    {
        id: 'savoir-faire',
        title: 'Notre savoir-faire',
        image: '/images/couture.jpg',
        alt: "Atelier de couture ARTEM : confection de textiles techniques pour la boulangerie",
        body: [
            "Depuis plus de 40 ans, ARTEM est présent sur le marché des bandes transporteuses et textiles techniques toutes industries. Il est devenu un acteur incontournable dans le domaine des textiles techniques et des machines d'enfournement pour les professionnels de la boulangerie.",
            "Nous nous sommes engagés à fournir des solutions de qualité supérieure, conçues spécifiquement pour répondre aux besoins des acteurs de la boulangerie. Nous produisons en interne la majorité de nos produits et en assurons le contrôle. La matière première et les produits que nous ne transformons pas font l’objet de critères de qualité et de contrôles rigoureux et réguliers.",
        ],
    },
    {
        id: 'produits',
        title: 'Nos produits',
        image: '/images/te-general.jpg',
        alt: "Toiles et tapis ARTEM confectionnés dans l'atelier de Montévrain",
        body: [
            "Avec plus de 5000 références que nous produisons pour la quasi-totalité dans notre atelier de Montévrain, en Seine-et-Marne, près du parc Eurodisney, ARTEM est capable de répondre à tous vos besoins en textiles : toiles d'enfourneur, de couche, de balancelles, tapis de laminoir et de façonneuses, bandes de transport, feutres divers, manches à farine et plus encore.",
            "S'ajoute à cela notre partie mécanique : grilles, séchoirs et machines d'enfournement.",
        ],
        link: { to: '/gamme', label: 'Découvrir notre gamme en détail' },
    },
    {
        id: 'services',
        title: 'Nos services',
        image: '/images/facade.jpg',
        alt: "Façade du site ARTEM à Montévrain",
        body: [
            "Nous expédions dans la journée les commandes de stock reçues avant 16h. Les colis de moins de 30 kg sont livrés le lendemain avant 13h par Chronopost ou Fedex/TNT. Les envois de plus de 30 kg sont expédiés par Schenker, avec une livraison sous 48 à 72 heures. Nous n'avons pas de minimum de commande.",
            "Nous assurons une permanence téléphonique de 8h30 à 12h30 et de 14h à 18h, du lundi au vendredi, pour vous aider à définir les produits. Nous pouvons envoyer des modèles gratuits pour les toiles de faible coût unitaire — toile de balancelle, toile de couche.",
        ],
    },
]

/** Historique de la maison. Le texte est celui de la page actuelle. */
const HISTORY = [
    { year: '1982', text: "M. Bellanger et M. Sauvaneau quittent la société NERVUS pour créer la SARL ARTEM à Paris (12e)." },
    { year: '1983', text: "Démarrage de l’activité grâce à un partenaire européen qui accepte de produire des manchons de boulangerie en laine sur les spécifications d’ARTEM." },
    { year: '1994', text: "M. Jean-Marie Toury prend le contrôle d’ARTEM, qui compte 6 personnes et réalise 6 MF de chiffre d’affaires. ARTEM devient une SA." },
    { year: '1995', text: "Déménagement d’ARTEM à Torcy, les locaux de Paris ne permettant pas de répondre aux besoins de développement. La production interne prend plus d’importance." },
    { year: '2001', text: "Introduction du premier accessoire mécanique à destination des boulangers, l’enfourneur, développé et fabriqué par le groupe." },
    { year: '2011', text: "ARTEM déménage à Montévrain dans des locaux de 1500 m², pour mettre en stock de nombreuses références supplémentaires." },
    { year: '2019', text: "Mme Carine Autret devient la directrice ; l’effectif compte 12 personnes." },
]

export default function CompanyRedesign() {
    return (
        <>
            <Seo
                title="Notre entreprise : 40 ans de textiles techniques"
                description="ARTEM fabrique depuis plus de 40 ans des textiles techniques et bandes transporteuses pour la boulangerie. Production interne, contrôle qualité et savoir-faire sur mesure."
                path="/entreprise"
                jsonLd={breadcrumbJsonLd(breadcrumbItems)}
            />
            <main className="cp">
                <div className="cp-shell">
                    <Breadcrumb items={breadcrumbItems} />

                    <header className="cp-hero">
                        <p className="cp-hero-eyebrow">Notre entreprise</p>
                        <h1>Quarante ans de textiles techniques pour la boulangerie</h1>
                        <p className="cp-hero-lead">
                            Nous confectionnons dans notre atelier de Montévrain les toiles,
                            tapis et bandes des fournils, et nous fabriquons les machines
                            d’enfournement qui les accompagnent.
                        </p>
                    </header>

                    {SECTIONS.map((section, index) => (
                        <section
                            key={section.id}
                            className={`cp-block${index % 2 === 1 ? ' cp-block--flip' : ''}`}
                        >
                            <figure className="cp-block-media">
                                <img
                                    src={section.image}
                                    alt={section.alt}
                                    width="960"
                                    height="720"
                                    loading="lazy"
                                />
                            </figure>
                            <div className="cp-block-text">
                                <h2>{section.title}</h2>
                                {section.body.map((paragraph) => (
                                    <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                                ))}
                                {section.link && (
                                    <Link className="cp-btn" to={section.link.to}>
                                        {section.link.label}
                                    </Link>
                                )}
                            </div>
                        </section>
                    ))}

                    <section className="cp-history" aria-labelledby="cp-history-title">
                        <h2 id="cp-history-title">Notre histoire</h2>
                        <ol className="cp-history-list">
                            {HISTORY.map((step) => (
                                <li key={step.year}>
                                    <p className="cp-history-year">{step.year}</p>
                                    <p className="cp-history-text">{step.text}</p>
                                </li>
                            ))}
                        </ol>
                    </section>

                    <section className="cp-outro">
                        <figure className="cp-outro-media">
                            <img
                                src="/images/continued.jpg"
                                alt="ARTEM poursuit son développement"
                                width="960"
                                height="640"
                                loading="lazy"
                            />
                        </figure>
                        <div className="cp-outro-text">
                            <h2>Et la suite</h2>
                            <p>
                                La maison continue de grandir sur le même métier : fabriquer
                                ce qui s’use dans un fournil, aux dimensions du matériel,
                                quelle qu’en soit la marque.
                            </p>
                            <div className="cp-outro-actions">
                                <Link className="cp-btn" to="/gamme">Voir la gamme</Link>
                                <Link className="cp-btn cp-btn--ghost" to="/contact">Nous contacter</Link>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </>
    )
}
