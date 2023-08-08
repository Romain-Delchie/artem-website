import { useParams } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import AppContext from '../../context/AppContext'
import SearchProduct from '../../components/SearchProduct/SearchProduct'
import './Quote.scss'
import API from '../../utils/api/api';

export default function Quote() {
    const { user, updateUser } = useContext(AppContext);

    const { quoteId } = useParams();
    const [quote, setQuote] = useState(user.quotations.find(quote => quote.quotation_id === Number(quoteId)));
    const [products, setProducts] = useState(JSON.parse(quote.products));
    const [updateQuantity, setUpdateQuantity] = useState({});
    const [deleteLine, setDeleteLine] = useState({});
    const [quantityInput, setQuantityInput] = useState({});
    const [render, setRender] = useState(true);
    if (quote.products === null) {
        return (
            <div>
                <p>Vous n'avez pas d'article à votre devis</p>
                <SearchProduct />

            </div>
        )
    }
    const totalPrice = products.reduce((acc, product) => acc + product.price * (quantityInput[product.quotation_has_product_id
    ] || product.quantity), 0);
    const totalWeight = products.reduce((acc, product) => acc + product.weight * (quantityInput[product.quotation_has_product_id
    ] || product.quantity), 0);
    const tansport = {
        "1": 18,
        "2": 20,
        "3": 24,
        "4": 29,
        "5": 39,
    }


    useEffect(() => {
        const fetchData = async () => {
            try {
                const quotationData = await API.quotation.getQuotation(user.token)
                const updatedUser = { ...user, ...quotationData.data };
                updateUser(updatedUser);
            } catch (error) {
                console.error('Erreur lors de la récupération des données:', error);
            }
        };

        fetchData(); // Appeler la fonction pour récupérer les données
    }, [render]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setQuantityInput((inputs) => ({
            ...inputs,
            [name]: value,
        }));
    };



    function handleUpdateQuantity(productId) {
        setUpdateQuantity((prevUpdateQuantity) => ({
            ...prevUpdateQuantity,
            [productId]: true, // Met à jour l'état du champ de quantité spécifique
        }));

    }


    async function handleSubmitQuantity(productId) {

        const productData = { quantity: quantityInput[productId] }
        if (quantityInput[productId] === undefined) {
            setUpdateQuantity({});
            return
        }
        try {
            const [, quotationData] = await Promise.all([
                API.quotation.updateProduct(user.token, productId, productData),
                API.quotation.getQuotation(user.token),
            ]);
            const userUpdated = { ...user, ...quotationData.data };
            updateUser({ ...user, ...userUpdated })

            setUpdateQuantity((prevUpdateQuantity) => ({
                ...prevUpdateQuantity,
                [productId]: false,
            }));
        } catch (error) {
            console.error("An error occurred while updating quantity:", error);
        }
        setRender(!render)
    }


    function handleDeleteLine(productId) {
        setDeleteLine((prevDeleteLine) => {
            return {
                ...prevDeleteLine,
                [productId]: !prevDeleteLine[productId],
            };
        });
    }


    async function handleConfirmDeleteLine(productId) {
        try {
            await API.quotation.deleteProduct(user.token, productId);
            const updatedProducts = products.filter(product => product.quotation_has_product_id !== productId);
            setProducts(updatedProducts);
            setRender(!render)
        } catch (error) {
            console.error("An error occurred while deleting product:", error);
        }
    }




    return (
        <div className='quote'>
            <h2>Devis</h2>
            <p>Devis n°{quote.quotation_id}</p>
            <p>Reference : {quote.reference}</p>
            <p>Créé le : {quote.creation_date}</p>
            <p>Valable jusqu'au : {quote.expiration_date}</p>
            <table border="1">
                <thead>
                    <tr>
                        <th>Produit</th>
                        <th>Prix</th>
                        <th>Poids</th>
                        <th>Quantité</th>
                        <th>Référence</th>
                        <th>Désignation</th>
                        <th>Délai de livraison</th>
                        <th>Total</th>
                        <th>Supprimer</th>
                    </tr>
                </thead>
                <tbody>

                    {products.map((product) => {
                        return (
                            <tr key={product.quotation_has_product_id
                            }>
                                <td>{product.quotation_has_product_id
                                }</td>
                                <td>{product.price}</td>
                                <td>{product.weight}</td>
                                <td>{!updateQuantity[product.quotation_has_product_id
                                ] &&
                                    <>
                                        {quantityInput[product.quotation_has_product_id
                                        ] || product.quantity}
                                        <svg data-id={product.quotation_has_product_id
                                        } onClick={() => handleUpdateQuantity(product.quotation_has_product_id)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                        </svg>
                                    </>

                                }
                                    {updateQuantity[product.quotation_has_product_id
                                    ] &&
                                        <>
                                            <input name={product.quotation_has_product_id
                                            } type="number" defaultValue={quantityInput[product.quotation_has_product_id
                                            ] || product.quantity} onChange={handleInputChange} />
                                            <svg data-id={product.quotation_has_product_id
                                            } onClick={() => handleSubmitQuantity(product.quotation_has_product_id
                                            )} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                            </svg>

                                        </>
                                    }

                                </td>
                                <td>{product.reference}</td>
                                <td>{product.designation}</td>
                                <td>{product.delivery_time.startsWith("0") ? "stock" : product.delivery_time}</td>
                                <td>{(product.price * (quantityInput[product.quotation_has_product_id
                                ] || product.quantity)).toFixed(2)} € HT</td>
                                {
                                    !deleteLine[product.quotation_has_product_id] &&
                                    <td>
                                        <svg
                                            onClick={() => handleDeleteLine(product.quotation_has_product_id)}
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                        </svg>
                                    </td>
                                }

                                {
                                    deleteLine[product.quotation_has_product_id] &&
                                    <td className="confirmation-popup">
                                        <p>Supprimer la ligne ?</p>
                                        <svg onClick={() => handleDeleteLine(product.quotation_has_product_id)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                        <svg onClick={() => handleConfirmDeleteLine(product.quotation_has_product_id)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                        </svg>
                                    </td>

                                }
                            </tr>

                        )

                    })}
                    <tr>
                        <td colSpan="7">Total HT :</td>
                        <td colSpan="2">{totalPrice.toFixed(2)} € HT</td>
                    </tr>
                    <tr>
                        <td colSpan="7">Total TTC :</td>
                        <td colSpan="2">{(totalPrice * 1.2).toFixed(2)} € TTC</td>
                    </tr>
                </tbody>
            </table>
        </div >
    )
}