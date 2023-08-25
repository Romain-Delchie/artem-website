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
        'company': 'Société',
        'siret': 'Siret',
    }

    const { user, updateUser } = useContext(AppContext);
    const [updatedUser, setUpdatedUser] = useState({ ...user });
    const [modification, setModification] = useState(false);
    console.log(updatedUser);
    const handleChange = (key, value) => {
        // Mettre à jour l'objet 'updatedUser' avec la nouvelle valeur
        setUpdatedUser((prevUpdatedUser) => ({ ...prevUpdatedUser, [key]: value }));
    };
    const handleChangeBilling = (key, value) => {
        // Mettre à jour l'objet 'updatedUser' avec la nouvelle valeur
        setUpdatedUser((prevUpdatedUser) => ({ ...prevUpdatedUser, billing_address: { ...prevUpdatedUser.billing_address, [key]: value } }));
    };

    const handleModificationProfil = () => {
        updateUser(updatedUser);
        const dataUser = { ...updatedUser };
        delete dataUser.token;
        delete dataUser.id;
        delete dataUser.role;
        delete dataUser.profile_id;
        delete dataUser.quotations;
        delete dataUser.deliveries;
        delete dataUser.delivery_standard;
        delete dataUser.billing_address;
        API.user.update(user.token, dataUser).then((response) => {
            alert('Vos informations ont bien été modifiées');
        }).catch((error) => {
            console.error(error);
        }).finally(() => {
            setModification({ ...modification, profil: false });

        });
    }

    const handleModificationBilling = () => {
        updateUser(updatedUser);
        const dataBilling = { ...updatedUser.billing_address };
        console.log(dataBilling);
        setModification({ ...modification, billing: false });
    }

    return (
        <div className='user-informations'>
            <div className="user-informations-container">

                <h2>Mes informations</h2>
                <ul>
                    {Object.keys(user).filter((key) => !key.startsWith('deliver') && !key.startsWith('billing') && key !== 'quotations' && key !== 'token' && key !== 'id' && key !== 'profile_id' && key !== 'role').map((key, index) => (
                        <li key={index}>
                            {!modification.profil &&

                                <div className='user-informations-item'>
                                    <p>{labelName[key]}</p>
                                    <p>{user[key]}</p>
                                </div>

                            }
                            {modification.profil &&
                                <div className='user-informations-item'>
                                    <label htmlFor={key}>{labelName[key]}</label>
                                    <input
                                        type='text'
                                        id={key}
                                        value={updatedUser[key]}
                                        onChange={(e) => handleChange(key, e.target.value)}
                                    />

                                </div>
                            }
                        </li>
                    )
                    )}
                </ul>
                {!modification.profil &&
                    <button onClick={() => setModification({ ...modification, profil: true })}>Modifier</button>
                }
                {modification.profil &&
                    <button onClick={handleModificationProfil}>Valider</button>
                }
            </div>
            <div className="user-informations-billing">
                <h2>Adresse de facturation</h2>
                <ul>

                    <li>
                        {!modification.billing &&
                            <div className='user-informations-item'>
                                <p>Nom
                                </p>
                                <p>{user.billing_address.name_address}</p>
                            </div>
                        }
                        {modification.billing &&
                            <div className='user-informations-item'>
                                <label htmlFor='name_address'>Nom</label>
                                <input
                                    type='text'
                                    id='name_address'
                                    value={updatedUser.billing_address.name_address}
                                    onChange={(e) => handleChangeBilling('name_address', e.target.value)}
                                />
                            </div>
                        }
                    </li>
                    <li>
                        {!modification.billing &&
                            <div className='user-informations-item'>
                                <p>Rue
                                </p>
                                <p>{user.billing_address.street_address}</p>
                            </div>
                        }
                        {modification.billing &&
                            <div className='user-informations-item'>
                                <label htmlFor='street_address'>Rue</label>
                                <input
                                    type='text'
                                    id='street_address'
                                    value={updatedUser.billing_address.street_address}
                                    onChange={(e) => handleChangeBilling('street_address', e.target.value)}
                                />
                            </div>
                        }
                    </li>
                    <li>
                        {!modification.billing &&
                            <div className='user-informations-item'>
                                <p>Code postal
                                </p>
                                <p>{user.billing_address.zip_code}</p>
                            </div>
                        }
                        {modification.billing &&
                            <div className='user-informations-item'>
                                <label htmlFor='zip_code'>Code postal</label>
                                <input
                                    type='text'
                                    id='zip_code'
                                    value={updatedUser.billing_address.zip_code}
                                    onChange={(e) => handleChangeBilling("zip_code", e.target.value)}
                                />
                            </div>
                        }
                    </li>
                    <li>
                        {!modification.billing &&
                            <div className='user-informations-item'>
                                <p>Ville
                                </p>
                                <p>{user.billing_address.city}</p>
                            </div>
                        }
                        {modification.billing &&
                            <div className='user-informations-item'>
                                <label htmlFor='city'>Ville</label>
                                <input
                                    type='text'
                                    id='city'
                                    value={updatedUser.billing_address.city}
                                    onChange={(e) => handleChangeBilling('city', e.target.value)}
                                />
                            </div>
                        }
                    </li>


                </ul>
                {!modification.billing &&
                    <button onClick={() => setModification({ ...modification, billing: true })}>Modifier</button>
                }
                {modification.billing &&
                    <button onClick={handleModificationBilling}>Valider</button>
                }
            </div>

        </div>
    )
}

