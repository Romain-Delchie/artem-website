import React, { useEffect, useState } from 'react';
import API from '../../utils/api/api';
import './SignUp.scss'
import PasswordInput from '../../components/PasswordInput/PasswordInput';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        company: '',
        firstname: '',
        lastname: '',
        email: '',
        phone_number: '',
        password: '',
        siret: '', // Changed to string type
        invoice_address: '',
        profile_id: 3, // Set a default value
    });

    const [passwordValidation, setPasswordValidation] = useState({
        minLength: false,
        uppercase: false,
        digit: false,
        specialChar: false,
    });

    const [passwordMatch, setPasswordMatch] = useState(false);
    useEffect(() => {
        setPasswordMatch(formData.password === formData.passwordConfirm);
    }, [formData.password, formData.passwordConfirm]);

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        if (name === 'password') {
            const minLength = value.length >= 8;
            const uppercase = /[A-Z]/.test(value);
            const digit = /[0-9]/.test(value);
            const specialChar = /[!@#$%^&*()_+[\]{};':"\\|,.<>?/~`-]/.test(value);

            setPasswordValidation({
                minLength,
                uppercase,
                digit,
                specialChar,
            });
        }

        setFormData({ ...formData, [name]: type === 'number' ? Number(value) : value });

    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isPasswordValid =
            passwordValidation.minLength &&
            passwordValidation.uppercase &&
            passwordValidation.digit &&
            passwordValidation.specialChar;

        if (isPasswordValid) {
            if (formData.password === formData.passwordConfirm) {
                // Passwords match, remove passwordConfirm from formData
                const { passwordConfirm, ...formDataWithoutPasswordConfirm } = formData;

                const lastData = { ...formDataWithoutPasswordConfirm, profile_id: Number(formData.profile_id) }
                // Send the FormData to the server using your API
                API.user
                    .create(lastData)
                    .then((response) => {
                        navigate('/signin', { replace: true });
                    })
                    .catch((error) => {
                        console.error(error);
                        // Handle errors from the server
                    });
            } else {
                // Passwords do not match, handle this case as needed
                alert('Passwords do not match');
                // You might want to display an error message to the user
            }
        } else {
            // Password is not valid, handle this case as needed
            alert('Password is not valid');
            // You might want to display an error message to the user
        }
    };



    return (
        <main className='signup'>
            <div className="signup-container">
                <h2>Créez votre compte et bénéficiez de tous nos services</h2>
                <form onSubmit={handleSubmit} className="signup-form">
                    <div className="signup-form-item">
                        <label htmlFor="company">Nom de votre entreprise</label>
                        <input
                            type="text"
                            name="company"
                            id="company"
                            value={formData.company}
                            placeholder='Nom entreprise'
                            onChange={handleChange}
                        />
                    </div>
                    <div className="signup-form-item">
                        <label htmlFor="firstname">Prénom</label>
                        <input
                            placeholder='Prénom'
                            type="text"
                            name="firstname"
                            id="firstname"
                            value={formData.firstname}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="signup-form-item">
                        <label htmlFor="lastname">Nom</label>
                        <input
                            placeholder='Nom'
                            type="text"
                            name="lastname"
                            id="lastname"
                            value={formData.lastname}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="signup-form-item">
                        <label htmlFor="email">Email</label>
                        <input
                            placeholder='Email'
                            type="email"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="signup-form-item">
                        <label htmlFor="phone_number">Téléphone</label>
                        <input
                            placeholder='Téléphone'
                            type="tel"
                            name="phone_number"
                            id="phone_number"
                            value={formData.phone_number}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="signup-form-item">
                        <label htmlFor="password">Mot de passe</label>
                        <div className="password-checking">
                            <PasswordInput
                                name="password"
                                id="password"
                                placeholder="Mot de passe"
                                value={formData.password}
                                onChange={handleChange}
                            />

                            <div className="password-validation">
                                {passwordValidation.minLength ? (
                                    <span className="valid">Au moins 8 caractères</span>
                                ) : (
                                    <span className="invalid">Au moins 8 caractères</span>
                                )}
                                {passwordValidation.uppercase ? (
                                    <span className="valid">Au moins 1 majuscule</span>
                                ) : (
                                    <span className="invalid">Au moins 1 majuscule</span>
                                )}
                                {passwordValidation.digit ? (
                                    <span className="valid">Au moins un chiffre</span>
                                ) : (
                                    <span className="invalid">Au moins un chiffre</span>
                                )}
                                {passwordValidation.specialChar ? (
                                    <span className="valid">Au moins un caractère spécial</span>
                                ) : (
                                    <span className="invalid">Au moins un caractère spécial</span>
                                )}
                            </div>

                        </div>
                    </div>
                    <div className="signup-form-item">
                        <label htmlFor="password-confirm">Confirmez votre MDP</label>
                        <div className="password-checking">
                            <PasswordInput
                                name="passwordConfirm"
                                id="password-confirm"
                                placeholder="Confirmez votre MDP"
                                value={formData.passwordConfirm}
                                onChange={handleChange}
                            />

                            {!passwordMatch &&

                                <span className="invalid">Doit être identique au premier mot de passe</span>
                            }
                        </div>
                    </div>
                    <div className="signup-form-item">
                        <label htmlFor="siret">Numéro de SIRET</label>
                        <input
                            placeholder='N° de SIRET à 14 chiffres'
                            type="number"
                            name="siret"
                            id="siret"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="signup-form-item">
                        <label htmlFor="address">Adresse</label>
                        <textarea
                            rows={4}
                            cols={20}
                            placeholder='Adresse'
                            type="text"
                            name="invoice_address"
                            id="invoice_address"
                            value={formData.invoice_address}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="signup-form-item">
                        <label>Choisissez votre profil :</label>
                        <div className='radio-container'>
                            <div className="radio-item">
                                <input
                                    type="radio"
                                    name="profile_id"
                                    value='1'
                                    checked={formData.profile_id === '1'}
                                    onChange={handleChange}
                                />
                                <label>
                                    Boulanger
                                </label>
                            </div>
                            <div className="radio-item">
                                <input
                                    type="radio"
                                    name="profile_id"
                                    value="3"
                                    checked={formData.profile_id === '3'}
                                    onChange={handleChange}
                                />
                                <label>
                                    Revendeur
                                </label>
                            </div>
                        </div>
                    </div>
                    <button type='submit'>Valider</button>
                </form>
            </div>
        </main>
    );
}