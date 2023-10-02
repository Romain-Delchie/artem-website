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

    const [passwordValidation, setPasswordValidation] = useState({
        minLength: false,
        uppercase: false,
        digit: false,
        specialChar: false,
    });

    const [passwordMatch, setPasswordMatch] = useState(false);
    useEffect(() => {
        setPasswordMatch(password === confirmPassword);
    }, [password, confirmPassword]);

    const handleChange = (e) => {
        const { name, value, type } = e.target;

        const minLength = value.length >= 8;
        const uppercase = /[A-Z]/.test(value);
        const digit = /[0-9]/.test(value);
        const specialChar = /[!@#$%^&*()_+[\]{};':"\\|,.<>?/~`-]/.test(value);

        setPasswordValidation({
            minLength,
            uppercase,
            digit,
            specialChar,
        });



    };

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
        const { value } = e.target;
        const minLength = value.length >= 8;
        const uppercase = /[A-Z]/.test(value);
        const digit = /[0-9]/.test(value);
        const specialChar = /[!@#$%^&*()_+[\]{};':"\\|,.<>?/~`-]/.test(value);
        setPassword(value);
        setPasswordValidation({
            minLength,
            uppercase,
            digit,
            specialChar,
        });
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    // Gérez la soumission du formulaire
    const handleSubmit = (e) => {
        e.preventDefault();


        if (password !== confirmPassword) {
            setMessage('Les mots de passe ne correspondent pas.');


        } else if (passwordValidation.minLength === false || passwordValidation.uppercase === false || passwordValidation.digit === false || passwordValidation.specialChar === false) {
            setMessage('Le mot de passe doit contenir au moins 8 caractères, une majuscule, un chiffre et un caractère spécial.');
        } else {
            setIsLoading(true);

            API.user.updatePassword({ code: token, password: password }).then((response) => {
                setMessage('Mot de passe réinitialisé avec succès !');
                setTimeout(() => {
                    Navigate('/signin', { replace: true })
                }, 1500);
            }
            )
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
                    <div className="password-validation">

                        <span className={passwordValidation.minLength ? "valid" : "invalid"}>8 caractères</span>
                        <span className={passwordValidation.uppercase ? "valid" : "invalid"}>1 majuscule</span>
                        <span className={passwordValidation.digit ? "valid" : "invalid"}>1 chiffre</span>
                        <span className={passwordValidation.specialChar ? "valid" : "invalid"}>1 caractère spécial</span>

                    </div>
                    <input onChange={handleConfirmPasswordChange} className="reset-password-form-input" type="password" placeholder="Confirmer le mot de passe" />
                    {!passwordMatch &&

                        <span className="invalid">Doit être identique au premier mot de passe</span>
                    }
                    <button className="reset-password-form-button">Envoyer</button>
                    <p className='submit-message'>{message}</p>
                </form>
            </div>
        </main>
    )
}