import { Link } from 'react-router-dom';
import { useState, useContext } from 'react';
import AppContext from '../../context/AppContext';
import './NavBar.scss';

export default function NavBar() {
    const { user, updateUser } = useContext(AppContext);
    const [isBurgerOpen, setIsBurgerOpen] = useState(false);

    function handleDisconnection() {
        updateUser({ token: "", email: "", firstname: "", lastname: "" });
        setIsBurgerOpen(false);
    }

    function closeBurger() {
        setIsBurgerOpen(false);
    }

    return (
        <nav className='navbar'>
            <div className='navbar-logo'>
                <Link to="/"><img className='navbar-logo' src="/images/logoCarre.jpg" alt="logo artem" /></Link>
            </div>
            <ul className={`navbar-links ${isBurgerOpen ? "show-navbar" : "hide-navbar"}`}>
                <li className='navbar-item slideInDown1'>
                    <Link onClick={closeBurger} className='navbar-link' to="/home">Page d'accueil</Link>
                </li>
                {user.token === '' &&
                    <>
                        <li className='navbar-item slideInDown2'>
                            <Link onClick={closeBurger} className='navbar-link' to="/connexion">Se connecter</Link>
                        </li>
                        <li className='navbar-item slideInDown2'>
                            <Link onClick={closeBurger} className='navbar-link' to="/creer-un-compte">Créer un compte</Link>
                        </li>
                    </>
                }
                <li className='navbar-item slideInDown3'>
                    <Link onClick={closeBurger} className='navbar-link' to="/entreprise">Notre entreprise</Link>
                </li>
                <li className='navbar-item slideInDown4'>
                    <Link onClick={closeBurger} className='navbar-link' to="/gamme">Nos produits</Link>
                </li>
                <li className='navbar-item slideInDown5'>
                    <Link onClick={closeBurger} className='navbar-link' to='https://pay-pro.monetico.fr/artem/paiementenligne' target='_blank' >Payer une facture</Link>
                </li>
                <li className='navbar-item slideInDown6'>
                    <Link onClick={closeBurger} className='navbar-link' to="/contact">Contact</Link>
                </li>
                <li className='navbar-item slideInDown7'>
                    <Link onClick={handleDisconnection} className='navbar-link' to="/">Déconnexion</Link>
                </li>
            </ul>
            <button onClick={() => setIsBurgerOpen(!isBurgerOpen)} className='navbar-burger'>
                <span className='burger-line'></span>
            </button>
            <p className='navbar-presentation'>Fabricant de textiles techniques et machines d'enfournement pour la boulangerie</p>
        </nav >
    )
}