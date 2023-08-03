import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import './Layout.scss';

export default function Layout({ children }) {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    )
}