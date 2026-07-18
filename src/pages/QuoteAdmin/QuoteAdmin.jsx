import { Link, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AppContext from "../../context/AppContext";
import SearchProduct from "../../components/SearchProduct/SearchProduct";
import "../Quote/Quote.scss";
import "./QuoteAdmin.scss";
import API from "../../utils/api/api";
import Quotepdf from "../../components/Quotepdf/Quotepdf.jsx";
import fetchData from "../../utils/fetchData";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import QuoteUpdate from "../../components/QuoteUpdate/QuoteUpdate";
import artemData from "../../../data/artem-data";
import Loading from "../../components/Loading/Loading";
import goodPrice from "../../utils/goodPrice";

export default function QuoteAdmin({ quote }) {
  const { user, updateUser, setProducts } = useContext(AppContext);
  const Navigate = useNavigate();
  const [openSearchProduct, setOpenSearchProduct] = useState(false);
  const [openDeleteQuotation, setOpenDeleteQuotation] = useState(false);
  const [openOrderConfirmation, setOpenOrderConfirmation] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [openModifQuote, setOpenModifQuote] = useState(false);

  useEffect(() => {
    if (quote) {
      setIsDataLoaded(true);
      setProducts(quote.products);
      updateUser({ ...user, profile_id: quote.account_profile_id });
    }
  }, [quote]);

  const totalPrice =
    quote.products === null
      ? 0
      : quote.products.reduce(
          (acc, product) =>
            acc +
            goodPrice(quote.account_profile_id, product, product.quantity) *
              product.quantity,
          0
        );
  const totalWeight =
    quote.products === null
      ? 0
      : quote.products.reduce(
          (acc, product) => acc + product.weight * product.quantity,
          0
        );
  quote.totalPrice = totalPrice;
  quote.totalWeight = totalWeight;
  quote.transport =
    quote.delivery_id === 1 ? 0 : artemData.tansportFunction(totalWeight);
  quote.transport =
    quote.zip_code.startsWith("97") || quote.country?.toLowerCase() !== "france"
      ? "Nous consulter"
      : quote.transport;
  quote.clicli =
    quote.delivery_id !== user.delivery_standard.id ? artemData.clicli : 0;
  quote.totalPrice =
    quote.totalPrice + quote.transport + quote.clicli + quote.corse;
  if (
    openSearchProduct ||
    openDeleteQuotation ||
    openOrderConfirmation ||
    openModifQuote
  ) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "unset";
  }

  function handleOpenSearchProduct() {
    setOpenSearchProduct(true);
    window.scrollTo(0, 0);
  }

  async function handledeleteQuotation() {
    try {
      await API.quotation.delete(user.token, quoteId);
      const updatedQuotations = user.quotations.filter(
        (quote) => quote.quotation_id !== Number(quoteId)
      );
      const updatedUser = { ...user, quotations: updatedQuotations };
      updateUser(updatedUser);
      window.history.replaceState(null, "", "/quote-history");
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
        quote: quote,
      };

      try {
        // Envoyez l'e-mail avec les données du PDF
        await API.email.sendEmail(user.token, orderData);
        alert(
          "Votre commande a bien été prise en compte, vous serez en copie du mail de commande qui nous sera envoyé dans les prochaines minutes."
        );
        Navigate("/dashboard", { replace: true });
      } catch (emailError) {
        console.error("An error occurred while sending the email:", emailError);
        alert(
          "Votre devis est vide, veuillez ajouter des produits avant de passer commande."
        );
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
    return <Loading />;
  }

  return (
    <main className="quote quote-admin">
      <div className="quote-title">
        <h1>Devis n°{quote.quotation_id}</h1>
        <h2>Ref: {quote.reference}</h2>
      </div>
      <div className="quote-info">
        <div className="quote-viewer">
          <PDFViewer width="100%" height="100%">
            <Quotepdf
              quote={quote}
              user={user}
              totalWeight={totalWeight}
              totalPrice={totalPrice}
            />
          </PDFViewer>
        </div>
      </div>
    </main>
  );
}
