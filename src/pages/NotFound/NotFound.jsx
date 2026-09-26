import { Link } from 'react-router-dom';
import Seo from '../../components/Seo/Seo';
import './NotFound.scss';

/**
 * Page affichée pour toute URL inconnue.
 *
 * Elle remplace l'ancien comportement qui réaffichait l'accueil : renvoyer
 * un contenu valide sur une URL inexistante crée des « soft 404 » que les
 * moteurs de recherche pénalisent. La balise noindex évite en plus que ces
 * URLs erronées ne se retrouvent dans l'index.
 */
export default function NotFound() {
    return (
        <>
            <Seo
                title="Page introuvable"
                description="La page demandée n'existe pas ou n'est plus disponible."
                noindex
            />
            <main className="notfound">
                <h1>Page introuvable</h1>
                <p className="notfound-text">
                    La page que vous cherchez n&apos;existe pas ou n&apos;est plus disponible.
                </p>
                <nav className="notfound-links" aria-label="Pages principales">
                    <Link to="/">Accueil</Link>
                    <Link to="/gamme">Notre gamme</Link>
                    <Link to="/entreprise">Notre entreprise</Link>
                    <Link to="/contact">Nous contacter</Link>
                </nav>
            </main>
        </>
    );
}
