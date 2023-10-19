import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import API from '../../utils/api/api';
import Loading from '../../components/Loading/Loading';
import './ForgotPassword.scss'

export default function Forgotpassword() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    function handleChange(event) {
        setEmail(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
        }, 1000);
        API.email.forgotPassword({ email: email }).then((response) => {
            navigate('/signin', { replace: true });
            setIsLoading(false);
            alert("Un email vous a été envoyé afin de réinitialiser votre mot de passe.");
        }).catch((error) => {
            console.error(error);
            setIsLoading(false);
            alert("votre email ne correspond pas à aucun compte actif, veuillez réessayer ou créer un compte.");
        })
    }

    if (isLoading) {
        return <Loading />
    }

    return (
        <main className="forgot-password">
            <div className="forgot-password-container">
                <h1>Mot de passe oublié</h1>
                <form className="forgot-password-form" onSubmit={handleSubmit}>
                    <p>Entrez votre adresse email afin de recevoir un lien de réinitialisation</p>
                    <input className="forgot-password-form-input" type="email" placeholder="Email" onChange={handleChange} />
                    <button className="forgot-password-form-button">Envoyer</button>
                </form>
            </div>
        </main>
    )
}