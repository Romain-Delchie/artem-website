import { Link, useParams } from 'react-router-dom'
import './ConfirmEmail.scss'
import API from '../../utils/api/api';
import { useEffect, useState } from 'react';
import Loading from '../../components/Loading/Loading';


export default function ConfirmEmail() {
    const { code } = useParams();
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        API.email.verifyEmail({ code: code }).then((response) => {
            setIsLoading(false);
        }).catch((error) => {
            setIsLoading(false);
            setIsError(true);
        })
    }, [code])

    if (isLoading) {
        return <Loading />
    }








    return (
        <main className="confirm-email">
            <h1>Merci d'avoir confirmer votre email</h1>

            <p>Votre compte est maintenant créé</p>
            <Link to="/signin">Connectez-vous afin d'accéder à tous nos outils</Link>
        </main>
    )
}