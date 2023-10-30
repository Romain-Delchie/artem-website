import './Dashboard.scss'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AppContext from '../../context/AppContext'
import fetchData from '../../utils/fetchData'
import Loading from '../../components/Loading/Loading'
import ValidationEmail from '../ValidationEmail/ValidationEmail'



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
    if (isDataLoaded && !user.verified) {
        return <ValidationEmail />
    }

    return (
        <main className='dashboard'>
            <h2>Tableau de bord </h2>
            <div className="dashboard-container">
                <h3>{user.company}</h3>
                <h4>Bonjour {user.firstname}</h4>
                {user.role === 'user' &&
                    <section className='dashboard-buttons'>
                        <Link className='dashboard-button' to='/search-products'>Tous les articles standard Artem</Link>
                        <Link className='dashboard-button' to='/user-informations'>Mes informations</Link>
                        <Link className='dashboard-button' to='/tools'>Mes outils</Link>
                        {
                            user.profile_id !== 3 &&
                            <>
                                <Link className='dashboard-button' to='/quote-history'>mon historique de devis
                                    {user.quotations.length > 0 &&
                                        <span>{user.quotations.length}</span>
                                    }
                                </Link>
                                <Link className='dashboard-button' to='/new-quote'>Nouveau devis</Link>
                            </>
                        }
                        <Link className='dashboard-button dashboard-button-last' to='https://pay-pro.monetico.fr/artem/paiementenligne' target='_blank'>Régler une facture en CB</Link>
                    </section>
                }
                {user.role === 'admin' &&
                    <section className='dashboard-buttons'>
                        <Link className='dashboard-button' to='/add-product'>Ajouter un produit</Link>
                        <Link className='dashboard-button' to='/update-product'>Modifier un produit</Link>
                        <Link className='dashboard-button' to='/delete-product'>Supprimer un produit</Link>
                        <Link className='dashboard-button' to='/add-range'>Ajouter une gamme (vitrine)</Link>
                        <Link className='dashboard-button' to='/update-range'>Modifier une gamme (vitrine)</Link>
                        <Link className='dashboard-button' to='/add-techsheet'>Gestion des fiches techniques</Link>
                        <Link className='dashboard-button dashboard-button-last' to='/role-validation'>Valider rôle client</Link>
                    </section>
                }

            </div>

        </main>
    )
}
