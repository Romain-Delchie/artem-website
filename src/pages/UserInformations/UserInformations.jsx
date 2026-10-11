import React, { useContext, useState } from 'react'
import AppContext from '../../context/AppContext'
import Addresses from '../../components/Addresses/Addresses';
import './UserInformations.scss'
import API from '../../utils/api/api';
import DashboardComponent from '../../components/Dashboard/DashboardComponent';

// Champs du profil, dans l'ordre d'affichage. Le type sert au clavier proposé
// sur téléphone et à la validation du navigateur.
const PROFILE_FIELDS = [
    { key: 'company', label: 'Société' },
    { key: 'siret', label: 'Siret' },
    { key: 'lastname', label: 'Nom' },
    { key: 'firstname', label: 'Prénom' },
    { key: 'email', label: 'Email', type: 'email' },
    { key: 'phone_number', label: 'Téléphone', type: 'tel' },
    { key: 'country', label: 'Pays' },
];

const ADDRESS_FIELDS = [
    { key: 'name_address', label: 'Nom' },
    { key: 'street_address', label: 'Rue' },
    { key: 'street_other', label: 'Complément' },
    { key: 'zip_code', label: 'Code postal' },
    { key: 'city', label: 'Ville' },
    { key: 'country', label: 'Pays' },
];

/**
 * Carte d'adresse. Une adresse absente ou supprimée de la base arrive avec
 * tous ses champs à null : on affiche alors un état vide plutôt qu'une liste
 * de lignes blanches.
 */
function AddressCard({ title, address, onEdit }) {
    const fields = ADDRESS_FIELDS.filter(({ key }) => address?.[key]);
    return (
        <section className='ui-card'>
            <header className='ui-card-header'>
                <h2>{title}</h2>
                <button type='button' className='ui-btn ui-btn--ghost' onClick={onEdit}>
                    Modifier
                </button>
            </header>
            {fields.length > 0 ? (
                <dl className='ui-fields ui-fields--single'>
                    {fields.map(({ key, label }) => (
                        <div className='ui-field' key={key}>
                            <dt>{label}</dt>
                            <dd>{address[key]}</dd>
                        </div>
                    ))}
                </dl>
            ) : (
                <p className='ui-empty'>Aucune adresse renseignée.</p>
            )}
        </section>
    );
}

export default function UserInformations() {
    const { user, updateUser } = useContext(AppContext);
    const [updatedUser, setUpdatedUser] = useState({ ...user });
    const [modification, setModification] = useState(false);
    const profileFields = PROFILE_FIELDS.filter(({ key }) => key in user);

    const handleChange = (key, value) => {
        // Mettre à jour l'objet 'updatedUser' avec la nouvelle valeur
        setUpdatedUser((prevUpdatedUser) => ({ ...prevUpdatedUser, [key]: value }));
    };

    const handleCancel = () => {
        setUpdatedUser({ ...user });
        setModification({ ...modification, profil: false });
    };

    const handleModificationProfil = (event) => {
        event.preventDefault();
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
        delete dataUser.verified;
        delete dataUser.email_token;
        API.user.update(user.token, dataUser).then((response) => {
            alert('Vos informations ont bien été modifiées');
        }).catch((error) => {
            alert("Une erreur est survenue, la modification de vos informations n'a pas été prise en compte");
        }).finally(() => {
            setModification({ ...modification, profil: false });
        });
    };

    const initials = `${user.firstname?.[0] ?? ''}${user.lastname?.[0] ?? ''}`.toUpperCase();

    return (
        <main className='user-informations'>
            <DashboardComponent />
            <div className='user-informations-container'>
                <header className='ui-head'>
                    <span className='ui-avatar' aria-hidden='true'>{initials || '?'}</span>
                    <div>
                        <h1>Mon compte</h1>
                        <p>
                            {[user.company, user.email].filter(Boolean).join(' · ')}
                        </p>
                    </div>
                </header>

                <form className='ui-card ui-card--profile' onSubmit={handleModificationProfil}>
                    <header className='ui-card-header'>
                        <h2>Mes informations</h2>
                        {!modification.profil && (
                            <button
                                type='button'
                                className='ui-btn ui-btn--ghost'
                                onClick={() => setModification({ ...modification, profil: true })}
                            >
                                Modifier
                            </button>
                        )}
                    </header>

                    <dl className='ui-fields'>
                        {profileFields.map(({ key, label, type }) => (
                            <div className='ui-field' key={key}>
                                {modification.profil ? (
                                    <>
                                        <dt><label htmlFor={key}>{label}</label></dt>
                                        <dd>
                                            <input
                                                type={type ?? 'text'}
                                                id={key}
                                                value={updatedUser[key] ?? ''}
                                                onChange={(e) => handleChange(key, e.target.value)}
                                            />
                                        </dd>
                                    </>
                                ) : (
                                    <>
                                        <dt>{label}</dt>
                                        <dd>{user[key] || <span className='ui-muted'>Non renseigné</span>}</dd>
                                    </>
                                )}
                            </div>
                        ))}
                    </dl>

                    {modification.profil && (
                        <div className='ui-actions'>
                            <button type='button' className='ui-btn ui-btn--ghost' onClick={handleCancel}>
                                Annuler
                            </button>
                            <button type='submit' className='ui-btn ui-btn--primary'>
                                Enregistrer
                            </button>
                        </div>
                    )}
                </form>

                <div className='ui-addresses'>
                    <AddressCard
                        title='Adresse de facturation'
                        address={user.billing_address}
                        onEdit={() => setModification({ ...modification, billing: true })}
                    />
                    <AddressCard
                        title='Adresse de livraison standard'
                        address={user.delivery_standard}
                        onEdit={() => setModification({ ...modification, delivery: true })}
                    />
                </div>

                {modification.billing &&
                    <Addresses type='billing' modification={modification} setModification={setModification} />
                }
                {modification.delivery &&
                    <Addresses type='delivery' modification={modification} setModification={setModification} />
                }
            </div>
        </main>
    )
}
