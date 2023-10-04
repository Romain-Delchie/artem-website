import { useEffect, useState, useContext } from "react";
import AppContext from "../../context/AppContext";
import ProductCard from "../ProductCard/ProductCard";
import "./SearchProduct.scss";
import API from "../../utils/api/api";
import { Link } from "react-router-dom";

export default function SearchProduct() {
    const { user, openAddProductForm, setOpenAddProductForm } = useContext(AppContext);
    const [products, setProducts] = useState([]);
    const location = window.location.pathname;
    const [ranges, setRanges] = useState([]);
    const [searchBy, setSearchBy] = useState('description');
    const [searchResults, setSearchResults] = useState(null);
    const [brands, setBrands] = useState([]);
    const [productsSorted, setProductsSorted] = useState([]);
    const [searchValue, setSearchValue] = useState([]);
    const [sort, setSort] = useState({ brand: 'all', range: 'all' })
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const [productsResponse, rangeResponse] = await Promise.all([
                    API.product.getProducts(user.token),
                    API.range.getRanges(),
                ]);
                setProducts(productsResponse.data);
                setRanges(rangeResponse.data.ranges);
                setProductsSorted(productsResponse.data);

            } catch (error) {
                console.error("Erreur lors de la récupération des produits :", error);
            }
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        const brandsData = []
        products.map((product) => {
            if (brandsData.includes(product.brand) === false) {
                brandsData.push(product.brand)
            }
        })
        setBrands(brandsData.sort((a, b) => a.localeCompare(b)))
    }, [products])

    const handleChangeSearchBy = (event) => {
        setSearchBy(event.target.value);
    };

    useEffect(() => {
        const productsByRange = sort.range === 'all' ? products : products.filter((product) => product.range_id === parseInt(sort.range))
        const productsByRangeAndBrand = sort.brand === 'all' ? productsByRange : productsByRange.filter((product) => product.brand === sort.brand)
        const description = searchBy === 'description' ? productsByRangeAndBrand.filter((product) => {
            return searchValue.every((word) => product.description.toLowerCase().includes(word))
        }) : productsByRangeAndBrand.filter((product) => product.reference.toLowerCase().startsWith(searchValue[0]))
        const productsByRangeAndBrandAndDescription = searchValue.length === 0 ? productsByRangeAndBrand : description
        setProductsSorted(productsByRangeAndBrandAndDescription)
    }, [sort, products, searchValue])

    const handleSearch = (event) => {
        event.preventDefault();
        const inputValue = event.target.value.toLowerCase().trim().split(/\s+/);
        setSearchValue(inputValue);
    };

    const handleChangeSort = (event) => {
        const { value, name } = event.target;
        setSort({ ...sort, [name]: value });
    }
    return (

        <div className="search-product">
            <section className="search-product-sorting">
                <div className="search-product-sorting-range">
                    <h3>Gamme</h3>
                    <select name="range" id="range" onChange={handleChangeSort}>
                        <option value="all">Toutes les gammes</option>
                        {ranges && ranges.map((range) => (
                            <option value={range.id} key={range.id}>{range.name}</option>
                        ))}
                    </select>
                </div>
                <div className="search-product-brand">
                    <h3>Marque</h3>
                    <select name="brand" id="brand" onChange={handleChangeSort}>
                        <option value="all">Toutes les marques</option>
                        {brands && brands.map((brand) => (
                            <option value={brand} key={brand}>{brand}</option>
                        ))}
                    </select>
                </div>
            </section>
            <form className="search-product-form">
                <h3>Recherche un produit par :</h3>
                <div className="input-radio">
                    <div className="input-container">
                        <label htmlFor="description">
                            <input type="radio" id="description" name="description" value="description" checked={searchBy === 'description'} onChange={handleChangeSearchBy} />Mots clés</label>
                    </div>
                    <div className="input-container">
                        <label htmlFor="reference">
                            <input type="radio" id="reference" name="reference" value="reference" checked={searchBy === 'reference'} onChange={handleChangeSearchBy} />Référence ARTEM</label>
                    </div>

                </div>
                <div className="input-container input-container-text">
                    <input type="text" id="search" name="search" placeholder={searchBy === 'reference' ? 'ex: MP_1280_X_790' : 'ex: abry toile enfourneur'} onChange={handleSearch} />
                </div>

            </form>
            <div className="search-product-results">
                {productsSorted && productsSorted.map((product) => (
                    <div className="search-product-result" key={product.id}>
                        <ProductCard product={product} />
                        {location.includes('quote-history') &&
                            <div className="product-card-btn">
                                <button onClick={() => setOpenAddProductForm({ [product.id]: true })}>Ajouter au devis</button>
                            </div>
                        }
                        {location === '/search-products' &&
                            <div className="product-card-btn">
                                <Link to={`/new-quote`}>Créer un devis</Link>
                            </div>
                        }
                        {location === '/update-product' &&
                            <div className="product-card-btn">
                                <Link state={product} to={`/update-product/${product.id}`}>Modifier le produit</Link>
                            </div>
                        }
                        {location === '/delete-product' &&
                            <div className="product-card-btn">
                                <Link to={`/delete-product/${product.id}`}>Supprimer le produit</Link>
                            </div>
                        }
                    </div>
                ))}
            </div>

        </div>


    )
}