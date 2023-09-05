import { useNavigate, useParams } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import AppContext from '../../context/AppContext'
import SearchProduct from '../../components/SearchProduct/SearchProduct'
import './Quote.scss'
import API from '../../utils/api/api';
import Quotepdf from '../../components/Quotepdf/Quotepdf.jsx';
import fetchData from '../../utils/function'
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import QuoteUpdate from '../../components/QuoteUpdate/QuoteUpdate'
import artemData from '../../../data/artem-data'

export default function Quote() {
    const { user, updateUser, products, setProducts } = useContext(AppContext);
    const Navigate = useNavigate();
    const { quoteId } = useParams();
    const [openSearchProduct, setOpenSearchProduct] = useState(false);
    const [openDeleteQuotation, setOpenDeleteQuotation] = useState(false);
    const [openOrderConfirmation, setOpenOrderConfirmation] = useState(false);
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
    }, [user]);
    console.log(quote);
    console.log(user);
    const totalPrice = quote.products === null ? 0 : quote.products.reduce((acc, product) => acc + product.price * product.quantity, 0);
    const totalWeight = quote.products === null ? 0 : quote.products.reduce((acc, product) => acc + product.weight * product.quantity, 0);



    quote.transport = artemData.tansportFunction(totalWeight);
    quote.clicli = quote.delivery_id !== user.delivery_standard.id ? artemData.clicli : 0;

    if (openSearchProduct || openDeleteQuotation || openOrderConfirmation || openModifQuote) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'unset';
    }

    function handleOpenSearchProduct() {
        setOpenSearchProduct(true);
        window.scrollTo(0, 0);
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
                    <PDFDownloadLink document={<Quotepdf quote={quote} user={user} totalWeight={totalWeight} totalPrice={totalPrice} />} fileName={`devis_${quote.reference}`}>
                        {({ loading }) => (loading ? 'Loading document...' : 'Télécharger en PDF')}
                    </PDFDownloadLink>
                </div>
                <button className='quote-btn' onClick={() => setOpenOrderConfirmation(true)}>Passer en commande</button>
                <button className='quote-btn' onClick={handleOpenSearchProduct}>Ajouter un produit</button>
                <button className='quote-btn' onClick={() => setOpenModifQuote(true)}>Modifier le devis</button>
                <button className='quote-btn quote-btn-delete' onClick={() => setOpenDeleteQuotation(true)}>Supprimer ce devis</button>
            </div>
            {
                openModifQuote &&
                <QuoteUpdate quote={quote} setQuote={setQuote} totalPrice={totalPrice} setOpenModifQuote={setOpenModifQuote} />
            }
            {
                openSearchProduct &&
                <section className="quote-search-product">
                    <button className='quote-btn-cross' onClick={() => setOpenSearchProduct(false)}>X</button>
                    <SearchProduct />
                </section>
            }

            {
                openDeleteQuotation &&
                <section className="quote-confirmation">
                    <div className="quote-confirmation-container">
                        <button className='quote-btn-cross' onClick={() => setOpenDeleteQuotation(false)}>X</button>
                        <p>Supprimer ce devis ?</p>
                        <div className="quote-btn-confirmation-container">
                            <button className='quote-btn  quote-btn-delete' onClick={handledeleteQuotation}>Oui</button>
                            <button className='quote-btn' onClick={() => setOpenDeleteQuotation(false)}>Non</button>
                        </div>
                    </div>
                </section>
            }

            {
                openOrderConfirmation &&
                <section className="quote-confirmation">
                    <div className="quote-confirmation-container">
                        <button className='quote-btn-cross' onClick={() => setOpenOrderConfirmation(false)}>X</button>
                        <p>Confirmer la commande ?</p>
                        <div className="quote-btn-confirmation-container">
                            <button className='quote-btn' onClick={handleOrder}>Oui</button>
                            <button className='quote-btn' onClick={() => setOpenOrderConfirmation(false)}>Non</button>
                        </div>
                    </div>

                </section >
            }
        </div >
    )
}