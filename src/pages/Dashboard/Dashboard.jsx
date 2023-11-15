import DashboardComponent from '../../components/Dashboard/DashboardComponent'
import './Dashboard.scss'
import React, { useState, useEffect, useContext } from 'react'
import AppContext from '../../context/AppContext'
import fetchData from '../../utils/fetchData'
import Loading from '../../components/Loading/Loading'
import ValidationEmail from '../ValidationEmail/ValidationEmail';
import { Link } from 'react-router-dom';



export default function Dashboard() {
    const { user, updateUser } = useContext(AppContext);
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    useEffect(() => {
        fetchData(user, updateUser); // Appeler la fonction pour récupérer les données
        setIsDataLoaded(true);
    }, [user.token, updateUser]);


    if (!isDataLoaded) {
        return <Loading />
    }
    if (isDataLoaded && !user.verified && user.token) {
        return <ValidationEmail />
    }
    return (
        <main className='dashboard'>
            <DashboardComponent />
            <div className="dashboard-section-container">
                <Link to="/user-informations" className="dashboard-section">
                    <div className="dashboard-section-title">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7.864 4.243A7.5 7.5 0 0119.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 004.5 10.5a7.464 7.464 0 01-1.15 3.993m1.989 3.559A11.209 11.209 0 008.25 10.5a3.75 3.75 0 117.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 01-3.6 9.75m6.633-4.596a18.666 18.666 0 01-2.485 5.33" />
                        </svg>

                        <h2>Mes informations</h2>
                    </div>
                    <p>{user.company}</p>
                    <p>{user.firstname} {user.lastname}</p>
                    <p className='dashboard-section-informations'>Email: {user.email}</p>
                    <p className='dashboard-section-informations'>Téléphone: {user.phone_number}</p>
                    <p className='dashboard-section-informations'>Adresse:</p>
                    <p className='dashboard-section-informations'>{user.billing_address.street_address}</p>
                    <p className='dashboard-section-informations'>{user.billing_address.zip_code} {user.billing_address.city}</p>
                </Link>
                <Link to="/quote-history" className="dashboard-section">
                    <div className="dashboard-section-title">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                        </svg>

                        <h2>Devis en cours</h2>
                    </div>
                    {user.quotations.length === 0 ? <p>Vous n'avez pas de devis en cours</p> : <p>vous avez {user.quotations.length} devis en cours :</p>}
                    {user.quotations.length > 0 &&
                        <div>
                            {user.quotations.map((quotation, index) => {
                                return (
                                    <div key={index}>
                                        <p className='dashboard-section-information'>-  {quotation.creation_date} - Réf: {quotation.reference}</p>
                                    </div>
                                )
                            })}
                        </div>
                    }

                </Link>
                <Link to="/tools" className="dashboard-section">
                    <div className="dashboard-section-title">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
                        </svg>
                        <h2>Mes outils</h2>
                    </div>
                    <p>Retrouvez des plans d'aide à la prise de dimensions ou un outils d'aide à la définition de toile enfourneur</p>
                </Link>
                <Link to="/search-products" className="dashboard-section">
                    <div className="dashboard-section-title">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                        </svg>
                        <h2>Les produits Artem</h2>
                    </div>
                    <p>Retrouvez tous les produits standard Artem et leurs prix en quelques clics.</p>
                </Link>
                <Link to="/new-quote" className="dashboard-section">
                    <div className="dashboard-section-title">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        <h2>Nouveau devis</h2>
                    </div>
                    <p>Créez un nouveau devis de zéro pour ensuite y incorporer les produits souhaités</p>
                </Link>
                <Link to="https://pay-pro.monetico.fr/artem/paiementenligne" target='_blank' className="dashboard-section">
                    <div className="dashboard-section-title">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                        </svg>
                        <h2>Régler une facture</h2>
                    </div>
                    <p>Régler en ligne par CB une facture ou proforma</p>
                </Link>
            </div>
        </main>
    )
}
