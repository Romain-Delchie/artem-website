import './QuoteUpdate.scss'
import { useContext, useEffect, useState } from 'react'
import AppContext from '../../context/AppContext'
import API from '../../utils/api/api';
import Addresses from '../Addresses/Addresses'
import fetchData from '../../utils/fetchData'
import goodPrice from '../../utils/goodPrice';

/**
 * Fenêtre de modification d'un devis : référence, adresse de livraison,
 * quantités et lignes. Partagée par la page devis du client et par celle de
 * l'administrateur.
 */

const icons = {
    close: <path d="M6 18 18 6M6 6l12 12" />,
    pencil: <path d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125" />,
    check: <path d="m4.5 12.75 6 6 9-13.5" />,
    trash: <path d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />,
};

function Icon({ name }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
            strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            {icons[name]}
        </svg>
    );
}

export default function QuoteUpdate({ quote, totalPrice, setOpenModifQuote, setQuote }) {

    const { user, updateUser, products, setProducts } = useContext(AppContext);
    const [refInputIsOpen, setRefInputIsOpen] = useState(false);
    const [addressIsOpen, setAddressIsOpen] = useState({ quote: false });
    const [updateQuantity, setUpdateQuantity] = useState({});
    const [quantityInput, setQuantityInput] = useState({});
    const [deleteLine, setDeleteLine] = useState({});

    // Échap referme la fenêtre, sauf pendant le choix d'une adresse, qui a sa
    // propre fenêtre par-dessus.
    useEffect(() => {
        if (addressIsOpen.quote) return undefined;
        const onKey = (event) => { if (event.key === 'Escape') setOpenModifQuote(false); };
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, [addressIsOpen.quote, setOpenModifQuote]);

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

    async function handleRefModif(event) {
        event.preventDefault();
        await API.quotation.update(user.token, quote.quotation_id, { reference: quote.reference });
        setRefInputIsOpen(false);
    }

    const address = [
        quote.name_address,
        quote.street_address,
        quote.street_other,
        [quote.zip_code, quote.city].filter(Boolean).join(' '),
        quote.country,
    ].filter(Boolean);

    const transportUnknown = typeof quote.transport === "string";
    const lines = Array.isArray(products) ? products : [];

    return (
        <div className="qu-backdrop" onClick={() => setOpenModifQuote(false)}>
            <div
                className="qu"
                role="dialog"
                aria-modal="true"
                aria-labelledby="qu-title"
                onClick={(event) => event.stopPropagation()}
            >
                <header className="qu-head">
                    <div>
                        <p className="qu-head-eyebrow">Devis n°{quote.quotation_id}</p>
                        <h2 id="qu-title">Modifier le devis</h2>
                    </div>
                    <button type="button" className="qu-icon-btn" onClick={() => setOpenModifQuote(false)} aria-label="Fermer">
                        <Icon name="close" />
                    </button>
                </header>

                <div className="qu-body">
                    <section className="qu-info">
                        <div className="qu-info-row">
                            <div className="qu-info-main">
                                <p className="qu-label">Référence</p>
                                {!refInputIsOpen && <p className="qu-value">{quote.reference || <span className="qu-muted">Sans référence</span>}</p>}
                                {refInputIsOpen &&
                                    <form className="qu-inline-form" onSubmit={handleRefModif}>
                                        <input
                                            type="text"
                                            name='reference'
                                            aria-label="Référence du devis"
                                            defaultValue={quote.reference}
                                            onChange={handleChangeRef}
                                            autoFocus
                                        />
                                        <button type="button" className="qu-btn" onClick={() => setRefInputIsOpen(false)}>Annuler</button>
                                        <button type="submit" className="qu-btn qu-btn--primary">Enregistrer</button>
                                    </form>
                                }
                            </div>
                            {!refInputIsOpen &&
                                <button type="button" className="qu-btn qu-btn--small" onClick={() => setRefInputIsOpen(true)}>
                                    <Icon name="pencil" />Modifier
                                </button>
                            }
                        </div>

                        <div className="qu-info-row">
                            <div className="qu-info-main">
                                <p className="qu-label">Adresse de livraison</p>
                                <p className="qu-value">{address.join(', ')}</p>
                            </div>
                            <button type="button" className="qu-btn qu-btn--small" onClick={() => setAddressIsOpen({ quote: true })}>
                                <Icon name="pencil" />Modifier
                            </button>
                        </div>

                        <div className="qu-info-dates">
                            <div>
                                <p className="qu-label">Créé le</p>
                                <p className="qu-value">{quote.creation_date}</p>
                            </div>
                            <div>
                                <p className="qu-label">Valable jusqu'au</p>
                                <p className="qu-value">{quote.expiration_date}</p>
                            </div>
                        </div>
                    </section>

                    {addressIsOpen.quote &&
                        <Addresses type="quote" modification={addressIsOpen} setModification={setAddressIsOpen} quoteId={quote.quotation_id} title="Adresse de livraison" />
                    }

                    <section className="qu-lines" aria-label="Produits du devis">
                        <h3>Produits <span>{lines.length}</span></h3>
                        {lines.length === 0 &&
                            <p className="qu-muted">Ce devis ne contient encore aucun produit.</p>
                        }
                        <ul>
                            {lines.map((product) => {
                                const id = product.quotation_has_product_id;
                                const unit = goodPrice(user.profile_id, product, product.quantity);
                                const quantity = quantityInput[id] || product.quantity;
                                const inStock = product.delivery_time.startsWith("0");
                                return (
                                    <li className={`qu-line${deleteLine[id] ? ' qu-line--confirm' : ''}`} key={id}>
                                        <div className="qu-line-info">
                                            <p className="qu-line-name">{product.designation || product.description}</p>
                                            <p className="qu-line-meta">
                                                <span>{product.reference}</span>
                                                <span className={`qu-stock${inStock ? ' qu-stock--now' : ''}`}>
                                                    {inStock ? 'En stock' : `Délai ${product.delivery_time}`}
                                                </span>
                                                <span>{product.weight} kg</span>
                                            </p>
                                        </div>

                                        <div className="qu-line-qty">
                                            <p className="qu-label">Quantité</p>
                                            {!updateQuantity[id] &&
                                                <button type="button" className="qu-qty-value" onClick={() => handleUpdateQuantity(id)} aria-label={`Modifier la quantité (${quantity})`}>
                                                    {quantity}
                                                    <Icon name="pencil" />
                                                </button>
                                            }
                                            {updateQuantity[id] &&
                                                <form className="qu-qty-form" onSubmit={(event) => { event.preventDefault(); handleSubmitQuantity(id); }}>
                                                    <input
                                                        name={id}
                                                        type="number"
                                                        min="1"
                                                        step="1"
                                                        aria-label="Nouvelle quantité"
                                                        defaultValue={quantity}
                                                        onChange={handleInputChange}
                                                        autoFocus
                                                    />
                                                    <button type="submit" className="qu-icon-btn qu-icon-btn--ok" aria-label="Valider la quantité">
                                                        <Icon name="check" />
                                                    </button>
                                                </form>
                                            }
                                        </div>

                                        <div className="qu-line-price">
                                            <p className="qu-label">{Number(unit).toFixed(2)} € / u.</p>
                                            <p className="qu-line-total">{(unit * quantity).toFixed(2)} € HT</p>
                                        </div>

                                        <div className="qu-line-actions">
                                            {!deleteLine[id] &&
                                                <button type="button" className="qu-icon-btn qu-icon-btn--danger" onClick={() => handleDeleteLine(id)} aria-label="Supprimer la ligne">
                                                    <Icon name="trash" />
                                                </button>
                                            }
                                        </div>

                                        {deleteLine[id] &&
                                            <div className="qu-line-confirm">
                                                <p>Supprimer cette ligne ?</p>
                                                <button type="button" className="qu-btn qu-btn--small" onClick={() => handleDeleteLine(id)}>Annuler</button>
                                                <button type="button" className="qu-btn qu-btn--small qu-btn--danger" onClick={() => handleConfirmDeleteLine(id)}>Supprimer</button>
                                            </div>
                                        }
                                    </li>
                                );
                            })}
                        </ul>
                    </section>

                    <section className="qu-summary">
                        <dl>
                            <div>
                                <dt>Produits</dt>
                                <dd>{totalPrice.toFixed(2)} € HT</dd>
                            </div>
                            {quote.shipment &&
                                <div>
                                    <dt>Port et emballage</dt>
                                    <dd>{transportUnknown ? quote.transport : `${quote.transport} € HT`}</dd>
                                </div>
                            }
                            {quote.shipment && quote.clicli === 6 &&
                                <div>
                                    <dt>Supplément livraison en dépôt ou chez votre client</dt>
                                    <dd>6 € HT</dd>
                                </div>
                            }
                            {quote.shipment && quote.corse !== 0 &&
                                <div>
                                    <dt>Supplément livraison en Corse</dt>
                                    <dd>{quote.corse} € HT</dd>
                                </div>
                            }
                            <div className="qu-summary-total">
                                <dt>Total HT</dt>
                                <dd>
                                    {transportUnknown
                                        ? `${totalPrice.toFixed(2)} € HT hors transport`
                                        : `${(quote.transport + totalPrice + quote.clicli + quote.corse).toFixed(2)} € HT`}
                                </dd>
                            </div>
                        </dl>
                    </section>
                </div>

                <footer className="qu-foot">
                    <button type="button" className="qu-btn qu-btn--primary" onClick={() => setOpenModifQuote(false)}>
                        Terminer
                    </button>
                </footer>
            </div>
        </div>
    )
}
