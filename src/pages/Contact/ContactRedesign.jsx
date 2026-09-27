import { Link } from 'react-router-dom'
import artem from '/data/artem-data'
import ContactForm from '../../components/ContactForm/ContactForm'
import Seo from '../../components/Seo/Seo'
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb'
import { breadcrumbJsonLd, localBusinessJsonLd } from '../../utils/seo/siteConfig'
import './ContactRedesign.scss'

/**
 * Proposition de refonte de la page « Contact », affichée aux seuls
 * administrateurs (voir Contact.jsx).
 *
 * La page actuelle empile le titre, le formulaire puis les coordonnées sur une
 * photographie posée en fond, avec deux aplats semi-transparents — vert pour le
 * titre et l'introduction, bleu pour le formulaire et les coordonnées. Le texte
 * y est peu contrasté, les champs blancs à texte gras tranchent avec le reste
 * du site, et les coordonnées, reléguées tout en bas, ne sont visibles qu'après
 * avoir dépassé un formulaire de six champs — alors que le téléphone est le
 * chemin le plus rapide pour la plupart des demandes.
 *
 * Cette proposition reprend la charte des autres pages refondues : fond gris
 * clair, surfaces blanches bordées, encre bleue, vert en accent. Les
 * coordonnées passent à côté du formulaire, dans une colonne qui les donne
 * toutes — adresse, horaires, téléphone, courriel — de sorte que l'on choisisse
 * son chemin plutôt que de le subir.
 *
 * Le formulaire est le composant existant, avec sa logique d'envoi inchangée :
 * seule sa présentation est reprise, dans la feuille de cette page.
 */

const breadcrumbItems = [
    { name: 'Accueil', path: '/' },
    { name: 'Contact', path: '/contact' },
]

/** Recherche de l'adresse sur une carte, dans un nouvel onglet. */
const MAP_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `ARTEM ${artem.adress} ${artem.postalCode} ${artem.city}`,
)}`

function Icon({ name }) {
    const paths = {
        phone: 'M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293a.75.75 0 0 1-.83.286 12.035 12.035 0 0 1-7.143-7.143.75.75 0 0 1 .286-.83l1.293-.97c.363-.271.527-.734.417-1.173L6.826 3.11A1.125 1.125 0 0 0 5.735 2.25H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z',
        mail: 'M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75',
        clock: 'M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z',
        pin: 'M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z',
    }
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
            strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d={paths[name]} />
        </svg>
    )
}

export default function ContactRedesign() {
    return (
        <>
            <Seo
                title="Contact : nous joindre à Montévrain (77)"
                description="Contactez ARTEM à Montévrain (Seine-et-Marne) pour un devis de textiles techniques ou de bandes transporteuses. Ouvert du lundi au vendredi, 9h-13h et 14h-18h."
                path="/contact"
                jsonLd={[localBusinessJsonLd, breadcrumbJsonLd(breadcrumbItems)]}
            />
            <main className="ct">
                <div className="ct-shell">
                    <Breadcrumb items={breadcrumbItems} />

                    <header className="ct-hero">
                        <p className="ct-hero-eyebrow">Contact</p>
                        <h1>Parler à un de nos experts</h1>
                        <p className="ct-hero-lead">
                            Un doute sur une matière, une machine que vous ne savez pas
                            identifier, une pièce à faire confectionner : le téléphone est
                            souvent le plus rapide. Sinon, laissez-nous un message, nous
                            répondons sous un jour ouvré.
                        </p>
                    </header>

                    <div className="ct-body">
                        <section className="ct-panel ct-panel--form" aria-labelledby="ct-form-title">
                            <h2 id="ct-form-title">Nous écrire</h2>
                            <ContactForm />
                        </section>

                        <aside className="ct-panel ct-panel--info" aria-labelledby="ct-info-title">
                            <h2 id="ct-info-title">Nous joindre directement</h2>

                            <ul className="ct-info-list">
                                <li>
                                    <Icon name="phone" />
                                    <div>
                                        <p className="ct-info-label">Téléphone</p>
                                        <a className="ct-info-value" href={`tel:${artem.tel.replace(/\s/g, '')}`}>
                                            {artem.tel}
                                        </a>
                                    </div>
                                </li>
                                <li>
                                    <Icon name="mail" />
                                    <div>
                                        <p className="ct-info-label">Courriel</p>
                                        <a className="ct-info-value" href={`mailto:${artem.email}`}>
                                            {artem.email}
                                        </a>
                                    </div>
                                </li>
                                <li>
                                    <Icon name="clock" />
                                    <div>
                                        <p className="ct-info-label">Horaires</p>
                                        <p className="ct-info-text">
                                            Du lundi au vendredi, 9h–13h et 14h–18h.<br />
                                            Ouvert toute l’année.
                                        </p>
                                    </div>
                                </li>
                                <li>
                                    <Icon name="pin" />
                                    <div>
                                        <p className="ct-info-label">Adresse</p>
                                        <address className="ct-info-text">
                                            {artem.adress}<br />
                                            {artem.address2}<br />
                                            {artem.postalCode} {artem.city}
                                        </address>
                                        <a
                                            className="ct-info-map"
                                            href={MAP_URL}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            Voir sur une carte
                                        </a>
                                    </div>
                                </li>
                            </ul>

                            <p className="ct-info-note">
                                Vous cherchez un prix ? Les tarifs de la gamme standard sont
                                accessibles depuis un compte professionnel.
                            </p>
                            <Link className="ct-btn" to="/gamme">Voir la gamme</Link>
                        </aside>
                    </div>
                </div>
            </main>
        </>
    )
}
