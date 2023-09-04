import { useNavigate, useParams } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import AppContext from '../../context/AppContext'
import SearchProduct from '../../components/SearchProduct/SearchProduct'
import './Quote.scss'
import API from '../../utils/api/api';
import Quotepdf from '../../components/Quotepdf/Quotepdf.jsx';
import fetchData from '../../utils/function'
import ReactPDF, { Page, Text, View, Document, StyleSheet, PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import Addresses from '../../components/Addresses/Addresses'


export default function Quote() {
    const { user, updateUser, products, setProducts } = useContext(AppContext);
    const Navigate = useNavigate();
    const { quoteId } = useParams();
    const [updateQuantity, setUpdateQuantity] = useState({});
    const [deleteLine, setDeleteLine] = useState({});
    const [quantityInput, setQuantityInput] = useState({});
    const [openSearchProduct, setOpenSearchProduct] = useState(false);
    const [openDeleteQuotation, setOpenDeleteQuotation] = useState(false);
    const [openOrderConfirmation, setOpenOrderConfirmation] = useState(false);
    const [refInputIsOpen, setRefInputIsOpen] = useState(false);
    const [addressIsOpen, setAddressIsOpen] = useState({ quote: false });
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [openModifQuote, setOpenModifQuote] = useState(false);

    useEffect(() => {
        fetchData(user, updateUser); // Appeler la fonction pour récupérer les données
        setQuote(user.quotations.find(quote => quote.quotation_id === Number(quoteId)))
    }, []);
    const [quote, setQuote] = useState(user.quotations.find(quote => quote.quotation_id === Number(quoteId)));

    useEffect(() => {
        if (quote) {
            setProducts(quote.products);
        }

    }, [quote]);
    useEffect(() => {
        setQuote(user.quotations.find(quote => quote.quotation_id === Number(quoteId)))
        setIsDataLoaded(true);

    }, [user, addressIsOpen]);


    const totalPrice = quote.products === null ? 0 : quote.products.reduce((acc, product) => acc + product.price * (quantityInput[product.quotation_has_product_id
    ] || product.quantity), 0);
    const totalWeight = quote.products === null ? 0 : quote.products.reduce((acc, product) => acc + product.weight * (quantityInput[product.quotation_has_product_id
    ] || product.quantity), 0);

    const tansportFunction = (weight) => {

        if (weight === 0) {
            return 0;
        } else if (weight < 1.8) {
            return 18;
        } else if (weight < 4.8) {
            return 20;
        } else if (weight < 9.8) {
            return 24;
        } else if (weight < 14.7) {
            return 29;
        } else if (weight < 29.7) {
            return 39;
        } else {
            return "Nous consulter";
        }
    }

    quote.transport = tansportFunction(totalWeight);

    if (openSearchProduct || openDeleteQuotation || openOrderConfirmation || openModifQuote) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'unset';
    }

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

    function handleOpenSearchProduct() {
        setOpenSearchProduct(true);
        window.scrollTo(0, 0);
    }


    function handleChangeRef(event) {
        const { value } = event.target;
        setQuote((prevQuote) => ({
            ...prevQuote,
            reference: value,
        }));
    }

    async function handleRefModif() {

        await API.quotation.update(user.token, quoteId, { reference: quote.reference });
        setRefInputIsOpen(false);
    }

    async function handledeleteQuotation() {
        try {
            await API.quotation.delete(user.token, quoteId);
            const updatedQuotations = user.quotations.filter(quote => quote.quotation_id !== Number(quoteId));
            const updatedUser = { ...user, quotations: updatedQuotations };
            updateUser(updatedUser);
            Navigate('/dashboard', { replace: true });
        } catch (error) {
            console.error("An error occurred while deleting quotation:", error);
        }
    }

    async function handleOrder() {
        try {
            const orderData = products.map(product => {
                return {
                    reference: product.reference,
                    quantité: product.quantity,
                    puht: product.price,
                    totalht: product.price * product.quantity,
                    livraison: product.delivery_time,

                }
            })

            await API.email.sendEmail(user.token, orderData)
            Navigate('/dashboard', { replace: true });
        } catch (error) {
            console.error("An error occurred while creating order:", error);
        }
    }


    if (!isDataLoaded) {
        // Vous pouvez afficher un indicateur de chargement ici pendant que les données sont récupérées
        return <div>Chargement...</div>;
    }

    return (
        <div className='quote'>

            <h2>Devis n°{quote.quotation_id} Ref: {quote.reference}</h2>
            <div className="quote-viewer">
                <PDFViewer width="100%" height="100%">
                    <Quotepdf quote={quote} user={user} totalWeight={totalWeight} totalPrice={totalPrice} />
                </PDFViewer>
            </div>

            <div className="quote-btn-container">
                <div className='quote-btn'>
                    <PDFDownloadLink document={<Quotepdf quote={quote} user={user} totalWeight={totalWeight} totalPrice={totalPrice} />} fileName="quote.pdf">
                        {({ loading }) => (loading ? 'Loading document...' : 'Télécharger en PDF')}
                    </PDFDownloadLink>
                </div>
                <button className='quote-btn' onClick={() => setOpenOrderConfirmation(true)}>Passer en commande</button>
                <button className='quote-btn' onClick={handleOpenSearchProduct}>Ajouter un produit</button>
                <button className='quote-btn' onClick={() => setOpenModifQuote(true)}>Modifier le devis</button>
                <button className='quote-btn' onClick={() => setOpenDeleteQuotation(true)}>Supprimer ce devis</button>
            </div>
            {
                openModifQuote &&
                <div className="quote-modif">
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

                            {Array.isArray(products) && products.map((product) => {
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
                            {quote.shipment &&
                                <tr>
                                    <td colSpan="7">Port et emballage :</td>
                                    <td colSpan="2">{quote.transport} € HT</td>
                                </tr>
                            }
                            <tr>
                                <td colSpan="7">Total HT :</td>
                                <td colSpan="2">{typeof quote.transport === "string" ? `${totalPrice.toFixed(2)} € HT hors transport` : `${(quote.transport + totalPrice).toFixed(2)} € HT`}</td>
                            </tr>
                            <tr>
                                <td colSpan="7">Total TTC :</td>
                                <td colSpan="2">{(totalPrice * 1.2).toFixed(2)} € TTC</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            }
            {openSearchProduct &&
                <section className="quote-search-product">
                    <button className='quote-btn-cross' onClick={() => setOpenSearchProduct(false)}>X</button>
                    <SearchProduct />
                </section>
            }

            {
                openDeleteQuotation &&
                <section className="quote-delete-quotation">
                    <button className='quote-btn-cross' onClick={() => setOpenDeleteQuotation(false)}>X</button>
                    <p>Supprimer ce devis ?</p>
                    <button className='quote-btn' onClick={handledeleteQuotation}>Oui</button>
                    <button className='quote-btn' onClick={() => setOpenDeleteQuotation(false)}>Non</button>
                </section>
            }

            {
                openOrderConfirmation &&
                <section className="quote-order-confirmation">
                    <button className='quote-btn-cross' onClick={() => setOpenOrderConfirmation(false)}>X</button>
                    <p>Confirmer la commande ?</p>
                    <button className='quote-btn' onClick={() => setOpenOrderConfirmation(false)}>Non</button>
                    <button className='quote-btn' onClick={handleOrder}>Oui</button>

                </section >
            }
        </div>
    )
}