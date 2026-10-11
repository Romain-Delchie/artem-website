import Footer from "../Footer/FooterRedesign";
import Header from "../Header/HeaderRedesign";
import './Layout.scss';

/**
 * En-tête et pied de page du site, validés et servis à tout le monde.
 *
 * Les deux ont d'abord été soumis à la direction en n'étant montrés qu'à un
 * administrateur connecté ; la validation étant acquise, le branchement sur le
 * rôle a disparu et les composants d'origine ont été supprimés. Les noms
 * importés ici sont ceux des refontes.
 */
export default function Layout({ children }) {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    )
}
