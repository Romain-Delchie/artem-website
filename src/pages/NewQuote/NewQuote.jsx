import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../../utils/api/api';
import axios from 'axios';
import AppContext from '../../context/AppContext'
import './NewQuote.scss'
import fetchData from '../../utils/fetchData';

export default function NewQuote() {
    const { user, updateUser } = useContext(AppContext)
    console.log(user);
    const navigate = useNavigate()
    const [addressSelected, setAddressSelected] = useState({ new: false, ...user.delivery_standard })
    const [isOpenAddresses, setIsOpenAddresses] = useState(false)
    const [availableCities, setAvailableCities] = useState([])

    const handleOpenAddresses = (e) => {
        e.preventDefault()
        setIsOpenAddresses(true)
    }

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


    const handleCreateQuotation = (e) => {
        e.preventDefault()
        if (e.target.reference.value === '') {
            return alert('Veuillez renseigner une référence')
        }
        const dataQuotation = {
            account_id: user.id,
            reference: e.target.reference.value,
            shipment: addressSelected.id !== 1,
            delivery_id: addressSelected.id
        }
        API.quotation.create(dataQuotation).then((response) => {
            fetchData(user, updateUser)
        }
        ).catch((error) => {
            console.error(error);
        }
        ).finally(() => {

            navigate(`/quote-history/${user.quotations.slice(-1)[0].quotation_id}`)
        })
    }

    const handleNewAddress = (e) => {
        e.preventDefault()
        const dataAddress = {
            name_address: e.target.name_address.value,
            street_address: e.target.street_address.value,
            zip_code: e.target.zip_code.value,
            city: e.target.city.value
        }
        API.address.create(dataAddress).then((response) => {
            response.data.newAddress.id = response.data.newAddress.generatedId
            delete response.data.newAddress.generatedId
            const updatedUser = { ...user, deliveries: [...user.deliveries, response.data.newAddress] }
            updateUser(updatedUser)
            console.log({ ...addressSelected });
            console.log({ ...response.data.newAddress });
            setAddressSelected({ ...response.data.newAddress, new: false })
            setIsOpenAddresses(false)

        }).catch((error) => {
            console.error(error);
        }).finally(() => {
            API.delivery.create(user.token, { delivery_address_id: addressSelected.id, account_id: user.id }).then((response) => {
                fetchData(user, updateUser)
            }
            ).catch((error) => {
                console.error(error);
            }
            )

        })
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
        const adressUpdated = { ...addressSelected, city: event.target.value }
        console.log(adressUpdated);
        setAddressSelected(adressUpdated);
    };

    console.log(addressSelected);
    return (
        <div className='new-quote' >
            <h2>Nouveau devis</h2>
            <form action="" className='new-quote-form' onSubmit={handleCreateQuotation}>
                <div className="new-quote-form-item">
                    <label htmlFor="reference">Votre référence</label>
                    <input type="text" name="reference" id="reference" placeholder="ex : Nom de votre client" />
                </div>


                <div className="new-quote-shipment">
                    <h3>Addresse de livraison</h3>
                    <div className="shipment-container">
                        <div className="shipment-item">
                            <p>{addressSelected.name_address}</p>
                            <p>{addressSelected.street_address}</p>
                            <div className="shipment-item-last-line">
                                <p>{addressSelected.zip_code}</p>
                                <p>{addressSelected.city}</p>
                            </div>
                        </div>
                    </div>
                    <button onClick={handleOpenAddresses}>Modifier adresse de livraison</button>
                </div>


                {isOpenAddresses &&
                    <div className="new-quote-form-item">
                        <label htmlFor="shipment">Adresse de livraison</label>
                        <select name="shipment" id="shipment" onChange={handleChangeSelect} defaultValue="none">
                            <option disabled value="none" key="none">Choisissez une adresse de livraison</option>
                            <option value="new" key="new">Nouvelle adresse</option>
                            {user.deliveries.map((address) => {
                                return (
                                    <option key={`address_${address.id}`} value={address.id}>{address.name_address} {address.street_address} {address.zip_code} {address.city}</option>
                                )
                            })
                            }


                        </select>
                    </div>
                }


                <button type='submit'>Créer ce nouveau devis</button>
            </form>
            {
                addressSelected.new &&

                <form className='new-quote-form-new-address' onSubmit={handleNewAddress}>
                    <div className="new-quote-form-item">
                        <label htmlFor="name_address">Nom</label>
                        <input type="text" name="name_address" id="name_address" placeholder="ex : Nom de votre client" />
                    </div>
                    <div className="new-quote-form-item">
                        <label htmlFor="street_address">Rue</label>
                        <input type="text" name="street_address" id="street_address" placeholder="ex : 1 rue de la Paix" />
                    </div>
                    <div className="new-quote-form-item">
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
                    <div className="new-quote-form-item">
                        <label htmlFor="city">Ville</label>
                        <select
                            name="city"
                            id="city"
                            defaultValue={addressSelected.city || 'none'}
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

                    <button type='submit'>Valider la nouvelle adresse</button>
                </form>
            }

        </div >
    )
}