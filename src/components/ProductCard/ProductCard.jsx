import './ProductCard.scss';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function ProductCard({ product }) {
    return (
        <div className="product-card" >
            <Link to={`/product/${product.id}`}>
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
    )
}