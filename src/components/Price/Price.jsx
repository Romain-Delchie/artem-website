import React, { useContext } from 'react';
import AppContext from '../../context/AppContext';
import priceData from '../../../data/price-data';

export default function Price({ price }) {

    const { user } = useContext(AppContext);
    const goodPrice = user.profile_id === 1 ? (price * priceData.coeffBoulanger).toFixed(2) : price.toFixed(2);

    return (
        <div className="price">
            <p>PUHT: {goodPrice} €</p>
        </div>
    )
}