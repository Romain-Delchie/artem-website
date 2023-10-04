import { useEffect, useState } from 'react'
import './RoleValidation.scss'
import API from '../../utils/api/api'
import { useContext } from 'react'
import AppContext from '../../context/AppContext'
import Loading from '../../components/Loading/Loading'

export default function RoleValidation() {

    const { user } = useContext(AppContext);
    const [accountToValidate, setAccountToValidate] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        API.user.accountToValidate(user.token).then((res) => {
            setAccountToValidate(res.data)
            setIsLoading(false)
        }
        );
    }
        , [user]);
    console.log(accountToValidate);

    {
        isLoading &&
            <Loading />
    }

    return (
        <div className='role-validation'>
            <h2>Validation des rôles</h2>
            <ul className="role-validation-list">
                {accountToValidate.map((account) => {
                    return (
                        <li className="role-validation-list-item" key={account.id}>
                            {Object.keys(account).map((key) => {
                                return (
                                    <p key={key}>{key} : {account[key]}</p>
                                )
                            }
                            )}

                            <select name="profile_id" id="profile_id" defaultValue="none">
                                <option value="none" disabled>Choisissez le profil à appliquer</option>
                                <option value="baker">Boulanger</option>
                                <option value="reseller">Revendeur</option>
                            </select>
                            <button className="role-validation-list-item-button">Valider</button>
                        </li>
                    )
                })
                }
            </ul>
        </div>
    )
}