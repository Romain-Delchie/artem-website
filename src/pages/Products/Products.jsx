import { useState, useEffect, useContext } from 'react'
import AppContext from '../../context/AppContext'
import Loading from '../../components/Loading/Loading'
import API from '../../utils/api/api'
import ProductsRedesign from './ProductsRedesign'

/**
 * Page « Notre gamme ».
 *
 * Elle ne fait plus que charger les gammes et les confier à `ProductsRedesign`,
 * la refonte validée. L'arborescence précédente — bandeaux en dégradé, cartes
 * sur aplat de couleur, accordéons à deux niveaux — a été retirée d'ici ; son
 * remplaçant garde le même regroupement des gammes et la même règle de
 * présence des liens dans le document, indispensable au référencement.
 */
export default function Products() {
    const { ranges, setRanges } = useContext(AppContext)
    const [isDataLoaded, setIsDataLoaded] = useState(false)

    useEffect(() => {
        API.range.getRanges()
            .then(res => setRanges(res.data.ranges))
            .catch(err => console.error(err))
            .finally(() => setIsDataLoaded(true))
    }, [])

    if (!isDataLoaded) {
        return <Loading />
    }

    return <ProductsRedesign ranges={ranges} />
}
