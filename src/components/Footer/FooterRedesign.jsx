import { Link } from 'react-router-dom';
import artem from '/data/artem-data';
import './FooterRedesign.scss';

/**
 * Proposition de pied de page, affichée aux seuls administrateurs
 * (voir Layout.jsx), en accord avec l'en-tête et les pages refondues.
 *
 * Il porte exactement ce que porte le pied de page actuel — les trois liens
 * légaux, le téléphone et le courriel — et rien de plus : un pied de page de
 * site vitrine n'a pas à occuper un écran. Ce qui change est la forme : une
 * seule bande fine dans le bleu de la barre utilitaire de l'en-tête, au lieu
 * du bloc de 130 px découpé en biais, qui ne se raccordait à rien.
 */

const LEGAL_LINKS = [
    { to: '/mentions-legales', label: 'Mentions légales' },
    { to: '/cgv', label: 'Conditions générales de vente' },
    { to: '/politique-confidentialite', label: 'Politique de confidentialité' },
];

function Icon({ name }) {
    const paths = {
        phone: 'M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293a.75.75 0 0 1-.83.286 12.035 12.035 0 0 1-7.143-7.143.75.75 0 0 1 .286-.83l1.293-.97c.363-.271.527-.734.417-1.173L6.826 3.11A1.125 1.125 0 0 0 5.735 2.25H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z',
        mail: 'M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75',
    };
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
            strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d={paths[name]} />
        </svg>
    );
}

export default function FooterRedesign() {
    return (
        <footer className="ftr">
            <div className="ftr-inner">
                <ul className="ftr-legal">
                    {LEGAL_LINKS.map((link) => (
                        <li key={link.to}>
                            <Link className="ftr-link" to={link.to}>{link.label}</Link>
                        </li>
                    ))}
                </ul>

                <ul className="ftr-contact">
                    <li>
                        <a className="ftr-link" href={`tel:${artem.tel.replace(/\s/g, '')}`}>
                            <Icon name="phone" />
                            {artem.tel}
                        </a>
                    </li>
                    <li>
                        <a className="ftr-link" href={`mailto:${artem.email}`}>
                            <Icon name="mail" />
                            {artem.email}
                        </a>
                    </li>
                </ul>
            </div>
        </footer>
    );
}
