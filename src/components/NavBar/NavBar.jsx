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
                    <Link to="/">Nos produits</Link>
                </li>
                <li>
                    <Link to="/">Payer une facture</Link>
                </li>
                <li>
                    <Link to="/">Contact</Link>
                </li>
                <li>
                    <Link to="/test">test</Link>
                </li>
            </ul>
            <button onClick={() => setIsBurgerOpen(!isBurgerOpen)} className='navbar-burger'>
                <span className='burger-line'></span>
            </button>
        </div >
    )
}