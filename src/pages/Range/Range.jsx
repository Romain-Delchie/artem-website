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
                console.log(res.data.oneRange)
                const thisRange = { ...res.data.oneRange, techSheets: JSON.parse(res.data.oneRange.techSheets) }
                setRange(thisRange)
            })
            .catch(err => console.log(err));
    }, [rangeId]);

    if (!range) {
        return <div>Loading...</div>;
    }
    console.log(range);
    return (
        <div className='range'>
            <h2>{range.name}</h2>
            <img className='range-img' src={`/images/products/${range.image_link}`} alt={`photo de ${range.name}`} />
            <p className='range-description'>{range.description}</p>
            <section className="range-sheet">
                <h3>Fiche technique des différentes matières à télécharger :</h3>
                <div className="range-sheet-legende">
                    <img className='range-sheet-img' src={`/images/clean.png`} alt={`photo de lavage}`} />
                    <p>: Facilité de nettoyage</p>
                </div>
                <ul className="range-sheet-container">
                    {
                        range.techSheets.map((techSheet) => {
                            return (
                                <li className="range-sheet-container-item" key={techSheet.id}>
                                    <Link className='range-sheet-container-item-link' to={`/technicalSheet/${techSheet.link}.pdf`} target='_blank' download rel="noreferrer">
                                        <img src={`/images/pdf.png`} alt={`fiche technique pour ${techSheet.name}`} />
                                        {
                                            techSheet.description.includes('lavable') &&
                                            <img className='range-sheet-container-item-link-img' src={`/images/clean.png`} alt={`photo de nettoyage`} />
                                        }
                                        <div className='range-sheet-container-item-link-text'>
                                            <p>{techSheet.name}</p>
                                            <p>{techSheet.description}</p>
                                        </div>
                                    </Link>
                                </li>
                            )
                        })
                    }
                </ul>

            </section>


            {
                !user.token &&
                <div className="range-links">
                    <h3>Pour voir tous nos produits plus en détails :</h3>
                    <div className="range-link">
                        <Link className='range-link-btn' to='/signin'>Connectez-vous</Link>
                        <p>ou</p>
                        <Link className='range-link-btn' to='/signup'>Créez un compte</Link>
                    </div>
                </div>
            }
        </div >
    )
}