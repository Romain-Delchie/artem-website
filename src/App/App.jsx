import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense, useContext } from "react";

// Pages publiques : chargées immédiatement car ce sont elles que les moteurs
// de recherche explorent et que les visiteurs anonymes consultent.
import Home from "../pages/Home/Home";
import Company from "../pages/Company/Company";
import Products from "../pages/Products/Products";
import Range from "../pages/Range/Range";
import Contact from "../pages/Contact/Contact";
import SignIn from "../pages/SignIn/SignIn";
import SignUp from "../pages/SignUp/SignUp";
import LegalTerms from "../pages/LegalTerms/LegalTerms";
import PrivacyPolicy from "../pages/PrivacyPolicy/PrivacyPolicy";
import TermsOfSales from "../pages/TermsOfSales/TermsOfSales";
import NotFound from "../pages/NotFound/NotFound";
import ConfirmEmail from "../pages/ConfirmEmail/ConfirmEmail";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import ResetPassword from "../pages/ResetPassword/ResetPassword";

// Espace connecté et back-office : chargés à la demande. Ces écrans embarquent
// les dépendances les plus lourdes (générateur PDF, tableurs, sélecteurs), qui
// n'ont aucune raison d'être téléchargées par un visiteur anonyme.
const Dashboard = lazy(() => import("../pages/Dashboard/Dashboard"));
const UserInformations = lazy(() => import("../pages/UserInformations/UserInformations"));
const Tools = lazy(() => import("../pages/Tools/Tools"));
const QuoteHistory = lazy(() => import("../pages/QuoteHistory/QuoteHistory"));
const NewQuote = lazy(() => import("../pages/NewQuote/NewQuote"));
const Quote = lazy(() => import("../pages/Quote/Quote"));
const TeTool = lazy(() => import("../pages/TeTool/TeTool"));
const ValidationEmail = lazy(() => import("../pages/ValidationEmail/ValidationEmail"));
const SearchProductPage = lazy(() => import("../pages/SearchProductPage/SearchProductPage"));
const AddProduct = lazy(() => import("../pages/AddProduct/AddProduct"));
const AddRange = lazy(() => import("../pages/AddRange/AddRange"));
const UpdateProduct = lazy(() => import("../pages/UpdateProduct/UpdateProduct"));
const UpdateRange = lazy(() => import("../pages/UpdateRange/UpdateRange"));
const DeleteRange = lazy(() => import("../pages/DeleteRange/DeleteRange"));
const DeleteProduct = lazy(() => import("../pages/DeleteProduct/DeleteProduct"));
const SearchUpdate = lazy(() => import("../pages/SearchUpdate/SearchUpdate"));
const AddTechsheet = lazy(() => import("../pages/AddTechsheet/AddTechsheet"));
const RoleValidation = lazy(() => import("../pages/RoleValidation/RoleValidation"));
const UserList = lazy(() => import("../pages/UserList/UserList"));
const HandleHome = lazy(() => import("../pages/HandleHome/HandleHome"));
const QuotationList = lazy(() => import("../pages/QuotationList/QuotationList"));
const QuoteAdmin = lazy(() => import("../pages/QuoteAdmin/QuoteAdmin"));

import ScrollToTop from "../components/ScrollToTop/ScrollToTop";
import ScrollToTopButton from "../components/ScrollToTopButton/ScrollToTopButton";
import Loading from "../components/Loading/Loading";
import AppContext from "../context/AppContext";
import './App.scss'

function App() {

  const { user } = useContext(AppContext);

  return (
    <>
      <ScrollToTop />
      <ScrollToTopButton />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/entreprise" element={<Company />} />
          <Route path="/gamme" element={<Products />} />
          {/* Les anciennes URLs /gamme/:id/:nom restent servies par le même
              composant, qui redirige vers l'URL en slug. Une redirection 301
              est également posée côté nginx (voir deploy/nginx-artem.conf). */}
          <Route path="/gamme/:slug/*" element={<Range />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/connexion" element={<SignIn />} />
          <Route path="/creer-un-compte" element={<SignUp />} />
          <Route path="/mentions-legales" element={<LegalTerms />} />
          <Route path="/politique-confidentialite" element={<PrivacyPolicy />} />
          <Route path="/cgv" element={<TermsOfSales />} />
          <Route path="/confirm-email/:code" element={<ConfirmEmail />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          {user.token &&
            <>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/validation-email" element={<ValidationEmail />} />
              <Route path="/search-products" element={<SearchProductPage />} />

            </>
          }
          {(user.role === 'user' || user.role === "admin") &&
            <>
              <Route path="/user-informations" element={<UserInformations />} />
              <Route path="/tools" element={<Tools />} />
              <Route path="/quote-history/" element={<QuoteHistory />} />
              <Route path="/quote-history/:quoteId" element={<Quote />} />
              <Route path="/new-quote" element={<NewQuote />} />
              <Route path="/te-tool" element={<TeTool />} />
            </>
          }
          {user.role === 'admin' &&
            <>
              <Route path="/add-product" element={<AddProduct />} />
              <Route path="/add-range" element={<AddRange />} />
              <Route path="/update-product" element={<SearchUpdate />} />
              <Route path="/update-range" element={<UpdateRange />} />
              <Route path="/delete-range" element={<DeleteRange />} />
              <Route path="/update-product/:id" element={<UpdateProduct />} />
              <Route path="/delete-product" element={<SearchUpdate />} />
              <Route path="/delete-product/:id" element={<DeleteProduct />} />
              <Route path="/add-techsheet" element={<AddTechsheet />} />
              <Route path="/role-validation" element={<RoleValidation />} />
              <Route path="/user-list" element={<UserList />} />
              <Route path="/handle-home" element={<HandleHome />} />
              <Route path="/Quotation-list" element={<QuotationList />} />
              <Route path="/Quotation-list/:id" element={<QuoteAdmin />} />
            </>
          }

          {/* Anciens liens internes vers /products, conservés le temps que les
              moteurs de recherche prennent en compte la nouvelle URL. */}
          <Route path="/products" element={<Navigate to="/gamme" replace />} />

          {/* Une URL inconnue affiche désormais une vraie page 404 en noindex
              plutôt que l'accueil, qui produisait des « soft 404 ». */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  )
}

export default App
