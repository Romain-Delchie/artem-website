import { Link } from 'react-router-dom';
import {
    Icon, useRanges, featuredRanges, SectionHead, RangeCard, RangeLinks,
    Compatibility, ContactBlock, ACCOUNT_BENEFITS,
} from './shared';
import './variants.scss';

/**
 * Proposition 1 — Pousser la création de compte.
 *
 * Le visiteur arrive parce qu'une pièce a lâché, et la page le reconnaît :
 * même photographie de fournil, même gamme, même preuve de compatibilité.
 * Ce qu'elle met en premier, en revanche, c'est l'accès direct aux tarifs
 * plutôt que la demande de devis — l'argument est le temps gagné.
 *
 * Le nom du fichier date de la version précédente de cette proposition,
 * tournée vers le devis ; c'est désormais la proposition 4 qui porte cet axe.
 */

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

export default function Variant1Devis({ presentations }) {
    const { ranges, loaded } = useRanges();

    const featured = featuredRanges(ranges);
    const featuredIds = new Set(featured.map((range) => range.id));
    const others = ranges
        .filter((range) => !featuredIds.has(range.id) && range.category !== 'service')
        .sort((a, b) => a.name.localeCompare(b.name, 'fr'));
    const services = ranges.filter((range) => range.category === 'service');
    const intro = presentations?.[0];

    return (
        <main className="hr hr--devis">

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
                        cotes de votre matériel et pour toutes les marques. Avec un compte
                        professionnel, vous accédez directement aux tarifs et éditez vos
                        devis vous-même.
                    </p>
                    <div className="hr-hero-actions">
                        <Link className="hr-btn hr-btn--primary" to="/creer-un-compte">
                            Créer mon compte
                            <Icon name="arrow" />
                        </Link>
                        <Link className="hr-btn hr-btn--ghost" to="/connexion">
                            J’ai déjà un compte
                        </Link>
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
                obtenir les prix soi-même. */}
            <section className="hr-account">
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
    );
}
