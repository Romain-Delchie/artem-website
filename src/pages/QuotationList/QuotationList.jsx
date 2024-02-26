import { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import AppContext from "../../context/AppContext";
import DashboardComponent from "../../components/Dashboard/DashboardComponent";
import "./QuotationList.scss";
import API from "../../utils/api/api";
import QuoteAdmin from "../QuoteAdmin/QuoteAdmin";
import Loading from "../../components/Loading/Loading";

export default function QuotationList() {
  const { user } = useContext(AppContext);
  const [quotations, setQuotations] = useState([]);
  const [modalOpenState, setModalOpenState] = useState({});

  const openModal = (techSheetId) => {
    setModalOpenState((prevState) => ({
      ...prevState,
      [techSheetId]: true,
    }));
  };

  const closeModal = (techSheetId) => {
    setModalOpenState((prevState) => ({
      ...prevState,
      [techSheetId]: false,
    }));
  };

  useEffect(() => {
    API.quotation.getAllQuotations(user.token).then((res) => {
      const quotationsFormatted = res.data.quotations.map((quotation) => ({
        ...quotation,
        products: JSON.parse(quotation.products),
      }));

      setQuotations(quotationsFormatted);
    });
  }, []);
  const uniqueCompanies = [
    ...new Set(quotations.map((quotation) => quotation.account_company)),
  ].sort((a, b) => {
    return a.localeCompare(b);
  });

  if (typeof quotations === "string") {
    return <Loading />;
  } else {
    return (
      <main className="quotation-list">
        <DashboardComponent />
        <div className="quotation-list-container">
          <h2>Liste devis clients</h2>
          {uniqueCompanies.map((company, index) => {
            return (
              <div key={index} className="quotation-list-company">
                <h3>{company}</h3>
                <ul>
                  {quotations
                    .filter(
                      (quotation) => quotation.account_company === company
                    )
                    .map((quotation, index) => {
                      return (
                        <li key={index}>
                          <button
                            onClick={() => openModal(quotation.quotation_id)}
                            to={`/quotation-list/${quotation.quotation_id}`}
                            className="quotation-list-item"
                          >
                            <p>Devis n°{quotation.quotation_id}</p>
                            <p>Créé le: {quotation.creation_date}</p>
                            <p>Ref: {quotation.reference}</p>
                          </button>
                          {modalOpenState[quotation.quotation_id] && (
                            <div className="quotation-list-modal">
                              {quotation.products === null && (
                                <p>Le devis est vide</p>
                              )}
                              {quotation.products !== null && (
                                <QuoteAdmin quote={quotation} />
                              )}
                              <button
                                className="quotation-list-modal-close"
                                onClick={() =>
                                  closeModal(quotation.quotation_id)
                                }
                              >
                                X
                              </button>
                            </div>
                          )}
                        </li>
                      );
                    })}
                </ul>
              </div>
            );
          })}
        </div>
      </main>
    );
  }
}
