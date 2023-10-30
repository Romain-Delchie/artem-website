import React, { useContext } from 'react';
import AppContext from '../../context/AppContext';

export default function Price({ product }) {
    const { user } = useContext(AppContext);
    product.price = product.t1 ? (product.t1 / 3) * 2 : product.price;
    const price = user.profile_id !== 2 ? (product.price * product.coeff).toFixed(2) : product.price.toFixed(2);
    const goodPrice = price < product.minPrice ? product.minPrice.toFixed(2) : price;

    return (
        <div className="price">
            <p>PUHT: {goodPrice} €</p>
        </div>
    )
}