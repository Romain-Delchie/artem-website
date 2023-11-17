import React from 'react'
import { Link } from 'react-router-dom'
import MyAvatar from './MyAvatar'

export default function Products({ product }) {
    return (
        <div className="react-chatbot-kit-chat-bot-message-container">
            <MyAvatar />
            <div class="react-chatbot-kit-chat-bot-message">
                <Link className='bot-link' to={`/range/${product.id}`}>Notre gamme pour {product.name}</Link>
                <div class="react-chatbot-kit-chat-bot-message-arrow"></div>
            </div>
        </div >
    )
}
