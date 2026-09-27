import { useContext } from 'react'
import SearchProduct from '../../components/SearchProduct/SearchProduct'
import SearchProductRedesign from '../../components/SearchProduct/SearchProductRedesign'
import DashboardComponent from '../../components/Dashboard/DashboardComponent'
import AppContext from '../../context/AppContext'
import './SearchProductPage.scss'

export default function SearchProductPage() {
    const { user } = useContext(AppContext);

    // Proposition de refonte soumise à validation : seul un administrateur
    // connecté la voit. Les autres pages qui emploient la recherche produit
    // (historique de devis, modification, suppression) gardent l'interface
    // actuelle, afin de limiter la portée de la proposition.
    const isAdmin = user.role === 'admin';

    return (
        <main className={`search-product-page${isAdmin ? ' search-product-page--new' : ''}`}>
            <DashboardComponent />
            <div className="search-product-page-container">
                {isAdmin ? <SearchProductRedesign /> : <SearchProduct />}
            </div>
        </main>
    )
}
