import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
    Icon, useRanges, FAMILIES, RangeCard, Compatibility, ContactBlock,
} from './shared';
import { rangePath } from '../../../utils/seo/slugify';
import './variants.scss';

/**
 * Proposition 2 — Faire entrer dans la gamme.
 *
 * Monde visuel : le noir de studio. L'accroche est une photographie de nos
 * propres matières sur fond noir, sans voile ajouté — le fond de l'image est
 * déjà noir à gauche, le texte s'y pose directement. Ce parti donne à la page
 * l'allure d'un catalogue de fabricant plutôt que d'une page de vente, ce qui
 * est exactement son rôle ici : montrer la matière, puis laisser chercher.
 */
export default function Variant2Gamme() {
    const { ranges, loaded } = useRanges();
    const [query, setQuery] = useState('');

    const families = useMemo(
        () => FAMILIES
            .map((family) => ({ ...family, items: ranges.filter(family.match) }))
            .filter((family) => family.items.length > 0),
        [ranges],
    );

    const results = useMemo(() => {
        const term = query.trim().toLowerCase();
        if (term.length < 2) return null;
        return ranges.filter((range) =>
            range.name.toLowerCase().includes(term) ||
            (range.description || '').toLowerCase().includes(term),
        );
    }, [query, ranges]);

    return (
        <main className="hr hr--gamme">

            <section className="hr-cat-hero">
                <img
                    className="hr-cat-hero-img"
                    src="/images/textile-general.jpg"
                    alt="Toiles, sangles, œillets et rouleaux de textile technique ARTEM présentés avec un pain"
                    width="1500"
                    height="1000"
                />
                <div className="hr-cat-hero-text">
                    <div className="hr-cat-hero-inner">
                        <h1>
                            Le catalogue complet <em>d’un fabricant</em>
                        </h1>
                        <p>
                            {loaded ? ranges.length : 36} gammes de textiles techniques, de bandes
                            transporteuses et de matériel d’enfournement. De la toile enfourneur
                            à la bande de rotomouleuse, toutes confectionnées à vos dimensions.
                        </p>
                    </div>
                </div>
            </section>

            {/* La recherche est posée à cheval entre l'accroche et le catalogue :
                c'est le premier geste attendu de qui sait déjà ce qu'il veut. */}
            <div className="hr-searchbar">
                <div className="hr-search">
                    <Icon name="search" />
                    <input
                        id="catalog-search"
                        type="search"
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder="toile de couche, manchon, grille inox…"
                        aria-label="Rechercher une gamme"
                    />
                </div>

                {results && (
                    <div className="hr-search-results">
                        {results.length === 0 ? (
                            <p className="hr-search-empty">
                                Aucune gamme ne correspond à « {query} ».
                                Nous fabriquons aussi sur mesure —{' '}
                                <Link to="/contact">décrivez-nous votre pièce</Link>.
                            </p>
                        ) : (
                            <>
                                <p className="hr-search-count">
                                    {results.length} gamme{results.length > 1 ? 's' : ''} trouvée{results.length > 1 ? 's' : ''}
                                </p>
                                <ul className="hr-search-list">
                                    {results.map((range) => (
                                        <li key={range.id}>
                                            <Link to={rangePath(range)}>
                                                <img
                                                    src={`/images/products/${range.image_link}`}
                                                    alt=""
                                                    loading="lazy"
                                                    width="72"
                                                    height="54"
                                                />
                                                <span>{range.name}</span>
                                                <Icon name="arrow" />
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}
                    </div>
                )}
            </div>

            {/* Le catalogue famille par famille. Chaque famille garde son volume
                réel : aucune n'est gonflée pour équilibrer la grille. */}
            {!loaded && <p className="hr-range-loading">Chargement du catalogue…</p>}

            <div className="hr-families">
                {families.map((family) => (
                    <section className="hr-family" key={family.key} id={family.key}>
                        <header className="hr-family-head">
                            <h2>{family.label}</h2>
                            <span className="hr-family-count">
                                {family.items.length} gamme{family.items.length > 1 ? 's' : ''}
                            </span>
                        </header>
                        <ul className="hr-range-grid hr-range-grid--dense">
                            {family.items.map((range) => <RangeCard key={range.id} range={range} />)}
                        </ul>
                    </section>
                ))}
            </div>

            <Compatibility light={false} />

            <section className="hr-cta-band">
                <h2>Vous ne trouvez pas votre pièce ?</h2>
                <p>
                    Le catalogue ne couvre pas tout : une grande part de notre production
                    est confectionnée sur mesure, à partir des cotes de la pièce usée.
                </p>
                <Link className="hr-btn hr-btn--primary" to="/contact">
                    Décrire ma pièce
                    <Icon name="arrow" />
                </Link>
            </section>

            <ContactBlock
                title="Un conseil sur la matière ?"
                lead="Nos équipes connaissent les matériels du marché. Décrivez votre machine, nous vous orientons vers la bonne référence."
            />
        </main>
    );
}
