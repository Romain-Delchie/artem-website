import React from 'react'
import { Link } from 'react-router-dom'

export default function RangeCard({ range }) {
    return (
        <li className="products-section-list-item" key={range.id}>
            <Link className='products-section-list-item-link' to={`/gamme/${range.id}`}><img src={`/images/products/${range.image_link}`} alt={`photo de ${range.name}`} /><p>{range.name}</p></Link>
        </li>
    )
}
