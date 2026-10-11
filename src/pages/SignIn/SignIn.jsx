import { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AppContext from '../../context/AppContext';
import API, { resetLogoutState } from '../../utils/api/api';
import Seo from '../../components/Seo/Seo';
import './SignIn.scss';

/**
 * Page de connexion à l'espace client.
 *
 * La page reprend la charte du reste du site — fond gris clair, surface
 * blanche bordée, encre bleue, vert en accent — au lieu du formulaire
 * semi-transparent posé sur une photographie de fournil, où le texte se lisait
 * mal et les champs blancs à texte gras ne ressemblaient à rien d'autre.
 *
 * La logique d'authentification est celle d'avant : même appel, même remise à
 * zéro de la session à l'arrivée, même redirection vers le tableau de bord.
 * Deux choses changent dans le comportement, et elles vont avec la refonte :
 *
 *  - les erreurs s'affichent dans le formulaire au lieu d'une boîte de
 *    dialogue du navigateur, qu'il fallait fermer avant de corriger sa saisie ;
 *  - une panne de réseau est traitée. `error.response` est absent dans ce cas,
 *    et l'ancien code levait alors une seconde erreur en lisant son statut,
 *    si bien que le visiteur ne voyait rien du tout.
 */

/** Ce qu'un compte professionnel ouvre, rappelé à côté du formulaire. */
const BENEFITS = [
    'Les tarifs de la gamme standard, consultables à toute heure.',
    'Vos devis composés, conservés et transformables en commande.',
    'Les outils de prise de cotes et d’aide à la définition.',
];

function CheckIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
            strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
    );
}

export default function SignIn() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { user, updateUser } = useContext(AppContext);

    useEffect(() => {
        updateUser({ token: "", email: "", firstname: "", lastname: "" });
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();
        setError('');
        setLoading(true);

        API.auth.signin(email, password).then((response) => {
            resetLogoutState();
            const tokenReceived = response.data.token;
            if (tokenReceived) {
                updateUser({ ...user, token: tokenReceived });
            }
            navigate('/dashboard')
        }).catch((caught) => {
            console.error(caught)
            const status = caught.response?.status;

            if (status === 404) {
                setError("Cette adresse e-mail ne correspond à aucun compte. Vérifiez votre saisie, ou créez un compte.");
            } else if (status === 401) {
                setError("Mot de passe incorrect. Vérifiez votre saisie, ou demandez un nouveau mot de passe.");
            } else if (!caught.response) {
                setError("La connexion au serveur a échoué. Vérifiez votre accès à internet et réessayez.");
            } else {
                setError("La connexion a échoué. Réessayez dans un instant ; si cela persiste, appelez-nous.");
            }
            setLoading(false);
        })
    };

    return (
        <>
            <Seo
                title="Connexion à votre espace client"
                description="Connectez-vous à votre espace client ARTEM pour consulter les prix, créer vos devis et suivre vos commandes."
                path="/connexion"
                noindex
            />
            <main className="si">
                <div className="si-shell">

                    <section className="si-panel" aria-labelledby="si-title">
                        <p className="si-eyebrow">Espace client</p>
                        <h1 id="si-title">Connectez-vous</h1>
                        <p className="si-lead">
                            Vos tarifs, vos devis et vos outils vous attendent dans votre
                            tableau de bord.
                        </p>

                        <form className="si-form" onSubmit={handleSubmit} noValidate>
                            <div className="si-field">
                                <label htmlFor="si-email">Adresse e-mail</label>
                                <input
                                    id="si-email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="si-field">
                                <label htmlFor="si-password">Mot de passe</label>
                                <input
                                    id="si-password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <Link className="si-forgot" to="/forgot-password">
                                    Mot de passe oublié ?
                                </Link>
                            </div>

                            {/* `role="alert"` fait annoncer le message par les lecteurs
                                d'écran au moment où il apparaît. */}
                            {error && <p className="si-error" role="alert">{error}</p>}

                            <button className="si-submit" type="submit" disabled={loading}>
                                {loading ? 'Connexion…' : 'Se connecter'}
                            </button>
                        </form>

                        <p className="si-switch">
                            Pas encore de compte ?{' '}
                            <Link to="/creer-un-compte">Créer un compte professionnel</Link>
                        </p>
                    </section>

                    {/* Volet de droite, décoratif et argumentaire : il disparaît sous
                        900 px pour que le formulaire tienne seul l'écran du téléphone. */}
                    <aside className="si-aside" aria-hidden="true">
                        <div className="si-aside-media">
                            <img
                                src="/images/boulangegrand-inverse.jpg"
                                alt=""
                                width="900"
                                height="1200"
                                loading="lazy"
                            />
                        </div>
                        <div className="si-aside-text">
                            <p className="si-aside-title">Ce que votre compte vous donne</p>
                            <ul>
                                {BENEFITS.map((benefit) => (
                                    <li key={benefit}>
                                        <CheckIcon />
                                        {benefit}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </aside>
                </div>
            </main>
        </>
    )
}
