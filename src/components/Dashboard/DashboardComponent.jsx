import React, { useContext, useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import AppContext from '../../context/AppContext'
import fetchData from '../../utils/fetchData'
import Loading from '../Loading/Loading'
import { ADMIN_GROUPS, ADMIN_HOME, Icon } from './adminNav'
import './DashboardComponent.scss'
import ValidationEmail from '../../pages/ValidationEmail/ValidationEmail'


/**
 * Colonne de navigation des espaces connectés, client comme administrateur.
 *
 * La version administrateur est refaite : elle alignait douze liens à plat
 * dans une hauteur fixe de 600 px qu'ils dépassaient, et se calait sur un
 * `top: 183px` correspondant à la hauteur de l'ancien en-tête. L'en-tête des
 * administrateurs n'ayant pas cette hauteur, la colonne se décrochait et son
 * défilement collant restait sans effet, `#root` portant un `overflow: hidden`
 * qui empêche tout `position: sticky` de s'accrocher à la fenêtre.
 *
 * Elle est désormais fixée à la fenêtre, calée sous l'en-tête grâce à la
 * hauteur que celui-ci publie en variable CSS, et défile pour son propre
 * compte. La colonne du client, elle, n'est pas touchée.
 */

/** Classe d'un lien de la barre administrateur, selon qu'il est actif ou non. */
const adminLinkClass = ({ isActive }) =>
    isActive ? 'admin-nav-link admin-nav-link--active' : 'admin-nav-link';

function AdminNav({ user }) {
    return (
        <section className='dashboard-component dashboard-component--admin'>
            <div className="dashboard-component-container admin-nav">
                <header className="admin-nav-head">
                    <p className="admin-nav-head-eyebrow">Back-office</p>
                    <p className="admin-nav-head-company">{user.company}</p>
                    <p className="admin-nav-head-hello">Bonjour {user.firstname} 👋</p>
                </header>

                <nav className="admin-nav-body" aria-label="Administration du site">
                    <NavLink end className={adminLinkClass} to={ADMIN_HOME.to}>
                        <Icon name={ADMIN_HOME.icon} />
                        <span>{ADMIN_HOME.label}</span>
                    </NavLink>

                    {ADMIN_GROUPS.map((group) => (
                        <div className="admin-nav-group" key={group.title}>
                            <p className="admin-nav-group-title">{group.title}</p>
                            <ul>
                                {group.links.map((link) => (
                                    <li key={link.to + link.label}>
                                        <NavLink className={adminLinkClass} to={link.to}>
                                            <Icon name={link.icon} />
                                            <span>{link.label}</span>
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </nav>
            </div>
        </section>
    )
}


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

    if (user.role === 'admin') {
        return <AdminNav user={user} />
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

            </div>

        </section>
    )
}
