import React, { useContext } from 'react';
import AppContext from '../../context/AppContext';

export default function Price({ price, category }) {
    const { user } = useContext(AppContext);
    const userPrice = category.toLowerCase() === 't1' ? price : (price / 2) * 3;
    const resellerPrice = category.toLowerCase() === 't3' ? price : (price / 3) * 2;
    const goodPrice = user.profil_id === 1 ? userPrice.toFixed(2) : resellerPrice.toFixed(2);

    return (
        <div className="price">
            <p>PUHT: {goodPrice} €</p>
        </div>
    )
}