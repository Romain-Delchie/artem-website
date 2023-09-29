import { Navigate } from 'react-router-dom';
import API from '../../utils/api/api';
import './ForgotPassword.scss'

export default function Forgotpassword() {

    const [email, setEmail] = useState('');

    function handleChange(event) {
        setEmail(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        API.auth.forgotPassword(email).then((response) => {
            alert("Un email vous a été envoyé afin de réinitialiser votre mot de passe.");
        }).finally(() => {
            Navigate('/home', { replace: true });
        });
    }



    return (
        <main className="forgot-password">
            <h1>Mot de passe oublié</h1>
            <p>Entrez votre adresse email afin de recevoir un lien de réinitialisation</p>
            <form className="forgot-password-form" onSubmit={handleSubmit}>
                <input className="forgot-password-form-input" type="email" placeholder="Email" onChange={handleChange} />
                <button className="forgot-password-form-button">Envoyer</button>
            </form>
        </main>
    )
}