import { useContext } from "react";
import Footer from "../Footer/Footer";
import FooterRedesign from "../Footer/FooterRedesign";
import Header from "../Header/Header";
import HeaderRedesign from "../Header/HeaderRedesign";
import AppContext from "../../context/AppContext";
import './Layout.scss';

export default function Layout({ children }) {
    const { user } = useContext(AppContext);

    // Propositions d'en-tête et de pied de page soumises à validation : seul un
    // administrateur connecté les voit, sur l'ensemble du site. Les visiteurs,
    // le pré-rendu et les moteurs de recherche reçoivent celles en production.
    const isAdmin = user.role === 'admin';

    return (
        <>
            {isAdmin ? <HeaderRedesign /> : <Header />}
            {children}
            {isAdmin ? <FooterRedesign /> : <Footer />}
        </>
    )
}
