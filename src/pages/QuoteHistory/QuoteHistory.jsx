import { useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment/moment";
import AppContext from "../../context/AppContext";
import DashboardComponent from "../../components/Dashboard/DashboardComponent";
import computeTotalHT from "../../utils/quotationTotal";
// La feuille de style est celle de la liste des devis du back-office : les deux
// pages ont le même rendu, et ne peuvent donc pas se mettre à diverger.
import "../QuotationList/QuotationList.scss";

/**
 * Historique des devis du client.
 *
 * La page empilait un encart par devis, sans tri ni recherche : au bout d'une
 * cinquantaine de devis, retrouver celui d'un client donné demandait de
 * parcourir toute la page.
 *
 * Elle reprend donc la liste des devis du back-office à l'identique — mêmes
 * chiffres, mêmes filtres, même tableau triable, même habillage — à une
 * exception près : le filtre « société » et la colonne « client » n'ont pas
 * d'objet ici, tous les devis affichés étant ceux du compte connecté.
 *
 * Un clic sur une ligne ouvre le devis du client, là où le back-office ouvre
 * sa propre vue d'administration.
 */

// Portées possibles du champ de recherche
const SEARCH_SCOPES = [
  { value: "all", label: "Tout" },
  { value: "id", label: "N° devis" },
  { value: "address", label: "Adresse de livraison" },
  { value: "reference", label: "Référence devis" },
  { value: "product", label: "Produit (réf. / désignation)" },
];

const ORDERED_FILTERS = [
  { value: "all", label: "Tous" },
  { value: "not-ordered", label: "Non commandés" },
  { value: "ordered", label: "Commandés" },
];

const INITIAL_FILTERS = {
  search: "",
  scope: "all",
  ordered: "all",
  dateFrom: "",
  dateTo: "",
};

// Minuscules + suppression des accents pour une recherche tolérante
const normalize = (value) =>
  String(value ?? "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");

const isOrdered = (quotation) => Number(quotation.ordered) === 1;

const parseDate = (date) => moment(date, "DD/MM/YYYY");

// Texte dans lequel on cherche, selon la portée choisie
const getSearchableText = (quotation, scope) => {
  const fields = {
    id: [quotation.quotation_id],
    address: [
      quotation.name_address,
      quotation.street_address,
      quotation.street_other,
      quotation.zip_code,
      quotation.city,
      quotation.country,
    ],
    reference: [quotation.reference],
    product: (quotation.products || []).flatMap((product) => [
      product.reference,
      product.designation,
    ]),
  };
  const selected =
    scope === "all" ? Object.values(fields).flat() : fields[scope] || [];
  return normalize(selected.join(" "));
};

export default function QuoteHistory() {
  const { user } = useContext(AppContext);
  const navigate = useNavigate();
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [sort, setSort] = useState({ key: "id", direction: "desc" });

  // Les devis du client sont déjà chargés dans le contexte par fetchData ; on
  // n'y ajoute que le total HT, calculé comme dans le back-office.
  const quotations = useMemo(() => {
    const list = Array.isArray(user.quotations) ? user.quotations : [];
    return list.map((quotation) => ({
      ...quotation,
      ...computeTotalHT(quotation, {
        profileId: quotation.profile_id ?? user.profile_id,
        deliveryStandardId: user.delivery_standard?.id,
      }),
    }));
  }, [user.quotations, user.profile_id, user.delivery_standard]);

  const filteredQuotations = useMemo(() => {
    const terms = normalize(filters.search).split(/\s+/).filter(Boolean);
    const dateFrom = filters.dateFrom ? moment(filters.dateFrom) : null;
    const dateTo = filters.dateTo ? moment(filters.dateTo).endOf("day") : null;

    const result = quotations.filter((quotation) => {
      if (filters.ordered === "ordered" && !isOrdered(quotation)) return false;
      if (filters.ordered === "not-ordered" && isOrdered(quotation))
        return false;

      if (dateFrom || dateTo) {
        const creationDate = parseDate(quotation.creation_date);
        if (dateFrom && creationDate.isBefore(dateFrom)) return false;
        if (dateTo && creationDate.isAfter(dateTo)) return false;
      }

      if (terms.length > 0) {
        const haystack = getSearchableText(quotation, filters.scope);
        // Tous les termes saisis doivent être présents
        return terms.every((term) => haystack.includes(term));
      }
      return true;
    });

    const direction = sort.direction === "asc" ? 1 : -1;
    const comparators = {
      id: (a, b) => a.quotation_id - b.quotation_id,
      date: (a, b) => parseDate(a.creation_date) - parseDate(b.creation_date),
      reference: (a, b) =>
        String(a.reference ?? "").localeCompare(String(b.reference ?? "")),
      city: (a, b) => String(a.city ?? "").localeCompare(String(b.city ?? "")),
      total: (a, b) => a.totalHT - b.totalHT,
      status: (a, b) => Number(isOrdered(a)) - Number(isOrdered(b)),
    };
    const comparator = comparators[sort.key] || comparators.id;
    return [...result].sort((a, b) => comparator(a, b) * direction);
  }, [quotations, filters, sort]);

  const orderedCount = quotations.filter(isOrdered).length;

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const resetFilters = () => setFilters(INITIAL_FILTERS);

  const handleSort = (key) => {
    setSort((prev) =>
      prev.key === key
        ? { key, direction: prev.direction === "asc" ? "desc" : "asc" }
        : { key, direction: "asc" }
    );
  };

  const sortIndicator = (key) => {
    if (sort.key !== key) return <span className="sort-indicator">↕</span>;
    return (
      <span className="sort-indicator active">
        {sort.direction === "asc" ? "↑" : "↓"}
      </span>
    );
  };

  return (
    <main className="quotation-list">
      <DashboardComponent />
      <div className="quotation-list-container">
        <h2>Mes devis</h2>

        <div className="quotation-list-stats">
          <div className="quotation-list-stat">
            <span className="quotation-list-stat-value">
              {quotations.length}
            </span>
            <span className="quotation-list-stat-label">Devis au total</span>
          </div>
          <div className="quotation-list-stat ordered">
            <span className="quotation-list-stat-value">{orderedCount}</span>
            <span className="quotation-list-stat-label">Commandés</span>
          </div>
          <div className="quotation-list-stat not-ordered">
            <span className="quotation-list-stat-value">
              {quotations.length - orderedCount}
            </span>
            <span className="quotation-list-stat-label">Non commandés</span>
          </div>
          <div className="quotation-list-stat filtered">
            <span className="quotation-list-stat-value">
              {filteredQuotations.length}
            </span>
            <span className="quotation-list-stat-label">Affichés</span>
          </div>
        </div>

        <form
          className="quotation-list-filters"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="quotation-list-filter search">
            <label htmlFor="search">Rechercher</label>
            <div className="quotation-list-search-group">
              <input
                type="search"
                id="search"
                name="search"
                placeholder="N° devis, adresse, référence, produit…"
                value={filters.search}
                onChange={handleFilterChange}
                autoComplete="off"
              />
              <select
                name="scope"
                value={filters.scope}
                onChange={handleFilterChange}
                aria-label="Champ de recherche"
              >
                {SEARCH_SCOPES.map((scope) => (
                  <option key={scope.value} value={scope.value}>
                    {scope.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="quotation-list-filter">
            <label htmlFor="ordered">Statut</label>
            <select
              id="ordered"
              name="ordered"
              value={filters.ordered}
              onChange={handleFilterChange}
            >
              {ORDERED_FILTERS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="quotation-list-filter">
            <label htmlFor="dateFrom">Créé du</label>
            <input
              type="date"
              id="dateFrom"
              name="dateFrom"
              value={filters.dateFrom}
              onChange={handleFilterChange}
            />
          </div>

          <div className="quotation-list-filter">
            <label htmlFor="dateTo">au</label>
            <input
              type="date"
              id="dateTo"
              name="dateTo"
              value={filters.dateTo}
              onChange={handleFilterChange}
            />
          </div>

          <button
            type="button"
            className="quotation-list-reset"
            onClick={resetFilters}
          >
            Réinitialiser
          </button>
        </form>

        <div className="quotation-list-table-wrapper">
          <table className="quotation-list-table">
            <thead>
              <tr>
                <th onClick={() => handleSort("id")}>
                  N° {sortIndicator("id")}
                </th>
                <th className="hide-xs" onClick={() => handleSort("date")}>
                  Date {sortIndicator("date")}
                </th>
                <th onClick={() => handleSort("reference")}>
                  Réf. devis {sortIndicator("reference")}
                </th>
                <th className="hide-lg" onClick={() => handleSort("city")}>
                  Livraison {sortIndicator("city")}
                </th>
                <th className="quotation-list-products-head">Produits</th>
                <th className="hide-sm" onClick={() => handleSort("total")}>
                  Total HT {sortIndicator("total")}
                </th>
                <th onClick={() => handleSort("status")}>
                  Statut {sortIndicator("status")}
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredQuotations.length === 0 && (
                <tr>
                  <td colSpan={7} className="quotation-list-empty">
                    {quotations.length === 0
                      ? "Vous n’avez pas encore de devis."
                      : "Aucun devis ne correspond aux filtres."}
                  </td>
                </tr>
              )}
              {filteredQuotations.map((quotation) => {
                const products = quotation.products || [];
                const ordered = isOrdered(quotation);
                return (
                  <tr
                    key={quotation.quotation_id}
                    className="quotation-list-row"
                    onClick={() =>
                      navigate(`/quote-history/${quotation.quotation_id}`)
                    }
                    title="Ouvrir le devis"
                  >
                    <td className="quotation-list-id">
                      {quotation.quotation_id}
                    </td>
                    <td className="hide-xs">{quotation.creation_date}</td>
                    <td>{quotation.reference || "—"}</td>
                    <td className="hide-lg">
                      <div className="quotation-list-address">
                        <span>{quotation.name_address}</span>
                        <span>
                          {quotation.zip_code} {quotation.city}
                        </span>
                      </div>
                    </td>
                    <td className="quotation-list-products">
                      {products.length === 0 ? (
                        <span className="empty">Vide</span>
                      ) : (
                        <div className="quotation-list-products-icon">
                          <span aria-label="Voir les produits">
                            📦 <small>{products.length}</small>
                          </span>
                          <ul className="quotation-list-products-tooltip">
                            {products.map((product, index) => (
                              <li key={product.quotation_has_product_id ?? index}>
                                <strong>{product.quantity}×</strong>{" "}
                                {product.reference}
                                <small>{product.designation}</small>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </td>
                    <td className="hide-sm quotation-list-total">
                      {quotation.totalHT.toFixed(2)} €
                      {quotation.transportUnknown && (
                        <small>hors transport</small>
                      )}
                    </td>
                    <td>
                      <span
                        className={`quotation-list-status ${
                          ordered ? "ordered" : "not-ordered"
                        }`}
                      >
                        {ordered ? "Commandé" : "Non commandé"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
