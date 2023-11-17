import { Link } from 'react-router-dom';
import { useContext } from 'react'
import AppContext from '../../context/AppContext'
import './QuoteHistory.scss'
import DashboardComponent from '../../components/Dashboard/DashboardComponent';

export default function QuoteHistory() {
    const { user } = useContext(AppContext);
    return (
        <main className='quote-history'>
            <DashboardComponent />
            <h2 className='quote-history-title'>Liste des devis en cours</h2>
            <ul className='quote-history-container'>
                {user.quotations && user.quotations.length === 0 &&
                    <div className="quote-history-empty">
                        <p>Vous n'avez pas encore de devis en cours</p>
                        <Link to='/new-quote'>Cliquer ici pour créer votre premier devis</Link>
                    </div>
                }
                {user.quotations && user.quotations.map((quotation, index) => (

                    <li key={index} className='quote-item'>
                        <h3>Devis n°{quotation.quotation_id}</h3>
                        <p>Reference : {quotation.reference}</p>
                        <p>Créé le : {quotation.creation_date}</p>
                        <ul className='quote-history-product-list'>Liste des produits :
                            {quotation.products && quotation.products.slice(0, 4).map((product, index) => (
                                <li key={index}>
                                    <p>{product.quantity}x</p>
                                    <p>{product.reference}</p>
                                </li>
                            ))}
                            {quotation.products && quotation.products.length > 4 && <li className='more-product' key="more"><p>etc...</p></li>}
                            {quotation.products === null && <p>Pas encore d'article dans ce devis</p>}
                        </ul>
                        <Link className='quote-item-btn' to={`/quote-history/${quotation.quotation_id}`}>
                            Cliquez pour voir le contenu du devis
                        </Link>
                    </li>
                ))
                }
            </ul>
        </main>
    )
}