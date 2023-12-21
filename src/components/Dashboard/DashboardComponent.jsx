import React, { useContext, useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
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
            <div className="dashboard-component-container">
                <h2>{user.company}</h2>
                <h4>Bonjour {user.firstname} 👋 </h4>
                {user.profile_id === 3 &&
                    <p className='dashboard-component-button-attente'>Votre compte vient juste d'être créé : dans 1 jour ouvré, vous aurez accès à notre outils de devis en ligne</p>
                }
                {user.role === 'user' &&
                    <section className='dashboard-component-buttons'>
                        <NavLink className={({ isActive }) =>
                            isActive ? "dashboard-component-button dashboard-link-active" : "dashboard-component-button"
                        } to='/dashboard'>Tableau de bord</NavLink>
                        <NavLink className={({ isActive }) =>
                            isActive ? "dashboard-component-button dashboard-component-button dashboard-link-active" : "dashboard-component-button dashboard-component-button"
                        } to='/search-products'>Les produits Artem</NavLink>
                        <NavLink className={({ isActive }) =>
                            isActive ? "dashboard-component-button dashboard-link-active" : "dashboard-component-button"
                        } to='/user-informations'>Mes informations</NavLink>
                        <NavLink className={({ isActive }) =>
                            isActive ? "dashboard-component-button dashboard-link-active" : "dashboard-component-button"
                        } to='/tools'>Mes outils</NavLink>
                        {
                            user.profile_id !== 3 &&
                            <>
                                <NavLink className={({ isActive }) =>
                                    isActive ? "dashboard-component-button dashboard-link-active" : "dashboard-component-button"
                                } to='/quote-history'>mon historique de devis
                                    {user.quotations.length > 0 &&
                                        <span>{user.quotations.length}</span>
                                    }
                                </NavLink>
                                <NavLink className={({ isActive }) =>
                                    isActive ? "dashboard-component-button dashboard-link-active" : "dashboard-component-button"
                                } to='/new-quote'>Nouveau devis</NavLink>
                            </>
                        }
                        <Link className="dashboard-component-button dashboard-component-button-last"
                            to='https://pay-pro.monetico.fr/artem/paiementenligne' target='_blank'>Régler une facture en CB</Link>
                    </section>
                }
                {user.role === 'admin' &&
                    <section className='dashboard-component-buttons'>
                        <NavLink className={({ isActive }) =>
                            isActive ? "dashboard-component-button dashboard-link-active" : "dashboard-component-button"
                        } to='/dashboard'>Tableau de bord</NavLink>
                        <NavLink className={({ isActive }) =>
                            isActive ? "dashboard-component-button dashboard-link-active" : "dashboard-component-button"
                        } to='/add-product'>Ajouter un produit</NavLink>
                        <NavLink className={({ isActive }) =>
                            isActive ? "dashboard-component-button dashboard-link-active" : "dashboard-component-button"
                        } to='/update-product'>Modifier un produit</NavLink>
                        <NavLink className={({ isActive }) =>
                            isActive ? "dashboard-component-button dashboard-link-active" : "dashboard-component-button"
                        } to='/delete-product'>Supprimer un produit</NavLink>
                        <NavLink className={({ isActive }) =>
                            isActive ? "dashboard-component-button dashboard-link-active" : "dashboard-component-button"
                        } to='/add-range'>Ajouter une gamme (vitrine)</NavLink>
                        <NavLink className={({ isActive }) =>
                            isActive ? "dashboard-component-button dashboard-link-active" : "dashboard-component-button"
                        } to='/update-range'>Modifier une gamme (vitrine)</NavLink>
                        <NavLink className={({ isActive }) =>
                            isActive ? "dashboard-component-button dashboard-link-active" : "dashboard-component-button"
                        } to='/delete-range'>Supprimer une gamme (vitrine)</NavLink>
                        <NavLink className={({ isActive }) =>
                            isActive ? "dashboard-component-button dashboard-link-active" : "dashboard-component-button"
                        } to='/add-techsheet'>Gestion des fiches techniques</NavLink>
                        <NavLink className={({ isActive }) =>
                            isActive ? "dashboard-component-button dashboard-link-active" : "dashboard-component-button"
                        } to='/role-validation'>Valider rôle client</NavLink>
                        <NavLink className={({ isActive }) =>
                            isActive ? "dashboard-component-button dashboard-component-button-last dashboard-link-active" : "dashboard-component-button dashboard-component-button-last"
                        } to='/user-list'>Liste des utilisateurs</NavLink>
                        <NavLink className={({ isActive }) =>
                            isActive ? "dashboard-component-button dashboard-component-button-last dashboard-link-active" : "dashboard-component-button dashboard-component-button-last"
                        } to='/handle-home'>Gerer page d'accueil</NavLink>
                    </section>
                }

            </div>

        </section>
    )
}
