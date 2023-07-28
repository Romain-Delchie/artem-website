import NavBar from '../NavBar/NavBar'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import AppContext from '../../context/AppContext'
import './Header.scss'

export default function Header() {
    const { user, updateUser } = useContext(AppContext);

    function handleDisconnection() {
        updateUser({ token: "", email: "", firstname: "", lastname: "" });
    }

    return (
        <header className='header'>
            <NavBar />
            <div className='header-connection'>
                <div className='header-title-container'>
                    <h1 className='header-title'>ARTEM</h1>
                    <h2 className='header-subtitle'>Les supports d'avenir pour la pâte traditionnelle</h2>
                </div>

                {user.token === '' &&
                    <Link to='/signin' className='header-connection-btn'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg><p>Se connecter</p>
                    </Link>

                }
                {user.token !== '' &&
                    <Link to='/' className='header-disconnection-btn' onClick={handleDisconnection}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                        <p>Me déconnecter</p>
                    </Link>

                }

            </div>
        </header>
    )
}