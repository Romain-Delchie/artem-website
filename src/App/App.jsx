
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
import { useContext } from "react";
import './App.scss'
import ValidationEmail from "../pages/ValidationEmail/ValidationEmail";
import ConfirmEmail from "../pages/ConfirmEmail/ConfirmEmail";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import ResetPassword from "../pages/ResetPassword/ResetPassword";
import SearchProduct from "../components/SearchProduct/SearchProduct";
import AddRange from "../pages/AddRange/AddRange";
import UpdateRange from "../pages/UpdateRange/UpdateRange";
import AddTechsheet from "../pages/AddTechsheet/AddTechsheet";
import UserList from "../pages/UserList/UserList";
import DeleteRange from "../pages/DeleteRange/DeleteRange";
import SearchUpdate from "../pages/SearchUpdate/SearchUpdate";
import ScrollToTopButton from "../components/ScrollToTopButton/ScrollToTopButton";
import SearchProductPage from "../pages/SearchProductPage/SearchProductPage";
import HandleHome from "../pages/HandleHome/HandleHome";
import QuotationList from "../pages/QuotationList/QuotationList";
import QuoteAdmin from "../pages/QuoteAdmin/QuoteAdmin";

function App() {

  const { user } = useContext(AppContext);

  return (
    <>
      <ScrollToTop />
      <ScrollToTopButton />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/entreprise" element={<Company />} />
        <Route path="/gamme" element={<Products />} />
        <Route path="/gamme/:rangeId/*" element={<Range />} />
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

        <Route path="*" element={<Home />} />
      </Routes>
    </>
  )
}

export default App
