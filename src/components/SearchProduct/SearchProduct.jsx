import { useEffect, useState, useContext } from "react";
import AppContext from "../../context/AppContext";
import ProductCard from "../ProductCard/ProductCard";
import "./SearchProduct.scss";
import API from "../../utils/api/api";

export default function SearchProduct() {
    const { user } = useContext(AppContext);
    const [products, setProducts] = useState([]);
    const [searchBy, setSearchBy] = useState('description');
    const [searchValue, setSearchValue] = useState();
    const [searchResults, setSearchResults] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                API.product.getProducts(user.token).then((response) => {
                    setProducts(response.data);
                });
            } catch (error) {
                console.error("Erreur lors de la récupération des produits :", error);


            }
        };
        fetchProducts();
    }, []);

    const handleChangeSearchBy = (event) => {
        setSearchBy(event.target.value);
    };


    const handleSearch = (event) => {
        event.preventDefault();
        setSearchValue(event.target.value.toLowerCase().trim().split(/\s+/));
        if (searchBy === 'reference') {
            setSearchResults(products.filter((product) => product.reference.toLowerCase().startsWith(searchValue)));
        } else {

            setSearchResults(products.filter((product) => searchValue.every((word) =>
                product.description.toLowerCase().includes(word)))

            );
        }
    };

    console.log(searchResults)

    return (

        <div className="search-product">
            <form className="search-product-form">
                <h3>Recherche un produit par :</h3>
                <div className="input-radio">
                    <div className="input-container">
                        <label htmlFor="reference">Mots clés</label>
                        <input type="radio" id="searchBy" name="searchBy" value="description" checked={searchBy === 'description'} onChange={handleChangeSearchBy} />
                    </div>
                    <div className="input-container">
                        <label htmlFor="searchBy">Référence ARTEM</label>
                        <input type="radio" id="searchBy" name="searchBy" value="reference" checked={searchBy === 'reference'} onChange={handleChangeSearchBy} />
                    </div>

                </div>
                <div className="input-container input-container-text">
                    <input type="text" id="search" name="search" placeholder={searchBy === 'reference' ? 'ex: MP_1280_X_790' : 'ex: abry toile enfourneur'} onChange={handleSearch} />
                </div>

            </form>
            <div className="search-product-results">
                {searchResults && searchResults.map((product) => (
                    <div className="search-product-result" key={product.id}>
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>

        </div>


    )
}