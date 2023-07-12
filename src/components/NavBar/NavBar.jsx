import { Link } from 'react-router-dom';
import './NavBar.scss';

export default function NavBar() {
    return (
        <div className='navbar'>
            <Link to="/">Home</Link>
            <Link to="/test">test</Link>
        </div>
    )
}