import NavBar from "../NavBar/NavBar";
import './Layout.scss';

export default function Layout({ children }) {
    return (
        <>
            <NavBar />
            <main>{children}</main>
        </>
    )
}