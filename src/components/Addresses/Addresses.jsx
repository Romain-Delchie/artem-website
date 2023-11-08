import React, { useState, useContext, useEffect } from 'react'
import AppContext from '../../context/AppContext'
import API from '../../utils/api/api';
import axios from 'axios';
import './Addresses.scss'
import fetchData from '../../utils/fetchData';
import Select from 'react-select';

export default function Addresses({ type, modification, setModification, quoteId }) {
    const title = type === 'billing' ? 'Adresse de facturation' : 'Adresse de livraison';
    const typeKey = type === 'billing' ? 'billing_address' : 'delivery_standard';

    const { user, updateUser } = useContext(AppContext)
    const [addressSelected, setAddressSelected] = useState({ new: false, ...user[typeKey], zip_code: "" })
    const [isOpenAddresses, setIsOpenAddresses] = useState(false)
    const [availableCities, setAvailableCities] = useState([])
    const [countryOptions, setCountryOptions] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState({ label: 'France', value: 'France' });

    useEffect(() => {

        setAddressSelected({ new: false, ...user[typeKey], zip_code: "" })
    }, [user]);

    const handleChangeSelect = (e) => {
        if (e.target.value === 'new') {
            setAddressSelected({ new: true })
            return
        }

        user.deliveries.filter((delivery) => delivery.id === Number(e.target.value)).map((delivery) => {

            setAddressSelected({ ...addressSelected, ...delivery, new: false })
            setIsOpenAddresses(false)
        }
        )
    }

    const handleZipCodeChange = async (e) => {
        const zipCode = e.target.value;
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

    const handleCityChange = (event) => {
        setAddressSelected({
            ...addressSelected,
            city: event.target.value
        });
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

    const handleNewAddress = async (e) => {
        e.preventDefault()
        const dataAddress = {
            name_address: e.target.name_address.value,
            street_address: e.target.street_address.value,
            zip_code: e.target.zip_code.value,
            city: e.target.city.value,
            country: selectedCountry.label,
        }

        if (dataAddress.name_address === '' || dataAddress.street_address === '' || dataAddress.zip_code === '' || dataAddress.city === '') {
            return alert('Veuillez renseigner tous les champs')
        }

        try {
            const response = await API.address.create(dataAddress);
            response.data.newAddress.id = response.data.newAddress.generatedId
            delete response.data.newAddress.generatedId
            const updatedUser = { ...user, deliveries: [...user.deliveries, response.data.newAddress] }
            updateUser(updatedUser)
            dataAddress.id = response.data.newAddress.id
            if (type !== 'quote') {
                API.user.update(user.token, { [typeKey + '_id']: dataAddress.id }).then((res) => {
                    const newUser = { ...user, [typeKey]: { ...dataAddress } }
                    updateUser(newUser)

                }

                ).catch((error) => {
                    console.error(error);
                }
                )
            }
            setAddressSelected({ ...addressSelected, ...response.data.newAddress })
            setIsOpenAddresses(false)

        } catch (error) {
            console.error(error);
        } finally {
            const dataDelivery = {
                delivery_address_id: dataAddress.id,
                account_id: user.id,
            }

            API.delivery.create(user.token, dataDelivery).then((response) => {
                setModification({ ...modification, [type]: false })
            }).catch((error) => {
                console.error(error);
            }
            )

            if (type === 'quote') {
                const dataQuotation = {
                    shipment: dataAddress.id !== 1,
                    delivery_id: dataAddress.id
                }

                API.quotation.update(user.token, quoteId, dataQuotation).then((response) => {
                    fetchData(user, updateUser)
                    setModification({ ...modification, [type]: false })
                }
                ).catch((error) => {
                    console.error(error);
                }
                )
            }
        }
    }

    const handleValidateAddress = async () => {
        try {
            if (type !== 'quote') {
                const response = await API.user.update(user.token, { [typeKey + '_id']: addressSelected.id })
                const newUser = { ...user, [typeKey]: { ...addressSelected } }
                updateUser(newUser)
                setModification({ ...modification, [type]: false })
            } else {
                const response = await API.quotation.update(user.token, quoteId, { delivery_id: addressSelected.id })
                fetchData(user, updateUser)
                setModification({ ...modification, [type]: false })
            }
        } catch (error) {
            console.error(error);
        }

    }
    return (
        <div className='addresses'>
            <div className="addresses-change">
                <svg onClick={() => setModification({ ...modification, [type]: false })} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 addresses-btn-cross">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>

                <label className='addresses-change-title' htmlFor="shipment">{title}</label>
                <select name="shipment" id="shipment" defaultValue="none" onChange={handleChangeSelect}>
                    <option disabled key="presentation" value="none">Choisissez une adresse</option>
                    <option value="new" key="new">Nouvelle adresse</option>
                    {user.deliveries.map((address) => {
                        return (
                            <option key={address.id} value={address.id}>{address.name_address} {address.street_address} {address.zip_code} {address.city} {address.country}</option>
                        )
                    })
                    }


                </select>
                {!addressSelected.new &&
                    <button className='addresses-button' onClick={handleValidateAddress}>Modifier l'{title.toLowerCase()}</button>
                }
                {
                    addressSelected.new &&

                    <form className='addresses-new' onSubmit={handleNewAddress}>
                        <div className="addresses-new-item">
                            <label htmlFor="name_address">Nom</label>
                            <input type="text" name="name_address" id="name_address" placeholder="ex : Nom de votre client" />
                        </div>
                        <div className="addresses-new-item">
                            <label htmlFor="street_address">Rue</label>
                            <input type="text" name="street_address" id="street_address" placeholder="ex : 1 rue de la Paix" />
                        </div>
                        <div className="addresses-new-item">
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
                        <div className="addresses-new-item">
                            <label htmlFor="zip_code">C.P.</label>
                            <input
                                type="text"
                                name="zip_code"
                                id="zip_code"
                                placeholder="ex : 75000"
                                value={addressSelected.zip_code}
                                onChange={handleZipCodeChange}
                            />
                        </div>
                        {
                            selectedCountry.label === 'France' &&
                            <div className="addresses-new-item">
                                <label htmlFor="city">Ville</label>
                                <select
                                    name="city"
                                    id="city"
                                    value={addressSelected.city}
                                    onChange={handleCityChange}
                                >
                                    <option value="none" key='none'>Sélectionnez une ville</option>
                                    {availableCities.map((city, index) => (
                                        <option key={`${city}_${index}`} value={city}>
                                            {city}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        }
                        {
                            selectedCountry.label !== 'France' &&
                            <div className="addresses-new-item">
                                <label htmlFor="city">Ville</label>
                                <input
                                    type="text"
                                    name="city"
                                    id="city"
                                    placeholder="ex : Paris"
                                    value={addressSelected.city}
                                    onChange={handleCityChange}
                                />
                            </div>
                        }
                        <button className='addresses-new-button' type='submit'>Valider la nouvelle adresse</button>
                    </form>
                }
            </div>

        </div>
    )
}