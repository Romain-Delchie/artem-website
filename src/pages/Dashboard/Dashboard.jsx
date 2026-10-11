import { useState, useEffect, useContext } from 'react'
import AppContext from '../../context/AppContext'
import DashboardComponent from '../../components/Dashboard/DashboardComponent'
import fetchData from '../../utils/fetchData'
import Loading from '../../components/Loading/Loading'
import ValidationEmail from '../ValidationEmail/ValidationEmail'
import AdminBoard from './AdminBoard'
import ClientBoard from './ClientBoard'
import './Dashboard.scss'

/**
 * Tableau de bord de l'espace connecté.
 *
 * Le client et l'administrateur partagent la même URL et la même forme de
 * page — barre latérale à gauche, panneau à droite — mais pas le même travail :
 * le premier reçoit ses devis, ses outils et ses informations, le second
 * l'état du site et ses outils d'administration.
 */
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
            {user.role === 'admin' ? <AdminBoard /> : <ClientBoard />}
        </main>
    )
}
