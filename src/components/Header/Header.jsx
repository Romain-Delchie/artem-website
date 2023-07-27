import NavBar from '../NavBar/NavBar'
import { Link } from 'react-router-dom'
import './Header.scss'

export default function Header() {
    return (
        <header className='header'>
            <NavBar />
            <div className='header-connection'>
                <div className='header-title-container'>
                    <h1 className='header-title'>ARTEM</h1>
                    <h2 className='header-subtitle'>Les supports d'avenir pour la pâte traditionnelle</h2>
                </div>


                <Link to='/signin' className='header-connection-btn'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg><p>Se connecter</p>
                </Link>
            </div>
        </header>
    )
}