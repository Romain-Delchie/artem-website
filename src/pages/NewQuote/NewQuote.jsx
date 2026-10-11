import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import API from "../../utils/api/api";
import axios from "axios";
import AppContext from "../../context/AppContext";
import { Icon } from "../../components/Dashboard/sideNav";
import "../Dashboard/Board.scss";
import "./NewQuote.scss";
import fetchData from "../../utils/fetchData";
import Loading from "../../components/Loading/Loading";
import DashboardComponent from "../../components/Dashboard/DashboardComponent";
import Select from "react-select";

/**
 * Création d’un devis.
 *
 * La page empilait un titre, un champ de référence, un encart d’adresse et
 * deux fenêtres modales habillées à part. Elle prend la forme du tableau de
 * bord, dont elle partage la feuille de style : un en-tête, puis une carte par
 * décision — le produit déjà choisi le cas échéant, la référence du devis,
 * l’adresse de livraison — et le bouton de création en pied.
 *
 * Toute la logique est inchangée : création du devis, rattachement du produit
 * venu d’une carte produit, enregistrement d’une nouvelle adresse de
 * livraison, puis redirection vers le devis créé.
 */
export default function NewQuote() {
  const { user, updateUser } = useContext(AppContext);
  const navigate = useNavigate();
  const routerLocation = useLocation();
  // Produit transmis depuis la liste de produits par le bouton "Créer un devis"
  // via <Link to="/new-quote" state={{ product }} />.
  const productToAdd = routerLocation.state?.product ?? null;
  const [quantityToAdd, setQuantityToAdd] = useState(1);
  const [addressSelected, setAddressSelected] = useState({
    new: false,
    ...user.delivery_standard,
  });
  const [isOpenAddresses, setIsOpenAddresses] = useState(false);
  const [availableCities, setAvailableCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [newQuoteId, setNewQuoteId] = useState();
  const [selectedCountry, setSelectedCountry] = useState({
    label: "France",
    value: "France",
  });
  const [countryOptions, setCountryOptions] = useState([]);
  const [apiError, setApiError] = useState(false);

  useEffect(() => {
    if (
      user.quotations.filter(
        (quotation) => quotation.quotation_id === newQuoteId
      ).length > 0
    ) {
      navigate(`/quote-history/${newQuoteId}`);
    }
  }, [user, newQuoteId]);

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

  const handleOpenAddresses = (e) => {
    e.preventDefault();
    setIsOpenAddresses(true);
  };

  const handleChangeSelect = (e) => {
    if (e.target.value === "new") {
      setAddressSelected({ new: true });
      return;
    }

    user.deliveries
      .filter((delivery) => delivery.id === Number(e.target.value))
      .map((delivery) => {
        setAddressSelected({ ...addressSelected, ...delivery, new: false });
        setIsOpenAddresses(false);
      });
  };

  const handleCreateQuotation = async (e) => {
    e.preventDefault();
    const reference = e.target.reference.value;
    if (reference === "") {
      return alert("Veuillez renseigner une référence");
    }
    const quantity = Math.max(1, Math.floor(Number(quantityToAdd) || 1));
    setIsLoading(true);
    const dataQuotation = {
      account_id: user.id,
      reference,
      shipment: addressSelected.id !== 1,
      delivery_id: addressSelected.id,
    };
    try {
      const response = await API.quotation.create(dataQuotation);
      const createdQuotationId = response.data.newQuotation.generatedId;

      // Si l'utilisateur arrive depuis la liste de produits, on rattache ce
      // produit au devis fraîchement créé avant de rafraîchir les données,
      // pour qu'il soit déjà présent à l'ouverture du devis.
      if (productToAdd) {
        try {
          await API.quotation.addProduct(user.token, {
            product_id: productToAdd.id,
            quotation_id: createdQuotationId,
            quantity,
          });
        } catch (error) {
          console.error(
            "Erreur lors de l'ajout du produit au nouveau devis",
            error
          );
          alert(
            "Le devis a été créé mais le produit n'a pas pu y être ajouté. Vous pouvez l'ajouter depuis le devis."
          );
        }
      }

      // On mémorise l'identifiant avant de rafraîchir les données : la
      // redirection est déclenchée par l'effet qui observe user et newQuoteId,
      // une fois le nouveau devis présent dans le contexte.
      setNewQuoteId(createdQuotationId);
      await fetchData(user, updateUser);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewAddress = (e) => {
    e.preventDefault();
    const dataAddress = {
      name_address: e.target.name_address.value,
      street_address: e.target.street_address.value,
      zip_code: e.target.zip_code.value,
      city: e.target.city.value,
      country: selectedCountry.value,
    };
    API.address
      .create(dataAddress)
      .then((response) => {
        response.data.newAddress.id = response.data.newAddress.generatedId;
        delete response.data.newAddress.generatedId;
        const updatedUser = {
          ...user,
          deliveries: [...user.deliveries, response.data.newAddress],
        };
        updateUser(updatedUser);
        setAddressSelected({ ...response.data.newAddress, new: false });
        setIsOpenAddresses(false);
        API.delivery
          .create(user.token, {
            delivery_address_id: response.data.newAddress.id,
            account_id: user.id,
          })
          .then((response) => {
            fetchData(user, updateUser);
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleZipCodeChange = async (e) => {
    const zipCode = e.target.value;
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

  const handleCityChange = (event) => {
    const adressUpdated = { ...addressSelected, city: event.target.value };
    setAddressSelected(adressUpdated);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <main className="new-quote">
      <DashboardComponent />

      <section className="board" aria-labelledby="new-quote-title">
        <header className="board-head">
          <p className="board-head-eyebrow">Espace client</p>
          <h2 id="new-quote-title">Nouveau devis</h2>
          <p className="board-head-lede">
            Donnez une référence à ce devis et vérifiez l’adresse de livraison.
            Vous ajouterez les produits une fois le devis ouvert.
          </p>
        </header>

        {/* Un seul bloc, et non une carte par champ : le découpage
            précédent laissait croire à deux formulaires indépendants, l'un
            pour la référence et l'autre pour la livraison, alors qu'il s'agit
            d'un seul envoi. Les sections sont séparées par un filet à
            l'intérieur de la même carte. */}
        <form className="nq-card" onSubmit={handleCreateQuotation}>

          {/* Produit transmis par le bouton « Créer un devis » d’une carte
              produit : il est rattaché au devis dès sa création. */}
          {productToAdd && (
            <section className="nq-section">
              <p className="nq-section-title">Produit ajouté à ce devis</p>
              <div className="nq-product-body">
                <span className="nq-product-media">
                  <img
                    src={`/images/products/${productToAdd.image_link}`}
                    alt={productToAdd.description}
                    width="320"
                    height="200"
                    loading="lazy"
                  />
                </span>
                <div className="nq-product-text">
                  {productToAdd.brand?.toLowerCase() !== "artem" && (
                    <p className="nq-product-brand">
                      Adaptable {productToAdd.brand}
                    </p>
                  )}
                  <p className="nq-product-name">{productToAdd.description}</p>
                  <p className="nq-product-ref">Réf. {productToAdd.reference}</p>
                </div>
                <div className="nq-field nq-field--qty">
                  <label htmlFor="quantity">Quantité</label>
                  <input
                    type="number"
                    name="quantity"
                    id="quantity"
                    min="1"
                    step="1"
                    value={quantityToAdd}
                    onChange={(e) => setQuantityToAdd(e.target.value)}
                  />
                </div>
              </div>
            </section>
          )}

          <section className="nq-section">
            <p className="nq-section-title">Votre référence</p>
            <div className="nq-field">
              <label htmlFor="reference">Référence du devis</label>
              <input
                type="text"
                name="reference"
                id="reference"
                placeholder="ex : nom de votre client, ou n° de chantier"
              />
              <p className="nq-hint">
                Elle vous servira à retrouver ce devis dans votre historique.
              </p>
            </div>
          </section>

          <section className="nq-section">
            <p className="nq-section-title">Adresse de livraison</p>
            <div className="nq-delivery">
              <address className="nq-address">
                {addressSelected.name_address && (
                  <strong>{addressSelected.name_address}</strong>
                )}
                {addressSelected.street_address}
                <br />
                {addressSelected.zip_code} {addressSelected.city}
                <br />
                {addressSelected.country}
              </address>
              <button
                type="button"
                className="nq-link-btn"
                onClick={handleOpenAddresses}
              >
                Modifier la livraison
                <Icon name="arrow" />
              </button>
            </div>
          </section>

          <div className="nq-submit-row">
            <button className="nq-submit" type="submit">
              Créer ce devis
            </button>
            <p className="nq-hint">
              Le devis s’ouvrira ensuite pour y ajouter vos produits.
            </p>
          </div>
        </form>
      </section>

      {/* Choix d’une adresse déjà enregistrée, ou création d’une nouvelle. */}
      {isOpenAddresses && (
        <div className="nq-modal" role="dialog" aria-modal="true" aria-label="Adresse de livraison">
          <div className="nq-modal-card">
            <button
              type="button"
              className="nq-modal-close"
              onClick={() => setIsOpenAddresses(false)}
              aria-label="Fermer"
            >
              ✕
            </button>
            <h3>Choisissez une adresse de livraison</h3>

            {/* Une liste d'adresses plutôt qu'une liste déroulante : une
                adresse complète — nom, rue, code postal, ville — ne tient pas
                sur la ligne d'un `select`, qui la tronquait. Chaque entrée
                appelle le même gestionnaire que l'ancien menu, avec la valeur
                qu'il attend. */}
            <ul className="nq-address-list">
              {user.deliveries.map((address) => (
                <li key={`address_${address.id}`}>
                  <button
                    type="button"
                    className={address.id === addressSelected.id
                      ? 'nq-address-choice nq-address-choice--current'
                      : 'nq-address-choice'}
                    onClick={() => handleChangeSelect({ target: { value: String(address.id) } })}
                  >
                    <span className="nq-address-choice-name">
                      {address.name_address}
                    </span>
                    <span className="nq-address-choice-lines">
                      {address.street_address}
                      <br />
                      {address.zip_code} {address.city}
                      {address.country && <>, {address.country}</>}
                    </span>
                    {address.id === addressSelected.id && (
                      <span className="nq-address-choice-tag">Actuelle</span>
                    )}
                  </button>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  className="nq-address-choice nq-address-choice--new"
                  onClick={() => handleChangeSelect({ target: { value: 'new' } })}
                >
                  <span className="nq-address-choice-name">
                    Livrer à une nouvelle adresse
                  </span>
                  <span className="nq-address-choice-lines">
                    Elle sera enregistrée pour vos prochains devis.
                  </span>
                  <Icon name="arrow" />
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}

      {addressSelected.new && (
        <div className="nq-modal" role="dialog" aria-modal="true" aria-label="Nouvelle adresse">
          <form className="nq-modal-card" onSubmit={handleNewAddress}>
            <button
              type="button"
              className="nq-modal-close"
              onClick={() => setAddressSelected({ new: false })}
              aria-label="Fermer"
            >
              ✕
            </button>
            <h3>Nouvelle adresse de livraison</h3>

            <div className="nq-modal-grid">
              <div className="nq-field nq-field--wide">
                <label htmlFor="name_address">Nom de l’adresse</label>
                <input
                  type="text"
                  name="name_address"
                  id="name_address"
                  placeholder="ex : nom de votre client"
                />
              </div>
              <div className="nq-field nq-field--wide">
                <label htmlFor="street_address">Rue</label>
                <input
                  type="text"
                  name="street_address"
                  id="street_address"
                  placeholder="ex : 1 rue de la Paix"
                />
              </div>
              <div className="nq-field nq-field--wide">
                <label htmlFor="country">Pays</label>
                <Select
                  inputId="country"
                  classNamePrefix="nq-select"
                  options={countryOptions}
                  value={selectedCountry}
                  onChange={(option) => setSelectedCountry(option)}
                  placeholder="Sélectionnez un pays"
                  isSearchable={true}
                />
              </div>
              <div className="nq-field">
                <label htmlFor="zip_code">Code postal</label>
                <input
                  type="text"
                  name="zip_code"
                  id="zip_code"
                  placeholder="ex : 77144"
                  value={addressSelected.zip_code}
                  onChange={handleZipCodeChange}
                />
              </div>
              <div className="nq-field">
                <label htmlFor="city">Ville</label>
                {apiError || selectedCountry.label !== "France" ? (
                  <input
                    type="text"
                    name="city"
                    id="city"
                    placeholder="Ville"
                    value={addressSelected.city}
                    onChange={handleCityChange}
                  />
                ) : (
                  <select
                    name="city"
                    id="city"
                    defaultValue={addressSelected.city || "none"}
                    onChange={handleCityChange}
                  >
                    <option value="none" key="none">
                      Sélectionnez une ville
                    </option>
                    {availableCities.map((city, index) => (
                      <option key={`${city}_${index}`} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </div>

            <button className="nq-submit" type="submit">
              Valider la nouvelle adresse
            </button>
          </form>
        </div>
      )}
    </main>
  );
}
