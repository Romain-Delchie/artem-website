import { Link } from 'react-router-dom'
import DashboardComponent from '../../components/Dashboard/DashboardComponent'
import { Icon } from '../../components/Dashboard/sideNav'
import '../Dashboard/Board.scss'
import './Tools.scss'

/**
 * Page « Mes outils » de l'espace client.
 *
 * La page présentait deux encarts de 300 × 400 px côte à côte : un lien vers
 * l'outil de définition de toile enfourneur d'un côté, et de l'autre une liste
 * de neuf plans PDF dans un bloc de hauteur fixe, tous rangés dans le même
 * ordre que leur ajout au fil du temps.
 *
 * La refonte reprend la forme du tableau de bord, avec lequel elle partage sa
 * feuille de style : un en-tête, puis deux blocs. L'outil de calcul en ligne
 * a le premier, et les neuf plans restent ensemble dans le second, sous un
 * titre qui dit enfin ce qu'ils sont — des plans de prise de cotes — là où la
 * page annonçait « plan de prise de côte en PDF » au singulier et sans
 * expliquer à quoi ils servent. Leur liste se range en colonnes selon la place
 * disponible, pour ne pas faire neuf lignes empilées.
 */

/**
 * Plans de prise de cotes, tous dans un seul bloc, dans l'ordre des familles
 * de produit : les toiles enfourneur, les toiles de balancelle, puis les
 * matériels d'enfournement.
 */
const PLANS = [
    { file: 'plan-cote-te-cordon.pdf', label: 'Toile enfourneur à cordon' },
    { file: 'plan-cote-te-recouvrement.pdf', label: 'Toile enfourneur à recouvrement' },
    { file: 'plan-cote-te-sangle.pdf', label: 'Toile enfourneur à sangles' },
    { file: 'plan-cote-tb-ourlets.pdf', label: 'Toile de balancelle à ourlets' },
    { file: 'plan-cote-tb-velcro.pdf', label: 'Toile de balancelle à velcros' },
    { file: 'plan-cote-enfourneur.pdf', label: 'Enfourneur inox' },
    { file: 'plan-cote-ciseaux.pdf', label: 'Élévateur ciseaux' },
    { file: 'plan-cote-colonne.pdf', label: 'Élévateur colonne' },
    { file: 'plan-cote-integre.pdf', label: 'Élévateur intégré' },
]

export default function Tools() {
    return (
        <main className="tools">
            <DashboardComponent />

            <section className="board" aria-labelledby="tools-title">
                <header className="board-head">
                    <p className="board-head-eyebrow">Espace client</p>
                    <h2 id="tools-title">Mes outils</h2>
                    <p className="board-head-lede">
                        De quoi définir vous-même la pièce dont vous avez besoin : un
                        outil de calcul en ligne, et les plans de prise de cotes à
                        imprimer avant de relever vos mesures.
                    </p>
                </header>

                <div className="board-grid tools-grid">

                    <article className="board-group tools-define">
                        <h3>
                            <Icon name="tool" />
                            Définir en ligne
                        </h3>
                        <Link className="tools-define-card" to="/te-tool">
                            <span className="tools-define-media">
                                <img
                                    src="/images/products/te.jpg"
                                    alt="Toile enfourneur ARTEM"
                                    width="320"
                                    height="240"
                                    loading="lazy"
                                />
                            </span>
                            <span className="tools-define-text">
                                <strong>Toile enfourneur</strong>
                                <span>
                                    Renseignez les cotes de votre four, l’outil détermine la
                                    toile correspondante.
                                </span>
                                <span className="tools-define-cta">
                                    Ouvrir l’outil
                                    <Icon name="arrow" />
                                </span>
                            </span>
                        </Link>
                    </article>

                    <article className="board-group tools-plans">
                        <h3>
                            <Icon name="doc" />
                            Plans de prise de cotes
                        </h3>
                        <p className="tools-plans-lede">
                            Les plans à imprimer avant de relever vos mesures : chacun
                            indique les cotes à prendre sur votre matériel et comment les
                            reporter. Un PDF par type de pièce.
                        </p>
                        <ul className="tools-plans-list">
                            {PLANS.map((plan) => (
                                <li key={plan.file}>
                                    {/* Les plans sont des fichiers du site : lien
                                        ordinaire, téléchargé ou ouvert dans un nouvel
                                        onglet. */}
                                    <Link
                                        className="board-action"
                                        to={`/pdf/${plan.file}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        download
                                    >
                                        <img
                                            className="tools-plans-icon"
                                            src="/images/pdf.png"
                                            alt="PDF"
                                            width="25"
                                            height="25"
                                            loading="lazy"
                                        />
                                        <span>{plan.label}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </article>
                </div>
            </section>
        </main>
    )
}
