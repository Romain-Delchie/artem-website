import { Link, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AppContext from "../../context/AppContext";
import SearchProductRedesign from "../../components/SearchProduct/SearchProductRedesign";
import "./QuoteView.scss";
import API from "../../utils/api/api";
import Quotepdf from "../../components/Quotepdf/Quotepdf.jsx";
import fetchData from "../../utils/fetchData";
import { BlobProvider, PDFDownloadLink } from "@react-pdf/renderer";
import QuoteUpdate from "../../components/QuoteUpdate/QuoteUpdate";
import artemData from "../../../data/artem-data";
import Loading from "../../components/Loading/Loading";
import goodPrice from "../../utils/goodPrice";
import TermsOfSales from "../TermsOfSales/TermsOfSales";
import { createPortal } from "react-dom";

/**
 * Devis d'un client : aperçu du PDF et actions (ajout de produits,
 * modification, commande, suppression).
 *
 * La page devis de l'administrateur (QuoteAdmin) garde son ancienne mise en
 * forme, d'où une feuille propre à cette page, QuoteView.scss, plutôt que des
 * changements dans Quote.scss, qu'elle partage encore.
 */

const icons = {
  back: <path d="M15 18l-6-6 6-6" />,
  cart: <path d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />,
  plus: <path d="M12 4.5v15m7.5-7.5h-15" />,
  pencil: <path d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125" />,
  download: <path d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />,
  trash: <path d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />,
  close: <path d="M6 18 18 6M6 6l12 12" />,
  check: <path d="m4.5 12.75 6 6 9-13.5" />,
};

function Icon({ name }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {icons[name]}
    </svg>
  );
}

/**
 * Boîte de dialogue de confirmation : rendue dans <body> pour passer au-dessus
 * de l'en-tête du site, refermée par Échap ou par un clic sur le fond.
 */
function Dialog({ title, tone, icon, onClose, children, actions }) {
  useEffect(() => {
    const onKey = (event) => { if (event.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return createPortal(
    <div className="qt-dialog-backdrop" onClick={onClose}>
      <div
        className={`qt-dialog${tone ? ` qt-dialog--${tone}` : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="qt-dialog-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" className="qt-dialog-close" onClick={onClose} aria-label="Fermer">
          <Icon name="close" />
        </button>
        <span className="qt-dialog-icon"><Icon name={icon} /></span>
        <h2 id="qt-dialog-title">{title}</h2>
        <div className="qt-dialog-body">{children}</div>
        <div className="qt-dialog-actions">{actions}</div>
      </div>
    </div>,
    document.body
  );
}

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
    setQuote(
      user.quotations.find((quote) => quote.quotation_id === Number(quoteId))
    );
  }, []);
  const [quote, setQuote] = useState(
    user.quotations.find((quote) => quote.quotation_id === Number(quoteId))
  );
  // Dernier produit ajouté depuis la fenêtre d'ajout : sa présence ouvre la
  // confirmation.
  const [addedLine, setAddedLine] = useState(null);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  useEffect(() => {
    if (quote) {
      setProducts(quote.products);
    }
  }, [quote]);

  useEffect(() => {
    setQuote(
      user.quotations.find((quote) => quote.quotation_id === Number(quoteId))
    );
    setIsDataLoaded(true);
  }, [user]);

  const totalPrice =
    quote.products === null
      ? 0
      : quote.products.reduce(
          (acc, product) =>
            acc +
            goodPrice(user.profile_id, product, product.quantity) *
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
  quote.profile_id = user.profile_id;
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
    quote.transport === "Nous consulter"
      ? quote.totalPrice + quote.clicli + quote.corse
      : quote.totalPrice + quote.transport + quote.clicli + quote.corse;
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
      const products =
        user.profile_id === 1
          ? quote.products.map((product) => ({
              ...product,
              priceWithCoeff: goodPrice(
                user.profile_id,
                product,
                product.quantity
              ),
            }))
          : quote.products;

      const orderData = {
        company: user.company,
        email: user.email,
        phoneNumber: user.phone_number,
        zipCode: user.billing_address.zip_code,
        quote: { ...quote, products },
      };
      try {
        // Envoyez l'e-mail avec les données du PDF
        await API.email.sendEmail(user.token, orderData);
        alert(
          "Votre commande a bien été prise en compte, vous serez en copie du mail de commande qui nous sera envoyé dans les prochaines minutes."
        );
        API.quotation
          .update(user.token, quoteId, { ordered: true })
          .catch((error) =>
            console.error("An error occurred while updating quotation:", error)
          );
        setIsDataLoaded(true);
        window.location.reload();
      } catch (emailError) {
        console.error("An error occurred while sending the email:", emailError);
        alert(
          "Votre devis est vide, veuillez ajouter des produits avant de passer commande."
        );
        setIsDataLoaded(true);
        setOpenOrderConfirmation(false);
      }
    } catch (error) {
      console.error("An error occurred while creating order:", error);
    }
  }

  function handleCloseSearchProducts() {
    location.reload();
  }

  if (!isDataLoaded) {
    return <Loading />;
  }

  const lines = quote.products ?? [];
  const isOrdered = quote.ordered != false;
  const transportUnknown = quote.transport === "Nous consulter";
  const pdf = (
    <Quotepdf
      quote={quote}
      user={user}
      totalWeight={totalWeight}
      totalPrice={totalPrice}
    />
  );

  return (
    <main className="qt">
      <div className="qt-shell">
        <Link className="qt-back" to="/quote-history">
          <Icon name="back" />
          Mes devis
        </Link>

        <header className="qt-head">
          <div className="qt-head-main">
            <p className="qt-head-eyebrow">Devis n°{quote.quotation_id}</p>
            <h1>{quote.reference || "Sans référence"}</h1>
            <p className="qt-head-meta">
              Créé le {quote.creation_date} · Valable jusqu'au {quote.expiration_date}
            </p>
            <span className={`qt-status${isOrdered ? " qt-status--ordered" : ""}`}>
              <span className="qt-status-dot" aria-hidden="true" />
              {isOrdered ? "Devis déjà commandé" : "Pas encore commandé"}
            </span>
          </div>
          <div className="qt-head-total">
            <span>Total HT</span>
            <strong>{quote.totalPrice.toFixed(2)} €</strong>
            {transportUnknown && <em>hors transport</em>}
          </div>
        </header>

        <div className="qt-layout">
          <section className="qt-preview" aria-label="Aperçu du devis">
            {/* L'aperçu PDF intégré ne s'affiche pas sur la plupart des
                navigateurs mobiles : un récapitulatif des lignes le remplace
                sur petit écran. */}
            {/* Visualiseur maison plutôt que PDFViewer, qui ouvre le document à
                la largeur du cadre : une page A4 y dépasse alors la hauteur et
                oblige à défiler. Le paramètre d'ouverture fixe le zoom à 90 %,
                compris par Chrome, Edge et Firefox ; la barre d'outils reste
                là pour l'ajuster. */}
            <div className="qt-viewer">
              <BlobProvider document={pdf}>
                {({ url, loading }) =>
                  loading || !url ? (
                    <p className="qt-viewer-loading">Préparation de l'aperçu…</p>
                  ) : (
                    <iframe
                      title={`Aperçu du devis n°${quote.quotation_id}`}
                      src={`${url}#toolbar=1&zoom=90`}
                    />
                  )
                }
              </BlobProvider>
            </div>

            <div className="qt-lines">
              <h2>Contenu du devis</h2>
              {lines.length === 0 ? (
                <p className="qt-lines-empty">Ce devis ne contient encore aucun produit.</p>
              ) : (
                <ul>
                  {lines.map((product) => {
                    const unit = goodPrice(user.profile_id, product, product.quantity);
                    return (
                      <li key={product.quotation_has_product_id}>
                        <div>
                          <p className="qt-lines-name">{product.designation || product.description}</p>
                          <p className="qt-lines-ref">{product.reference}</p>
                        </div>
                        <div className="qt-lines-price">
                          <span>{product.quantity} × {Number(unit).toFixed(2)} €</span>
                          <strong>{(unit * product.quantity).toFixed(2)} €</strong>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </section>

          <aside className="qt-actions" aria-label="Actions sur le devis">
            <button
              type="button"
              className="qt-btn qt-btn--primary"
              onClick={() => setOpenOrderConfirmation(true)}
            >
              <Icon name="cart" />
              Passer en commande
            </button>
            <button type="button" className="qt-btn" onClick={handleOpenSearchProduct}>
              <Icon name="plus" />
              Ajouter un produit
            </button>
            <button type="button" className="qt-btn" onClick={() => setOpenModifQuote(true)}>
              <Icon name="pencil" />
              Modifier le devis
            </button>
            <PDFDownloadLink
              className="qt-btn qt-btn--pdf"
              document={pdf}
              fileName={`devis_${quote.reference}`}
            >
              {({ loading }) => (
                <>
                  <Icon name="download" />
                  {loading ? "Préparation du PDF…" : "Télécharger en PDF"}
                </>
              )}
            </PDFDownloadLink>
            <hr />
            <button
              type="button"
              className="qt-btn qt-btn--danger"
              onClick={() => setOpenDeleteQuotation(true)}
            >
              <Icon name="trash" />
              Supprimer ce devis
            </button>
          </aside>
        </div>
      </div>

      {openModifQuote && (
        <QuoteUpdate
          quote={quote}
          setQuote={setQuote}
          totalPrice={totalPrice}
          setOpenModifQuote={setOpenModifQuote}
        />
      )}

      {openSearchProduct && createPortal(
        <div className="qt-overlay" role="dialog" aria-modal="true" aria-labelledby="qt-overlay-title">
          <header className="qt-overlay-bar">
            <div>
              <h2 id="qt-overlay-title">Ajouter des produits</h2>
              <p>
                Devis n°{quote.quotation_id} · {lines.length}{" "}
                {lines.length < 2 ? "ligne" : "lignes"}
              </p>
            </div>
            <button type="button" className="qt-btn qt-btn--primary" onClick={handleCloseSearchProducts}>
              <Icon name="check" />
              Retour au devis
            </button>
          </header>
          <div className="qt-overlay-body">
            <SearchProductRedesign
              quoteMode
              onAdded={(product, quantity) => setAddedLine({ product, quantity })}
            />
          </div>
        </div>,
        document.body
      )}

      {addedLine && (
        <Dialog
          title="Produit ajouté au devis"
          icon="check"
          onClose={() => setAddedLine(null)}
          actions={
            <>
              <button type="button" className="qt-btn" onClick={() => setAddedLine(null)}>
                Continuer mes ajouts
              </button>
              <button type="button" className="qt-btn qt-btn--primary" onClick={handleCloseSearchProducts}>
                Voir le devis
              </button>
            </>
          }
        >
          <p>
            <strong>{addedLine.quantity} × {addedLine.product.designation || addedLine.product.description}</strong>
            <br />
            Réf. {addedLine.product.reference} — ajouté au devis n°{quote.quotation_id}.
          </p>
        </Dialog>
      )}

      {openDeleteQuotation && (
        <Dialog
          title="Supprimer ce devis ?"
          tone="danger"
          icon="trash"
          onClose={() => setOpenDeleteQuotation(false)}
          actions={
            <>
              <button type="button" className="qt-btn" onClick={() => setOpenDeleteQuotation(false)}>
                Annuler
              </button>
              <button type="button" className="qt-btn qt-btn--danger-solid" onClick={handledeleteQuotation}>
                Supprimer
              </button>
            </>
          }
        >
          <p>
            Le devis n°{quote.quotation_id}
            {quote.reference ? ` « ${quote.reference} »` : ""} sera définitivement
            supprimé. Cette action est irréversible.
          </p>
        </Dialog>
      )}

      {openOrderConfirmation && (
        <Dialog
          title="Confirmer la commande ?"
          icon="cart"
          onClose={() => setOpenOrderConfirmation(false)}
          actions={
            <>
              <button type="button" className="qt-btn" onClick={() => setOpenOrderConfirmation(false)}>
                Annuler
              </button>
              <button
                type="button"
                className="qt-btn qt-btn--primary"
                disabled={!acceptedTerms}
                onClick={handleOrder}
              >
                Commander
              </button>
            </>
          }
        >
          <p>
            Le devis n°{quote.quotation_id} sera transmis à ARTEM pour un montant
            de <strong>{quote.totalPrice.toFixed(2)} € HT</strong>
            {transportUnknown ? " hors transport" : ""}. Vous serez en copie du
            mail de commande.
          </p>
          {isOrdered && (
            <p className="qt-dialog-note">Ce devis a déjà été commandé une fois.</p>
          )}
          <label className="qt-terms">
            <input
              type="checkbox"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
            />
            <span>
              J'ai lu et j'accepte les{" "}
              <button
                type="button"
                className="qt-terms-link"
                onClick={() => setShowTerms(true)}
              >
                Conditions Générales de Vente
              </button>
            </span>
          </label>
        </Dialog>
      )}

      {showTerms && createPortal(
        <div className="qt-terms-overlay" onClick={() => setShowTerms(false)}>
          <div className="qt-terms-modal" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className="qt-terms-close"
              onClick={() => setShowTerms(false)}
              aria-label="Fermer les conditions générales de vente"
            >
              <Icon name="close" />
            </button>
            <TermsOfSales />
          </div>
        </div>,
        document.body
      )}
    </main>
  );
}
