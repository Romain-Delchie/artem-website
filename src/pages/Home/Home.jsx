import './Home.scss'

export default function Home() {

    return (
        <main className='hero'>
            <header className='hero-header'>
                <div className='hero-title-container'>
                    <h1 className='hero-title'>ARTEM</h1>
                    <h2 className='hero-subtitle'>Les supports d'avenir pour la pâte traditionnelle</h2>
                </div>
                <label className='hero-header-btn-label'> Se connecter
                    <button className='hero-header-btn'><img src="/images/connexion-blue1.png" alt="fleche de connexion" /></button>
                </label>
            </header>
            <div className='hero-button-container'>
                <button className='hero-button'>Créer un compte</button>
                <button className='hero-button'>Notre entreprise</button>
                <button className='hero-button'>Notre gamme</button>

                <button className='hero-button'>Contact</button>
            </div>

        </main>
    )
}