import { Link } from 'react-router-dom'
import './Products.scss'

export default function Products() {
    return (
        <main className='products'>
            <h2>Notre Gamme</h2>
            <section className='products-section'>
                <h3>le textile</h3>

                <ul className="products-section-list">
                    <li className="products-section-list-item">
                        <Link className='products-section-list-item-link' to='/oven-canvas'>Toile enfourneur</Link>
                        <Link className='products-section-list-item-link' to='/dough-prover-canvas'>Toile de repose pâton</Link>
                        <Link className='products-section-list-item-link' to='/linen-canvas'>Toile de couche</Link>

                    </li>
                </ul>
            </section>
            <section className='products-section'>
                <h3>La méca</h3>

            </section>

        </main>
    )
}