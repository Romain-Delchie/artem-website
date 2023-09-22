
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
import './App.scss'

function App() {

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/vitrine/" element={<Home />} />
        <Route path="/vitrine/company" element={<Company />} />
        <Route path="/vitrine/products" element={<Products />} />
        <Route path="/vitrine/range/:rangeId" element={<Range />} />
        <Route path="/vitrine/contact" element={<Contact />} />
        <Route path="/vitrine/signin" element={<SignIn />} />
        <Route path="/vitrine/signup" element={<SignUp />} />
        <Route path="/vitrine/legal-terms" element={<LegalTerms />} />
        <Route path="/vitrine/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/vitrine/terms-of-sales" element={<TermsOfSales />} />
        <Route path="/vitrine/dashboard" element={<Dashboard />} />
        <Route path="/vitrine/user-informations" element={<UserInformations />} />
        <Route path="/vitrine/tools" element={<Tools />} />
        <Route path="/vitrine/quote-history/" element={<QuoteHistory />} />
        <Route path="/vitrine/quote-history/:quoteId" element={<Quote />} />
        <Route path="/vitrine/new-quote" element={<NewQuote />} />
        <Route path="/vitrine/add-product" element={<AddProduct />} />
        <Route path="/vitrine/update-product" element={<UpdateProduct />} />
        <Route path="/vitrine/delete-product" element={<DeleteProduct />} />
        <Route path="/vitrine/role-validation" element={<RoleValidation />} />
        <Route path="/vitrine/te-tool" element={<TeTool />} />


      </Routes>
    </>
  )
}

export default App
