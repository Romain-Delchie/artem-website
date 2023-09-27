import { Link } from 'react-router-dom'
import './Products.scss'
import { useState, useEffect, useContext } from 'react'
import AppContext from '../../context/AppContext'
import API from '../../utils/api/api'

export default function Products() {
    const { ranges, setRanges } = useContext(AppContext)
    const [isOpen, setIsOpen] = useState({ artisanal: false, industriel: false, autre: false, textile: false, bande: false, meca: false, service: false })

    useEffect(() => {
        API.range.getRanges()
            .then(res => setRanges(res.data.ranges))
            .catch(err => console.log(err))
    }, [])

    return (
        <main className='products'>
            <div onClick={() => setIsOpen({ ...isOpen, artisanal: !isOpen.artisanal })} className='products-range-title'>
                {
                    !isOpen.artisanal &&
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5" />
                    </svg>
                }
                {
                    isOpen.artisanal &&
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5" />
                    </svg>

                }

                <h2>Notre Gamme boulangerie artisanale</h2>
            </div>
            {isOpen.artisanal &&
                <>
                    <section className='products-section products-section-textile'>
                        <div onClick={() => setIsOpen({ ...isOpen, textile: !isOpen.textile })} className="products-section-title">
                            {
                                !isOpen.textile &&
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                </svg>
                            }
                            {
                                isOpen.textile &&
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                                </svg>
                            }
                            <h3>TEXTILES ET FEUTRES</h3>
                        </div>
                        {isOpen.textile &&
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
                        }
                    </section>

                    {/* BANDE */}

                    <section className='products-section products-section-bande'>
                        <div onClick={() => setIsOpen({ ...isOpen, bande: !isOpen.bande })} className="products-section-title">
                            {
                                !isOpen.bande &&
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                </svg>
                            }
                            {
                                isOpen.bande &&
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                                </svg>
                            }
                            <h3>BANDES TRANSPORTEUSES</h3>
                        </div>
                        {isOpen.bande &&
                            <ul className="products-section-list">
                                {
                                    ranges.filter(range => range.category === 'bande').map(range => {
                                        return (

                                            <li className="products-section-list-item" key={range.id}>
                                                <Link className='products-section-list-item-link' to={`/range/${range.id}`}><img src={`/images/products/${range.image_link}`} alt={`photo de ${range.name}`} /><p>{range.name}</p></Link>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        }
                    </section>

                    {/* MECA */}

                    <section className='products-section products-section-meca'>
                        <div onClick={() => setIsOpen({ ...isOpen, meca: !isOpen.meca })} className="products-section-title">
                            {
                                !isOpen.meca &&
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                </svg>
                            }
                            {
                                isOpen.meca &&
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                                </svg>
                            }
                            <h3>MECA</h3>
                        </div>
                        {
                            isOpen.meca &&
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
                        }

                    </section>
                </>
            }
            {/* GAMME INDUSTRIELLE */}
            <div onClick={() => setIsOpen({ ...isOpen, industriel: !isOpen.industriel })} className='products-range-title'>
                {
                    !isOpen.industriel &&
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5" />
                    </svg>
                }
                {
                    isOpen.industriel &&
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5" />
                    </svg>

                }

                <h2>Notre Gamme boulangerie industrielle</h2>
            </div>
            {isOpen.industriel &&

                <section className='products-section products-section-meca'>
                    <ul className="products-section-list">
                        {
                            ranges.filter(range => range.category === 'indus').map(range => {
                                return (

                                    <li className="products-section-list-item" key={range.id}>
                                        <Link className='products-section-list-item-link' to={`/range/${range.id}`}><img src={`/images/products/${range.image_link}`} alt={`photo de ${range.name}`} /><p>{range.name}</p></Link>
                                    </li>
                                )
                            })
                        }
                    </ul>

                </section>
            }

            {/* GAMME AUTRE SECTEUR */}

            <div onClick={() => setIsOpen({ ...isOpen, autre: !isOpen.autre })} className='products-range-title'>
                {
                    !isOpen.autre &&
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5" />
                    </svg>
                }
                {
                    isOpen.autre &&
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5" />
                    </svg>

                }
                <h2>Notre Gamme autre secteur</h2>

            </div>
            {
                isOpen.autre &&
                <section className='products-section products-section-textile'>
                    <ul className="products-section-list">
                        {
                            ranges.filter(range => range.category === 'autre').map(range => {
                                return (

                                    <li className="products-section-list-item" key={range.id}>
                                        <Link className='products-section-list-item-link' to={`/range/${range.id}`}><img src={`/images/products/${range.image_link}`} alt={`photo de ${range.name}`} /><p>{range.name}</p></Link>
                                    </li>
                                )
                            })
                        }
                    </ul>

                </section>
            }
            {/* GAMME SERVICE */}

            <div onClick={() => setIsOpen({ ...isOpen, service: !isOpen.service })} className='products-range-title'>
                {
                    !isOpen.service &&
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5" />
                    </svg>
                }
                {
                    isOpen.service &&
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5" />
                    </svg>

                }
                <h2>Nos services</h2>

            </div>
            <section className='products-section products-section-textile'>

                {
                    isOpen.service &&
                    <ul className="products-section-list">
                        {
                            ranges.filter(range => range.category === 'service').map(range => {
                                return (

                                    <li className="products-section-list-item" key={range.id}>
                                        <Link className='products-section-list-item-link' to={`/range/${range.id}`}><img src={`/images/products/${range.image_link}`} alt={`photo de ${range.name}`} /><p>{range.name}</p></Link>
                                    </li>
                                )
                            })
                        }
                    </ul>
                }

            </section>
        </main>
    )
}