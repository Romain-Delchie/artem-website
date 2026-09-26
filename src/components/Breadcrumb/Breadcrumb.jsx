import { Link } from 'react-router-dom';
import './Breadcrumb.scss';

/**
 * Fil d'Ariane visible. Le dernier élément représente la page courante
 * et n'est donc pas cliquable.
 *
 * @param {{name: string, path: string}[]} items
 */
export default function Breadcrumb({ items }) {
    return (
        <nav className="breadcrumb" aria-label="Fil d'Ariane">
            <ol className="breadcrumb-list">
                {items.map((item, index) => {
                    const isLast = index === items.length - 1;
                    return (
                        <li className="breadcrumb-list-item" key={item.path}>
                            {isLast ? (
                                <span aria-current="page">{item.name}</span>
                            ) : (
                                <Link to={item.path}>{item.name}</Link>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}
