import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../../context/AppContext'
import API from '../../utils/api/api'
import Loading from '../../components/Loading/Loading';
import { CSVLink } from "react-csv";
import './UserList.scss'

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
    console.log(accounts);
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
            accounts.sort((a, b) => a.last_connection.localeCompare(b.last_connection));
        } else if (name === 'profile') {
            accounts.sort((a, b) => a.profile_name.localeCompare(b.profile_name));
        }
        setAccounts([...accounts]); // Mettez à jour les données triées
    }

    return (
        <div className='user-list'>
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
                        <th>Prénom</th>
                        <th>Nom</th>
                        <th>Email</th>
                        <th>Adresse</th>
                        <th>Code postal</th>
                        <th>Ville</th>
                        <th>Téléphone</th>
                        <th>profile_id</th>
                        <th>siret</th>
                        <th>role</th>
                        <th>date dernière connexion</th>
                    </tr>
                </thead>
                <tbody>
                    {accounts.map((account, index) => {
                        return (
                            <tr key={index}>
                                <td>{account.company}</td>
                                <td>{account.firstname}</td>
                                <td>{account.lastname}</td>
                                <td>{account.email}</td>
                                <td>{account.billing_street_address}</td>
                                <td>{account.billing_zip_code}</td>
                                <td>{account.billing_city}</td>
                                <td>{account.phone_number}</td>
                                <td>{account.profile_name}</td>
                                <td>{account.siret}</td>
                                <td>{account.role}</td>
                                <td>{account.last_connection}</td>
                            </tr>
                        )

                    })}
                </tbody>
            </table>
        </div>
    )
}
