import React from 'react'
import SearchProduct from '../../components/SearchProduct/SearchProduct'
import DashboardComponent from '../../components/Dashboard/DashboardComponent'
import './SearchProductPage.scss'

export default function SearchProductPage() {
    return (
        <main className='search-product-page'>
            <DashboardComponent />
            <div className="search-product-page-container">
                <SearchProduct />
            </div>
        </main>
    )
}
