import React from 'react'
import { Link } from 'react-router-dom'
import MyAvatar from './MyAvatar'

export default function Products({ product }) {
    return (
        <div className="react-chatbot-kit-chat-bot-message-container">
            <MyAvatar />
            <div className="react-chatbot-kit-chat-bot-message">
                <Link className='bot-link' to={`/gamme/${product.id}/${encodeURIComponent(product.name)}`}>Notre gamme pour {product.name}</Link>
                <div className="react-chatbot-kit-chat-bot-message-arrow"></div>
            </div>
        </div >
    )
}
