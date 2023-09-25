
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

function App() {

  const { user } = useContext(AppContext);

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
        {user.token &&
          <Route path="/dashboard" element={<Dashboard />} />
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
            <Route path="/update-product" element={<UpdateProduct />} />
            <Route path="/delete-product" element={<DeleteProduct />} />
            <Route path="/role-validation" element={<RoleValidation />} />
          </>
        }

        <Route path="*" element={<Home />} />
      </Routes>
    </>
  )
}

export default App
