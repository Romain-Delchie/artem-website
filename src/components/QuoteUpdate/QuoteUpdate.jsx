import './QuoteUpdate.scss'
import { useContext, useState } from 'react'
import AppContext from '../../context/AppContext'
import API from '../../utils/api/api';
import Addresses from '../Addresses/Addresses'
import fetchData from '../../utils/function'


export default function QuoteUpdate({ quote, totalPrice, setOpenModifQuote, setQuote }) {

    const { user, updateUser, products, setProducts } = useContext(AppContext);
    const [refInputIsOpen, setRefInputIsOpen] = useState(false);
    const [addressIsOpen, setAddressIsOpen] = useState({ quote: false });
    const [updateQuantity, setUpdateQuantity] = useState({});
    const [quantityInput, setQuantityInput] = useState({});
    const [deleteLine, setDeleteLine] = useState({});

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

            await API.quotation.updateProduct(user.token, productId, productData),

                setUpdateQuantity((prevUpdateQuantity) => ({
                    ...prevUpdateQuantity,
                    [productId]: false,
                }));
            fetchData(user, updateUser);

        } catch (error) {
            console.error("An error occurred while updating quantity:", error);
        }
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
            fetchData(user, updateUser);


        } catch (error) {
            console.error("An error occurred while deleting product:", error);
        }
    }

    function handleChangeRef(event) {
        const { value } = event.target;
        setQuote((prevQuote) => ({
            ...prevQuote,
            reference: value,
        }));
    }

    async function handleRefModif() {
        await API.quotation.update(user.token, quote.quotation_id, { reference: quote.reference });
        setRefInputIsOpen(false);
    }

    return (
        <div className="quote-update">
            <button className='quote-btn-cross' onClick={() => setOpenModifQuote(false)}>X</button>
            <p>Devis n°{quote.quotation_id}</p>
            {!refInputIsOpen &&
                <div className="quote-reference">
                    <p>Ref : {quote.reference}</p>
                    <svg onClick={() => setRefInputIsOpen(true)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                </div>
            }
            {refInputIsOpen &&
                <div className="quote-reference-input">
                    <label htmlFor="reference">Ref :</label>
                    <input type="text" name='reference' defaultValue={quote.reference} onChange={handleChangeRef} />
                    <svg onClick={() => setRefInputIsOpen(false)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="red w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <svg onClick={handleRefModif} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                </div>
            }
            <div className="quote-address">
                <p>Adresse de livraison : {quote.name_address} {quote.street_address} {quote.zip_code} {quote.city}</p>
                <svg onClick={() => setAddressIsOpen({ quote: true })} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 green">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>
            </div>
            {addressIsOpen.quote &&
                <div className="quote-address-input">
                    <Addresses type="quote" modification={addressIsOpen} setModification={setAddressIsOpen} quoteId={quote.quotation_id} title="Adresse de livraison" />
                </div>
            }
            <p>Créé le : {quote.creation_date}</p>
            <p>Valable jusqu'au : {quote.expiration_date}</p>
            <div className="product-list">
                {Array.isArray(products) && products.map((product) => {
                    return (
                        <div className="product-item" key={product.quotation_has_product_id}>
                            <div className="product-info">
                                <div className="product-details">
                                    <p><strong>Produit:</strong> {product.quotation_has_product_id}</p>
                                    <p><strong>Prix:</strong> {product.price} €</p>
                                    <p><strong>Poids:</strong> {product.weight} kg</p>
                                    <p><strong>Référence:</strong> {product.reference}</p>
                                    <p><strong>Désignation:</strong> {product.designation}</p>
                                    <p><strong>Délai de livraison:</strong> {product.delivery_time.startsWith("0") ? "stock" : product.delivery_time}</p>
                                </div>
                                <div className="product-quantity">
                                    {!updateQuantity[product.quotation_has_product_id] &&
                                        <p>
                                            <strong>Quantité:</strong> {quantityInput[product.quotation_has_product_id] || product.quantity}
                                            <span className="edit-quantity-icon" data-id={product.quotation_has_product_id} onClick={() => handleUpdateQuantity(product.quotation_has_product_id)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                                </svg>
                                            </span>
                                        </p>
                                    }
                                    {updateQuantity[product.quotation_has_product_id] &&
                                        <p>
                                            <input name={product.quotation_has_product_id} type="number" defaultValue={quantityInput[product.quotation_has_product_id] || product.quantity} onChange={handleInputChange} />
                                            <span className="submit-quantity-icon" data-id={product.quotation_has_product_id} onClick={() => handleSubmitQuantity(product.quotation_has_product_id)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                                </svg>
                                            </span>
                                        </p>
                                    }
                                </div>
                            </div>
                            <div className="product-total">
                                <p><strong>Total:</strong> {(product.price * (quantityInput[product.quotation_has_product_id] || product.quantity)).toFixed(2)} € HT</p>
                                {!deleteLine[product.quotation_has_product_id] &&
                                    <span className="delete-product-icon" onClick={() => handleDeleteLine(product.quotation_has_product_id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                        </svg>
                                    </span>
                                }
                                {deleteLine[product.quotation_has_product_id] &&
                                    <div className="confirmation-popup">
                                        <p>Supprimer la ligne ?</p>
                                        <span className="confirm-delete-icon" onClick={() => handleDeleteLine(product.quotation_has_product_id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </span>
                                        <span className="cancel-delete-icon" onClick={() => handleConfirmDeleteLine(product.quotation_has_product_id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                            </svg>
                                        </span>
                                    </div>
                                }
                            </div>
                        </div>
                    );
                })}
                {quote.shipment &&
                    <div className="shipping-info">
                        <p><strong>Port et emballage :</strong> {quote.transport} € HT</p>
                        {quote.clicli === 6 &&
                            <p><strong>Supplément livraison en dépôt ou chez votre client :</strong> 6 € HT</p>

                        }
                    </div>
                }
                <div className="totals">
                    <p><strong>Total HT :</strong> {typeof quote.transport === "string" ? `${totalPrice.toFixed(2)} € HT hors transport` : `${(quote.transport + totalPrice).toFixed(2)} € HT`}</p>
                    <p><strong>Total TTC :</strong> {(totalPrice * 1.2).toFixed(2)} € TTC</p>
                </div>
            </div>

        </div>

    )
}

