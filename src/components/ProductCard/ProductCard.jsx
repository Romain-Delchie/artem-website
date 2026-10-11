import './ProductCard.scss';
import { useContext } from 'react';
import AppContext from '../../context/AppContext';
import Price from '../Price/Price';
import ProductCardRedesign from './ProductCardRedesign';


export default function ProductCard({ product }) {
    const { user } = useContext(AppContext);

    // Proposition de refonte soumise à validation : seul un administrateur
    // connecté la voit. Tous les autres utilisateurs reçoivent la carte
    // actuelle, inchangée, sur toutes les pages qui l’emploient.
    // L'ajout au devis passe désormais par la carte refondue (voir
    // SearchProductRedesign en mode devis) : cette carte n'a plus que
    // l'affichage.
    if (user.role === 'admin') {
        return <ProductCardRedesign product={product} />;
    }

    return (
        <div className="product-card" >
            <div className='product-card-container'>
                <div className="product-card-image">
                    <img src={`/images/products/${product.image_link}`} alt={product.description} />
                </div>
                <div className="product-card-description">
                    {
                        product.brand?.toLowerCase() !== 'artem' &&
                        <h3>Adaptable {product.brand}</h3>
                    }
                    <h3>{product.description}</h3>
                    <p>Ref: {product.reference}</p>
                    <p>Délai: {product.delivery_time.startsWith('0') ? 'en stock' : product.delivery_time}</p>
                    {user.profile_id !== 3 &&
                        <Price product={product} />
                    }
                </div>
            </div>
        </div >
    )
}
