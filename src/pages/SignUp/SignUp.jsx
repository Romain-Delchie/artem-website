import React, { useEffect, useState } from 'react';
import API from '../../utils/api/api';
import { useContext } from 'react';
import AppContext from '../../context/AppContext';
import './SignUp.scss'
import PasswordInput from '../../components/PasswordInput/PasswordInput';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function SignUp() {
    const { user, updateUser } = useContext(AppContext)
    const navigate = useNavigate();
    const [availableCities, setAvailableCities] = useState([]);
    const [formData, setFormData] = useState({
        company: '',
        firstname: '',
        lastname: '',
        email: '',
        phone_number: '',
        password: '',
        siret: '', // Changed to string type
        street_address: '',
        zip_code: '',
        city: '',
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
        setPasswordMatch(formData.password === formData.repeat_password);
    }, [formData.password, formData.repeat_password]);

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


    const handleZipCodeChange = async (e) => {
        const zipCode = e.target.value;
        setFormData({ ...formData, zip_code: zipCode })
        if (zipCode.length == 5) {
            try {
                const response = await axios.get(`https://api-adresse.data.gouv.fr/search/?q=${zipCode}`);
                if (response.data && response.data.features.length > 0) {
                    const cities = response.data.features.reduce((uniqueCities, feature) => {
                        const city = feature.properties.city;
                        if (!uniqueCities.includes(city)) {
                            uniqueCities.push(city);
                        }
                        return uniqueCities;
                    }, []);
                    setAvailableCities(cities);
                } else {
                    setAvailableCities([]);
                }
            } catch (error) {
                console.error('Error fetching cities:', error);
            }
        } else {
            setAvailableCities([]);
        }
    };

    console.log(formData);

    const handleSubmit = (e) => {
        e.preventDefault();
        const isPasswordValid =
            passwordValidation.minLength &&
            passwordValidation.uppercase &&
            passwordValidation.digit &&
            passwordValidation.specialChar;

        const allFieldsFilled = Object.values(formData).every(
            (field) => field !== null && field !== ""
        );

        if (!allFieldsFilled) {
            alert("Veuillez remplir tous les champs.");
            return;
        }

        if (isPasswordValid) {
            if (formData.password === formData.repeat_password) {
                const dataAddress = {
                    name_address: formData.company,
                    street_address: formData.street_address,
                    zip_code: formData.zip_code,
                    city: formData.city
                }
                API.address.create(dataAddress).then((response) => {
                    const lastForm = formData
                    lastForm.billing_address_id = response.data.newAddress.generatedId
                    lastForm.delivery_standard_id = response.data.newAddress.generatedId
                    lastForm.siret = String(lastForm.siret)
                    delete lastForm.street_address
                    delete lastForm.zip_code
                    delete lastForm.city
                    setFormData(lastForm)
                    API.user
                        .create(lastForm)
                        .then((response) => {
                            API.auth.signin(formData.email, formData.password).then((response) => {
                                const tokenReceived = response.data.token;

                                updateUser({ ...user, token: tokenReceived });

                                API.email.sendConfirmationEmail(tokenReceived, { email: formData.email, firstname: formData.firstname }).then((response) => {

                                    navigate('/dashboard')
                                })
                            }
                            )

                        })
                }).catch((error) => {
                    console.error(error);
                })
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

                    <div className="signup-form-item signup-form-item-address">
                        <label htmlFor='street_address'>Adresse de facturation</label>
                        <input
                            placeholder='Adresse'
                            type="text"
                            name="street_address"
                            id="street_address"
                            value={formData.address}
                            onChange={handleChange}
                        />

                        <label htmlFor="zip_code">C.P.</label>
                        <input
                            type="text"
                            name="zip_code"
                            id="zip_code"
                            placeholder="ex : 75000"
                            value={formData.zip_code}
                            onChange={handleZipCodeChange}
                        />

                        <label htmlFor="city">Ville</label>
                        <select
                            name="city"
                            id="city"
                            value={formData.city}
                            onChange={handleChange}
                        >
                            <option value="none" key='none'>Sélectionnez une ville</option>
                            {availableCities.map((city, index) => (
                                <option key={`${city}_${index}`} value={city}>
                                    {city}
                                </option>
                            ))}
                        </select>

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
                                name="repeat_password"
                                id="password-confirm"
                                placeholder="Confirmez votre MDP"
                                value={formData.repeat_password}
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

                    <button type='submit'>Valider</button>
                </form>
            </div>
        </main>
    );
}