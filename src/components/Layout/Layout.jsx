import NavBar from "../NavBar/NavBar";
import './Layout.scss';

export default function Layout({ children }) {
    return (
        <div>
            <NavBar />
            <main>{children}</main>
        </div>
    )
}