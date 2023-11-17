import { Link, useParams } from 'react-router-dom'
import './ConfirmEmail.scss'
import API from '../../utils/api/api';
import { useEffect, useState } from 'react';
import Loading from '../../components/Loading/Loading';


export default function ConfirmEmail() {
    const { code } = useParams();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        API.email.verifyEmail({ code: code }).then((response) => {
            setIsLoading(false);
        }).catch((error) => {
            alert(error.message);
            setIsLoading(false);
        })
    }, [code])

    if (isLoading) {
        return <Loading />
    }

    return (
        <main className="confirm-email">

            <h1>Votre adresse email est maintenant confirmée</h1>
            <Link to="/signin">Connectez-vous afin d'accéder à tous nos outils</Link>

        </main>
    )
}