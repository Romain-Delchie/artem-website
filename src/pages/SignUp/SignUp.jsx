import React, { useEffect, useState } from 'react';
import API from '../../utils/api/api';
import { useContext } from 'react';
import AppContext from '../../context/AppContext';
import './SignUp.scss'
import PasswordInput from '../../components/PasswordInput/PasswordInput';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import axios from 'axios';
import Select from 'react-select';

export default function SignUp() {
    const { user, updateUser } = useContext(AppContext)
    const navigate = useNavigate();
    const [availableCities, setAvailableCities] = useState([]);
    const [apiError, setApiError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        company: '',
        firstname: '',
        lastname: '',
        email: '',
        phone_number: '',
        password: '',
        repeat_password: '',
        siret: '', // Changed to string type
        street_address: '',
        street_other: '',
        zip_code: '',
        city: '',
        country: 'France',
        profile_id: 3, // Set a default value
    });
    const [passwordValidation, setPasswordValidation] = useState({
        minLength: false,
        uppercase: false,
        digit: false,
        specialChar: false,
    });
    const [passwordMatch, setPasswordMatch] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState({ label: 'France', value: 'France' });
    const [countryOptions, setCountryOptions] = useState([]);
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

    useEffect(() => {
        // Utilisez une API pour récupérer la liste des pays
        axios.get('https://restcountries.com/v3.1/all')
            .then(response => {
                const countries = response.data.sort((a, b) => a.name.common.localeCompare(b.name.common)).map(country => ({
                    label: country.name.common,
                    value: country.name.common,
                }));
                setCountryOptions(countries);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des pays', error);
            });
    }, []);

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
                setApiError(true);
            }
        } else {
            setAvailableCities([]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isPasswordValid =
            passwordValidation.minLength &&
            passwordValidation.uppercase &&
            passwordValidation.digit &&
            passwordValidation.specialChar;
        formData.siret = formData.country !== 'France' ? '00000000000000' : String(formData.siret)
        const allFieldsFilled = Object.values(formData).every(
            (field) => field !== null && field !== ""
        );
        if (!allFieldsFilled) {
            alert("Veuillez remplir tous les champs.");
            return;
        }

        const phonePattern = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
        const siretPattern = /^[0-9]{14}$/

        if (!isPasswordValid) {
            alert("Le mot de passe ne respecte pas les critères de sécurité.");
            return;
        } else if (!phonePattern.test(formData.phone_number)) {
            alert("Le numéro de téléphone n'est pas valide.");
            return;
        } else if (!siretPattern.test(formData.siret)) {
            alert("Le numéro de SIRET n'est pas valide.");
            return;
        } else if (formData.password !== formData.repeat_password) {
            alert("Les mots de passe ne correspondent pas.");
            return;
        } else {
            setIsLoading(true)
            const dataAddress = {
                name_address: formData.company,
                street_address: formData.street_address,
                zip_code: formData.zip_code,
                city: formData.city,
                country: selectedCountry.label,
            }
            if (formData.street_other !== "") {
                dataAddress.street_other = formData.street_other;
            }
            API.address.create(dataAddress).then((response) => {
                const lastForm = formData
                lastForm.billing_address_id = response.data.newAddress.generatedId
                lastForm.delivery_standard_id = response.data.newAddress.generatedId
                lastForm.country = selectedCountry.label
                delete lastForm.street_address
                delete lastForm.name_address
                if (lastForm.street_other !== null) {
                    delete lastForm.street_other
                }
                delete lastForm.zip_code
                delete lastForm.city
                setFormData({ ...formData, ...dataAddress })
                API.user
                    .create(lastForm)
                    .then((response) => {
                        const emailToken = response.data.newAccount.email_token;
                        console.log(emailToken);
                        API.auth.signin(formData.email, formData.password).then((response) => {
                            const tokenReceived = response.data.token;
                            updateUser({ ...user, token: tokenReceived });
                            API.email.sendConfirmationEmail(tokenReceived, { email: formData.email, firstname: formData.firstname, email_token: emailToken })
                            API.email.newUser()
                            navigate('/dashboard')
                        }
                        )
                    }).catch((error) => {
                        setIsLoading(false)
                        if (error.response.status === 400) {
                            alert('Cet email est déjà utilisé')
                        } else {
                            alert(error.message)
                        }
                    })
            }).catch((error) => {
                setIsLoading(false)
                alert("Une erreur est survenue lors de la création de votre compte, veuillez nous contacter svp")
            })
        }
    };

    if (isLoading) {
        return <Loading />
    }


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
                        <label htmlFor="country">Pays</label>
                        <Select
                            id="country"
                            options={countryOptions}
                            value={selectedCountry}
                            onChange={option => setSelectedCountry(option)}
                            placeholder="Sélectionnez un pays"
                            isSearchable={true}
                        />
                    </div>

                    <div className="signup-form-item signup-form-item-address">
                        <label htmlFor='street_address'>Adresse de facturation</label>
                        <input
                            placeholder='ex: 10 Rue de la paix'
                            type="text"
                            name="street_address"
                            id="street_address"
                            value={formData.street_address}
                            onChange={handleChange}
                        />
                        <label htmlFor='street_other'>Complément adresse</label>
                        <input
                            placeholder='Facultatif : ex: lieu dit'
                            type="text"
                            name="street_other"
                            id="street_other"
                            value={formData.street_other}
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
                        {
                            (apiError || (selectedCountry.label !== 'France')) ? (
                                <input type='text' name='city' id='city' placeholder='Ville' value={formData.city} onChange={handleChange} />
                            ) : (
                                !apiError && (selectedCountry.label === 'France') ? (
                                    <select name="city" id="city" value={formData.city} onChange={handleChange}>
                                        <option value="none" key='none'>Sélectionnez une ville</option>
                                        {availableCities.map((city, index) => (
                                            <option key={`${city}_${index}`} value={city}>
                                                {city}
                                            </option>
                                        ))}
                                    </select>
                                ) : null // Ajout de null pour éviter un rendu inattendu
                            )
                        }
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
                    {selectedCountry.label === 'France' &&
                        <div className="signup-form-item">
                            <label htmlFor="siret">Numéro de SIRET</label>
                            <input
                                placeholder='N° de SIRET à 14 chiffres'
                                type="number"
                                name="siret"
                                id="siret"
                                value={formData.siret}
                                onChange={handleChange}
                            />
                        </div>
                    }

                    <button type='submit'>Valider</button>
                </form>
            </div>
        </main>
    );
}