import React from 'react'
import { Link } from 'react-router-dom'
import MyAvatar from './MyAvatar'

export default function Contact() {
    return (
        <div className="react-chatbot-kit-chat-bot-message-container">
            <MyAvatar />
            <div class="react-chatbot-kit-chat-bot-message">
                <Link className='bot-link' to='/contact'>Contact</Link>
                <div class="react-chatbot-kit-chat-bot-message-arrow"></div>
            </div>
        </div >
    )
}
