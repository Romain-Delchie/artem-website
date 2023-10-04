import { Link, useNavigate, useParams } from 'react-router-dom'
import { useContext, useState } from 'react'
import AppContext from '../../context/AppContext'
import API from '../../utils/api/api'
import './DeleteProduct.scss'

export default function DeleteProduct() {
    const { user } = useContext(AppContext);
    const { id } = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleDelete = () => {
        setIsLoading(true);
        API.product.delete(user.token, id).then((res) => {
            setIsLoading(false);
            alert('Produit supprimé')
        }).catch((err) => {
            console.log(err);
        }).finally(() => {
            navigate('/dashboard', { replace: true })
        })
    }


    return (

        <main className='delete-product'>
            <h2>Etes-vous sur de vouloir supprimer ce produit?</h2>
            <button onClick={handleDelete} className='delete-product-choice'>Oui</button>
            <Link className='delete-product-choice' to='/dashboard'>Non</Link>


        </main >
    )
}