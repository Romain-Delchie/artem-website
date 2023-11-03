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
    ];
    console.log(accounts);
    if (!isDataLoaded) {
        return <Loading />
    }
    return (
        <div className='user-list'>
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
                            </tr>
                        )

                    })}
                </tbody>
            </table>
        </div>
    )
}
