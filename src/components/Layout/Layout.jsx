import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";
import './Layout.scss';

export default function Layout({ children }) {
    return (
        <>
            <NavBar />
            <main>{children}</main>
            <Footer />
        </>
    )
}