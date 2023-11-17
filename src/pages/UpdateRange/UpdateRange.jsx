import { useContext, useEffect, useState } from 'react'
import './UpdateRange.scss'
import AppContext from '../../context/AppContext'
import API from '../../utils/api/api'
import Loading from '../../components/Loading/Loading'
import { useNavigate } from 'react-router-dom'
import DashboardComponent from '../../components/Dashboard/DashboardComponent'

export default function UpdateRange() {
    const { user } = useContext(AppContext)
    const { ranges, setRanges } = useContext(AppContext)
    const [isDataLoaded, setIsDataLoaded] = useState(false)
    const [idToUpdate, setIdToUpdate] = useState('')
    const [rangeToUpdate, setRangeToUpdate] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        API.range.getRanges()
            .then(res => setRanges(res.data.ranges))
            .catch(err => console.error(err))
            .finally(() => setIsDataLoaded(true))
    }, [])

    useEffect(() => {
        if (idToUpdate) {
            API.range.getRange(idToUpdate)
                .then(res => setRangeToUpdate(res.data.oneRange))
                .catch(err => console.error(err))
        }
    }, [idToUpdate])

    if (!isDataLoaded) {
        return <Loading />
    }
    const handleRangeChange = (e) => {
        setIdToUpdate(e.target.value);
    }

    const handleChangeForm = (e) => {
        setRangeToUpdate({ ...rangeToUpdate, [e.target.name]: e.target.value })
    }

    const handleSubmitRangeUpdated = (e) => {
        e.preventDefault()
        delete rangeToUpdate.created_at
        delete rangeToUpdate.updated_at
        delete rangeToUpdate.techSheets

        API.range.update(user.token, idToUpdate, rangeToUpdate)
            .then(res => {
                alert('Gamme modifiée')
                navigate('/products')
            })
            .catch(err => console.error(err))
    }

    return (
        <main className='update-range'>
            <DashboardComponent />
            <h2>Modifier une gamme de produit</h2>
            <select name="range" id="range" defaultValue="none" onChange={handleRangeChange}>
                <option value="none" disabled>Choisissez la gamme à modifier</option>
                {ranges.map(range => <option key={range.id} value={range.id}>{range.name}</option>)}
            </select>

            {rangeToUpdate && (
                <form onSubmit={handleSubmitRangeUpdated}>
                    {Object.keys(rangeToUpdate).map(key => {
                        if (key !== 'id' && key !== 'description' && key !== 'created_at' && key !== 'updated_at' && key !== 'techSheets') {
                            return (
                                <div className="update-range-input-container" key={key}>
                                    <label htmlFor={key}>{key}</label>
                                    <input type="text" name={key} id={key} value={rangeToUpdate[key]} onChange={handleChangeForm} />
                                </div>
                            )
                        }
                        if (key === 'description') {
                            return (
                                <div className="update-range-input-container" key={key}>
                                    <label htmlFor={key}>{key}</label>
                                    <textarea cols={40} rows={8} type="text" name={key} id={key} value={rangeToUpdate[key]} onChange={handleChangeForm} />
                                </div>
                            )
                        }
                        return null;
                    })}
                    <button type='submit'>Valider les modifications</button>
                </form>
            )}
        </main>
    )
}