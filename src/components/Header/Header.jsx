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
                    <>
                        <Link to='/dashboard' className='header-connection-btn'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                        </svg>
                            <p>Tableau de bord</p>
                        </Link>
                        <Link to='/' className='header-disconnection-btn' onClick={handleDisconnection}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                            <p>Me déconnecter</p>
                        </Link>
                    </>

                }

            </div>
        </header>
    )
}