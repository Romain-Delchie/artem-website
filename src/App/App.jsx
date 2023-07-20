
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Company from "../pages/Company/Company";
import Products from "../pages/Products/Products";
import './App.scss'

function App() {


  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/company" element={<Company />} />
      <Route path="/products" element={<Products />} />
    </Routes>
  )
}

export default App
