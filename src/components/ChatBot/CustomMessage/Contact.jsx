import React from 'react'
import { Link } from 'react-router-dom'

export default function Contact() {
    return (
        <div>
            <p>Si vous souhaitez nous contacter, voici le lien qui vous indiquera notre téléphone, adresse et email</p>
            <Link to='/contact'>Contact</Link>
        </div>
    )
}
