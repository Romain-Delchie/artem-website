import SearchProduct from '../../components/SearchProduct/SearchProduct'
import './NewQuote.scss'

export default function NewQuote() {
    return (
        <div className='new-quote'>
            <h2>Nouveau devis</h2>
            <SearchProduct />
        </div>
    )
}