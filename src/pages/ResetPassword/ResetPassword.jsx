import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import './ResetPassword.scss'
import API from '../../utils/api/api';

export default function ResetPassword() {
    const Navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const { token } = useParams();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        API.email.checkResetPasswordToken(token).then((response) => {

            setIsLoading(false);

        }).catch((error) => {
            setIsLoading(false);
            alert("Le lien de réinitialisation du mot de passe est invalide ou a expiré.");
            Navigate('/forgot-password', { replace: true });

            console.log(error);
        })
    }, [])


    // Gérez les changements dans les champs de mot de passe
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    // Gérez la soumission du formulaire
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Vérifiez si les mots de passe correspondent
        if (password === confirmPassword) {

            API.user.updatePassword({ code: token, password: password }).then((response) => {
                console.log(response);
            }
            )
            // Ici, vous pouvez envoyer une requête au serveur pour réinitialiser le mot de passe
            // ou effectuer toute autre action nécessaire.
            setMessage('Mot de passe réinitialisé avec succès !');
            setTimeout(() => {
                Navigate('/signin', { replace: true })
            }, 1500);

        } else {
            setMessage('Les mots de passe ne correspondent pas.');
        }
    };

    if (isLoading) {
        return <Loading />
    }


    return (
        <main className="reset-password">
            <div className="reset-password-container">
                <h1>Réinitialisation du mot de passe</h1>
                <form className="reset-password-form" onSubmit={handleSubmit}>
                    <input onChange={handlePasswordChange} className="reset-password-form-input" type="password" placeholder="Nouveau mot de passe" />
                    <input onChange={handleConfirmPasswordChange} className="reset-password-form-input" type="password" placeholder="Confirmer le mot de passe" />
                    <button className="reset-password-form-button">Envoyer</button>
                    <p>{message}</p>
                </form>
            </div>
        </main>
    )
}