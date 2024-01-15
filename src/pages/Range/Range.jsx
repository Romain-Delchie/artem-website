import React, { useState, useEffect, useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import API from '../../utils/api/api'
import AppContext from '../../context/AppContext'
import './Range.scss'
import Loading from '../../components/Loading/Loading'
import TechSheetPdf from '../../components/TechSheetPdf/TechSheetPdf'

export default function Range() {
    const { user } = useContext(AppContext);
    const { rangeId } = useParams()
    const [range, setRange] = useState(null);
    const [modalOpenState, setModalOpenState] = useState({});

    const openModal = (techSheetId) => {
        setModalOpenState((prevState) => ({
            ...prevState,
            [techSheetId]: true,
        }));
    };

    const closeModal = (techSheetId) => {
        setModalOpenState((prevState) => ({
            ...prevState,
            [techSheetId]: false,
        }));
    };

    useEffect(() => {
        // Chargez les données en fonction de rangeId
        API.range.getRange(rangeId)
            .then(res => {
                const thisRange = { ...res.data.oneRange, techSheets: JSON.parse(res.data.oneRange.techSheets) }
                setRange(thisRange)
            })
            .catch(err => console.error(err));
    }, [rangeId]);

    if (!range) {
        return <Loading />;
    }

    return (
        <main className='range'>
            <h1>{range.name}</h1>
            <Link to="/gamme" className='range-return-products'>
                <p>Retour à la gamme complète</p>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953l7.108-4.062A1.125 1.125 0 0121 8.688v8.123zM11.25 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953L9.567 7.71a1.125 1.125 0 011.683.977v8.123z" />
                </svg>

            </Link>
            <img className='range-img' src={`/images/products/${range.image_link}`} alt={`photo de ${range.name}`} />
            <p className='range-description'>{range.description}</p>
            {
                range.techSheets &&
                <section className="range-sheet">

                    <h2>Fiche technique des différentes matières à télécharger :</h2>
                    <div className="range-sheet-legende">
                        <img className='range-sheet-img' src={`/images/clean.png`} alt={`photo de lavage}`} />
                        <p>: Facilité de nettoyage</p>
                    </div>
                    <ul className="range-sheet-container">
                        {
                            range.techSheets.map((techSheet) => {
                                return (
                                    <li className="range-sheet-container-item" key={techSheet.id}>
                                        <button className='range-sheet-container-item-link' to={`/technicalSheet/${techSheet.link}.pdf`} onClick={() => openModal(techSheet.id)}>
                                            <img className='range-sheet-container-item-link-pdf' src={`/images/pdf.png`} alt={`fiche technique pour ${techSheet.name}`} />
                                            {
                                                techSheet.description.includes('lavable') &&
                                                <img className='range-sheet-container-item-link-img' src={`/images/clean.png`} alt={`photo de nettoyage`} />
                                            }
                                            <div className='range-sheet-container-item-link-text'>
                                                <p>{techSheet.name}</p>
                                                <p>{techSheet.description}</p>
                                            </div>
                                        </button>
                                        {modalOpenState[techSheet.id] && (
                                            <div className="range-modal">
                                                <TechSheetPdf techSheet={techSheet} />
                                                <button className="range-modal-close" onClick={() => closeModal(techSheet.id)}>
                                                    X
                                                </button>
                                            </div>
                                        )}
                                    </li>
                                )
                            })
                        }
                    </ul>

                </section>
            }

            {
                !user.token &&
                <div className="range-links">
                    <h2>Pour voir tous nos produits plus en détails :</h2>
                    <div className="range-link">
                        <Link className='range-link-btn' to='/connexion'>Connectez-vous</Link>
                        <p>ou</p>
                        <Link className='range-link-btn' to='/creer-un-compte'>Créez un compte</Link>
                    </div>
                </div>
            }
        </main>
    )
}