import { useEffect, useMemo, useState, useContext } from "react";
import { Link } from "react-router-dom";
import AppContext from "../../context/AppContext";
import ProductCard from "../ProductCard/ProductCard";
import ModalTeTool from "../ModalTeTool/ModalTeTool";
import API from "../../utils/api/api";
import "./SearchProductRedesign.scss";

/**
 * Proposition de refonte de la recherche produit, affichée aux seuls
 * administrateurs sur /search-products (voir SearchProductPage.jsx).
 *
 * La version actuelle empile trois blocs indépendants — filtres, formulaire de
 * recherche, résultats — que l'on perd de vue dès qu'on descend dans une liste
 * de plusieurs centaines de produits.
 *
 * Cette version les réunit en une barre d'outils qui reste collée en haut :
 * le champ de recherche d'abord, puisque c'est le geste principal, puis les
 * filtres, puis le décompte. Les filtres actifs sont rappelés sous forme de
 * jetons retirables, pour qu'un résultat vide s'explique toujours de lui-même.
 *
 * Toute la logique de filtrage est reprise telle quelle de SearchProduct.jsx :
 * seule la présentation change.
 */
export default function SearchProductRedesign() {
    const { user } = useContext(AppContext);
    const [products, setProducts] = useState([]);
    const [ranges, setRanges] = useState([]);
    const [searchBy, setSearchBy] = useState('description');
    const [productsSorted, setProductsSorted] = useState([]);
    const [searchValue, setSearchValue] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [sort, setSort] = useState({ brand: 'all', range: 'all' });
    const [active, setActive] = useState(true);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const [productsResponse, rangeResponse] = await Promise.all([
                    API.product.getProducts(user.token),
                    API.range.getRanges(),
                ]);
                const productsActive = productsResponse.data.filter(
                    (product) => (active ? product.active : !product.active),
                );
                setProducts(productsActive);
                setRanges(rangeResponse.data.ranges);
                setProductsSorted(productsResponse.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des produits :", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [active]);

    // Le filtre gamme propose toujours toute la liste ; le filtre marque, lui,
    // ne propose que les marques disponibles dans la gamme sélectionnée.
    const brands = useMemo(() => {
        const productsByRange = sort.range === 'all'
            ? products
            : products.filter((product) => product.range_id === parseInt(sort.range));
        const brandsData = [];
        productsByRange.forEach((product) => {
            if (brandsData.includes(product.brand) === false) {
                brandsData.push(product.brand);
            }
        });
        return brandsData.sort((a, b) => a.localeCompare(b));
    }, [products, sort.range]);

    // Si la gamme choisie ne contient pas la marque sélectionnée, on remet le
    // filtre marque sur « Toutes les marques » plutôt que d'afficher 0 résultat.
    useEffect(() => {
        if (sort.brand !== 'all' && brands.includes(sort.brand) === false) {
            setSort((previousSort) => ({ ...previousSort, brand: 'all' }));
        }
    }, [brands, sort.brand]);

    useEffect(() => {
        const productsByRange = sort.range === 'all'
            ? products
            : products.filter((product) => product.range_id === parseInt(sort.range));
        const productsByRangeAndBrand = sort.brand === 'all'
            ? productsByRange
            : productsByRange.filter((product) => product.brand === sort.brand);
        const description = searchBy === 'description'
            ? productsByRangeAndBrand.filter((product) =>
                searchValue.every((word) => product.description.toLowerCase().includes(word)))
            : productsByRangeAndBrand.filter((product) =>
                product.reference.toLowerCase().startsWith(searchValue[0]));
        setProductsSorted(searchValue.length === 0 ? productsByRangeAndBrand : description);
    }, [sort, products, searchValue, searchBy]);

    const handleSearch = (event) => {
        const value = event.target.value;
        setSearchText(value);
        setSearchValue(value.toLowerCase().trim() === ''
            ? []
            : value.toLowerCase().trim().split(/\s+/));
    };

    const handleChangeSort = (event) => {
        const { value, name } = event.target;
        setSort({ ...sort, [name]: value });
    };

    const handleChangeActive = (nextActive) => {
        setActive(nextActive);
        setSort({ brand: 'all', range: 'all' });
    };

    const rangeName = ranges.find((r) => String(r.id) === String(sort.range))?.name;
    const hasFilters = sort.range !== 'all' || sort.brand !== 'all' || searchValue.length > 0;

    const resetAll = () => {
        setSort({ brand: 'all', range: 'all' });
        setSearchText('');
        setSearchValue([]);
    };

    return (
        <div className="spr">
            <ModalTeTool />

            {/* Barre d'outils collante : la recherche reste accessible quelle
                que soit la profondeur de défilement dans les résultats. */}
            <div className="spr-toolbar">
                <div className="spr-search">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                        strokeLinecap="round" aria-hidden="true">
                        <path d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                    <input
                        type="search"
                        id="spr-search-input"
                        value={searchText}
                        onChange={handleSearch}
                        placeholder={searchBy === 'reference'
                            ? 'MP_1280_X_790 — des _ à la place des espaces'
                            : 'abry toile enfourneur'}
                        aria-label="Rechercher un produit"
                    />
                    <div className="spr-search-mode" role="group" aria-label="Rechercher par">
                        <button
                            type="button"
                            className={searchBy === 'description' ? 'is-on' : ''}
                            onClick={() => setSearchBy('description')}
                        >
                            Mots clés
                        </button>
                        <button
                            type="button"
                            className={searchBy === 'reference' ? 'is-on' : ''}
                            onClick={() => setSearchBy('reference')}
                        >
                            Référence
                        </button>
                    </div>
                </div>

                <div className="spr-filters">
                    <label className="spr-field">
                        <span>Gamme</span>
                        <select name="range" value={sort.range} onChange={handleChangeSort}>
                            <option value="all">Toutes les gammes</option>
                            {ranges
                                .filter((oneRange) => oneRange.searchFilter)
                                .map((range) => (
                                    <option value={range.id} key={range.id}>{range.name}</option>
                                ))}
                        </select>
                    </label>

                    <label className="spr-field">
                        <span>Marque</span>
                        <select name="brand" value={sort.brand} onChange={handleChangeSort}>
                            <option value="all">Toutes les marques</option>
                            {brands.map((brand) => (
                                <option value={brand} key={brand}>{brand}</option>
                            ))}
                        </select>
                    </label>

                    {user.role === 'admin' && (
                        <div className="spr-segmented" role="group" aria-label="État des produits">
                            <button
                                type="button"
                                className={active ? 'is-on' : ''}
                                onClick={() => handleChangeActive(true)}
                                aria-pressed={active}
                            >
                                Actifs
                            </button>
                            <button
                                type="button"
                                className={!active ? 'is-on' : ''}
                                onClick={() => handleChangeActive(false)}
                                aria-pressed={!active}
                            >
                                Inactifs
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Rappel des filtres actifs : un résultat vide doit toujours
                pouvoir s'expliquer sans rouvrir les listes déroulantes. */}
            <div className="spr-summary">
                <p className="spr-count">
                    <strong>{productsSorted.length}</strong>{' '}
                    {productsSorted.length < 2 ? 'produit' : 'produits'}
                    {!active && ' inactifs'}
                </p>

                {hasFilters && (
                    <ul className="spr-chips">
                        {sort.range !== 'all' && rangeName && (
                            <li>
                                <button type="button" onClick={() => setSort({ ...sort, range: 'all' })}>
                                    {rangeName}<span aria-hidden="true">×</span>
                                    <span className="sr-only">Retirer le filtre de gamme</span>
                                </button>
                            </li>
                        )}
                        {sort.brand !== 'all' && (
                            <li>
                                <button type="button" onClick={() => setSort({ ...sort, brand: 'all' })}>
                                    {sort.brand}<span aria-hidden="true">×</span>
                                    <span className="sr-only">Retirer le filtre de marque</span>
                                </button>
                            </li>
                        )}
                        {searchValue.length > 0 && (
                            <li>
                                <button type="button" onClick={() => { setSearchText(''); setSearchValue([]); }}>
                                    « {searchText.trim()} »<span aria-hidden="true">×</span>
                                    <span className="sr-only">Effacer la recherche</span>
                                </button>
                            </li>
                        )}
                        <li>
                            <button type="button" className="spr-chips-reset" onClick={resetAll}>
                                Tout effacer
                            </button>
                        </li>
                    </ul>
                )}
            </div>

            {loading && <p className="spr-state">Chargement des produits…</p>}

            {!loading && productsSorted.length === 0 && (
                <div className="spr-state spr-state--empty">
                    <p>Aucun produit ne correspond à cette recherche.</p>
                    {hasFilters && (
                        <button type="button" onClick={resetAll}>Effacer les filtres</button>
                    )}
                </div>
            )}

            <ul className="spr-grid">
                {productsSorted.map((product) => (
                    <li className="spr-grid-item" key={product.id}>
                        <ProductCard product={product} />
                        {user.profile_id !== 3 && (
                            <Link
                                className="spr-quote-btn"
                                to="/new-quote"
                                state={{ product }}
                            >
                                Créer un devis
                            </Link>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}
