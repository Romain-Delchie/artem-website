import './Loading.scss'

export default function Loading() {
    return (
        <div className="loading">
            <div className="loading-container">
                <img src="/images/loader.gif" alt="gif de chargement" />
                <p>Merci de patienter</p>
            </div>
        </div>
    )
}