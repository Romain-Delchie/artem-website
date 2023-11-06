import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import AppContext from '../../context/AppContext'
import API from '../../utils/api/api'
import Loading from '../../components/Loading/Loading'
import './DeleteRange.scss'

export default function DeleteRange() {
    const navigate = useNavigate()
    const { user } = useContext(AppContext)
    const [ranges, setRanges] = useState([])
    const [isDataLoaded, setIsDataLoaded] = useState(false)
    const [idToDelete, setIdToDelete] = useState('')

    useEffect(() => {
        API.range.getRanges()
            .then(res => setRanges(res.data.ranges))
            .catch(err => console.error(err))
            .finally(() => setIsDataLoaded(true))
    }, []);

    const handleRangeChange = (e) => {
        setIdToDelete(e.target.value);
    }

    const handleDeleteRange = (e) => {
        e.preventDefault()
        const confirmDelete = window.confirm('Voulez-vous vraiment supprimer cette gamme ?')
        if (confirmDelete) {
            API.range.delete(user.token, idToDelete)
                .then(res => {
                    alert('Gamme supprimée')
                    navigate('/products')
                })
                .catch(err => {
                    alert('une erreur a empêché la suppression de la gamme')
                    console.error(err)
                }
                )
        }
    }



    if (!isDataLoaded) {
        return <Loading />
    }

    return (
        <div className='delete-range'>
            <h2>Supprimer une gamme de produit</h2>
            <select name="range" id="range" defaultValue="none" onChange={handleRangeChange}>
                <option value="none" disabled>Choisissez la gamme à supprimer</option>
                {ranges.map(range => <option key={range.id} value={range.id}>{range.name}</option>)}
            </select>

            {idToDelete !== '' &&
                <button onClick={handleDeleteRange}>Supprimer</button>
            }

        </div>
    )
}
