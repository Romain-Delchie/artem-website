import React from 'react'
import { Link } from 'react-router-dom'
import MyAvatar from './MyAvatar'

export default function Quotation() {
    return (
        <div className="react-chatbot-kit-chat-bot-message-container">
            <MyAvatar />
            <div class="react-chatbot-kit-chat-bot-message">
                <Link className='bot-link' to='/signup'>Créer un compte</Link>
                <Link className='bot-link' to='/signin'>Se connecter</Link>
                <Link className='bot-link' to='/contact'>Nous contacter</Link>
                <div class="react-chatbot-kit-chat-bot-message-arrow"></div>
            </div>
        </div>
    )
}
