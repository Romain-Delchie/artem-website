import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import API from '../../utils/api/api'
import AppContext from '../../context/AppContext'
import { useContext } from 'react'
import './UpdateProduct.scss'
import Loading from '../../components/Loading/Loading'


export default function UpdateProduct() {
    const { user } = useContext(AppContext)
    const navigate = useNavigate()
    const productId = useParams().id
    const location = useLocation()
    const product = location.state;
    const [productUpdate, setProductUpdate] = useState(product)
    const [isLoading, setIsLoading] = useState(false)

    const handlechange = (event) => {
        const { name, value } = event.target
        if (name === 'stock' || name === 'active' || name === 'range_id' || name === 'price' || name === 'weight' || name === 'width' || name === 'unit' || name === 'length') {
            setProductUpdate({ ...productUpdate, [name]: parseInt(value) })
        } else {
            setProductUpdate({ ...productUpdate, [name]: value })
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        setIsLoading(true)
        const dataProduct = { ...productUpdate }
        delete dataProduct.created_at
        delete dataProduct.updated_at
        delete dataProduct.minPrice
        dataProduct.active = dataProduct.active === 1 ? true : false
        dataProduct.stock = dataProduct.stock === 1 ? true : false
        dataProduct.delivery_time = dataProduct.stock === true ? '0 jour' : dataProduct.delivery_time

        API.product.update(user.token, productId, dataProduct).then((res) => {
            alert('Produit modifié')
        }).catch((err) => {
            alert('Erreur lors de la modification du produit')
        }).finally(() => {
            setIsLoading(false)
            navigate('/update-product')
        })
    }

    if (isLoading) {
        return <Loading />
    }

    return (
        <main className="update-product">

            <h2>Modifier un produit</h2>

            <form className="update-product-form" onSubmit={handleSubmit}>

                <div className="update-product-form-input update-product-form-input-active">
                    <label htmlFor='active'>Article actif</label>
                    <input type='radio' id='active' name='active' value='1' onChange={handlechange} checked={productUpdate.active === 1} />
                    <label htmlFor='non'>Article inactif</label>
                    <input type='radio' id='non' name='active' value='0' onChange={handlechange} checked={productUpdate.active === 0} />
                </div>
                {product &&
                    Object.keys(product).filter((key) => (key !== 'id' && key !== 'active' && key !== 'stock' && key !== 'created_at' && key !== 'updated_at')).map((key) => (

                        <div className="update-product-form-input" key={key}>
                            <label htmlFor={key}>{key}</label>
                            {
                                typeof product[key] === 'string' ? (
                                    <input value={productUpdate[key]} type="text" id={key} name={key} onChange={handlechange} />
                                ) : (
                                    <input value={productUpdate[key]} type="number" id={key} name={key} onChange={handlechange} />
                                )
                            }
                        </div>)
                    )

                }
                <div className="update-product-form-input update-product-form-input-stock">
                    <label htmlFor='stock'>En stock</label>
                    <input type='radio' id='stock' name='stock' value='1' onChange={handlechange} checked={productUpdate.stock === 1} />
                    <label htmlFor='non'>Non tenu en stock</label>
                    <input type='radio' id='non' name='stock' value='0' onChange={handlechange} checked={productUpdate.stock === 0} />
                </div>
                <button type='submit'>Valider les modifications</button>
            </form>
        </main>
    )
}