import { useEffect, useState } from 'react'
import './RoleValidation.scss'
import API from '../../utils/api/api'
import { useContext } from 'react'
import AppContext from '../../context/AppContext'
import Loading from '../../components/Loading/Loading'

export default function RoleValidation() {

    const { user } = useContext(AppContext);
    const [accountsToValidate, setAccountsToValidate] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [dataAccount, setDataAccount] = useState();
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        API.user.accountToValidate(user.token).then((res) => {
            setAccountsToValidate(res.data)
            setIsLoading(false)
        }
        );
    }
        , [refresh]);

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true)
        const dataToSend = {
            idToValidate: event.target.dataset.accountid,
            profile_id: event.target.profile_id.value
        }

        API.user.update(user.token, dataToSend).then((res) => {
            setIsLoading(false)
            alert('Le rôle a bien été validé')
            setRefresh(!refresh)
        })
    }

    const handleChange = (event) => {
        setDataAccount({ ...dataAccount, [event.target.dataset.id]: event.target.value })
    }

    {
        isLoading &&
            <Loading />
    }

    return (
        <div className='role-validation'>
            <h2>Validation des rôles</h2>
            <ul className="role-validation-list">
                {accountsToValidate.map((account) => {
                    return (
                        <li className="role-validation-list-item" key={account.id}>
                            {Object.keys(account).map((key) => {
                                return (
                                    <p key={key}>{key} : {account[key]}</p>
                                )
                            }
                            )}
                            <form data-accountid={account.id} onSubmit={handleSubmit}>
                                <select name="profile_id" id="profile_id" defaultValue="none" data-id={account.id} onChange={handleChange}>
                                    <option value="none" disabled>Choisissez le profil à appliquer</option>
                                    <option value="1">Boulanger</option>
                                    <option value="2">Revendeur</option>
                                </select>
                                <button className="role-validation-list-item-button">Valider</button>
                            </form>
                        </li>
                    )
                })
                }
            </ul>
        </div>
    )
}