import './ProductCard.scss';
import { Link, Navigate, useParams } from 'react-router-dom';
import { useContext, useState } from 'react';
import API from '../../utils/api/api';
import AppContext from '../../context/AppContext';


export default function ProductCard({ product }) {
    const { user, products, setProducts, openAddProductForm, setOpenAddProductForm } = useContext(AppContext);
    const quotationId = Number(useParams().quoteId);
    const [quantityToAdd, setQuantityToAdd] = useState(1);
    function handleAddToQuotation() {
        const lineDate = {
            product_id: product.id,
            quotation_id: quotationId,
            quantity: quantityToAdd
        }
        API.quotation.addProduct(user.token, lineDate)
            .then((res) => {
                if (products === null) {
                    setProducts([{ ...product, quantity: quantityToAdd, quotation_has_product_id: res.data.generatedId }]
                    )
                } else {
                    setProducts([...products, { ...product, quantity: quantityToAdd, quotation_has_product_id: res.data.generatedId }])
                }
                setOpenAddProductForm(false);

            }).catch((err) => console.log(err))


    }
    return (
        <>
            <div className="product-card" >
                <Link className='product-card-container' to={`/product/${product.id}`}>
                    <div className="product-card-image">
                        <img src={`/images/products/${product.image_link}`} alt={product.description} />
                    </div>
                    <div className="product-card-description">
                        <h3>{product.description}</h3>
                        <p>Ref: {product.reference}</p>
                        <p>Délai: {product.delivery_time.startsWith('0') ? 'en stock' : product.delivery_time}</p>
                        <p>PUHT: {product.price.toFixed(2)} €</p>
                    </div>
                </Link>

            </div >
            {
                openAddProductForm[product.id] &&

                <div className="product-card-add-form">
                    <label htmlFor="quantity">indiquer la quantité</label>
                    <input type="number" onChange={(e) => setQuantityToAdd(e.target.value)} min="1" step="1" value={quantityToAdd} name='quantity' />
                    <button onClick={handleAddToQuotation}>Ajouter</button>
                </div>



            }
        </>
    )
}