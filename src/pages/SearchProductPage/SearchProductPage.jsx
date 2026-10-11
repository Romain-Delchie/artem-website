import SearchProductRedesign from '../../components/SearchProduct/SearchProductRedesign'
import DashboardComponent from '../../components/Dashboard/DashboardComponent'
import './SearchProductPage.scss'

/**
 * Page « Les produits ARTEM », servie à tout utilisateur connecté.
 *
 * La recherche refondue était d'abord réservée à l'administrateur, le temps de
 * la faire valider ; elle est maintenant la même pour tout le monde — client
 * comme administrateur voient la même page, aux filtres près : l'alternance
 * entre produits actifs et inactifs reste propre à l'administration.
 *
 * Les autres pages qui emploient la recherche produit — historique de devis,
 * modification et suppression d'un produit — gardent l'interface actuelle :
 * elles relèvent d'autres parcours, qui n'ont pas été revus.
 */
export default function SearchProductPage() {
    return (
        <main className="search-product-page search-product-page--new">
            <DashboardComponent />
            <div className="search-product-page-container">
                <SearchProductRedesign />
            </div>
        </main>
    )
}
