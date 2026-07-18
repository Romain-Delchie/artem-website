import React from 'react'
import SearchProduct from '../../components/SearchProduct/SearchProduct'
import DashboardComponent from '../../components/Dashboard/DashboardComponent'
import '../SearchProductPage/SearchProductPage.scss'

export default function SearchUpdate() {
    const location = window.location.pathname;
    const title = location === '/update-product' ? 'Modifier un produit' : 'supprimer un produit'
    return (
        <main className='search-product-page'>
            <DashboardComponent />
            <div className="search-product-page-container">
                <SearchProduct />
            </div>
        </main>
    )
}
