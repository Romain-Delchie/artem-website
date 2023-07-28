
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Company from "../pages/Company/Company";
import Products from "../pages/Products/Products";
import Contact from "../pages/Contact/Contact";
import SignIn from "../pages/SignIn/SignIn";
import SignUp from "../pages/SignUp/SignUp";
import LegalTerms from "../pages/LegalTerms/LegalTerms";
import PrivacyPolicy from "../pages/PrivacyPolicy/PrivacyPolicy";
import TermsOfSales from "../pages/TermsOfSales/TermsOfSales";
import Dashboard from "../pages/Dashboard/Dashboard";
import UserInformations from "../pages/UserInformations/UserInformations";
import './App.scss'

function App() {


  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/company" element={<Company />} />
      <Route path="/products" element={<Products />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/legal-terms" element={<LegalTerms />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-of-sales" element={<TermsOfSales />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/user-informations" element={<UserInformations />} />
    </Routes>
  )
}

export default App
