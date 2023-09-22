import { Link } from 'react-router-dom'
import artem from '/data/artem-data'
import './Footer.scss'

export default function Footer() {

    return (
        <footer className='footer'>
            <ul className='footer-links'>
                <li>
                    <Link className='footer-link' to='/vitrine/legal-terms' >Mentions légales</Link>
                </li>
                <li>
                    <Link className='footer-link' to='/vitrine/terms-of-sales'>Conditions générales de vente</Link>
                </li>
                <li>
                    <Link className='footer-link' to='/vitrine/privacy-policy'>Politique de confidentialité</Link>
                </li>
                <li>
                    <Link className='footer-link'>Plan du site</Link>
                </li>
            </ul>
            <div className='footer-contact'>
                <div className='footer-contact-line'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75v-4.5m0 4.5h4.5m-4.5 0l6-6m-3 18c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 014.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 00-.38 1.21 12.035 12.035 0 007.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 011.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 01-2.25 2.25h-2.25z" />
                </svg>
                    <Link to={`tel:${artem.tel}`}>{artem.tel}</Link>
                </div>
                <div className='footer-contact-line'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25" />
                    </svg>
                    <Link to={`mailto:${artem.email}`}>{artem.email}</Link>
                </div>

            </div>
        </footer>
    )
}