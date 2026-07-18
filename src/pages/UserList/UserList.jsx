import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../../context/AppContext'
import API from '../../utils/api/api'
import Loading from '../../components/Loading/Loading';
import moment from 'moment/moment';
import { CSVLink } from "react-csv";
import './UserList.scss'
import DashboardComponent from '../../components/Dashboard/DashboardComponent';

export default function UserList() {
    const { user } = useContext(AppContext);
    const [accounts, setAccounts] = useState([])
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [isChecked, setIsChecked] = useState({
        alphabetic: false,
        connection: false,
        profile: false
    })
    useEffect(() => {
        if (user.token) {
            API.user.getAccounts(user.token)
                .then(res => {
                    const dataFormated = res.data.map(account => {
                        return {
                            ...account,

                        }
                    })
                    setAccounts(dataFormated)
                    setIsDataLoaded(true)
                }
                )
                .catch(err => alert(err))
        }
    }, [])
    const headers = [
        { label: 'Entreprise', key: 'company' },
        { label: 'Prénom', key: 'firstname' },
        { label: 'Nom', key: 'lastname' },
        { label: 'Email', key: 'email' },
        { label: 'Adresse', key: 'billing_street_address' },
        { label: 'Code Postal', key: 'billing_zip_code' },
        { label: 'Ville', key: 'billing_city' },
        { label: 'Téléphone', key: 'phone_number' },
        { label: 'Profil', key: 'profile_name' },
        { label: 'SIRET', key: 'siret' },
        { label: 'Rôle', key: 'role' },
        { label: 'Date dernière connexion', key: 'last_connection' },

    ];
    if (!isDataLoaded) {
        return <Loading />
    }

    const handleCheck = (e) => {
        const { name } = e.target;
        const updatedIsChecked = {}; // Créez un nouvel objet pour les états mis à jour
        // Parcours tous les noms et les définir sur false sauf celui actuel
        for (const key in isChecked) {
            updatedIsChecked[key] = false;
        }
        // Mettez le nom actuel sur true
        updatedIsChecked[name] = true;
        setIsChecked(updatedIsChecked);
        // Triez les données en fonction du nom sélectionné
        if (name === 'alphabetic') {
            accounts.sort((a, b) => a.company.localeCompare(b.company));
        } else if (name === 'connection') {
            accounts.sort((a, b) => {
                const dateA = moment(a.last_connection, 'DD/MM/YYYY');
                const dateB = moment(b.last_connection, 'DD/MM/YYYY');
                return dateA - dateB;
            });
        } else if (name === 'profile') {
            accounts.sort((a, b) => a.profile_name.localeCompare(b.profile_name));
        }
        setAccounts([...accounts]); // Mettez à jour les données triées
    }

    const handleOpenConfirmDelete = (e) => {
        const confirmDelete = window.confirm('Voulez-vous vraiment supprimer cet utilisateur ?');
        if (confirmDelete) {
            // Supprimer l'utilisateur
            API.user.delete(user.token, e.target.value)
                .then(res => {
                    alert('Utilisateur supprimé avec succès !');
                    // Mettez à jour les données (rechargez la page ou utilisez un autre moyen pour mettre à jour les données)
                    setAccounts(accounts.filter(account => account.id !== parseInt(e.target.value)));

                })
                .catch(err => alert(err.message)); // Mettez à jour les données (rechargez la page ou utilisez un autre moyen pour mettre à jour les données)
        }
    }

    return (
        <main className='user-list'>
            <DashboardComponent />
            <form className='user-list-sort'>
                <input onChange={handleCheck} checked={isChecked.alphabetic} type='radio' name='alphabetic' id='alphabetic' />
                <label htmlFor='alphabetic'>Trier par ordre alphabetique </label>
                <input onChange={handleCheck} checked={isChecked.connection} type='radio' name='connection' id='connection' />
                <label htmlFor='connection'>Trier par date de dernière connexion </label>
                <input onChange={handleCheck} checked={isChecked.profile} type='radio' name='profile' id='profile' />
                <label htmlFor='profile'>Trier par profil </label>
            </form>
            <CSVLink
                data={accounts}
                separator=';'
                className='export-excel-button'
                headers={headers}
                filename={"user-list.csv"}
                target="_blank"
                id="csv-link"
            >Telecharger le fichier excel</CSVLink>
            <table id="user-list">
                <thead>
                    <tr>
                        <th>Entreprise</th>
                        <th className='info-hide-possibility'>Prénom</th>
                        <th className='info-hide-possibility'>Nom</th>
                        <th className='info-hide-possibility-2'>Email</th>
                        <th className='info-hide-possibility'>Adresse</th>
                        <th>Code postal</th>
                        <th className='info-hide-possibility'>Ville</th>
                        <th>Téléphone</th>
                        <th>profile_id</th>
                        <th className='info-hide-possibility'>siret</th>
                        <th className='info-hide-possibility'>role</th>
                        <th className='info-hide-possibility'>date dernière connexion</th>
                    </tr>
                </thead>
                <tbody>
                    {accounts.map((account, index) => {
                        return (
                            <tr key={index}>
                                <td>{account.company}</td>
                                <td className='info-hide-possibility'>{account.firstname}</td>
                                <td className='info-hide-possibility'>{account.lastname}</td>
                                <td className='info-hide-possibility-2'>{account.email}</td>
                                <td className='info-hide-possibility'>{account.billing_street_address}</td>
                                <td>{account.billing_zip_code}</td>
                                <td className='info-hide-possibility'>{account.billing_city}</td>
                                <td>{account.phone_number}</td>
                                <td>{account.profile_name}</td>
                                <td className='info-hide-possibility'>{account.siret}</td>
                                <td className='info-hide-possibility'>{account.role}</td>
                                <td className='info-hide-possibility'>{account.last_connection}</td>
                                <td className='info-hide-possibility'><button value={account.id} onClick={handleOpenConfirmDelete}>Supprimer</button></td>
                            </tr>
                        )

                    })}
                </tbody>
            </table>
        </main>
    )
}
