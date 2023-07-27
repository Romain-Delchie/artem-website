import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App/App.jsx'
import './index.scss'
import './reset.scss'
import Layout from './components/Layout/Layout.jsx'
import { BrowserRouter } from 'react-router-dom'
import UserContextProvider from './context/UserContextPovider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <UserContextProvider>
      <Layout>
        <App />
      </Layout>
    </UserContextProvider>
  </BrowserRouter >
)
