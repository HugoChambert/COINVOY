import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { LanguageProvider } from './contexts/LanguageContext'
import { PhantomWalletProvider } from './contexts/PhantomWalletContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LanguageProvider>
      <PhantomWalletProvider>
        <App />
      </PhantomWalletProvider>
    </LanguageProvider>
  </React.StrictMode>,
)
