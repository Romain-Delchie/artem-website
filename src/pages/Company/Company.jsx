import { Link } from 'react-router-dom'
import './Company.scss'

export default function Company() {

    return (
        <main className='company'>
            <section className='company-description'>
                <div className="company-description-item">
                    <h2>Notre savoir-faire</h2>
                    <img className='left-img' src="/images/couture.jpg" alt="facade artem" />
                    <p>Depuis plus de 40 ans, Artem est un acteur incontournable dans le domaine des textiles techniques et des machines d'enfournement pour les professionnels de la boulangerie. Nous nous sommes engagés à fournir des solutions de qualité supérieure, conçues spécifiquement pour répondre aux besoins des acteurs de la boulangerie. Nous produisons en interne la majorité de nos produits
                        et en assurons le contrôle. La matière première
                        et les produits que nous ne transformons pas font
                        l’objet de critères de qualité et de contrôles rigoureux
                        et réguliers.</p>
                </div>
                <hr />
                <div className="company-description-item">
                    <h2>Nos produits</h2>
                    <img className='right-img' src="/images/te-general.jpg" alt="facade artem" />
                    <p>Avec plus de 5000 références que nous produisons pour la quasi totalité dans notre entrepôt de Montévrain en Seine et Marne proche du parc Eurodisney, Artem est capable de répondre à tout vos besoins en textiles :  Toiles d'enfourneur, de couche, de balancelles, tapis de laminoir et façonneuses, bande de transport, feutres divers., manches à farine et plus encore... S'ajoute à cela notre partie mécanique :  grilles, séchoirs  et machines d"enfournement.</p>
                    <Link className='company-description-item-link' to='/products'>Découvrir notre gamme plus en détails</Link>
                </div>
                <hr />
                <div className="company-description-item">
                    <h2>Nos services</h2>
                    <img className='left-img' src="/images/facade.jpg" alt="facade artem" />
                    <p>Nous expédions dans la journée les commandes de
                        stock reçues avant 16H. Les colis de moins de 30 kg
                        sont livrés le lendemain avant 13H par Chronopost ou
                        Fedex/TNT. Les envois de plus de 30 kg sont expédiés
                        par Schenker avec une livraison sous 48/72h. Nous n'avons pas de minimum de commande. Nous assurons une permanence téléphonique de 8H30 à 12H30 et
                        14H à 18H du lundi au vendredi pour vous aider à
                        définir les produits. Nous pouvons envoyer des modèles gratuits pour les toiles de faible
                        coût unitaire (Toile de balancelle, toile de couche).</p>
                </div>
                <hr />
            </section>
            <section className='company-history'>
                <h2>Notre histoire</h2>
                <ul className="company-history-list">
                    <li className="company-history-item">
                        1982 - M. Bellanger et M. Sauvaneau quittent la société NERVUS pour créer la SARL ARTEM à Paris (12eme).
                    </li>
                    <li className="company-history-item">
                        1983 - Démarrage de l’activité grâce à un partenaire européen qui accepte de produire des manchons de boulangerie en laine sur les spécifications d’ARTEM.
                    </li>
                    <li className="company-history-item">
                        1994 - M. Jean marie TOURY prend le contrôle d’ARTEM qui comporte 6 personnes et réalise 6 MF de chiffre d’affaire. ARTEM devient une SA.
                    </li>
                    <li className="company-history-item">
                        1995 - Déménagement d’ARTEM à Torcy, les locaux de Paris ne permettant pas de répondre aux besoins de développement. Augmentation de la production interne qui prends plus d’importance.
                    </li>
                    <li className="company-history-item">
                        2001 - Introduction du premier accessoire mécanique à destination des boulangers, l’enfourneur, développé et fabriqué par le groupe.
                    </li>
                    <li className="company-history-item">
                        2011 - ARTEM déménage à Montévrain dans des locaux de 1500 m² pour permettre la mise en stock de nombreuses références supplémentaires afin de satisfaire ses clients.
                    </li>
                </ul>
                <img src="/images/continued.jpg" alt="photo to be continued" />
            </section>

        </main>
    )
}