import { Link } from 'react-router-dom'
import './Products.scss'
import { useState, useEffect, useContext } from 'react'
import AppContext from '../../context/AppContext'
import Loading from '../../components/Loading/Loading'
import API from '../../utils/api/api'
import RangeCard from '../../components/RangeCard'

export default function Products() {
    const { ranges, setRanges } = useContext(AppContext)
    const [isOpen, setIsOpen] = useState({ artisanal: false, industriel: false, autre: false, textile: false, bande: false, meca: false, service: false, feutre: false, chocolat: false })
    const [isDataLoaded, setIsDataLoaded] = useState(false)

    useEffect(() => {
        API.range.getRanges()
            .then(res => setRanges(res.data.ranges))
            .catch(err => console.error(err))
            .finally(() => setIsDataLoaded(true))
    }, [])

    if (!isDataLoaded) {
        return <Loading />
    }

    return (
        <main className='products'>
            <h1>LA GAMME ARTEM</h1>
            <div onClick={() => setIsOpen({ ...isOpen, artisanal: !isOpen.artisanal })} className='products-range-title'>
                {
                    !isOpen.artisanal &&
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5" />
                    </svg>
                }
                {
                    isOpen.artisanal &&
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5" />
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
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                </svg>
                            }
                            {
                                isOpen.textile &&
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                                </svg>
                            }
                            <h3>TEXTILES ET FEUTRES</h3>
                        </div>
                        {isOpen.textile &&
                            <ul className="products-section-list">
                                {
                                    ranges.filter(range => range.category === 'textile').map(range => <RangeCard key={range.id} range={range} />)
                                }
                            </ul>
                        }
                    </section>

                    {/* BANDE */}

                    <section className='products-section products-section-bande'>
                        <div onClick={() => setIsOpen({ ...isOpen, bande: !isOpen.bande })} className="products-section-title">
                            {
                                !isOpen.bande &&
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                </svg>
                            }
                            {
                                isOpen.bande &&
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                                </svg>
                            }
                            <h3>BANDES TRANSPORTEUSES</h3>
                        </div>
                        {isOpen.bande &&
                            <ul className="products-section-list">
                                {
                                    ranges.filter(range => range.category === 'bande').map(range => <RangeCard key={range.id} range={range} />)
                                }
                            </ul>
                        }
                    </section>
                    {/* Produits inox */}

                    <section className='products-section products-section-inox'>
                        <div onClick={() => setIsOpen({ ...isOpen, inox: !isOpen.inox })} className="products-section-title">
                            {
                                !isOpen.inox &&
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                </svg>
                            }
                            {
                                isOpen.inox &&
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                                </svg>
                            }
                            <h3>AUTRES PRODUITS INOX</h3>
                        </div>
                        {isOpen.inox &&
                            <ul className="products-section-list">
                                {
                                    ranges.filter(range => range.category === 'inox').map(range => <RangeCard key={range.id} range={range} />)
                                }
                            </ul>
                        }
                    </section>

                    {/* MECA */}

                    <section className='products-section products-section-meca'>
                        <div onClick={() => setIsOpen({ ...isOpen, meca: !isOpen.meca })} className="products-section-title">
                            {
                                !isOpen.meca &&
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                </svg>
                            }
                            {
                                isOpen.meca &&
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                                </svg>
                            }
                            <h3>ELEVATEUR - ENFOURNEUR</h3>
                        </div>
                        {
                            isOpen.meca &&
                            <ul className="products-section-list">
                                {
                                    ranges.filter(range => range.category === 'meca').map(range => <RangeCard key={range.id} range={range} />)
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
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5" />
                    </svg>
                }
                {
                    isOpen.industriel &&
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5" />
                    </svg>

                }

                <h2>Notre Gamme boulangerie industrielle</h2>
            </div>
            {isOpen.industriel &&

                <section className='products-section products-section-meca'>
                    <ul className="products-section-list">
                        {
                            ranges.filter(range => range.category === 'indus' || range.name === "Tapis de laminoir" || range.name === "Bande Façonnage").map(range => <RangeCard key={range.id} range={range} />)
                        }
                    </ul>

                </section>
            }

            {/* GAMME AUTRE SECTEUR */}

            <div onClick={() => setIsOpen({ ...isOpen, autre: !isOpen.autre })} className='products-range-title'>
                {
                    !isOpen.autre &&
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5" />
                    </svg>
                }
                {
                    isOpen.autre &&
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5" />
                    </svg>

                }
                <h2>Notre Gamme bande transporteuse tout secteur</h2>

            </div>
            {
                isOpen.autre &&
                <section className='products-section products-section-textile'>
                    <ul className="products-section-list">
                        {
                            ranges.filter(range => range.category === 'autre').map(range => <RangeCard key={range.id} range={range} />)
                        }
                    </ul>

                </section>
            }
            {/* GAMME Feutre indus */}

            <div onClick={() => setIsOpen({ ...isOpen, feutre: !isOpen.feutre })} className='products-range-title'>
                {
                    !isOpen.feutre &&
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5" />
                    </svg>
                }
                {
                    isOpen.feutre &&
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5" />
                    </svg>

                }
                <h2>Notre gamme feutre industriel</h2>

            </div>
            {
                isOpen.feutre &&
                <section className='products-section products-section-textile'>
                    <ul className="products-section-list">
                        {
                            ranges.filter(range => range.category === 'feutre').map(range => <RangeCard key={range.id} range={range} />)
                        }
                    </ul>

                </section>
            }
            {/* GAMME chocolaterie */}

            <div onClick={() => setIsOpen({ ...isOpen, chocolat: !isOpen.chocolat })} className='products-range-title'>
                {
                    !isOpen.chocolat &&
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5" />
                    </svg>
                }
                {
                    isOpen.chocolat &&
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5" />
                    </svg>

                }
                <h2>Notre gamme bande de Chocolaterie/Biscuiterie</h2>

            </div>
            {
                isOpen.chocolat &&
                <section className='products-section products-section-textile'>
                    <ul className="products-section-list">
                        {
                            ranges.filter(range => range.category === 'chocolat').map(range => <RangeCard key={range.id} range={range} />)
                        }
                    </ul>

                </section>
            }
            {/* GAMME SERVICE */}

            <div onClick={() => setIsOpen({ ...isOpen, service: !isOpen.service })} className='products-range-title'>
                {
                    !isOpen.service &&
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5" />
                    </svg>
                }
                {
                    isOpen.service &&
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5" />
                    </svg>

                }
                <h2>Nos services</h2>

            </div>
            <section className='products-section products-section-textile'>

                {
                    isOpen.service &&
                    <ul className="products-section-list">
                        {
                            ranges.filter(range => range.category === 'service').map(range => <RangeCard key={range.id} range={range} />)
                        }
                    </ul>
                }

            </section>
        </main>
    )
}