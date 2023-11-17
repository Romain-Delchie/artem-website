import React, { useContext } from 'react';
import AppContext from '../../context/AppContext';

export default function Price({ product }) {
    const { user } = useContext(AppContext);
    product.price = product.t1 ? (product.t1 / 3) * 2 : Number(product.price).toFixed(2);
    const t1Price = (product.price * product.coeff);

    const price = user.profile_id !== 2 ? Number(t1Price).toFixed(2) : Number(product.price).toFixed(2);
    const goodPrice = user.profile_id === 2 ? price : price < product.minPrice ? Number(product.minPrice).toFixed(2) : price;
    const bakerPrice = t1Price < product.minPrice ? product.minPrice.toFixed(2) : Number(t1Price).toFixed(2);
    return (
        <div className="price">
            {user.profile_id !== 4 &&
                <p>PUHT: {goodPrice} €</p>
            }
            {user.profile_id === 4 &&
                <>
                    <p>PUHT revendeur: {product.price} €</p>
                    <p>PUHT boulanger: {bakerPrice} €</p>
                </>

            }
        </div>
    )
}