import { useEffect, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Select from "react-select";
import API from "../../utils/api/api";
import AppContext from "../../context/AppContext";
import Seo from "../../components/Seo/Seo";
import PasswordInput from "../../components/PasswordInput/PasswordInput";
import Loading from "../../components/Loading/Loading";
import "./SignUp.scss";

/**
 * Création d'un compte professionnel.
 *
 * La page reprend la charte du reste du site — fond gris clair, surface
 * blanche bordée, encre bleue, vert en accent — là où le formulaire alignait
 * dix-sept champs à plat, libellé à gauche et champ à droite, avec un retrait
 * de 15 vw sur grand écran qui poussait les libellés au milieu de l'écran.
 *
 * Le formulaire est désormais découpé en quatre moments — l'entreprise, les
 * coordonnées, l'adresse de facturation, le mot de passe — avec le libellé
 * au-dessus du champ. C'est la forme qui change : les règles de validation,
 * la création de l'adresse puis du compte, la connexion automatique et les
 * courriels envoyés derrière sont ceux d'avant, à l'identique.
 *
 * Deux choses changent dans le comportement, et elles vont avec la refonte :
 *
 *  - les refus de validation s'affichent dans le formulaire au lieu d'une
 *    boîte de dialogue du navigateur, qu'il fallait fermer avant de corriger ;
 *  - les critères du mot de passe ne sont plus tous en rouge à l'arrivée. Un
 *    critère non encore rempli est gris, un critère rempli est vert : la page
 *    ne commence plus par reprocher au visiteur un champ qu'il n'a pas saisi.
 */

/** Critères du mot de passe, dans l'ordre où ils sont vérifiés. */
const PASSWORD_RULES = [
    { key: 'minLength', label: 'Au moins 8 caractères' },
    { key: 'uppercase', label: 'Au moins 1 majuscule' },
    { key: 'lowercase', label: 'Au moins 1 minuscule' },
    { key: 'digit', label: 'Au moins 1 chiffre' },
    { key: 'specialChar', label: 'Au moins 1 caractère spécial' },
];

/** Ce qu'ouvre le compte, rappelé en tête de page. */
const BENEFITS = [
    'Les tarifs de la gamme standard, à toute heure',
    'Vos devis composés et conservés',
    'Les outils de prise de cotes',
];

function CheckIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
            strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
    );
}

export default function SignUp() {
  const { user, updateUser } = useContext(AppContext);
  const navigate = useNavigate();
  const [availableCities, setAvailableCities] = useState([]);
  const [apiError, setApiError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [formData, setFormData] = useState({
    company: "",
    firstname: "",
    lastname: "",
    email: "",
    phone_number: "",
    password: "",
    repeat_password: "",
    siret: "", // Changed to string type
    street_address: "",
    street_other: "",
    zip_code: "",
    city: "",
    otherCity: "",
    country: "France",
    profile_id: 3, // Set a default value
  });
  const [passwordValidation, setPasswordValidation] = useState({
    minLength: false,
    uppercase: false,
    lowercase: false,
    digit: false,
    specialChar: false,
  });
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState({
    label: "France",
    value: "France",
  });
  const [countryOptions, setCountryOptions] = useState([]);
  useEffect(() => {
    setPasswordMatch(formData.password === formData.repeat_password);
  }, [formData.password, formData.repeat_password]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (name === "password") {
      const minLength = value.length >= 8;
      const uppercase = /[A-Z]/.test(value);
      const lowercase = /[a-z]/.test(value);
      const digit = /[0-9]/.test(value);
      const specialChar = /[!@#$%^&*()_+[\]{};':"\\|,.<>?/~`-]/.test(value);

      setPasswordValidation({
        minLength,
        uppercase,
        lowercase,
        digit,
        specialChar,
      });
    }

    setFormData({
      ...formData,
      [name]: type === "number" ? Number(value) : value,
    });
  };

  useEffect(() => {
    // Utilisez une API pour récupérer la liste des pays
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => {
        const countries = response.data
          .sort((a, b) => a.name.common.localeCompare(b.name.common))
          .map((country) => ({
            label: country.name.common,
            value: country.name.common,
          }));
        setCountryOptions(countries);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des pays", error);
      });
  }, []);

  const handleZipCodeChange = async (e) => {
    const zipCode = e.target.value;
    setFormData({ ...formData, zip_code: zipCode });
    if (zipCode.length == 5) {
      try {
        const response = await axios.get(
          `https://api-adresse.data.gouv.fr/search/?q=${zipCode}`
        );
        if (response.data && response.data.features.length > 0) {
          const cities = response.data.features.reduce(
            (uniqueCities, feature) => {
              const city = feature.properties.city;
              if (!uniqueCities.includes(city)) {
                uniqueCities.push(city);
              }
              return uniqueCities;
            },
            []
          );
          setAvailableCities(cities);
        } else {
          setAvailableCities([]);
        }
      } catch (error) {
        console.error("Error fetching cities:", error);
        setApiError(true);
      }
    } else {
      setAvailableCities([]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");
    const isPasswordValid =
      passwordValidation.minLength &&
      passwordValidation.uppercase &&
      passwordValidation.lowercase &&
      passwordValidation.digit &&
      passwordValidation.specialChar;
    formData.siret =
      formData.country !== "France" ? "00000000000000" : String(formData.siret);

    const allFieldsFilled = Object.entries(formData).every(
      ([key, value]) =>
        key === "street_other" ||
        key === "otherCity" ||
        (value !== null && value !== "")
    );

    if (!allFieldsFilled) {
      setFormError("Veuillez remplir tous les champs.");
      return;
    }

    if (formData.city === "other" && formData.otherCity === "") {
      setFormError("Veuillez indiquer votre ville dans le champ approprié.");
      return;
    }

    const phonePattern = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
    const siretPattern = /^[0-9]{14}$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!isPasswordValid) {
      setFormError("Le mot de passe ne respecte pas les critères de sécurité.");
      return;
    } else if (!phonePattern.test(formData.phone_number)) {
      setFormError("Le numéro de téléphone n'est pas valide.");
      return;
    } else if (!siretPattern.test(formData.siret)) {
      setFormError("Le numéro de SIRET n'est pas valide.");
      return;
    } else if (formData.password !== formData.repeat_password) {
      setFormError("Les mots de passe ne correspondent pas.");
      return;
    } else if (!emailPattern.test(formData.email)) {
      setFormError("L'adresse e-mail n'est pas valide.");
      return;
    } else {
      setIsLoading(true);
      if (formData.city === "other") {
        formData.city = formData.otherCity;
      }
      delete formData.otherCity;
      const dataAddress = {
        name_address: formData.company,
        street_address: formData.street_address,
        zip_code: formData.zip_code,
        city: formData.city,
        country: selectedCountry.label,
      };
      if (formData.street_other !== "") {
        dataAddress.street_other = formData.street_other;
      }
      API.address
        .create(dataAddress)
        .then((response) => {
          const lastForm = formData;
          lastForm.billing_address_id = response.data.newAddress.generatedId;
          lastForm.delivery_standard_id = response.data.newAddress.generatedId;
          lastForm.country = selectedCountry.label;
          delete lastForm.street_address;
          delete lastForm.name_address;
          if (lastForm.street_other !== null) {
            delete lastForm.street_other;
          }
          delete lastForm.zip_code;
          delete lastForm.city;
          setFormData({ ...formData, ...dataAddress });
          API.user
            .create(lastForm)
            .then((response) => {
              const emailToken = response.data.newAccount.email_token;
              API.auth
                .signin(formData.email, formData.password)
                .then((response) => {
                  const tokenReceived = response.data.token;
                  updateUser({ ...user, token: tokenReceived });
                  API.email.sendConfirmationEmail(tokenReceived, {
                    email: formData.email,
                    firstname: formData.firstname,
                    email_token: emailToken,
                  });
                  API.email.newUser();
                  navigate("/dashboard");
                });
            })
            .catch((error) => {
              setIsLoading(false);
              if (error.response?.status === 400) {
                setFormError("Cet email est déjà utilisé.");
              } else {
                setFormError(error.message);
                console.log(error);
              }
            });
        })
        .catch((error) => {
          console.error(error);
          setIsLoading(false);
          setFormError(
            "Une erreur est survenue lors de la création de votre compte, veuillez nous contacter."
          );
        });
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  const isFrance = selectedCountry.label === "France";

  return (
    <>
      <Seo
        title="Créer un compte professionnel"
        description="Créez votre compte professionnel ARTEM pour accéder aux prix, aux outils de définition produit et à l'historique de vos devis."
        path="/creer-un-compte"
      />
      <main className="su">
        <div className="su-shell">

          <header className="su-head">
            <p className="su-eyebrow">Espace client</p>
            <h1>Créer un compte professionnel</h1>
            <p className="su-lead">
              Quelques minutes, et vous accédez aux tarifs, aux outils et à vos
              devis. Votre compte est activé sous un jour ouvré.
            </p>
            <ul className="su-benefits">
              {BENEFITS.map((benefit) => (
                <li key={benefit}>
                  <CheckIcon />
                  {benefit}
                </li>
              ))}
            </ul>
          </header>

          <form onSubmit={handleSubmit} className="su-form" noValidate>

            <fieldset className="su-group">
              <legend>Votre entreprise</legend>
              <div className="su-grid">
                <div className="su-field">
                  <label htmlFor="company">Nom de l’entreprise</label>
                  <input
                    type="text"
                    name="company"
                    id="company"
                    value={formData.company}
                    onChange={handleChange}
                  />
                </div>
                {isFrance && (
                  <div className="su-field">
                    <label htmlFor="siret">Numéro de SIRET</label>
                    <input
                      placeholder="14 chiffres"
                      type="text"
                      name="siret"
                      id="siret"
                      value={formData.siret}
                      onChange={handleChange}
                    />
                  </div>
                )}
              </div>
            </fieldset>

            <fieldset className="su-group">
              <legend>Vos coordonnées</legend>
              <div className="su-grid">
                <div className="su-field">
                  <label htmlFor="firstname">Prénom</label>
                  <input
                    type="text"
                    name="firstname"
                    id="firstname"
                    autoComplete="given-name"
                    value={formData.firstname}
                    onChange={handleChange}
                  />
                </div>
                <div className="su-field">
                  <label htmlFor="lastname">Nom</label>
                  <input
                    type="text"
                    name="lastname"
                    id="lastname"
                    autoComplete="family-name"
                    value={formData.lastname}
                    onChange={handleChange}
                  />
                </div>
                <div className="su-field">
                  <label htmlFor="email">Adresse e-mail</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="su-field">
                  <label htmlFor="phone_number">Téléphone</label>
                  <input
                    placeholder="ex : 01 64 11 00 33"
                    type="tel"
                    name="phone_number"
                    id="phone_number"
                    autoComplete="tel"
                    value={formData.phone_number}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </fieldset>

            <fieldset className="su-group">
              <legend>Adresse de facturation</legend>
              <div className="su-grid">
                <div className="su-field su-field--wide">
                  <label htmlFor="country">Pays</label>
                  <Select
                    inputId="country"
                    classNamePrefix="su-select"
                    options={countryOptions}
                    value={selectedCountry}
                    onChange={(option) => setSelectedCountry(option)}
                    placeholder="Sélectionnez un pays"
                    isSearchable={true}
                  />
                </div>
                <div className="su-field su-field--wide">
                  <label htmlFor="street_address">Adresse</label>
                  <input
                    placeholder="ex : 10 rue de la Paix"
                    type="text"
                    name="street_address"
                    id="street_address"
                    autoComplete="street-address"
                    value={formData.street_address}
                    onChange={handleChange}
                  />
                </div>
                <div className="su-field su-field--wide">
                  <label htmlFor="street_other">Complément d’adresse</label>
                  <input
                    placeholder="Facultatif : bâtiment, lieu-dit…"
                    type="text"
                    name="street_other"
                    id="street_other"
                    value={formData.street_other}
                    onChange={handleChange}
                  />
                </div>
                <div className="su-field">
                  <label htmlFor="zip_code">Code postal</label>
                  <input
                    type="text"
                    name="zip_code"
                    id="zip_code"
                    placeholder="ex : 77144"
                    autoComplete="postal-code"
                    value={formData.zip_code}
                    onChange={handleZipCodeChange}
                  />
                </div>

                {/* En France, les villes sont proposées d'après le code postal ;
                    ailleurs, ou si le service d'adresses ne répond pas, la ville
                    est saisie à la main. */}
                <div className="su-field">
                  <label htmlFor="city">Ville</label>
                  {apiError || !isFrance ? (
                    <input
                      type="text"
                      name="city"
                      id="city"
                      placeholder="Ville"
                      value={formData.otherCity}
                      onChange={handleChange}
                    />
                  ) : (
                    <select
                      name="city"
                      id="city"
                      value={formData.city}
                      onChange={handleChange}
                    >
                      <option value="none" key="none">
                        Sélectionnez une ville
                      </option>
                      {availableCities.map((city, index) => (
                        <option key={`${city}_${index}`} value={city}>
                          {city}
                        </option>
                      ))}
                      <option value="other" key="other">
                        Autre
                      </option>
                    </select>
                  )}
                </div>

                {formData.city === "other" && (
                  <div className="su-field">
                    <label htmlFor="otherCity">Indiquez la ville</label>
                    <input
                      type="text"
                      name="otherCity"
                      id="otherCity"
                      placeholder="Nom de la ville"
                      value={formData.otherCity}
                      onChange={handleChange}
                    />
                  </div>
                )}
              </div>
            </fieldset>

            <fieldset className="su-group">
              <legend>Votre mot de passe</legend>
              <div className="su-grid">
                <div className="su-field">
                  <label htmlFor="password">Mot de passe</label>
                  <PasswordInput
                    name="password"
                    id="password"
                    placeholder=""
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <ul className="su-rules">
                    {PASSWORD_RULES.map((rule) => (
                      <li
                        key={rule.key}
                        className={passwordValidation[rule.key] ? 'su-rule--ok' : undefined}
                      >
                        <CheckIcon />
                        {rule.label}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="su-field">
                  <label htmlFor="password-confirm">Confirmation</label>
                  <PasswordInput
                    name="repeat_password"
                    id="password-confirm"
                    placeholder=""
                    value={formData.repeat_password}
                    onChange={handleChange}
                  />
                  {formData.repeat_password !== "" && !passwordMatch && (
                    <p className="su-mismatch">
                      Les deux mots de passe doivent être identiques.
                    </p>
                  )}
                </div>
              </div>
            </fieldset>

            {/* `role="alert"` fait annoncer le message par les lecteurs d'écran
                au moment où il apparaît. */}
            {formError && <p className="su-error" role="alert">{formError}</p>}

            <button className="su-submit" type="submit">
              Créer mon compte
            </button>

            <p className="su-switch">
              Vous avez déjà un compte ? <Link to="/connexion">Se connecter</Link>
            </p>
          </form>
        </div>
      </main>
    </>
  );
}
