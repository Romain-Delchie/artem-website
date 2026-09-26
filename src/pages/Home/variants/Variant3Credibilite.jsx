import { Link } from 'react-router-dom';
import {
    Icon, useRanges, FEATURED, MILESTONES, SectionHead, RangeCard,
    Compatibility, ContactBlock,
} from './shared';
import './variants.scss';

/**
 * Proposition 3 — Asseoir la crédibilité.
 *
 * Monde visuel : l'éditorial. Seule des quatre à n'ouvrir ni sur une image
 * pleine page ni sur une accroche commerciale : le titre porte d'abord, en
 * gros, sur fond blanc, et les deux photographies — l'atelier puis le
 * bâtiment — viennent l'appuyer ensuite, légendées comme dans un article.
 * Le pari est inverse de la proposition 1 : on n'y vend pas une pièce, on y
 * installe un fabricant. La gamme n'apparaît qu'en fin de page.
 */

const COMMITMENTS = [
    {
        icon: 'factory',
        title: 'Nous produisons nous-mêmes',
        body: "La majorité de nos produits sont fabriqués en interne, dans notre atelier de Montévrain. Ce que nous ne transformons pas fait l'objet de critères de qualité et de contrôles réguliers.",
    },
    {
        icon: 'check',
        title: 'Nous contrôlons ce que nous vendons',
        body: "Matière première et produits finis passent par les mêmes contrôles. C'est ce qui nous permet de garantir une toile qui tient la saison plutôt qu'une toile qui part vite.",
    },
    {
        icon: 'tool',
        title: 'Nous intervenons chez vous',
        body: "Jonction de bande sur site pour les convoyeurs qui ne se démontent pas, montage et réglage des élévateurs-enfourneurs dans votre fournil.",
    },
];

export default function Variant3Credibilite({ presentations }) {
    const { ranges } = useRanges();
    const featured = FEATURED
        .map((name) => ranges.find((range) => range.name === name))
        .filter(Boolean)
        .slice(0, 3);
    const intro = presentations?.[0];

    return (
        <main className="hr hr--credibilite">

            {/* Ouverture de magazine : une photographie muette en bandeau,
                puis le titre sur un fond teinté. Aucune des autres propositions
                ne sépare ainsi l'image du titre — les trois autres posent leur
                texte sur la photographie ou à côté d'elle. */}
            <div className="hr-opening">
                <figure className="hr-cover">
                    <img
                        src="/images/couture.jpg"
                        alt="Machine à coudre industrielle assemblant une toile technique dans l'atelier ARTEM"
                        width="868"
                        height="578"
                    />
                </figure>

                <section className="hr-masthead">
                    <div className="hr-masthead-inner">
                        <h1>
                            Quarante ans à coudre les toiles<br />
                            des boulangeries françaises
                        </h1>
                        <p className="hr-masthead-lede">
                            ARTEM est né sur le marché des bandes transporteuses et des textiles
                            techniques. Nous sommes devenus un acteur incontournable des textiles
                            de fournil et des machines d’enfournement, en fabriquant nous-mêmes ce
                            que nous vendons.
                        </p>
                        <Link className="hr-link hr-link--onDark" to="/entreprise">
                            Notre entreprise
                            <Icon name="arrow" />
                        </Link>
                    </div>
                </section>
            </div>

            {/* L'histoire est une vraie chronologie : l'ordre des dates porte
                l'information, c'est ce qui rend la durée crédible. */}
            <section className="hr-timeline">
                <SectionHead title="Ce qui nous a menés ici" align="left">
                    Quatre étapes qui expliquent ce que nous savons faire aujourd’hui.
                </SectionHead>
                <ol className="hr-timeline-list">
                    {MILESTONES.map((milestone) => (
                        <li key={milestone.year}>
                            <span className="hr-timeline-year">{milestone.year}</span>
                            <p>{milestone.body}</p>
                        </li>
                    ))}
                </ol>
            </section>

            {/* Seconde photographie : le bâtiment. Une adresse et une enseigne
                sont une preuve que le texte ne peut pas apporter. */}
            <figure className="hr-proof-photo">
                <img
                    src="/images/facade.jpg"
                    alt="Façade des locaux ARTEM à Montévrain, avec l'enseigne de l'entreprise"
                    loading="lazy"
                    width="1000"
                    height="609"
                />
                <figcaption>
                    Nos bureaux et notre atelier, 16 rue de Berlin à Montévrain,
                    en Seine-et-Marne. 1 500 m² depuis 2011.
                </figcaption>
            </figure>

            <section className="hr-commit">
                <SectionHead title="Ce que nous garantissons" light>
                    Trois engagements qui tiennent à la façon dont l’entreprise est organisée,
                    pas à une promesse commerciale.
                </SectionHead>
                <ul className="hr-commit-list">
                    {COMMITMENTS.map((item) => (
                        <li key={item.title}>
                            <Icon name={item.icon} />
                            <h3>{item.title}</h3>
                            <p>{item.body}</p>
                        </li>
                    ))}
                </ul>
            </section>

            {intro && (
                <section className="hr-statement">
                    <h2>{intro.title}</h2>
                    <div className="hr-statement-body">
                        {intro.paragraph.split('\n').filter(Boolean).map((para, i) => (
                            <p key={i}>{para}</p>
                        ))}
                    </div>
                </section>
            )}

            <Compatibility light={false} />

            {featured.length > 0 && (
                <section className="hr-range">
                    <SectionHead title="Ce qui sort de l’atelier">
                        Nos pièces les plus demandées. Le catalogue complet en compte {ranges.length || 36}.
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

            <ContactBlock
                title="Venez nous voir"
                lead="Notre atelier et nos bureaux sont à Montévrain, en Seine-et-Marne. Pour tout le reste, le téléphone reste le plus direct."
            />
        </main>
    );
}
