import { Link } from 'react-router-dom';
import { useState } from 'react';
import './NavBar.scss';

export default function NavBar() {
    const [isBurgerOpen, setIsBurgerOpen] = useState(false);
    return (
        <div className='navbar'>
            <div className='navbar-logo'>
                <Link to="/"><img className='navbar-logo' src="/images/logoCarre.jpg" alt="logo artem" /></Link>
            </div>
            <ul className={`navbar-links ${isBurgerOpen ? "show-navbar" : "hide-navbar"}`}>
                <li>
                    <Link className='navbar-link' to="/">Nos produits</Link>
                </li>
                <li>
                    <Link className='navbar-link' to="/">Payer une facture</Link>
                </li>
                <li>
                    <Link className='navbar-link' to="/">Contact</Link>
                </li>
                <li>
                    <Link className='navbar-link' to="/test">test</Link>
                </li>
            </ul>
            <button onClick={() => setIsBurgerOpen(!isBurgerOpen)} className='navbar-burger'>
                <span className='burger-line'></span>
            </button>
        </div >
    )
}