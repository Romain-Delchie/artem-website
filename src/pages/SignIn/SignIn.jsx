import React, { useState } from 'react';
import './SignIn.scss'

export default function SignIn() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Ici, vous pouvez mettre votre logique de connexion (envoyer les données au backend, vérifier les informations, etc.).
        // Pour cet exemple, nous allons simplement afficher les données entrées dans la console.
        console.log('Email:', Email);
        console.log('Password:', password);
    };

    return (
        <main className='signin'>
            <h2>Connectez-vous et accéder à votre tableau de bord</h2>

            <form className="signin-form" onSubmit={handleSubmit}>
                <input
                    className="signin-form-input"
                    name="email"
                    type="email"
                    placeholder="Adresse email"
                    value={email}
                    onChange={handleEmailChange}
                />
                <input
                    className="signin-form-input"
                    name="password"
                    type="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={handlePasswordChange}
                />

                <button className="signin-form-button" type="submit">
                    Se connecter
                </button>
            </form>
        </main>
    )
}