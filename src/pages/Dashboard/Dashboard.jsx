import './Dashboard.scss'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AppContext from '../../context/AppContext'
import API from '../../utils/api/api'

export default function Dashboard() {
    const { user, updateUser } = useContext(AppContext);
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    useEffect(() => {
        // Fonction pour récupérer les informations de l'utilisateur et les devis en parallèle
        const fetchData = async () => {
            try {
                const [userData, quotationData] = await Promise.all([
                    API.user.account(user.token),
                    API.quotation.getQuotation(user.token),
                ]);

                // Mettre à jour le context 'user' en conservant le token et en fusionnant les autres propriétés
                const updatedUser = { ...user, ...userData.data, ...quotationData.data };
                updateUser(updatedUser);
                setIsDataLoaded(true);
            } catch (error) {
                console.error('Erreur lors de la récupération des données:', error);
            }
        };

        fetchData(); // Appeler la fonction pour récupérer les données
    }, [user.token, updateUser]);


    if (!isDataLoaded) {
        // Vous pouvez afficher un indicateur de chargement ici pendant que les données sont récupérées
        return <div>Chargement...</div>;
    }
    return (
        <main className='dashboard'>
            <h2>Tableau de bord </h2>
            <div className="dashboard-container">
                <h3>{user.company}</h3>
                <h4>Bonjour {user.firstname}</h4>
                {user.role === 'user' &&
                    <section className='dashboard-buttons'>
                        <Link className='dashboard-button' to='/user-informations'>Mes informations</Link>
                        <Link className='dashboard-button'>Mes outils</Link>
                        <Link className='dashboard-button'>mon historique de devis<span>{user.quotations.length} devis en cours</span></Link>
                        <Link className='dashboard-button'>Nouveau devis</Link>
                        <Link className='dashboard-button'>Régler une facture en CB</Link>
                    </section>
                }
                {user.role === 'admin' &&
                    <section className='dashboard-buttons'>
                        <Link className='dashboard-button'>Ajouter un produit</Link>
                        <Link className='dashboard-button'>Valider rôle client</Link>
                    </section>
                }

            </div>

        </main>
    )
}
