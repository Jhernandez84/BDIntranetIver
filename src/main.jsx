import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { UserProvider } from './Context/User/UserContext'
import { ClientProvider } from './Context/Client/ClientContext'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    <BrowserRouter>
      <ClientProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </ClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
)