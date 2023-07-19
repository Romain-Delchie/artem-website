import { Link } from 'react-router-dom';
import { useState } from 'react';
import './NavBar.scss';

export default function NavBar() {
    const [isBurgerOpen, setIsBurgerOpen] = useState(false);
    return (
        <nav className='navbar'>
            <div className='navbar-logo'>
                <Link to="/"><img className='navbar-logo' src="/images/logoCarre.jpg" alt="logo artem" /></Link>
            </div>
            <ul className={`navbar-links ${isBurgerOpen ? "show-navbar" : "hide-navbar"}`}>
                <li className='navbar-item slideInDown1'>
                    <Link className='navbar-link' to="/">Se connecter</Link>
                </li>
                <li className='navbar-item slideInDown1'>
                    <Link className='navbar-link' to="/">Créer un compte</Link>
                </li>
                <li className='navbar-item slideInDown2'>
                    <Link className='navbar-link' to="/">Nos produits</Link>
                </li>
                <li className='navbar-item slideInDown2'>
                    <Link className='navbar-link' to="/">Payer une facture</Link>
                </li>
                <li className='navbar-item slideInDown3'>
                    <Link className='navbar-link' to="/">Contact</Link>
                </li>
                <li className='navbar-item slideInDown4'>
                    <Link className='navbar-link' to="/test">test</Link>
                </li>
            </ul>
            <button onClick={() => setIsBurgerOpen(!isBurgerOpen)} className='navbar-burger'>
                <span className='burger-line'></span>
            </button>
            <h2 className='navbar-presentation'>Fabricant de textiles techniques et machines d'enfounement pour la boulangerie</h2>
        </nav >
    )
}