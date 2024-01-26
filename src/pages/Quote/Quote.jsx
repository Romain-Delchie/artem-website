import { Link, useNavigate, useParams } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import AppContext from '../../context/AppContext'
import SearchProduct from '../../components/SearchProduct/SearchProduct'
import './Quote.scss'
import API from '../../utils/api/api';
import Quotepdf from '../../components/Quotepdf/Quotepdf.jsx';
import fetchData from '../../utils/fetchData'
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import QuoteUpdate from '../../components/QuoteUpdate/QuoteUpdate'
import artemData from '../../../data/artem-data'
import Loading from '../../components/Loading/Loading'
import goodPrice from '../../utils/goodPrice'


export default function Quote() {
    const { user, updateUser, setProducts } = useContext(AppContext);
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

    const totalPrice = quote.products === null ? 0 : quote.products.reduce((acc, product) => acc + goodPrice(user.profile_id, product, product.quantity) * product.quantity, 0);
    const totalWeight = quote.products === null ? 0 : quote.products.reduce((acc, product) => acc + product.weight * product.quantity, 0);
    quote.totalPrice = totalPrice;
    quote.totalWeight = totalWeight;
    quote.transport = quote.delivery_id === 1 ? 0 : artemData.tansportFunction(totalWeight);
    quote.transport = quote.zip_code.startsWith('97') || quote.country?.toLowerCase() !== 'france' ? "Nous consulter" : quote.transport;
    quote.clicli = quote.delivery_id !== user.delivery_standard.id ? artemData.clicli : 0;
    quote.totalPrice = quote.totalPrice + quote.transport + quote.clicli + quote.corse;
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
            window.history.replaceState(null, '', '/quote-history');
            window.location.reload();
        } catch (error) {
            console.error("An error occurred while deleting quotation:", error);
        }
    }

    async function handleOrder() {
        setIsDataLoaded(false);
        try {
            const orderData = {
                company: user.company,
                email: user.email,
                phoneNumber: user.phone_number,
                zipCode: user.billing_address.zip_code,
                quote: quote
            };

            try {
                // Envoyez l'e-mail avec les données du PDF
                await API.email.sendEmail(user.token, orderData);
                alert('Votre commande a bien été prise en compte, vous serez en copie du mail de commande qui nous sera envoyé dans les prochaines minutes.');
                Navigate('/dashboard', { replace: true });
            } catch (emailError) {
                console.error("An error occurred while sending the email:", emailError);
                alert("Votre devis est vide, veuillez ajouter des produits avant de passer commande.")
                setOpenOrderConfirmation(false);
            }

        } catch (error) {
            console.error("An error occurred while creating order:", error);
        } finally {
            setIsDataLoaded(true);
        }
    }

    function handleCloseSearchProducts() {
        location.reload();
    }


    if (!isDataLoaded) {
        return <Loading />
    }

    return (
        <main className='quote'>
            <div className='quote-title'>
                <h1>Devis n°{quote.quotation_id}</h1>
                <h2>Ref: {quote.reference}</h2>
                <Link className='quote-btn' to='/quote-history'>Retour à la liste des devis
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l6-6m0 0l-6-6m6 6H9a6 6 0 000 12h3" />
                    </svg>

                </Link>
            </div>
            <div className="quote-info">
                <div className="quote-viewer">
                    <PDFViewer width="100%" height="100%">
                        <Quotepdf quote={quote} user={user} totalWeight={totalWeight} totalPrice={totalPrice} />
                    </PDFViewer>
                </div>

                <div className="quote-btn-container">
                    <button className='quote-btn' onClick={handleOpenSearchProduct}>Ajouter un produit</button>
                    <div className='quote-btn'>
                        <PDFDownloadLink document={<Quotepdf quote={quote} user={user} totalWeight={totalWeight} totalPrice={totalPrice} />} fileName={`devis_${quote.reference}`}>
                            {({ loading }) => (loading ? 'Loading document...' : 'Télécharger en PDF')}
                        </PDFDownloadLink>
                    </div>
                    <button className='quote-btn' onClick={() => setOpenOrderConfirmation(true)}>Passer en commande</button>
                    <button className='quote-btn' onClick={() => setOpenModifQuote(true)}>Modifier le devis</button>
                    <button className='quote-btn quote-btn-delete' onClick={() => setOpenDeleteQuotation(true)}>Supprimer ce devis</button>
                </div>
            </div>
            {
                openModifQuote &&
                <QuoteUpdate quote={quote} setQuote={setQuote} totalPrice={totalPrice} setOpenModifQuote={setOpenModifQuote} />
            }
            {
                openSearchProduct &&
                <section className="quote-search-product">
                    <div className="quote-btn-close" onClick={handleCloseSearchProducts}>

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                        </svg>
                        <span className='quote-btn-close-quantity'>{quote.products?.length}</span>
                        <p>Retour au devis</p>

                    </div>
                    <SearchProduct />

                </section>
            }

            {
                openDeleteQuotation &&
                <section className="quote-confirmation">
                    <div className="quote-confirmation-container">
                        <svg onClick={() => setOpenDeleteQuotation(false)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 quote-btn-cross">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
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
                        <svg onClick={() => setOpenOrderConfirmation(false)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 quote-btn-cross">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        <p>Confirmer la commande ?</p>
                        <div className="quote-btn-confirmation-container">
                            <button className='quote-btn' onClick={handleOrder}>Oui</button>
                            <button className='quote-btn' onClick={() => setOpenOrderConfirmation(false)}>Non</button>
                        </div>
                    </div>

                </section >
            }


        </main>
    )
}