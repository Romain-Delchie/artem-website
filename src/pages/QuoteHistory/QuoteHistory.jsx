import { Link } from 'react-router-dom';
import { useContext } from 'react'
import AppContext from '../../context/AppContext'
import './QuoteHistory.scss'

export default function QuoteHistory() {
    const { user } = useContext(AppContext);

    return (
        <div className='quote-history'>
            <h2>Historique de devis</h2>
            <ul>
                {user.quotations.map((quotation, index) => (

                    <li key={index} className='quote-item'>
                        <Link to={`/quote-history/${quotation.quotation_id}`}>
                            <p>Devis n°{quotation.quotation_id}</p>
                            <p>Reference : {quotation.reference}</p>
                            <p>Créé le : {quotation.creation_date}</p>
                        </Link>
                    </li>
                ))
                }
            </ul>
        </div>
    )
}