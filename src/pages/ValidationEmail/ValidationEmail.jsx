import './ValidationEmail.scss'
import { useContext, useState } from 'react';
import AppContext from '../../context/AppContext';
import API from '../../utils/api/api';
import Loading from '../../components/Loading/Loading';

export default function ValidationEmail() {
    const { user, updateUser } = useContext(AppContext);
    const [isSended, setIsSended] = useState(true);
    console.log(user);
    const handleSendEmail = () => {
        setIsSended(false);
        setTimeout(() => {
            setIsSended(true);
            alert("Un email vous a été envoyé afin de finaliser votre inscription.");
            updateUser({ token: "", email: "", firstname: "", lastname: "" });
        }, 1000);
        API.email.sendConfirmationEmail(user.token, { email: user.email, firstname: user.firstname, email_token: user.email_token }).then((response) => {
        }
        ).finally(() => {
        })
    }
    if (!isSended) {
        return <Loading />
    }

    return (
        <main className="validation-email">
            <h1>Bienvenue sur notre application</h1>
            <h2>Valider votre compte:</h2>
            <p>Afin de finaliser la création de votre compte, nous venons de vous envoyer un courriel à votre adresse email dans lequel se trouve un lien d'activation. Il suffit de cliquer dessus afin que la création de votre compte soit finalisée.</p>
            <button onClick={handleSendEmail}>Cliquer ici  pour recevoir de nouveau ce courriel</button>
        </main>
    )
}