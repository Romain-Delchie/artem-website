
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import './App.scss'

function App() {


  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  )
}

export default App
