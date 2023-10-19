
import { Routes, Route } from "react-router-dom";
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
import Dashboard from "../pages/Dashboard/Dashboard";
import UserInformations from "../pages/UserInformations/UserInformations";
import Tools from "../pages/Tools/Tools";
import QuoteHistory from "../pages/QuoteHistory/QuoteHistory";
import NewQuote from "../pages/NewQuote/NewQuote";
import AddProduct from "../pages/AddProduct/AddProduct";
import UpdateProduct from "../pages/UpdateProduct/UpdateProduct";
import RoleValidation from "../pages/RoleValidation/RoleValidation";
import DeleteProduct from "../pages/DeleteProduct/DeleteProduct";
import Quote from "../pages/Quote/Quote";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop";
import TeTool from "../pages/TeTool/TeTool";
import AppContext from "../context/AppContext";
import { useContext, useState, useEffect } from "react";
import './App.scss'
import ValidationEmail from "../pages/ValidationEmail/ValidationEmail";
import ConfirmEmail from "../pages/ConfirmEmail/ConfirmEmail";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import ResetPassword from "../pages/ResetPassword/ResetPassword";
import API from "../utils/api/api";
import SearchProduct from "../components/SearchProduct/SearchProduct";
import AddRange from "../pages/AddRange/AddRange";
import UpdateRange from "../pages/UpdateRange/UpdateRange";
import AddTechsheet from "../pages/AddTechsheet/AddTechsheet";

function App() {

  const { user, updateUser } = useContext(AppContext);
  const [logoutTimer, setLogoutTimer] = useState(null);

  useEffect(() => {
    // Fonction pour rafraîchir le token
    const refreshToken = async () => {
      // Code pour envoyer une requête au serveur pour rafraîchir le token
      API.auth.refreshToken({ id: user.id, email: user.email, firstname: user.firstname, lastname: user.lastname, role: user.role }).then((res) => {
        updateUser({ ...user, token: res.data.token });
      }).catch((err) => {
        console.error(err);
      }
      );
    };

    // Fonction pour déconnecter l'utilisateur
    const logoutUser = () => {
      updateUser({ token: "", email: "", firstname: "", lastname: "" }); // Mettez à jour le contexte pour déconnecter l'utilisateur
    };

    // Démarrez un intervalle pour rafraîchir le token périodiquement (par exemple, toutes les 15 minutes)
    const tokenRefreshInterval = setInterval(refreshToken, 15 * 60 * 1000);

    // Démarrez une minuterie pour déconnecter l'utilisateur en cas d'inactivité (par exemple, 30 minutes)
    let inactivityLogoutTimer = setTimeout(logoutUser, 30 * 60 * 1000);

    // Écoutez les événements pour réinitialiser la minuterie d'inactivité lorsque l'utilisateur est actif
    const resetInactivityTimer = () => {
      clearTimeout(inactivityLogoutTimer);
      inactivityLogoutTimer = setTimeout(logoutUser, 30 * 60 * 1000);
    };

    // Ajoutez des gestionnaires d'événements pour surveiller l'activité de l'utilisateur
    window.addEventListener('mousemove', resetInactivityTimer);
    window.addEventListener('keydown', resetInactivityTimer);

    // Nettoyez les intervalles et les gestionnaires d'événements lorsque le composant est démonté
    return () => {
      clearInterval(tokenRefreshInterval);
      clearTimeout(inactivityLogoutTimer);
      window.removeEventListener('mousemove', resetInactivityTimer);
      window.removeEventListener('keydown', resetInactivityTimer);
    };
  }, [user, updateUser, logoutTimer]);


  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/company" element={<Company />} />
        <Route path="/products" element={<Products />} />
        <Route path="/range/:rangeId" element={<Range />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/legal-terms" element={<LegalTerms />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-sales" element={<TermsOfSales />} />
        <Route path="/confirm-email/:code" element={<ConfirmEmail />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        {user.token &&
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/validation-email" element={<ValidationEmail />} />
            <Route path="/search-products" element={<SearchProduct />} />

          </>
        }
        {user.role === 'user' &&
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
            <Route path="/update-product" element={<SearchProduct />} />
            <Route path="/update-range" element={<UpdateRange />} />
            <Route path="/update-product/:id" element={<UpdateProduct />} />
            <Route path="/delete-product" element={<SearchProduct />} />
            <Route path="/delete-product/:id" element={<DeleteProduct />} />
            <Route path="/add-techsheet" element={<AddTechsheet />} />
            <Route path="/role-validation" element={<RoleValidation />} />
          </>
        }

        <Route path="*" element={<Home />} />
      </Routes>
    </>
  )
}

export default App
