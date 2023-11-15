import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AppContext from '../../context/AppContext'
import fetchData from '../../utils/fetchData'
import Loading from '../Loading/Loading'
import './DashboardComponent.scss'
import ValidationEmail from '../../pages/ValidationEmail/ValidationEmail'



export default function DashboardComponent() {
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
        <section className='dashboard-component'>
            <h2>Tableau de bord </h2>
            <div className="dashboard-component-container">
                <h3>{user.company}</h3>
                <h4>Bonjour {user.firstname} 👋 </h4>
                {user.role === 'user' &&
                    <section className='dashboard-component-buttons'>
                        {user.profile_id === 3 &&
                            <p className='dashboard-component-button dashboard-component-button-attente'>DEVIS: Votre compte vient juste d'être créé : dans 1 jour ouvré, vous aurez accès à notre outils de devis en ligne</p>
                        }
                        <Link className='dashboard-component-button' to='/search-products'>Les produits Artem</Link>
                        <Link className='dashboard-component-button' to='/user-informations'>Mes informations</Link>
                        <Link className='dashboard-component-button' to='/tools'>Mes outils</Link>
                        {
                            user.profile_id !== 3 &&
                            <>
                                <Link className='dashboard-component-button' to='/quote-history'>mon historique de devis
                                    {user.quotations.length > 0 &&
                                        <span>{user.quotations.length}</span>
                                    }
                                </Link>
                                <Link className='dashboard-component-button' to='/new-quote'>Nouveau devis</Link>
                            </>
                        }
                        <Link className='dashboard-component-button dashboard-component-button-last' to='https://pay-pro.monetico.fr/artem/paiementenligne' target='_blank'>Régler une facture en CB</Link>
                    </section>
                }
                {user.role === 'admin' &&
                    <section className='dashboard-component-buttons'>
                        <Link className='dashboard-component-button' to='/add-product'>Ajouter un produit</Link>
                        <Link className='dashboard-component-button' to='/update-product'>Modifier un produit</Link>
                        <Link className='dashboard-component-button' to='/delete-product'>Supprimer un produit</Link>
                        <Link className='dashboard-component-button' to='/add-range'>Ajouter une gamme (vitrine)</Link>
                        <Link className='dashboard-component-button' to='/update-range'>Modifier une gamme (vitrine)</Link>
                        <Link className='dashboard-component-button' to='/delete-range'>Supprimer une gamme (vitrine)</Link>
                        <Link className='dashboard-component-button' to='/add-techsheet'>Gestion des fiches techniques</Link>
                        <Link className='dashboard-component-button' to='/role-validation'>Valider rôle client</Link>
                        <Link className='dashboard-component-button dashboard-component-button-last' to='/user-list'>Liste des utilisateurs</Link>
                    </section>
                }

            </div>

        </section>
    )
}
