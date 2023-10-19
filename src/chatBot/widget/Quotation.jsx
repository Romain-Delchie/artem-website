import React from 'react'
import { Link } from 'react-router-dom'

export default function Quotation() {
    return (
        <div>
            <Link className='bot-link' to='/signup'>Créer un compte</Link>
            <p className='bot-response'>Ou vous connecter directement si vous avez déjà créé un compte en cliquant ci-dessous</p>
            <Link className='bot-link' to='/signin'>Se connecter</Link>
            <p className='bot-response'>ou même nous contacter directement par téléphone ou email, ci-desssous lelien vers nos coordonnées</p>
            <Link className='bot-link' to='/contact'>Nous contacter</Link>
        </div>
    )
}
