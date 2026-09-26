import { useContext } from 'react'
import { Link } from 'react-router-dom'
import AppContext from '../context/AppContext'
import { rangePath, slugify } from '../utils/seo/slugify'
import { getRangeSeo } from '/data/seo'

export default function RangeCard({ range }) {
    const { user } = useContext(AppContext);
    // Même règle que sur la page gamme : un administrateur connecté voit les
    // textes en attente de validation, le reste du monde non.
    const seo = getRangeSeo(slugify(range.name), { includePending: user.role === 'admin' });
    const alt = seo.imageAlt || `${range.name} ARTEM pour la boulangerie`;

    return (
        <li className="products-section-list-item">
            <Link className='products-section-list-item-link' to={rangePath(range)}>
                <img
                    src={`/images/products/${range.image_link}`}
                    alt={alt}
                    width="350"
                    height="100"
                    loading="lazy"
                />
                <p>{range.name}</p>
            </Link>
        </li>
    )
}
