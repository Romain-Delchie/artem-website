import './Dashboard.scss'
import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import AppContext from '../../context/AppContext'
import API from '../../utils/api/api'

export default function Dashboard() {
    const { user, updateUser } = useContext(AppContext);


    useEffect(() => {

        // Récupérer les informations de l'utilisateur
        API.user.account(user.token).then((response) => {
            updateUser({ ...user, ...response.data });
        })

        API.quotation.getQuotation(user.token).then((response) => {
            updateUser({ ...user, ...response.data });
        })


    }, [user.token])

    console.log(user)
    return (
        <main className='dashboard'>
            <h2>Tableau de bord </h2>
            <div className="dashboard-container">
                <h3>{user.company}</h3>
                <h4>Bonjour {user.firstname}</h4>
                <section className='dashboard-buttons'>
                    <Link className='dashboard-button'>Mes informations</Link>
                    <Link className='dashboard-button'>Mes outils</Link>
                    <Link className='dashboard-button'>mon historique de devis<span>{user.quotations.length} devis en cours</span></Link>
                    <Link className='dashboard-button'>Nouveau devis</Link>
                    <Link className='dashboard-button'>Régler une facture en CB</Link>


                </section>
            </div>

        </main>
    )
}
