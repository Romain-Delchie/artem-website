import NavBar from '../NavBar/NavBar'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import AppContext from '../../context/AppContext'
import './Header.scss'

export default function Header() {
    const { user, updateUser } = useContext(AppContext);
    const location = useLocation();
    const navigate = useNavigate();
    const [hasScrolled, setHasScrolled] = useState(false);

    useEffect(() => {
        // Écoute de l'événement de défilement et met à jour l'état hasScrolled
        const handleScroll = () => {
            if (!hasScrolled && window.scrollY > 100) {
                setHasScrolled(true);
            } else if (hasScrolled && window.scrollY === 0) {
                setHasScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        // Nettoie l'écouteur d'événement lors du démontage du composant
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [hasScrolled]);

    function handleDisconnection() {
        updateUser({ token: "", email: "", firstname: "", lastname: "" });
    }


    const handleGoBack = () => {
        navigate(-1);

    };

    return (
        <header className={hasScrolled ? 'header header-scrolled' : 'header'}>
            <NavBar />
            <div className='header-connection'>
                <div className='header-title-container'>
                    <h1 className='header-title'>ARTEM</h1>
                    <h2 className='header-subtitle'>Les supports d'avenir pour la pâte traditionnelle</h2>
                </div>



            </div>
            {
                location.pathname !== '/' && location.pathname !== '/dashboard' &&
                <button onClick={handleGoBack} className='back-btn'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                    </svg></button>
            }
        </header>
    )
}