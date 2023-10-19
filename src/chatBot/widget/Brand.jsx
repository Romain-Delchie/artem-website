import React from 'react'
import { Link } from 'react-router-dom'

export default function () {
    return (
        <div>
            <Link className='bot-link' to='/products'>Notre gamme ARTEM</Link>
            <p className='react-chatbot-kit-user-chat-message'>Vous pouvez également vous creer un compte et vous connecter afin d'accéder à plus de 1000 produits que contient notre gamme</p>
            <Link className='bot-link' to='/signup'>Créer un compte</Link>
            <Link className='bot-link' to='/signin'>Se connecter</Link>
        </div>
    )
}
