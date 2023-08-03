import './SignUp.scss'

export default function SignUp() {
    return (
        <main className='signup'>
            <div className="signup-container">
                <h2>Créez votre compte et bénéficiez de tous nos services</h2>
                <form action="" className="signup-form">
                    <div className="signup-form-item">
                        <label htmlFor="firstname">Prénom</label>
                        <input type="text" name="firstname" id="firstname" />
                    </div>
                    <div className="signup-form-item">
                        <label htmlFor="lastname">Nom</label>
                        <input type="text" name="lastname" id="lastname" />
                    </div>
                    <div className="signup-form-item">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" />
                    </div>
                    <div
                        className="signup-form-item">
                        <label htmlFor="phone_number">Téléphone</label>
                        <input type="tel" name="phone_number" id="phone_number" />
                    </div>
                    <div className="signup-form-item">
                        <label htmlFor="password">Mot de passe</label>
                        <input type="password" name="password" id="password" />
                    </div>
                    <div className="signup-form-item">
                        <label htmlFor="password-confirm">Confirmez votre mot de passe</label>
                        <input type="password" name="password-confirm" id="password-confirm" />
                    </div>
                    <div className="signup-form-item">
                        <label htmlFor="company">Nom de votre entreprise</label>
                        <input type="text" name="company" id="company" />
                    </div>
                    <div className="signup-form-item">
                        <label htmlFor="siret">Numéro de SIRET</label>
                        <input type="text" name="siret" id="siret" />
                    </div>
                    <div className="signup-form-item">
                        <label htmlFor="address">Adresse</label>
                        <input type="text" name="invoice_address" id="invoice_address" />
                    </div>

                </form>
            </div>
        </main>
    )
}