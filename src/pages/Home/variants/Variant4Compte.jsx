import { Link } from 'react-router-dom';
import {
    Icon, useRanges, FEATURED, ACCOUNT_BENEFITS, SectionHead, RangeCard,
    Compatibility, ContactBlock,
} from './shared';
import './variants.scss';

/**
 * Proposition 4 — Déclencher une demande de devis.
 *
 * Monde visuel : la lumière. C'est la seule des quatre propositions qui
 * n'ouvre pas sur du sombre — accroche en deux colonnes, texte sur aplat vert
 * à gauche, photographie de studio en haute lumière à droite.
 *
 * L'accroche demande une seule chose : décrivez votre pièce. Le corps de la
 * page montre ensuite ce qu'un compte apporte à qui recommande souvent, mais
 * cet argument vient après, et jamais comme un passage obligé.
 *
 * Le nom du fichier date de la version précédente de cette proposition,
 * tournée vers le compte ; c'est désormais la proposition 1 qui porte cet axe.
 */

const WITHOUT_ACCOUNT = [
    'Vous appelez ou vous écrivez pour connaître un prix.',
    'Vous attendez notre retour pour arbitrer.',
    'Vous redonnez les cotes de votre machine à chaque commande.',
];

const WITH_ACCOUNT = [
    'Le tarif s’affiche dès que vous trouvez la référence.',
    'Vous éditez le devis vous-même, quand vous voulez.',
    'Vos machines et vos devis passés restent enregistrés.',
];

export default function Variant4Compte() {
    const { ranges } = useRanges();
    const featured = FEATURED
        .map((name) => ranges.find((range) => range.name === name))
        .filter(Boolean)
        .slice(0, 3);

    return (
        <main className="hr hr--compte">

            <section className="hr-split">
                <div className="hr-split-text">
                    <h1>
                        Décrivez votre pièce,
                        <em>nous la chiffrons</em>
                    </h1>
                    <p className="hr-split-lead">
                        La marque de votre machine et les cotes de la pièce usée suffisent
                        le plus souvent — une photo aussi. Nous vous répondons avec un prix,
                        sans engagement et sans compte à créer.
                    </p>
                    <div className="hr-hero-actions">
                        <Link className="hr-btn hr-btn--primary" to="/contact">
                            Demander un devis
                            <Icon name="arrow" />
                        </Link>
                        <Link className="hr-btn hr-btn--outline" to="/creer-un-compte">
                            Créer un compte
                        </Link>
                    </div>
                </div>
                <figure className="hr-split-media">
                    <img
                        src="/images/te-general.jpg"
                        alt="Toile enfourneur roulée, barre inox, œillets, fil de couture et sangles ARTEM"
                        width="1500"
                        height="1000"
                    />
                </figure>
            </section>

            {/* La comparaison est l'argument central : elle montre le temps
                gagné plutôt que de le revendiquer. */}
            <section className="hr-compare">
                <SectionHead title="Ce que ça change">
                    Le même besoin, une toile de couche à remplacer, dans les deux cas.
                </SectionHead>
                <div className="hr-compare-cols">
                    <div className="hr-compare-col">
                        <h3>Aujourd’hui, sans compte</h3>
                        <ul>
                            {WITHOUT_ACCOUNT.map((line) => <li key={line}>{line}</li>)}
                        </ul>
                    </div>
                    <div className="hr-compare-col hr-compare-col--good">
                        <h3>Avec un compte</h3>
                        <ul>
                            {WITH_ACCOUNT.map((line) => (
                                <li key={line}>
                                    <Icon name="check" />
                                    {line}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            <section className="hr-features">
                <SectionHead title="Ce que vous y trouvez" light>
                    Quatre fonctions, disponibles dès la validation de votre compte.
                </SectionHead>
                <ul className="hr-features-list">
                    {ACCOUNT_BENEFITS.map((benefit) => (
                        <li key={benefit.title}>
                            <Icon name={benefit.icon} />
                            <div>
                                <h3>{benefit.title}</h3>
                                <p>{benefit.body}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </section>

            {/* Contrepoids de l'accroche : celle-ci demande un devis, celui-ci
                s'adresse à qui revient régulièrement. Le bandeau ne répète donc
                pas l'appel à l'action du haut de page. */}
            <section className="hr-quote-band">
                <div className="hr-quote-band-inner">
                    <h2>Vous recommandez plusieurs fois par an ?</h2>
                    <p>
                        Au-delà de deux ou trois commandes, redonner les cotes de la même
                        machine à chaque fois devient une perte de temps. Un compte les
                        garde en mémoire, avec vos devis passés et vos tarifs.
                    </p>
                    <Link className="hr-btn hr-btn--primary" to="/creer-un-compte">
                        Créer mon compte
                        <Icon name="arrow" />
                    </Link>
                </div>
            </section>

            <section className="hr-steps">
                <SectionHead title="Ouvrir un compte">
                    Trois minutes, et une validation de notre part pour vérifier que vous
                    êtes bien un professionnel.
                </SectionHead>
                <ol className="hr-steps-list">
                    <li>
                        <span className="hr-steps-rank">1</span>
                        <h3>Vous remplissez le formulaire</h3>
                        <p>Raison sociale, coordonnées, adresses de facturation et de livraison.</p>
                    </li>
                    <li>
                        <span className="hr-steps-rank">2</span>
                        <h3>Nous validons le compte</h3>
                        <p>Une vérification rapide, le temps de confirmer votre activité professionnelle.</p>
                    </li>
                    <li>
                        <span className="hr-steps-rank">3</span>
                        <h3>Vous accédez aux tarifs</h3>
                        <p>Recherche de produits, outils de définition, devis et commandes en autonomie.</p>
                    </li>
                </ol>
                <Link className="hr-btn hr-btn--primary" to="/creer-un-compte">
                    Commencer
                    <Icon name="arrow" />
                </Link>
            </section>

            {featured.length > 0 && (
                <section className="hr-range">
                    <SectionHead title="La gamme accessible depuis votre espace">
                        {ranges.length || 36} gammes, chacune avec ses matières et ses fiches techniques.
                    </SectionHead>
                    <ul className="hr-range-grid">
                        {featured.map((range) => <RangeCard key={range.id} range={range} />)}
                    </ul>
                    <div className="hr-range-more">
                        <Link className="hr-btn hr-btn--accent" to="/gamme">
                            Voir toute la gamme
                            <Icon name="arrow" />
                        </Link>
                    </div>
                </section>
            )}

            <Compatibility light={false} />

            <ContactBlock
                title="Besoin d’aide pour démarrer ?"
                lead="Un problème à la création de compte, une question sur les outils ? Appelez-nous, nous vous accompagnons."
            />
        </main>
    );
}
