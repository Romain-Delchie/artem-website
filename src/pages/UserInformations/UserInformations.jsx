import React, { useContext, useState } from 'react'
import AppContext from '../../context/AppContext'
import Addresses from '../../components/Addresses/Addresses';
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
        "country": "Pays",
    }

    const { user, updateUser } = useContext(AppContext);
    const [updatedUser, setUpdatedUser] = useState({ ...user });
    const [modification, setModification] = useState(false);
    const handleChange = (key, value) => {
        // Mettre à jour l'objet 'updatedUser' avec la nouvelle valeur
        setUpdatedUser((prevUpdatedUser) => ({ ...prevUpdatedUser, [key]: value }));
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



    return (
        <div className='user-informations'>
            <div className="user-informations-container">

                <h2>Mes informations</h2>
                <ul>
                    {Object.keys(user).filter((key) => !key.startsWith('deliver') && !key.startsWith('billing') && key !== 'quotations' && key !== 'token' && key !== 'id' && key !== 'profile_id' && key !== 'role' && key !== 'verified' && key !== 'email_token' && key !== 'reset_token').map((key, index) => (
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
                    <button className='user-informations-button' onClick={() => setModification({ ...modification, profil: true })}>Modifier</button>
                }
                {modification.profil &&
                    <button className='user-informations-button' onClick={handleModificationProfil}>Valider</button>
                }
            </div>
            <div className="user-informations-address">
                <h2>Adresse de facturation</h2>


                {!modification.billing &&
                    <ul>

                        <li className='user-informations-item'>
                            <p>Nom
                            </p>
                            <p>{user.billing_address.name_address}</p>
                        </li>
                        <li className='user-informations-item'>
                            <p>Rue
                            </p>
                            <p>{user.billing_address.street_address}</p>
                        </li>
                        <li className='user-informations-item'>
                            <p>Code postal
                            </p>
                            <p>{user.billing_address.zip_code}</p>
                        </li>
                        <li className='user-informations-item'>
                            <p>Ville
                            </p>
                            <p>{user.billing_address.city}</p>
                        </li>
                        <li className='user-informations-item'>
                            <p>Pays
                            </p>
                            <p>{user.billing_address.country}</p>
                        </li>
                        <button className='user-informations-button' onClick={() => setModification({ ...modification, billing: true })}>Modifier</button>

                    </ul>
                }
            </div >
            <div className="user-informations-address">
                <h2>Adresse de livraison standard</h2>


                {!modification.delivery &&
                    <ul>

                        <li className='user-informations-item'>
                            <p>Nom
                            </p>
                            <p>{user.delivery_standard.name_address}</p>
                        </li>
                        <li className='user-informations-item'>
                            <p>Rue
                            </p>
                            <p>{user.delivery_standard.street_address}</p>
                        </li>
                        <li className='user-informations-item'>
                            <p>Code postal
                            </p>
                            <p>{user.delivery_standard.zip_code}</p>
                        </li>
                        <li className='user-informations-item'>
                            <p>Ville
                            </p>
                            <p>{user.delivery_standard.city}</p>
                        </li>
                        <li className='user-informations-item'>
                            <p>Pays
                            </p>
                            <p>{user.delivery_standard.country}</p>
                        </li>
                        <button className='user-informations-button' onClick={() => setModification({ ...modification, delivery: true })}>Modifier</button>

                    </ul>
                }
            </div >
            {modification.billing &&
                <Addresses type='billing' modification={modification} setModification={setModification} />
            }
            {modification.delivery &&
                <Addresses type='delivery' modification={modification} setModification={setModification} />
            }

        </div >
    )
}

