import { useContext } from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import HeaderRedesign from "../Header/HeaderRedesign";
import AppContext from "../../context/AppContext";
import './Layout.scss';

export default function Layout({ children }) {
    const { user } = useContext(AppContext);

    // Proposition d'en-tête soumise à validation : seul un administrateur
    // connecté la voit, sur l'ensemble du site. Les visiteurs, le pré-rendu et
    // les moteurs de recherche reçoivent l'en-tête en production.
    const isAdmin = user.role === 'admin';

    return (
        <>
            {isAdmin ? <HeaderRedesign /> : <Header />}
            {children}
            <Footer />
        </>
    )
}
