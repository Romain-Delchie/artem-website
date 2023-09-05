import React, { useState, useEffect, useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import API from '../../utils/api/api'
import AppContext from '../../context/AppContext'
import './Range.scss'

export default function Range() {
    const { user } = useContext(AppContext);
    const { rangeId } = useParams()
    const [range, setRange] = useState(null);

    useEffect(() => {
        // Chargez les données en fonction de rangeId
        API.range.getRange(rangeId)
            .then(res => {
                setRange(res.data.oneRange)
            })
            .catch(err => console.log(err));
    }, [rangeId]);

    if (!range) {
        return <div>Loading...</div>;
    }
    return (
        <div className='range'>
            <h2>{range.name}</h2>
            <img className='range-img' src={`/images/products/${range.image_link}`} alt={`photo de ${range.name}`} />
            <p className='range-description'>{range.description}</p>
            {!user.token &&
                <div className="range-links">
                    <h3>Pour voir tous nos produits plus en détails :</h3>
                    <div className="range-link">
                        <Link className='range-link-btn' to='/signin'>Connectez-vous</Link>
                        <p>ou</p>
                        <Link className='range-link-btn' to='/signup'>Créez un compte</Link>
                    </div>
                </div>
            }
        </div>
    )
}