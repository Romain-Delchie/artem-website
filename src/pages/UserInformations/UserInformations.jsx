import React, { useContext, useState } from 'react'
import AppContext from '../../context/AppContext'
import './UserInformations.scss'
import API from '../../utils/api/api';


export default function UserInformations() {

    const labelName = {
        'firstname': 'Prénom',
        'lastname': 'Nom',
        'email': 'Email',
        'phone_number': 'Téléphone',
        'invoice_address': 'Adresse',
        'company': 'Société'
    }

    const { user, updateUser } = useContext(AppContext);
    const [updatedUser, setUpdatedUser] = useState({ ...user });
    const [modification, setModification] = useState(false);

    const handleChange = (key, value) => {
        // Mettre à jour l'objet 'updatedUser' avec la nouvelle valeur
        setUpdatedUser((prevUpdatedUser) => ({ ...prevUpdatedUser, [key]: value }));
    };

    const handleModification = () => {
        updateUser(updatedUser);
        const dataUser = { ...updatedUser };
        delete dataUser.token;
        delete dataUser.id;
        delete dataUser.role;
        delete dataUser.profile_id;
        delete dataUser.quotations;
        API.user.update(user.token, dataUser).then((response) => {
            console.log(response);
        }).catch((error) => {
            console.error(error);
        }).finally(() => {
            setModification(false);
        });
    }
    return (
        <div className='user-informations'>
            <h2>Mes informations</h2>
            <ul>

                {Object.keys(user).filter((key) => key !== 'quotations' && key !== 'token' && key !== 'id' && key !== 'profile_id' && key !== 'role').map((key, index) => (
                    <li key={index}>
                        {!modification &&

                            <div className='user-informations-container'>
                                <p>{labelName[key]}</p>
                                <p>{user[key]}</p>


                            </div>
                        }
                        {modification &&
                            <div className='user-informations-container'>
                                <label htmlFor={key}>{labelName[key]}</label>
                                {key === 'invoice_address' ?
                                    <textarea
                                        rows={5}
                                        cols={20}
                                        id={key}
                                        value={updatedUser[key]}
                                        onChange={(e) => handleChange(key, e.target.value)}
                                    />
                                    :
                                    <input
                                        type='text'
                                        id={key}
                                        value={updatedUser[key]}
                                        onChange={(e) => handleChange(key, e.target.value)}
                                    />
                                }



                            </div>
                        }
                    </li>
                )
                )}
            </ul>
            {!modification &&
                <button onClick={() => setModification(true)}>Modifier</button>
            }
            {modification &&
                <button onClick={handleModification}>Valider</button>
            }
        </div>
    )
}
