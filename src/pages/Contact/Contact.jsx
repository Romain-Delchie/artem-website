import './Contact.scss'
import artem from '/data/artem-data'
import { Link } from 'react-router-dom'

export default function Contact() {
    return (
        <main className='contact'>
            <h1>Contact</h1>
            <div className="contact-container">
                <div className="contact-item contact-item-adress">
                    <h2>Adresse</h2>
                    <p>16 rue de Berlin</p>
                    <p>77144 Montévrain</p>
                </div>
                <div className="contact-item contact-item-open">
                    <h2>Horaires d'ouverture</h2>
                    <p>du lundi au vendredi 9h-13h 14h-18h</p>
                    <p>Ouvert toute l'année</p>
                </div>
                <div className="contact-item contact-item-phone">
                    <h2>Téléphone</h2>
                    <Link to={`tel:${artem.tel}`}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75v-4.5m0 4.5h4.5m-4.5 0l6-6m-3 18c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 014.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 00-.38 1.21 12.035 12.035 0 007.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 011.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 01-2.25 2.25h-2.25z" />
                    </svg>{artem.tel}</Link>
                    <h2>Email</h2>
                    <Link to={`mailto:${artem.email}`}> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25" />
                    </svg>{artem.email}</Link>
                </div>
            </div>
        </main>
    )
}