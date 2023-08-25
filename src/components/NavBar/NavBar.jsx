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
    return (
        <nav className='navbar'>
            <div className='navbar-logo'>
                <Link to="/"><img className='navbar-logo' src="/images/logoCarre.jpg" alt="logo artem" /></Link>
            </div>
            <ul className={`navbar-links ${isBurgerOpen ? "show-navbar" : "hide-navbar"}`}>
                <li className='navbar-item slideInDown1'>
                    <Link className='navbar-link' to="/company">Notre entreprise</Link>
                </li>

                <li className='navbar-item slideInDown2'>
                    <Link className='navbar-link' to="/products">Nos produits</Link>
                </li>
                <li className='navbar-item slideInDown2'>
                    <Link className='navbar-link' to='https://pay-pro.monetico.fr/artem/paiementenligne' target='_blank' >Payer une facture</Link>
                </li>
                <li className='navbar-item slideInDown3'>
                    <Link className='navbar-link' to="/contact">Contact</Link>
                </li>

            </ul>
            <button onClick={() => setIsBurgerOpen(!isBurgerOpen)} className='navbar-burger'>
                <span className='burger-line'></span>
            </button>
            <h2 className='navbar-presentation'>Fabricant de textiles techniques et machines d'enfounement pour la boulangerie</h2>
        </nav >
    )
}