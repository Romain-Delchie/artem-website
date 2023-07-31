import { useEffect, useState, useContext } from "react";
import AppContext from "../../context/AppContext";
import "./SearchProduct.scss";
import API from "../../utils/api/api";

export default function SearchProduct() {
    const { user } = useContext(AppContext);
    const [products, setProducts] = useState([]);
    const [searchBy, setSearchBy] = useState('reference');
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
                <label htmlFor="searchBy">Recherche par :</label>
                <input type="radio" id="searchBy" name="searchBy" value="reference" checked={searchBy === 'reference'} onChange={handleChangeSearchBy} />
                <label htmlFor="reference">Référence ARTEM</label>
                <input type="radio" id="searchBy" name="searchBy" value="Mots clés" checked={searchBy === 'Mots clés'} onChange={handleChangeSearchBy} />
                <label htmlFor="designation">Mot clé</label>
                <input type="text" id="search" name="search" placeholder={searchBy === 'reference' ? 'Rechercher par référence' : 'Rechercher par mots clés'} onChange={handleSearch} />

            </form>
            <div className="search-product-results">
                {searchResults && searchResults.map((product) => (
                    <div className="search-product-result" key={product.id}>
                        <p>{product.reference}</p>
                        <p>{product.designation}</p>
                        <p>{product.price}</p>
                        <p>{product.stock}</p>
                    </div>
                ))}
            </div>

        </div>


    )
}