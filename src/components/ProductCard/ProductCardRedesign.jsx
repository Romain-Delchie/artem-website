import { useParams } from 'react-router-dom';
import { useContext, useState } from 'react';
import API from '../../utils/api/api';
import AppContext from '../../context/AppContext';
import fetchData from '../../utils/fetchData';
import Price from '../Price/Price';
import './ProductCardRedesign.scss';

/**
 * Proposition de refonte de la carte produit, affichée aux seuls
 * administrateurs (voir ProductCard.jsx).
 *
 * La carte actuelle est un bloc bleu plein de 250 × 370 px : lisible à
 * l'unité, fatigante par cinquante. Cette version part du geste réel, qui est
 * de balayer une liste longue pour retrouver une référence.
 *
 * Trois partis pris :
 *  - surface claire, pour que l'œil se pose sur le contenu et non sur l'aplat ;
 *  - la référence en tête, en chiffres tabulaires : c'est par elle qu'on
 *    identifie un produit, pas par sa photo ;
 *  - le délai traité comme un état, pastille verte « en stock » ou ambre pour
 *    un délai, de sorte que la disponibilité se lise sans être lue.
 *
 * La logique métier est reprise telle quelle de la carte actuelle.
 */
export default function ProductCardRedesign({ product }) {
    const {
        user, updateUser, products, setProducts,
        openAddProductForm, setOpenAddProductForm,
    } = useContext(AppContext);
    const quotationId = Number(useParams().quoteId);
    const [quantityToAdd, setQuantityToAdd] = useState(1);

    function handleAddToQuotation() {
        const lineDate = {
            product_id: product.id,
            quotation_id: quotationId,
            quantity: quantityToAdd,
        };
        API.quotation.addProduct(user.token, lineDate)
            .then((res) => {
                const line = {
                    ...product,
                    quantity: quantityToAdd,
                    quotation_has_product_id: res.data.generatedId,
                };
                setProducts(products === null ? [line] : [...products, line]);
                fetchData(user, updateUser);
            })
            .catch((err) => console.error(err))
            .finally(setOpenAddProductForm(false));
    }

    const inStock = product.delivery_time?.startsWith('0');
    const isAdaptable = product.brand?.toLowerCase() !== 'artem';

    return (
        <>
            <article className="pcr">
                <div className="pcr-media">
                    <img
                        src={`/images/products/${product.image_link}`}
                        alt={product.description}
                        loading="lazy"
                        width="320"
                        height="200"
                    />
                    {isAdaptable && (
                        <span className="pcr-brand">Adaptable {product.brand}</span>
                    )}
                </div>

                <div className="pcr-body">
                    <p className="pcr-ref">{product.reference}</p>
                    <h3 className="pcr-name">{product.description}</h3>

                    <p className={`pcr-stock${inStock ? ' pcr-stock--now' : ''}`}>
                        <span className="pcr-stock-dot" aria-hidden="true" />
                        {inStock ? 'En stock' : `Délai ${product.delivery_time}`}
                    </p>

                    {user.profile_id !== 3 && (
                        <div className="pcr-price">
                            <Price product={product} />
                        </div>
                    )}
                </div>
            </article>

            {openAddProductForm[product.id] && (
                <div className="pcr-add-form">
                    <label htmlFor={`quantity-${product.id}`}>Quantité</label>
                    <input
                        type="number"
                        id={`quantity-${product.id}`}
                        name="quantity"
                        min="1"
                        step="1"
                        value={quantityToAdd}
                        onChange={(e) => setQuantityToAdd(e.target.value)}
                    />
                    <button type="button" onClick={handleAddToQuotation}>Ajouter</button>
                </div>
            )}
        </>
    );
}
