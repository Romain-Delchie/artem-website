import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../../utils/api/api';
import AppContext from '../../context/AppContext'
import SearchProduct from '../../components/SearchProduct/SearchProduct'
import './NewQuote.scss'

export default function NewQuote() {
    const { user } = useContext(AppContext)
    console.log(user);
    const navigate = useNavigate()
    const [shipmentMode, setShipmentMode] = useState('')
    const [addressSelected, setAddressSelected] = useState({ new: false, ...user.delivery_standard })
    const [isOpenAddresses, setIsOpenAddresses] = useState(false)

    const handleOpenAddresses = (e) => {
        e.preventDefault()
        setIsOpenAddresses(true)
    }

    const handleChangeSelect = (e) => {
        user.deliveries.filter((delivery) => delivery.id === Number(e.target.value)).map((delivery) => {

            setAddressSelected({ ...addressSelected, ...delivery })
            setIsOpenAddresses(false)
        }
        )
    }

    console.log(typeof addressSelected.id);

    const handleCreateQuotation = (e) => {
        e.preventDefault()
        const dataQuotation = {
            account_id: user.id,
            reference: e.target.reference.value,
            shipment: addressSelected.id !== 1,
            delivery_id: addressSelected.id
        }
        API.quotation.create(dataQuotation).then((response) => {
            console.log(response);
            navigate(`/quote-history/${response.data.newQuotation.generatedId}`)
        }
        ).catch((error) => {
            console.error(error);
        }
        )
    }
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
                        <select name="shipment" id="shipment" onChange={handleChangeSelect}>
                            <option disabled selected>Choisissez une adresse de livraison</option>
                            <option value="new">Nouvelle adresse</option>
                            {user.deliveries.map((address) => {
                                return (
                                    <option key={address.id} value={address.id}>{address.name_address} {address.street_address} {address.zip_code} {address.city}</option>
                                )
                            })
                            }


                        </select>
                    </div>
                }
                {
                    addressSelected.new &&

                    <>
                        <div className="new-quote-form-item">
                            <label htmlFor="name_address">Nom</label>
                            <input type="text" name="name_address" id="name_address" placeholder="ex : Nom de votre client" />
                        </div>
                        <div className="new-quote-form-item">
                            <label htmlFor="street_address">Rue</label>
                            <input type="text" name="street_address" id="street_address" placeholder="ex : 1 rue de la Paix" />
                        </div>
                        <div className="new-quote-form-item">
                            <label htmlFor="zip_code">Code postal</label>
                            <input type="text" name="zip_code" id="zip_code" placeholder="ex : 75000" />
                        </div>
                        <div className="new-quote-form-item">
                            <label htmlFor="city">Ville</label>
                            <input type="text" name="city" id="city" placeholder="ex : Paris" />
                        </div>
                        <div className="new-quote-form-item">
                        </div>
                        <div className="new-quote-form-item">
                        </div>
                    </>
                }


                <button type='submit'>Créer ce nouveau devis</button>
            </form>

        </div >
    )
}