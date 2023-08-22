import { Link } from 'react-router-dom'
import './Products.scss'
import { useState, useEffect, useContext } from 'react'
import AppContext from '../../context/AppContext'
import API from '../../utils/api/api'

export default function Products() {
    const { ranges, setRanges } = useContext(AppContext)
    useEffect(() => {
        API.range.getRanges()
            .then(res => setRanges(res.data.ranges))
            .catch(err => console.log(err))
    }, [])

    return (
        <main className='products'>
            <h2>Notre Gamme</h2>
            <section className='products-section products-section-textile'>
                <h3>TEXTILE</h3>

                <ul className="products-section-list">
                    {
                        ranges.filter(range => range.category === 'textile').map(range => {
                            return (

                                <li className="products-section-list-item" key={range.id}>
                                    <Link className='products-section-list-item-link' to={`/range/${range.id}`}><img src={`/images/products/${range.image_link}`} alt={`photo de ${range.name}`} /><p>{range.name}</p></Link>
                                </li>
                            )
                        })
                    }
                </ul>
            </section>
            <section className='products-section products-section-meca'>
                <h3>MECA</h3>
                <ul className="products-section-list">
                    {
                        ranges.filter(range => range.category === 'meca').map(range => {
                            return (

                                <li className="products-section-list-item" key={range.id}>
                                    <Link className='products-section-list-item-link' to={`/range/${range.id}`}><img src={`/images/products/${range.image_link}`} alt={`photo de ${range.name}`} /><p>{range.name}</p></Link>
                                </li>
                            )
                        })
                    }
                </ul>

            </section>

        </main>
    )
}